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
import { bpaths, ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { build_path } from './BuildConfig';

export namespace MPQBuilder {
    export async function create(cmake: string) {
        if (isWindows()) {
            wsys.exec(`${cmake} `
                + ` -S "mpqbuilder" `
                + ` -B "${bpaths.mpqBuilder}"`, 'inherit');
            wsys.exec(`${cmake}`
                + ` --build "${bpaths.mpqBuilder}"`
                + ` --config Release`, 'inherit');
        } else {
            const mpqBuildDir = build_path('mpqbuilder');
            wfs.mkDirs(mpqBuildDir);
            const relativeMpqSource = wfs.relative(mpqBuildDir,'./mpqbuilder');
            await wsys.inDirectory(mpqBuildDir, () => {
                wsys.exec(
                    `${cmake} "${relativeMpqSource}"`
                    ,  'inherit');
                wsys.exec(`make`,'inherit');
            });
        }
        wfs.copy(bpaths.mpqBuilderBinary,ipaths.mpqBuilderExe)
        wfs.copy(bpaths.luaxmlBinary,ipaths.luaxmlExe)
    }
}
