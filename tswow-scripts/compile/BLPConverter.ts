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
import { wfs } from '../util/FileSystem';
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { bpaths } from './CompilePaths';

export namespace BLPConverter {
    export async function install(cmake: string) {
        while(!bpaths.blpconverter.exists()) {
            term.error('build',`blpconverter.exe not found`);
            term.error('build',`Build from source (BLPConverter/BLPConverter.sln)`);
            term.error('build',`OR download: https://github.com/tswow/BLPConverter/releases/download/1.0/BLPConverter.exe`);
            term.error('build',`Then place it here: ${wfs.absPath(bpaths.blpconverter.get())}`);
            await wsys.userInput(`Press any key to try again:`);
        }
        bpaths.blpconverter.copy(ipaths.bin.BLPConverter.blpconverter)
    }
}
