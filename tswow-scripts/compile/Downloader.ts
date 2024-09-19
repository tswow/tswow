import * as Downloader from 'nodejs-file-downloader';
import { wfs } from '../util/FileSystem';
import { FilePath, resfp } from '../util/FileTree';
import { term } from '../util/Terminal';

export async function DownloadFile(url: string, file: FilePath) {
    if(wfs.exists(file)) {
        return;
    }

    try {
        term.log('build',`Downloading ${url} (this can take a long time)`)
        await new Downloader.default(
            {
                url
                , fileName: wfs.basename(resfp(file))
                , directory: wfs.dirname(resfp(file))
                , cloneFiles: false
                , maxAttempts: 10
            }
        ).download();
        term.success('build',`Finished downloading ${url}`)
    } catch(error) {
        console.log(wfs.basename(resfp(file)), wfs.dirname(resfp(file)));
        throw new Error(`Failed to download ${url}: ${error.message} : ${error.code} : ${error.responseBody}`)
    }
}