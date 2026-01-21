import * as Downloader from 'nodejs-file-downloader';
import { wfs, wfsa } from '../util/FileSystem';
import { FilePath, resfp } from '../util/FileTree';
import { term } from '../util/Terminal';
import { FileDownload } from './BuildConfig';

async function checkHash(file: FilePath, hash: string) {
    if (!hash.length) {
        if (wfs.exists(file)) {
            term.warn('build', `No hash present for ${file}, this is dangerous, please add ${await wfsa.hash(file, 'sha256')} to source`)
        } else {
            term.warn('build', `No hash present for ${file}, this is dangerous`)
        }
        return { sha: '', result: true }
    }
    return await wfsa.hash(file, 'sha256') === hash
}

export async function DownloadFile(download: FileDownload, file: FilePath) {
    if (wfs.exists(file)) {
        if (!(await checkHash(file, download.hash))) {
            term.log('build', `Hash verification failed for old ${file}, re-downloading...`)
            wfs.remove(file)
        } else {
            return
        }
    }

    try {
        term.log('build',`Downloading ${download.url} (this can take a long time)`)
        await new Downloader.default(
            {
                  url: download.url
                , fileName: wfs.basename(resfp(file))
                , directory: wfs.dirname(resfp(file))
                , cloneFiles: false
                , maxAttempts: 3
            }
        ).download();

        if (!(checkHash(file, download.hash))) {
            wfs.remove(file)
            throw new Error(`Hash verification failed for download ${download.url}`)
        }

        term.success('build',`Finished downloading ${download.url}`)
    } catch(error) {
        throw new Error(`Failed to download ${download.url}: ${error.message}`)
    }
}