import * as Downloader from 'nodejs-file-downloader';
import { wfs } from '../util/FileSystem';
import { FilePath, resfp } from '../util/FileTree';
import { term } from '../util/Terminal';

export async function DownloadFile(url: string, file: FilePath) {
    if(wfs.exists(file)) {
        return;
    }

    try {
        await new Downloader.default(
            {
                url
                , fileName: resfp(file)
                , onProgress: (perc)=>{
                    term.log('build',`Downloading ${url} ${perc}%`)
                }
                , cloneFiles: false
                , maxAttempts: 3
            }
        ).download();
    } catch(error) {
        throw new Error(`Failed to download ${url}: ${error.message}`)
    }
}