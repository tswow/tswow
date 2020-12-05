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
import { TRINITYCORE_BUILD_PATH, TRINITYCORE_SOURCE_PATH, install_path, build_path, build_tdb } from './BuildConfig';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { args } from '../util/Args';
import { bpaths, ipaths } from '../util/Paths';
import { download } from './CompileUtils';

export async function installTrinityCore(cmake: string, openssl: string, mysql: string, type: 'Release' | 'Debug', args1: string[]) {
    term.log('Compiling TrinityCore');

    wfs.mkDirs(TRINITYCORE_BUILD_PATH);

    const compileType = args1.includes('dynamic') ? 'dynamic' : 'static';
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
           openssl}" -S "${TRINITYCORE_SOURCE_PATH}" -B "${TRINITYCORE_BUILD_PATH}"`;
        buildCommand = `${cmake} --build ${TRINITYCORE_BUILD_PATH} --config ${type}`;
        wsys.exec(setupCommand, 'inherit');
        wsys.exec(buildCommand, 'inherit');
    } else {
        wfs.mkDirs(TRINITYCORE_BUILD_PATH);
        const relativeSourcePath = wfs.relative(TRINITYCORE_BUILD_PATH, './' + TRINITYCORE_SOURCE_PATH);
        const relativeInstallPath = wfs.relative(TRINITYCORE_BUILD_PATH, mpath(TRINITYCORE_BUILD_PATH, 'install/trinitycore'));
        // TODO: Set up optimization flags for o0 as debug and o3 as release
        setupCommand = `cmake ${relativeSourcePath} -DCMAKE_INSTALL_PREFIX=${relativeInstallPath} -DCMAKE_C_COMPILER=/usr/bin/clang -DCMAKE_CXX_COMPILER=/usr/bin/clang++ -DWITH_WARNINGS=1 -DTOOLS=${tools} -DSCRIPTS=static`;
        buildCommand = 'make -j 4';
        wsys.inDirectory(TRINITYCORE_BUILD_PATH, () => {
            wsys.exec(setupCommand, 'inherit');
            wsys.exec(buildCommand, 'inherit');
            wsys.exec('make install', 'inherit');
        });
    }

    // TODO: linux
    const bindir = install_path('bin');
    const ac_out = mpath(bindir, 'trinitycore');

    // Copy TrinityCore Binaries
    function moveAc(inName: string, outName: string) {
        const binIn = isWindows() ? mpath(build_path('trinitycore'), 'Bin', inName)
            : mpath(TRINITYCORE_BUILD_PATH, 'install', 'trinitycore', 'bin');

        const confIn = isWindows() ? binIn
            : mpath(TRINITYCORE_BUILD_PATH, 'install', 'trinitycore', 'etc');

        const binOut = mpath(bindir, 'trinitycore', outName);

        if(!wfs.exists(binIn)) {
            return;
        }

        // All library files we will need
        [`dep/zlib/${inName}/zlib.lib`,
            `src/server/shared/${inName}/shared.lib`,
            `dep/SFMT/${inName}/sfmt.lib`,
            `dep/g3dlite/${inName}/g3dlib.lib`,
            `dep/fmt/${inName}/fmt.lib`,
            `dep/recastnavigation/Detour/${inName}/detour.lib`,
            `src/server/database/${inName}/database.lib`,
            `src/server/game/${inName}/game.lib`,
            `src/common/${inName}/common.lib`,
            `dep/argon2/${inName}/argon2.lib`
        ].forEach(x => wfs.copy(mpath(build_path('trinitycore', x)),
            install_path('bin', 'libraries', wfs.basename(x))));

        // copy executables
        wfs.copy(binIn, binOut, args.hasAnyFlag('flushData'));
        // copy config files
        wfs.readDir(confIn, true, 'files')
            .filter(x => x.endsWith('.conf.dist'))
            .forEach(x => {
                const inPath = mpath(confIn, x);
                const outDist = mpath(ipaths.coreData, x);
                const outConf = mpath(ipaths.config, x.replace('.dist', ''));
                wfs.copy(inPath, outDist);
                if (!wfs.exists(outConf)) { wfs.copy(inPath, outConf); }
            });
    }
    // Don't create debug directory on linux while we don't support it
    if (isWindows()) {
        moveAc('Debug', 'debug');
    }
    moveAc('Release', 'release');

    // Copy mysql/ssl/cmake libraries
    if (isWindows()) {
        for (const lib of ['libmysql', 'libmysqld']) {
            wfs.copy(mpath(mysql, `/lib/${lib}.dll`), `${ac_out}/${lib}.dll`);
        }

        const libcrypto = 'libcrypto-1_1-x64.dll';
        wfs.copy(mpath(openssl, libcrypto), mpath(ac_out, libcrypto));

    }

    // Move ts-module header files
    const headerSrc = mpath('TrinityCore', 'src', 'server', 'game', 'Tswow',
        'scripting', 'Public');
    const headerDest = mpath(bindir, 'include');
    wfs.copy(headerSrc, headerDest);

    // Install TDB
    if(!build_tdb) {
        throw new Error(`No tdb file configured in build.yaml`);
    }
    if(!wfs.exists(ipaths.tdb) || !wfs.exists(bpaths.tdb)) {
        if(!wfs.exists(bpaths.tdb)) {
            await download(build_tdb, bpaths.tdb);
        }
        wfs.copy(bpaths.tdb,ipaths.tdb);
    }
}
