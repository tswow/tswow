import { FileChanges } from "../util/FileChanges";
import { mpath, wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { Addon } from "./Addon";
import { Datascripts } from "./Datascripts";
import { Datasets } from "./Dataset";
import { Modules } from "./Modules";
import { NodeConfig } from "./NodeConfig";
import { Realm } from "./Realm";

export namespace MPQ {
    /**
     * Operations necessary for both folder and archive builds
     * @param dataset
     * @param useTimer
     */
    async function prepareBuild(
          dataset: Datasets.Dataset
        , useTimer: boolean
        , isPackage: boolean
        , args?: string[]) {

        // Build output dbc
        await Datascripts.build(dataset, false, useTimer, args);

        let mods = dataset.config.modules.map(x=>Modules.getModule(x));
        if(!isPackage) {
            Modules.checkSymlinks(
                  dataset
                , args!=undefined && args.includes('--trace')
                , ...mods);
            mods = mods
                .filter(x=>x.getSymlinks(dataset).length===0);
        }

        return mods
            .map(x => ipaths.moduleAssets(x.id))
            .filter(x => wfs.exists(x))
                .concat([
                    ipaths.datasetDBC(dataset.id),
                    ipaths.datasetLuaXML(dataset.id)
                ]);
    }

    export async function buildMpqFolder(
          dataset: Datasets.Dataset
        , destination: string
        , useTimer: boolean
        , isDev: boolean
        , args?: string[]) {

        let folders = await prepareBuild(dataset, useTimer, !isDev, args);

        term.log(`Building MPQ folder at ${destination} for dataset ${dataset.id}`);
        if(wfs.exists(destination) && !wfs.isDirectory(destination)) {
            throw new Error(`Target MPQ folder is a file: ${destination}`);
        }

        wfs.mkDirs(destination);
        const ignored = dataset.config.ignore_assets;
        FileChanges.startCache();
        folders.forEach(x => wfs.iterate(x, path => {
            for (const ig of ignored) {
                if (path.endsWith(ig))  {
                    return;
                }
            }

            let rel = wfs.relative(x, path);
            if (rel.endsWith('.dbc')) {
                rel = mpath('DBFilesClient', rel);
            }
            const out = mpath(destination, rel);
            if (
                FileChanges.isChanged(path, 'mpq')
                || !wfs.exists(out)
                || rel.endsWith('.dbc')
                || rel.endsWith('.lua')
                || rel.endsWith('.xml')) {
                    wfs.copy(path, out);
                }
            FileChanges.tagChange(path, 'mpq');
        }));
        FileChanges.endCache();
        term.success(
              `Finished building MPQ folder`
            + ` for dataset ${dataset.id}`);
    }

    export async function buildMPQArchive(
          dataset: Datasets.Dataset
        , destination: string, useTimer: boolean) {
        let folders = await prepareBuild(dataset, useTimer, true);
        await Addon.buildAll(dataset);
        term.log(
              ` Building MPQ archive at ${destination}`
            + ` for dataset ${dataset.id}`);
        if(wfs.exists(destination) && wfs.isDirectory(destination)) {
            throw new Error(`Target MPQ file is a directory: ${destination}`);
        }

        wfs.mkDirs(wfs.dirname(destination));

        wsys.exec(`"${ipaths.mpqBuilderExe}"`
        +` "${destination}"`
        +` "${wfs.removeDot(ipaths.datasetDBC(dataset.id))}"`
        +` "${wfs.removeDot(ipaths.datasetLuaxml(dataset.id))}"`
        +`  ${folders.map(x=>`"${x}"`).join(' ')}`, 'inherit');
        term.success(`Finished building MPQ archive for dataset ${dataset.id}`);
    }

    export async function buildDevMPQ(
          dataset: Datasets.Dataset
        , useTimer: boolean
        , clientOnly: boolean
        , args?: string[]) {

        let clientWasStarted = dataset.client.isRunning();

        let realms = clientOnly ? [] : await dataset.shutdownRealms();
        if(clientWasStarted) {
            dataset.client.kill();
        }
        await buildMpqFolder(dataset,dataset.config.dev_patch,useTimer, true,args);

        if(clientWasStarted || NodeConfig.autostart_client) {
            dataset.client.start();
        }

        if(clientOnly) {
            return;
        }

        if(realms.length>0)  {
            realms.forEach(x=>x.startWorldserver(x.lastBuildType));
        }
        else {
            NodeConfig.autostart_realms
                .map(x=>Realm.getRealm(x))
                .filter(x=>x.set === dataset)
                .forEach(x=>x.startWorldserver(NodeConfig.default_build_type))
        }
    }
}