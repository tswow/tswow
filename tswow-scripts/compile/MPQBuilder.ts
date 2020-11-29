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

export async function createMpqBuilder(cmake: string) {
    if (isWindows()) {
        wsys.exec(`${cmake} DCMAKE_INSTALL_PREFIX="${build_path('StormLibInstall')}" -S "StormLib" -B "${build_path('StormLibBuild')}"`, 'inherit');
        wsys.exec(`${cmake} --build "${build_path('StormLibBuild')}" --config Release`, 'inherit');
        wfs.copy('./StormLib/src/StormLib.h', build_path('StormLibBuild/Release/StormLib.h'));
        wfs.copy('./StormLib/src/StormPort.h', build_path('StormLibBuild/Release/StormPort.h'));
        wsys.exec(`${cmake} -DSTORM_INCLUDE_DIR="${build_path('StormLibBuild/Release')}" -D_storm_release_lib="${build_path('StormLibBuild/Release/storm.lib')}" -S "mpqbuilder" -B "${build_path('mpqbuilder')}"`, 'inherit');
        wsys.exec(`${cmake} --build "${build_path('mpqbuilder')}" --config Release`, 'inherit');
        wfs.copy(build_path('mpqbuilder/Release/mpqbuilder.exe'), install_path('bin/mpqbuilder/mpqbuilder.exe'));
        wfs.copy(build_path('mpqbuilder/Release/luaxmlreader.exe'), install_path('bin/mpqbuilder/luaxmlreader.exe'));
    } else {
        const stormBuildDir = build_path('StormLibBuild');
        const stormInstallDir = build_path('StormLibInstall');
        wfs.mkDirs(stormBuildDir);
        wfs.mkDirs(stormInstallDir);
        const relativeInstall = wfs.relative(stormBuildDir, build_path('StormLibInstall'));
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
