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
import { SevenZip } from '../util/7zip';
import { ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { SZIP_DOWNLOAD_URL, SZ_SFX_DOWNLOAD_URL } from './BuildConfig';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

export namespace SevenZipInstall {
    /**
     * Use 7zip in the build script
     */
    export async function makeArchive(path: string, outPath: string) {
        install();
        SevenZip.makeArchive(ipaths.bin.sZip.sza_exe.get(),path, [outPath]);
    }

    /**
     * We need 7zip to unzip TrinityCore TDB database dumps
     */
    export async function install() {
        if(!isWindows()) {
            return;
        }

        await DownloadFile(
              SZIP_DOWNLOAD_URL
            , bpaths.sevenZipArchive
        )

        await DownloadFile(
              SZ_SFX_DOWNLOAD_URL
            , bpaths.sevenZip.sz_sfx
        )

        if(!bpaths.sevenZip.sevenZa_exe.exists()) {
            await ExtractZip(
                  bpaths.sevenZipArchive.get()
                , {dir:bpaths.sevenZip.abs().get()}
            )
        }

        bpaths.sevenZip.copy(ipaths.bin.sZip);
    }
}