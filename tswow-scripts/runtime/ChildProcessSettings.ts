import { ipaths } from "../util/Paths";
import { Datasets } from "./Dataset";
import { NodeConfig } from "./NodeConfig";

export function ChildProcessSettings(dataset: Datasets.Dataset, readonly: boolean, useTimer: boolean) {
    let settings = {
        client_path : dataset.config.client_path,
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
    return Buffer.from(JSON.stringify(settings)).toString('base64')
}