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
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { build_path, install_path } from './BuildConfig';
import { wfs, mpath } from '../util/FileSystem';
import { bpaths, spaths, ipaths } from '../util/Paths';

export namespace MPQBuilder {
    export async function create(cmake: string) {
        if (isWindows()) {
            wsys.exec(`${cmake} DCMAKE_INSTALL_PREFIX="${bpaths.stormlibInstall}" -S "StormLib" -B "${bpaths.stormlibBuild}"`, 'inherit');
            wsys.exec(`${cmake} --build "${bpaths.stormlibBuild}" --config Release`, 'inherit');
            wfs.copy(spaths.stormLibMainHeader,bpaths.stormLibMainHeader)
            wfs.copy(spaths.stormLibPortHeader,bpaths.stormLibPortHeader)

            wsys.exec(`${cmake} `
            +`-DSTORM_INCLUDE_DIR="${bpaths.stormLibBuildRelease}" `
            +`-D_storm_release_lib="${bpaths.stormLibLibraryFile}" `
            +`-S "mpqbuilder" `
            +`-B "${bpaths.mpqBuilder}"`, 'inherit');
            wsys.exec(`${cmake} `
            +`--build "${bpaths.mpqBuilder}" `
            +`--config Release`, 'inherit');

            wfs.copy(bpaths.mpqBuilderBinary,ipaths.mpqBuilderExe)
            wfs.copy(bpaths.luaxmlBinary,ipaths.luaxmlExe)
        } else {
            const stormBuildDir = build_path('StormLibBuild');
            const stormInstallDir = build_path('StormLibInstall');
            wfs.mkDirs(stormBuildDir);
            wfs.mkDirs(stormInstallDir);
            const relativeInstall = wfs.relative(stormBuildDir, bpaths.stormlibInstall);
            const relativeSource = wfs.relative(stormBuildDir, './StormLib');
            await wsys.inDirectory(stormBuildDir, () => {
                wsys.exec(`${cmake} "${relativeSource}" -DCMAKE_INSTALL_PREFIX="${relativeInstall}"`, 'inherit');
                wsys.exec(`make`, 'inherit');
                wsys.exec(`make install`, 'inherit');
            });
            const mpqBuildDir = build_path('mpqbuilder');
            wfs.mkDirs(mpqBuildDir);
            // This is just easier than cmake so I won't bother
            wsys.exec(`g++ -o ${mpath(mpqBuildDir, 'mpqbuilder')} mpqbuilder/mpqbuilder.cpp -lstorm -I${mpath(stormInstallDir, 'include')} -L${mpath(stormInstallDir, 'lib')} -lz -lbz2`, 'inherit');
            wfs.copy(build_path('mpqbuilder/mpqbuilder'), install_path('bin/mpqbuilder/mpqbuilder'));
            wfs.copy(build_path('mpqbuilder/luaxmlreader'), install_path('bin/mpqbuilder/luaxmlreader'));
        }
    }
}
