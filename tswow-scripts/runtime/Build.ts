import { MPQ } from "./MPQ";
import { Datasets } from "./Dataset";
import { Datascripts } from "./Datascripts";
import { commands } from "./Commands";
import { Modules } from "./Modules";
import { ipaths } from "../util/Paths";
import { wfs, mpath } from "../util/FileSystem";
import { Addon } from "./Addon";
import { Livescripts } from "./Livescripts";
import { term } from "../util/Terminal";
import { SevenZip } from "../util/7zip";
import { findBuildType, BuildType } from "../util/BuildType";
import { NodeConfig } from "./NodeConfig";

export namespace Build {
    export const command = commands.addCommand('build');

    export async function packageClient(
          dataset: Datasets.Dataset
        , useTimer: boolean
        ) {
        await MPQ.buildMPQArchive(dataset,ipaths.packageMpq(dataset.id),useTimer);
        term.success('Finished creating client release package');
    }

    export async function packageServer(
          datasets: Datasets.Dataset[]
        , buildData: boolean
        , buildScripts: boolean
        , buildType: BuildType
        , includeMaps: boolean
        , useTimer: boolean
        , outname: string) {
            term.log(`Creating server release package for datasets ${datasets.map(x=>x.id)}...`);
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
                    if(await Livescripts.build(x,buildType)) {
                        archiveFiles.push(ipaths.tcModuleScript(buildType,x));
                        let pdb = ipaths.tcModulePdb(buildType,x);
                        if(wfs.exists(pdb)) {
                            archiveFiles.push(pdb);
                        }
                    }
                }));
            } else {
                allModules.forEach(x=>{
                    archiveFiles = archiveFiles
                        .concat(Modules.getModule(x)
                            .getSourceFiles(['addons','scripts','shared']))
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
                    archiveFiles = archiveFiles
                        .concat(x.getSourceFiles(['addons','scripts','shared']))
                });
            }

            if(includeMaps) {
                term.log("Packaging map data (this takes a long time)");
                await Promise.all(datasets.map(async x=>{
                    await x.installServerData();
                    archiveFiles.push(ipaths.datasetMaps(x.id));
                    archiveFiles.push(ipaths.datasetVmaps(x.id));
                    if(x.config.use_mmaps) {
                        archiveFiles.push(ipaths.datasetMmaps(x.id));
                    }
                }));
            }

            const mpqpath = mpath(ipaths.package,outname);
            wfs.remove(mpqpath);
            archiveFiles.forEach(x=>{
                SevenZip.makeArchive(mpqpath,[x]);
            });
            term.success('Finished creating server release package');
    }

    export function initialize() {
        Build.command.addCommand(
              'datascripts'
            , '--client-only --rebuild'
            , 'Builds data patches and then restarts the affected processes'
            , async(args) => {

            await Promise.all(Datasets.getDatasetsOrDefault(args).map(async x=>{
                // can do this individually, since the world dbs are unique per dataset
                if(args.includes('--rebuild')) {
                    await x.installDest(true);
                }
                return MPQ.buildDevMPQ(x,args.includes('--use-timer'),args.includes('--client-only'),args)
            }));
        })
        .addAlias('data');

        Build.command.addCommand(
              'check'
            , ''
            , ''
            , async(args) => {

            let ds = Datasets.getDatasetsOrDefault(args);
            await Datascripts.build(ds[0],true,args.includes('--use-timer'));
        });

        Build.command.addCommand(
              'addons'
            , 'dataset | modules'
            , 'Builds addons for one, multiple or all moduels against multiple or a single dataset'
            , ((args)=>{
            let ds = Datasets.getDatasetsOrDefault(args);
            let modules = Modules.getModulesOrAll(args).filter(x=>wfs.exists(ipaths.moduleAddons(x.id)));

            let allClients = ds.filter(x=>x.client.isRunning()||NodeConfig.autostart_client);
            let runningClients = ds.filter(x=>x.client.isRunning());
            runningClients.forEach(x=>x.client.kill());
            ds.forEach(x=>{
                modules.forEach(y=>Addon.build(y.id,x.id))
                wfs.copy(ipaths.datasetLuaXML(x.id)
                    , x.config.mpq_path);
            });
            allClients.forEach(x=>x.client.start());
        }))
        .addAlias('addon');

        Build.command.addCommand(
              'livescripts'
            , 'module? --debug|release|relwithdebinfo --trace'
            , 'Build and loads the server scripts of a module'
            , async (args) => {
            let modules = Modules.getModulesOrAll(args);
            await Promise.all(modules.map(x=>Livescripts.build(
                  x.id
                , findBuildType(args)
                , args.includes('--trace')
                , args.includes('--allow-globals')
                )))
            Datasets.getAll().forEach(x=>{
                Livescripts.writeModuleText(x);
            });
            term.success(`Built scripts`);
        })
        .addAlias('scripts')
        .addAlias('script');

        Build.command.addCommand(
              'all'
            , 'datasets modules --debug'
            , 'Builds and loads all module and dataset scripts'
            , async (args) => {
                const a = args.join(' ');
                await commands.sendCommand(`build datascripts ${a}`)
                await commands.sendCommand(`build livescripts ${a}`)
                await commands.sendCommand(`build addons ${a}`)
            }
        )

        const pkg = commands.addCommand('package');

        pkg.addCommand(
              'client'
            , '...datasets'
            , 'Creates publish packages for clients'
            ,  async(args)=>{

            await Promise.all(Datasets.getDatasetsOrDefault(args)
                .map(x=>packageClient(x,args.includes('--use-timer'))));
        });

        pkg.addCommand(
              'server'
            , '...datasets --build-data, --build-scripts, --include-maps, --use-timer --outname='
            , 'Creates publish packages for servers'
            , async(args)=>{
                let outname = args.find(x=>x.startsWith('--outname='))
                if(outname) outname = outname.substring('--outname='.length);
                else outname = 'server.7z';

            packageServer(
                  Datasets.getDatasetsOrDefault(args)
                , args.includes('--build-data')
                , args.includes('--build-scripts')
                , findBuildType(args, NodeConfig.default_build_type)
                , args.includes('--include-maps')
                , args.includes('--use-timer')
                , outname);
        });
    }
}