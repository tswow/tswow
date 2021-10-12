import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { ChildProcessSettings } from "./ChildProcessSettings";
import { commands } from "./Commands";
import { Datasets } from "./Dataset";
import { datascripts_swcrc, lib_package_json, Modules } from "./Modules";

export namespace Datascripts {
    export function compile(mod: string) {
        wfs.write(ipaths.moduleSwcRc(mod),JSON.stringify(datascripts_swcrc))
        try {
            wsys.execIn(ipaths.moduleRoot(mod),`swc datascripts -d datascripts/build`,'inherit')
        } catch(error) {
            // error printed by swc
        }
        wfs.remove(ipaths.moduleSwcRc(mod));
    }

    export function compileTypes(mod: string, declare: boolean) {
        console.log(`Compiling types for ${mod}...`)
        try {
            wsys.execIn(ipaths.moduleData(mod),'tsc','inherit')
        } catch(error) {
            // error printed by tsc
        }
        compile(mod);
        if(declare) {
            wfs.write(
                ipaths.moduleDataPackagePath(mod)
            , lib_package_json(mod)
            )
            if(!wfs.exists(ipaths.moduleDataLink(mod))) {
                wsys.exec(`npm i -S ${ipaths.moduleDataBuild(mod)}`);
            }
        }
    }

    /**
     * Builds dbc and sql data for all modules.
     */
    export async function build(
          dataset: Datasets.Dataset
        , readonly: boolean
        , useTimer: boolean
        , args: string[] = []) {

        term.log(`Building DataScripts for dataset ${dataset.id}`);
        await Modules.refreshModules();
        const ct = Date.now();

        if(useTimer) {
            term.log(`Compiled scripts in ${((Date.now()-ct)/1000).toFixed(2)} seconds.`)
        }

        wfs.mkDirs(ipaths.datasetDBC(dataset.id), false);

        dataset.installServerData();
        await dataset.installBoth(false);

        const shouldProf = args.includes('--prof')

        dataset.config.modules.forEach(x=>{
            compile(x);
        })

        try {
            wsys.exec(
                `node -r source-map-support/register ${shouldProf?'--prof':''} ${ipaths.wotlkdataIndex}`
                +` ${ChildProcessSettings(dataset,readonly,useTimer)}`
                + ` ${(args ? args.join(' '):'')}`
                , 'inherit');
            if(shouldProf) {
                wfs.readDir('./',true,'files')
                    .filter(x=>x.startsWith('isolate-')
                        && x.endsWith('-v8.log'))
                    .forEach((x,i)=>{
                        wsys.exec(
                              `node --prof-process ${x}`
                            + ` > node-profiling${i==0?'':`-${i}`}.txt`
                        )
                        wfs.remove(x)
                    })
            }
        } catch (error) {
            throw new Error(`Failed to rebuild patches`);
        }

        term.success(`Finished building DataScripts for dataset ${dataset.id}`);
    }

    export function initialize() {
        commands.addCommand('check','dataset','',async (args: any[])=>{
            await Promise.all(Datasets.getDatasetsOrDefault(args).map(x=>{
                return build(x,true,args.includes('--use-timer'),args);
            }));
        });
    }
}