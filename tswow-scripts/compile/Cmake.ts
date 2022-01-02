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
import { WNode } from '../util/FileTree';
import { ipaths } from '../util/Paths';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

export namespace CMake {
    export async function find(): Promise<WNode> {
        await DownloadFile(
            'https://github.com/Kitware/CMake/releases/download/v3.18.3/cmake-3.18.3-win64-x64.zip'
            , bpaths.cmakeArchive
        )

        if(!bpaths.cmake.exists()) {
            await ExtractZip(
                bpaths.cmakeArchive.get()
              , {dir:bpaths.cmake.abs().get()}
          )
        }

        let sub = bpaths.cmake.readDir('ABSOLUTE')[0]
        const exe = sub.join('bin','cmake.exe')
        const share = sub.join('share');

        // only copy if necessary to not
        // get stuck if shell is using it
        exe.copyOnNoTarget(ipaths.bin.cmake.bin.cmake_exe)
        share.copyOnNoTarget(ipaths.bin.cmake.share);

        return exe;
    }
}
