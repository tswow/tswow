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
import { term } from '../util/Terminal';
import { wfs, mpath } from '../util/FileSystem';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { bpaths, ipaths, spaths } from '../util/Paths';

export namespace TrinityCore {
    export async function install(cmake: string, openssl: string, mysql: string, type: 'Release' | 'Debug', args1: string[]) {
        term.log('Compiling TrinityCore');

        wfs.mkDirs(bpaths.trinitycore);

        // We no longer make non-dynamic builds.
        const compileType = 'dynamic';
        const scripts = args1.includes('minimal') ?
            `minimal-${compileType}` :
                args1.includes('noscripts') ? 'none' : compileType;

        const tools = args1.includes('notools') ? '0' : '1';

        let setupCommand: string;
        let buildCommand: string;
        if (isWindows()) {
            setupCommand = `${cmake} -DTOOLS=${tools} -DSCRIPTS=${scripts} -DMYSQL_INCLUDE_DIR="${mysql}/include"  -DMYSQL_LIBRARY="${
                mysql}/lib/libmysql.lib" -DOPENSSL_INCLUDE_DIR="${
                openssl}/include" -DOPENSSL_ROOT_DIR="${
            openssl}" -S "${spaths.trinityCore}" -B "${bpaths.trinitycore}"`;
            buildCommand = `${cmake} --build ${bpaths.trinitycore} --config ${type}`;
            wsys.exec(setupCommand, 'inherit');
            wsys.exec(buildCommand, 'inherit');
        } else {
            wfs.mkDirs(bpaths.trinitycore);
            const relativeSourcePath = wfs.relative(bpaths.trinitycore, spaths.trinityCore);
            const relativeInstallPath = wfs.relative(bpaths.trinitycore, mpath(bpaths.trinitycore, 'install/trinitycore'));
            // TODO: Set up optimization flags for o0 as debug and o3 as release
            setupCommand = `cmake ${relativeSourcePath} -DCMAKE_INSTALL_PREFIX=${relativeInstallPath} -DCMAKE_C_COMPILER=/usr/bin/clang -DCMAKE_CXX_COMPILER=/usr/bin/clang++ -DWITH_WARNINGS=1 -DTOOLS=${tools} -DSCRIPTS=static`;
            buildCommand = 'make -j 4';
            wsys.inDirectory(bpaths.trinitycore, () => {
                wsys.exec(setupCommand, 'inherit');
                wsys.exec(buildCommand, 'inherit');
                wsys.exec('make install', 'inherit');
            });
        }

        // Copy TrinityCore Binaries
        if (!wfs.exists(bpaths.trinitycoreBin(type))) {
            return;
        }

        // copy static libraries
        bpaths.tcStaticLibraries(type)
            .forEach(x => wfs.copy(x,mpath(ipaths.binLibraries(type),wfs.basename(x))));

        // copy executables
        wfs.copy(bpaths.trinitycoreBin(type), ipaths.tc(type), true);

        // Copy mysql/ssl/cmake libraries
        if (isWindows()) {
            bpaths.mysqlLibs(mysql)
                .forEach(x=>wfs.copy(x,mpath(ipaths.tc(type),wfs.basename(x))))
            wfs.copy(bpaths.libcrypto(openssl), 
                mpath(ipaths.tc(type),wfs.basename(bpaths.libcrypto(openssl))))
        }

        // Move ts-module header files
        wfs.copy(spaths.liveScriptHeaders, ipaths.binInclude);

        // Install TDB
        while(!wfs.exists(bpaths.tdb)) {
            await wsys.userInput(`TDB not found. `
            + `\n\t1. Download a TDB from here: `
            + `https://github.com/TrinityCore/TrinityCore/releases\n\t`
            + `2. Place the .7z file at "${bpaths.tdb}"\n\t`
            + `3. Press enter in this prompt`);
        }

        wfs.copy(bpaths.tdb,ipaths.tdb);
    }
}