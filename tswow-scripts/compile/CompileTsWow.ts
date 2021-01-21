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
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { build_path, install_path } from './BuildConfig';
import { commands } from '../runtime/Commands';
import { isWindows } from '../util/Platform';
import { createConfig } from './Config';
import { createMpqBuilder } from './MPQBuilder';
import { installTrinityCore } from './TrinityCore';
import { findCmake } from './Cmake';
import { findOpenSSL } from './OpenSSL';
import { findMysql } from './MySQL';
import { buildTranspiler } from './Transpiler';
import { buildScripts } from './Scripts';
import { installBoost } from './Boost';
import { installSZip, make7zip } from './7Zip';
import { cleanBuild, cleanInstall } from './Clean';
import { BuildPaths, InstallPaths } from '../util/Paths';
import { installBLPConverter } from './BLPConverter';
import { compileAll, destroyAllWatchers } from '../util/TSWatcher';

InstallPaths.setInstallBase(install_path());
BuildPaths.setBuildBase(build_path());

let buildingScripts = false;

async function compile(type: string, compileArgs: string[]) {
    // Load necessary libraries
    const types = type.split(' ');
    function isType(check: string) {
        return types.includes('full') || types.includes('release') || types.includes(check);
    }

    if (type == 'clean-install') {
        await cleanInstall();
    }

    if (types.includes('clean-build')) {
        return await cleanBuild();
    }

    const cmake = isWindows() ? await findCmake() : 'cmake';
    term.log(`Found cmake at ${cmake}`);
    const openssl = isWindows() ? await findOpenSSL() : 'openssl';
    term.log(`Found OpenSSL at ${openssl}`);
    const mysql = isWindows() ? await findMysql() : 'mysql';
    term.log(`Found MySQL at ${mysql}`);
    const boost = isWindows() ? await installBoost() : 'boost';
    if (isWindows()) { await installSZip(); }

    if (!isWindows()) {
        // Ubunu only
        wsys.exec('sudo apt-get update && sudo apt-get install -y git cmake make gcc g++ clang libmysqlclient-dev libssl-dev libbz2-dev libreadline-dev libncurses-dev mysql-server libace-6.* libace-dev', 'inherit');
    }

    if (types.includes('full') || types.includes('release')) {
        await installTrinityCore(cmake, openssl, mysql, 'Release', ['dynamic']);
    } else {
        if (isType('trinitycore-release')) { await installTrinityCore(cmake, openssl, mysql, 'Release', compileArgs); }
        if (isType('trinitycore-debug') && isWindows()) { await installTrinityCore(cmake, openssl, mysql, 'Debug', compileArgs); }
    }

    if (isType('mpqbuilder')) { await createMpqBuilder(cmake); }
    if (isType('blpconverter')) { await installBLPConverter(cmake); }

    if (types.includes('release')) {
        await destroyAllWatchers();
        buildingScripts = false;
    }

    if (!buildingScripts && isType('scripts')) {
        await buildTranspiler(build_path(), install_path());
        await buildScripts(build_path(), install_path());
        buildingScripts = true;
    }

    await createConfig();

    if (types.includes('release')) {
        term.log(`Creating ${build_path('release.7z')}`);
        make7zip(install_path(), build_path('release.7z'));
    }

    term.log('Installation successful!');
}

async function main() {
    const build = commands.addCommand('build');
    await compile('scripts', []);

    const installedPrograms =
        ['trinitycore-release', 'trinitycore-debug', 'mpqbuilder', 'blpconverter',
         'config', 'database', 'full', 'scripts', 'clean-install', 'clean-build', 'release'];

    for (const val of installedPrograms) {
        build.addCommand(val, '', `Builds ${val}`, async(args) => await compile(val, args));
    }

    build.addCommand('base', '', 'Builds only base dependencies', async(args) => await compile('', args));

    commands.addCommand('errorcheck', '', '', async () => {
        try {
            await compileAll(-1);
            term.success('No errors!');
        } catch (error) {
            term.error(error.message);
        }
    });

    commands.enterLoop();
}

main();
