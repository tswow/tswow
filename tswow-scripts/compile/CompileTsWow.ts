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
import { BuildPaths, InstallPaths, ipaths } from '../util/Paths';
import { build_path, install_path } from './BuildConfig';
InstallPaths.setInstallBase(install_path());
BuildPaths.setBuildBase(build_path());
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { commands } from '../runtime/Commands';
import { isWindows } from '../util/Platform';
import { Config } from './Config';
import { MPQBuilder } from './MPQBuilder';
import { TrinityCore } from './TrinityCore';
import { CMake } from './Cmake';
import { OpenSSL } from './OpenSSL';
import { MySQL } from './MySQL';
import { Transpiler } from './Transpiler';
import { Scripts } from './Scripts';
import { Boost } from './Boost';
import { Clean } from './Clean';
import { BLPConverter } from './BLPConverter';
import { compileAll, destroyAllWatchers } from '../util/TSWatcher';
import { wfs } from '../util/FileSystem';
import { SevenZipInstall } from './7Zip';

let buildingScripts = false;

async function compile(type: string, compileArgs: string[]) {
    // Load necessary libraries
    const types = type.split(' ');
    function isType(check: string) {
        return types.includes('full') || types.includes('release') || types.includes(check);
    }

    if (type == 'clean-install') {
        await Clean.cleanInstall();
    }

    if (types.includes('clean-build')) {
        return await Clean.cleanBuild();
    }

    const cmake = isWindows() ? await CMake.find() : 'cmake';
    term.log(`Found cmake at ${cmake}`);
    const openssl = isWindows() ? await OpenSSL.find() : 'openssl';
    term.log(`Found OpenSSL at ${openssl}`);
    const mysql = isWindows() ? await MySQL.find() : 'mysql';
    term.log(`Found MySQL at ${mysql}`);
    const boost = isWindows() ? await Boost.install() : 'boost';
    if (isWindows()) { await SevenZipInstall.install(); }

    if (!isWindows()) {
        // Ubunu only
        wsys.exec('sudo apt-get update && sudo apt-get install -y git cmake make gcc g++ clang libmysqlclient-dev libssl-dev libbz2-dev libreadline-dev libncurses-dev mysql-server libace-6.* libace-dev', 'inherit');
    }

    if (types.includes('full') || types.includes('release')) {
        await TrinityCore.install(cmake, openssl, mysql, 'Release', ['dynamic']);
        await TrinityCore.install(cmake, openssl, mysql, 'Debug', ['dynamic']);
    } else {
        if (isType('trinitycore-release')) { await TrinityCore.install(cmake, openssl, mysql, 'Release', compileArgs); }
        if (isType('trinitycore-debug') && isWindows()) { await TrinityCore.install(cmake, openssl, mysql, 'Debug', compileArgs); }
    }

    if (isType('mpqbuilder')) { await MPQBuilder.create(cmake); }
    if (isType('blpconverter')) { await BLPConverter.install(cmake); }

    if (types.includes('release')) {
        await destroyAllWatchers();
        buildingScripts = false;
    }

    if (!buildingScripts && isType('scripts')) {
        if(!wfs.exists(ipaths.tsc)) {
            wsys.execIn(ipaths.base, `npm i typescript`);
        }
        await Transpiler.buildTranspiler(build_path(), install_path());
        await Scripts.build(build_path(), install_path());
        buildingScripts = true;
    }

    await Config.create();

    if (types.includes('release')) {
        term.log(`Creating ${build_path('release.7z')}`);
        SevenZipInstall.makeArchive(install_path(), build_path('release.7z'));
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
