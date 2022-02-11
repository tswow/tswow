import { DatasetConfig } from "../util/DatasetConfig";
import { wfs } from "../util/FileSystem";
import { WDirectory } from "../util/FileTree";
import { NodeConfigClass } from "../util/NodeConfig";
import { collectSubmodules, DatasetDirectory, InstallPath, tdbFilename } from "../util/Paths";

export const ipaths = InstallPath('./',tdbFilename())
export const NodeConfig = new NodeConfigClass(ipaths.node_conf.get())

export const dataset = function() {
    let datasetArg = process.argv.find(x=>x.startsWith('--dataset='));
    if(datasetArg === undefined) {
        throw new Error(`Missing dataset argument`);
    }
    let datasetPath = datasetArg.substring('--dataset='.length);
    return DatasetDirectory(
          wfs.dirname(datasetPath)
        , wfs.basename(datasetPath)
    )
}();

export const datasetName = function() {
    let nameArg = process.argv.find(x=>x.startsWith('--datasetName='))
    if(nameArg === undefined) {
        throw new Error(`Missing datasetName argument`)
    }
    return nameArg.substring('--datasetName='.length);
}();

const config = new DatasetConfig(dataset.config.get());

export const DatascriptModules = collectSubmodules(config.modules)
    .filter(x=>x.datascripts.exists())

export const AllModules = collectSubmodules(config.modules)

export const BuildArgs = new class BuildArgsClass {
    USE_TIMER = process.argv.includes('--use-timer')
    INLINE_ONLY = process.argv.includes('--inline-only')
    READ_ONLY = this.INLINE_ONLY || process.argv.includes('--readonly')
    WRITE_CLIENT = process.argv.includes('--__writes-client')
    WRITE_SERVER = process.argv.includes('--__writes-server')
    CLIENT_PATCH_DIR = new WDirectory(process.argv
        .find(x=>x.startsWith('--clientPatch='))
        .substring('--clientPatch='.length))
    LOG_SQL = process.argv.includes('--log-sql')
}();