import { wfs } from "../util/FileSystem";
import { DatasetDirectory } from "../util/Paths";

// Copypaste from wotlkdata/Settings.ts
export const dataset = function() {
    let datasetArg = process.argv.find(x=>x.startsWith('--datasetPath='));
    if(datasetArg === undefined) {
        console.log(process.argv)
        throw new Error(`Missing dataset argument`);
    }
    let datasetPath = datasetArg.substring('--datasetPath='.length);
    return DatasetDirectory(
          wfs.dirname(datasetPath)
        , wfs.basename(datasetPath)
    )
}();