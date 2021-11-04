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
import { GeneratedNode } from '../util/FileTree';
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { bpaths } from './CompilePaths';

export namespace CMake {
    function query(reason: string) {
        return wsys.userInput(
            `${reason}\n\t`
            +`1. Download the .zip from here: `
            +`https://github.com/Kitware/CMake/releases/download/v3.18.3/cmake-3.18.3-win64-x64.zip\n\t`
            +`2. Extract is to the "${bpaths.cmake.get()}" directory `
            +`(${bpaths.cmake.get()}/cmake-3.18.3-win64-x64 should exist)\n\t`
            +`3. Press enter in this command prompt\n`);
    }

    export async function find(): Promise<GeneratedNode> {
        while(!bpaths.cmake.exists()) {
            await query('CMake not found');
        }

        while(bpaths.cmake.readDir().length !== 1) {
            await query('CMake is corrupt, please reinstall it');
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
