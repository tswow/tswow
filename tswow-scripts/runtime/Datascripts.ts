import { Modules } from "./Modules";
import { compileAll } from "../util/TSWatcher";
import { term } from "../util/Terminal";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { Datasets } from "./Dataset";
import { wsys } from "../util/System";
import { commands } from "./Commands";
import { ChildProcessSettings } from "./ChildProcessSettings";

export namespace Datascripts {
    /**
     * Builds dbc and sql data for all modules.
     */
    export async function build(
          dataset: Datasets.Dataset
        , readonly: boolean
        , useTimer: boolean
        , args?: string[]) {

        term.log(`Building DataScripts for dataset ${dataset.id}`);
        await Modules.refreshModules();
        const ct = Date.now();
        await compileAll(8000);

        if(useTimer) {
            term.log(`Compiled scripts in ${((Date.now()-ct)/1000).toFixed(2)} seconds.`)
        }

        wfs.mkDirs(ipaths.datasetDBC(dataset.id), false);

        dataset.installServerData();
        await dataset.installBoth(false);

        try {
            wsys.exec(
                `node -r source-map-support/register ${ipaths.wotlkdataIndex}`
                +` ${ChildProcessSettings(dataset,readonly,useTimer)}`
                + ` ${(args ? args.join(' '):'')}`
                , 'inherit');
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