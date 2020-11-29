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

export async function findCmake(): Promise<string> {
    const cmake_install = install_path('bin', 'cmake');
    const cmake_build = build_path('cmake');
    const cmake_zip = build_path('cmake.zip');
    while (true) {
        if (wfs.exists(cmake_install)) {
            return mpath(cmake_install, 'bin', 'cmake.exe');
        } else if (wfs.exists(cmake_build)) {
            const subs = wfs.readDir(cmake_build);
            if (subs.length !== 1) {
                term.log('Corrupt cmake directory, reinstalling...');
                wfs.remove(cmake_build);
            } else {
                wfs.copy(subs[0], cmake_install);
            }
        } else if (wfs.exists(cmake_zip)) {
            unzip(cmake_zip, cmake_build);
        } else {
            await download(CMAKE_DOWNLOAD_URL, cmake_zip);
        }
    }
}
