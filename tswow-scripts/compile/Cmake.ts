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
import { build_path, CMAKE_DOWNLOAD_URL, install_path } from './BuildConfig';
import { wfs, mpath } from '../util/FileSystem';
import { download, unzip } from './CompileUtils';
import { term } from '../util/Terminal';
import { ipaths } from '../util/Paths';

export async function findCmake(): Promise<string> {
    const cmake_install = install_path('bin', 'cmake');
    const cmake_build = build_path('cmake');
    const cmake_zip = build_path('cmake.zip');

    if(!wfs.exists(cmake_zip)) {
        await download(CMAKE_DOWNLOAD_URL, cmake_zip);
    }

    if(!wfs.exists(cmake_build)) {
        await unzip(cmake_zip, cmake_build);
    }

    let subs = wfs.readDir(cmake_build,false);
    if(subs.length!==1) {
        throw new Error(`Corrupt cmake installation, please remove it manually`);
    }

    let exe = mpath(subs[0], 'bin','cmake.exe');

    if(!wfs.exists(ipaths.cmakeExe)) {
        wfs.copy(exe,ipaths.cmakeExe);
    }

    return exe;
}
