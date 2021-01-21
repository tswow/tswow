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
import { wsys } from '../util/System';

export async function findCmake(): Promise<string> {
    const cmake_build = build_path('cmake');

    while(!wfs.exists(cmake_build)) {
        await wsys.userInput(`CMake not found. \n\t1. Download the .zip from here: https://github.com/Kitware/CMake/releases/download/v3.18.3/cmake-3.18.3-win64-x64.zip\n\t2. Extract is to the "${cmake_build}" directory (${cmake_build}/cmake-3.18.3-win64-x64 should exist)\n\t3. Press enter in this command prompt`);
    }

    const subs = wfs.readDir(cmake_build, false);
    while(subs.length!==1) {
        await wsys.userInput(`CMake is corrupt, please reinstall it: \n\t1. Download the .zip from here: https://github.com/Kitware/CMake/releases/download/v3.18.3/cmake-3.18.3-win64-x64.zip\n\t2. Extract is to the "${cmake_build}" directory (${mpath(cmake_build,"cmake-3.18.3-win64-x64")} should exist)\n\t3. Press enter in this prompt`);
    }

    const exe = mpath(subs[0], 'bin', 'cmake.exe');
    const share = mpath(subs[0], 'share');

    if (!wfs.exists(ipaths.cmakeExe)) {
        wfs.copy(exe, ipaths.cmakeExe);
    }

    if (!wfs.exists(ipaths.cmakeShare)) {
        wfs.copy(share, ipaths.cmakeShare);
    }

    return exe;
}
