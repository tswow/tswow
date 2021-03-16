import { MPQ } from "./MPQ";
import { Datasets } from "./Dataset";
import { Datascripts } from "./Datascripts";
import { commands } from "./Commands";
import { Modules } from "./Modules";
import { ipaths } from "../util/Paths";
import { wfs } from "../util/FileSystem";
import { Addon } from "./Addon";
import { Livescripts } from "./Livescripts";
import { term } from "../util/Terminal";
import { SevenZip } from "../util/7zip";

export namespace Build {
    export const command = commands.addCommand('build');

    export function packageClient(dataset: Datasets.Dataset, useTimer: boolean) {
        MPQ.buildMPQArchive(dataset,ipaths.publishMpq(dataset.id),useTimer);
    }

    export async function packageServer(
          datasets: Datasets.Dataset[]
        , buildData: boolean
        , buildScripts: boolean
        , includeMaps: boolean
        , useTimer: boolean) {
            let archiveFiles: string[] = [];
            let allModules: string[] = []
            datasets.forEach(x=>{
                allModules = allModules
                    .concat(x.config.modules.filter(x=>!allModules.includes(x)));

                archiveFiles.push(ipaths.datasetIds(x.id));
                archiveFiles.push(ipaths.datasetYaml(x.id));
            });

            if(buildScripts) {
                await Promise.all(allModules.map(async x=>{
                    if(await Livescripts.build(x,'Release')) {
                        archiveFiles.push(ipaths.tcModuleScript('Release',x));
                    }
                }));
            } else {
                allModules.forEach(x=>{
                    archiveFiles = archiveFiles.concat(Modules.getSourceFiles(x,
                        ['addons','scripts','shared']));
                });
            }

            if(buildData) {
                // Need to do this separately
                await Promise.all(datasets.map(async x=>{
                    await Datascripts.build(x,false, useTimer);
                    await x.dumpReleaseDatabase();
                    archiveFiles.push(ipaths.datasetSqlDump(x.id));
                }));
            } else {
                // We do this for ALL modules,
                // because we want libraries to be included.
                Modules.getModules().forEach(x=>{
                    archiveFiles = archiveFiles.concat(Modules.getSourceFiles(x,['data']));
                });
            }

            if(includeMaps) {
                await Promise.all(datasets.map(async x=>{
                    await x.installServerData();
                    archiveFiles.push(ipaths.datasetMaps(x.id));
                    archiveFiles.push(ipaths.datasetVmaps(x.id));
                    if(x.config.use_mmaps) {
                        archiveFiles.push(ipaths.datasetMmaps(x.id));
                    }
                }));
            }

            wfs.remove(ipaths.publishServerZip);

            term.log(`Creating server release package ${ipaths.publishServerZip}...`);
            archiveFiles.forEach(x=>{
                SevenZip.makeArchive(ipaths.publishServerZip,[x]);
            });
    }

    export function initialize() {
        Build.command.addCommand('data', 'clientonly? rebuild? package?',
            'Builds data patches and then restarts the affected processes', async(args) => {
            if (args.includes('clientonly') && args.includes('rebuild')) {
                throw new Error(`Can't both rebuild and restart only the client, rebuilding requires restarting the server.`);
            }
            await Promise.all(Datasets.getDatasetsOrDefault(args).map(x=>
                MPQ.buildDevMPQ(x,args.includes('--use-timer'))
            ));
        });

        Build.command.addCommand('check', '', '', async(args) => {
            let ds = Datasets.getDatasetsOrDefault(args);
            await Datascripts.build(ds[0],true,args.includes('--use-timer'));
        });

        Build.command.addCommand(
            'addon'
            ,'dataset | modules'
            ,'Builds addons for one, multiple or all moduels against multiple or a single dataset'
            ,((args)=>{
            let ds = Datasets.getDatasetsOrDefault(args);
            let modules = Modules.getModulesOrAll(args).filter(x=>wfs.exists(ipaths.moduleAddons(x)));
            let runningClients = ds.filter(x=>x.client.isRunning());
            runningClients.forEach(x=>x.client.kill());
            ds.forEach(x=>{
                modules.forEach(y=>Addon.build(y,x.id))
                wfs.copy(ipaths.datasetLuaXML(x.id)
                    , ipaths.datasetMpq(x.id));
            });

            runningClients.forEach(x=>x.client.start());
        }));

        Build.command.addCommand(
            'scripts'
            , 'module? debug?'
            , 'Build and loads the server scripts of a module'
            , async (args) => {
            let isDebug = args.indexOf('debug')!==-1;
            let modules = Modules.getModulesOrAll(args);
            await Promise.all(modules.map(x=>Livescripts.build(x, isDebug ? 'Debug' : 'Release')))
            Datasets.getAll().forEach(x=>{
                Livescripts.writeModuleText(x);
            });
            term.success(`Built scripts`);
        });

        const pkg = commands.addCommand('package');

        pkg.addCommand(
            'client'
            ,'...datasets'
            ,'Creates publish packages for clients'
            , async(args)=>{
            await Promise.all(Datasets.getDatasetsOrDefault(args)
                .map(x=>packageClient(x,args.includes('--use-timer'))));
        });

        pkg.addCommand(
            'server'
            ,'...datasets (--build-data, --build-scripts, --include-maps, --use-timer)'
            ,'Creates publish packages for servers'
            , async(args)=>{
            packageServer(
                Datasets.getDatasetsOrDefault(args),
                args.includes('--build-data'),
                args.includes('--build-scripts'),
                args.includes('--include-maps'),
                args.includes('--use-timer'));
        });
    }
}