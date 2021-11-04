import { DatasetConfig } from "../util/DatasetConfig";
import { wfs } from "../util/FileSystem";
import { NodeConfigClass } from "../util/NodeConfig";
import { collectSubmodules, DatasetDirectory, InstallPath, tdbFilename } from "../util/Paths";

export const ipaths = InstallPath('./',tdbFilename())
export const NodeConfig = new NodeConfigClass(ipaths.node_yaml.get())

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
    READ_ONLY = this.INLINE_ONLY || process.argv.includes('--inline-only')
    NO_CLIENT = this.READ_ONLY || process.argv.includes('--skip-client')
    NO_SERVER = this.READ_ONLY || process.argv.includes('--skip-server')
}();