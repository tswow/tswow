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
import { ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

export namespace IMInstall {
    export async function install() {
        if(!isWindows()) {
            return;
        }

        await DownloadFile(
            'https://download.imagemagick.org/ImageMagick/download/binaries/ImageMagick-7.1.0-portable-Q16-x64.zip'
           , bpaths.imArchive
        )

        if(!bpaths.im.exists()) {
            await ExtractZip(
                  bpaths.imArchive.get()
                , {dir:bpaths.im.abs().get()}
            )
        }

        bpaths.im.convert_exe.copy(ipaths.bin.im.convert)
        bpaths.im.magic_exe.copy(ipaths.bin.im.magick)
        bpaths.im.identify_exe.copy(ipaths.bin.im.identify)
    }
}