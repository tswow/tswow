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
import { wfs, mpath } from '../util/FileSystem';
import { ipaths, bpaths } from '../util/Paths';
import { wsys } from '../util/System';

export namespace CMake {
    function query(reason: string) {
        return wsys.userInput(
            `${reason}\n\t`
            +`1. Download the .zip from here: `
            +`https://github.com/Kitware/CMake/releases/download/v3.18.3/cmake-3.18.3-win64-x64.zip\n\t`
            +`2. Extract is to the "${bpaths.cmake}" directory `
            +`(${bpaths.cmake}/cmake-3.18.3-win64-x64 should exist)\n\t`
            +`3. Press enter in this command prompt\n`);
    }

    export async function find(): Promise<string> {
        while(!wfs.exists(bpaths.cmake)) {
            await query('CMake not found');
        }

        const subs = wfs.readDir(bpaths.cmake, false);
        while(subs.length!==1) {
            await query('CMake is corrupt, please reinstall it');
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
}
