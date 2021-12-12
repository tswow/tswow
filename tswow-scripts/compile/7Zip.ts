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
import { wsys } from '../util/System';
import { bpaths } from './CompilePaths';

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
        while(!bpaths.sevenZip.exists()) {
            await wsys.userInput(`7zip is not installed:\n\t`
            + `1. Download https://www.7-zip.org/a/7za920.zip\n\t`
            + `2.Extract it to ${bpaths.sevenZip.get()} `
            + `()`
            + `(${bpaths.sevenZip.sevenZa_exe} should exist)\n\t`
            + `3.Press enter in this prompt`);
        }
        bpaths.sevenZip.copy(ipaths.bin.sZip);
    }
}