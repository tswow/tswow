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
import { CLEAR_ARCHIVES, OPENSSL_DOWNLOAD_URL } from './BuildConfig';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

export namespace OpenSSL {
    export async function find() {
        // await DownloadFile(
        //      OPENSSL_DOWNLOAD_URL
        //    , bpaths.opensslArchive
        // )

        if(!bpaths.openssl.exists()) {
            await ExtractZip(
                  bpaths.opensslArchive.get()
                , {dir:bpaths.openssl.abs().get()}
            )
        }

        if(CLEAR_ARCHIVES) {
            bpaths.opensslArchive.remove();
        }

        return bpaths.openssl;
    }
}