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
import { term } from '../util/Terminal';
import { build_path, install_directory, install_path } from './BuildConfig';
import { ipaths } from '../util/Paths';
import { stopScriptsBuild } from './Scripts';
import { stopTranspilerBuild } from './Transpiler';

export function cleanBuild() {
    term.log('Cleaning build directory...');
    stopScriptsBuild();
    stopTranspilerBuild();
    wfs.remove(build_path());
    term.success('Cleaned build directory, please restart this build script');
    process.exit(0);
}

export function cleanInstall() {
    term.log('Cleaning install directory...');
    stopScriptsBuild();
    stopTranspilerBuild();

    if (wfs.readDir(ipaths.modules, true, 'both').length > 0) {
        let ctr = 0;
        const garbagePath = () => `./install_garbage/${ctr}`;
        while (wfs.exists(garbagePath())) {
            ++ctr;
        }
        wfs.copy(ipaths.modules, garbagePath());
        term.log(`Created backups of your modules in ${wfs.absPath(garbagePath())}`);
    }
    wfs.remove(install_directory);

    if (wfs.exists(install_directory)) {
        throw new Error(`Failed to remove install directory`);
    }
    term.success('Cleaned install directory');
}
