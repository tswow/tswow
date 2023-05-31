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
import { NODE_URL } from './BuildConfig';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

export namespace NodeJS {
    export async function install() {
        if(!isWindows())
        {
            return;
        }

        await DownloadFile(
             NODE_URL
           , bpaths.nodeArchive
        )

        if(!bpaths.node.exists()) {
            await ExtractZip(
                  bpaths.nodeArchive.get()
                , {dir:bpaths.abs().get()}
            )
        }

        bpaths.node.copy(ipaths.bin.node);
    }
}
