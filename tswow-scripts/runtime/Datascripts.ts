import { Modules } from "./Modules";
import { compileAll } from "../util/TSWatcher";
import { term } from "../util/Terminal";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { Datasets } from "./Dataset";
import { NodeConfig } from "./NodeConfig";
import { wsys } from "../util/System";
import { commands } from "./Commands";

export namespace Datascripts {
    /**
     * Builds dbc and sql data for all modules.
     */
    export async function build(dataset: Datasets.Dataset, readonly: boolean, useTimer: boolean) {
        term.log(`Building DataScripts for dataset ${dataset.id}`);
        await Modules.refreshModules();
        const ct = Date.now();
        await compileAll(8000);

        if(useTimer) {
            term.log(`Compiled scripts in ${((Date.now()-ct)/1000).toFixed(2)} seconds.`)
        }

        wfs.mkDirs(ipaths.datasetDBC(dataset.id), true);

        dataset.installServerData();

        const settings = {
            auth : NodeConfig.database_settings('auth'),
            world : NodeConfig.database_settings('world',dataset.id),
            world_source : NodeConfig.database_settings('world_source',dataset.id),
            use_pooling : NodeConfig.use_pooling,
            dbc_source : ipaths.datasetDBCSource(dataset.id),
            dbc_out : ipaths.datasetDBC(dataset.id),
            luaxml_source : ipaths.datasetLuaxmlSource(dataset.id),
            luaxml_out : ipaths.datasetLuaXML(dataset.id),
            modules: dataset.config.modules,
            id_path: ipaths.datasetIds(dataset.id),
            readonly: readonly,
            use_timer: useTimer
        }
        const program = `node -r source-map-support/register ${ipaths.wotlkdataIndex} `
            + `${JSON.stringify(settings).split('\"').join('\'')}`
        try {
            wsys.exec(program, 'inherit');
        } catch (error) {
            throw new Error(`Failed to rebuild patches: ${error.message}`);
        }

        term.success(`Finished building DataScripts for dataset ${dataset.id}`);
    }

    export function initialize() {
        commands.addCommand('check', '', '', async(args) => {
            let ds = Datasets.getDatasetsOrDefault(args);
            await Datascripts.build(ds[0],true,args.includes('--use-timer'));
        });
    }
}