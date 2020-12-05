/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import * as request from 'request';
import progress = require('request-progress');
import AdmZip = require('adm-zip');
import { term } from '../util/Terminal';
import * as fs from 'fs';


/**
 * Unzips a zip-file to a destination folder
 * @param zipfile
 * @param dstDir
 */
export function unzip(zipfile: string, dstDir: string) {
    AdmZip(zipfile).extractAllTo(dstDir, true);
}

/**
 * Downloads a file from the internet
 * @param srcUrl Remote url of the downloaded file
 * @param dstFile Local path of the downloaded file
 * @param downloadString String to use when displaying the download progress
 */
export function download(srcUrl: string, dstFile: string, downloadString= srcUrl): Promise<void> {
    return new Promise<void>((res, rej) => {
        progress(request.default({url: srcUrl, followAllRedirects: true}))
            .on('progress', (state: any) => {
                term.log(`Downloading ${downloadString}: ${(state.percent * 100).toFixed(2)}%`);
            })
            .on('error', (err: any) => {
                term.error(err);
                rej(err);
            }).on('end', () => {
                term.log(`Finished downloading ${downloadString}`);
                res();
            }).pipe(fs.createWriteStream(dstFile));
    });
}
