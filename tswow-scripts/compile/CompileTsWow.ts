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
import { commands } from '../util/Commands';
import { ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { term } from '../util/Terminal';
import { setContext } from '../util/TSWoWContext';
import { SevenZipInstall } from './7Zip';
import { ADTCreator } from './ADTCreator';
import { BLPConverter } from './BLPConverter';
import { Boost } from './Boost';
import { isInteractive } from './BuildConfig';
import { CMake } from './Cmake';
import { bpaths } from './CompilePaths';
import { Config } from './Config';
import { IMInstall } from './ImageMagick';
import { MPQBuilder } from './MPQBuilder';
import { MySQL } from './MySQL';
import { OpenSSL } from './OpenSSL';
import { Scripts } from './Scripts';
import { TrinityCore } from './TrinityCore';
setContext('build');

let buildingScripts = false;

async function compile(type: string, compileArgs: string[]) {
    // Load necessary libraries
    const types = type.split(' ');
    function isType(check: string) {
        return types.includes('full') || types.includes('release') || types.includes(check);
    }

    const cmake = isWindows() ? (await CMake.find()).get() : 'cmake';
    term.log('build',`Found cmake at ${cmake}`);
    const openssl = isWindows() ? (await OpenSSL.find()).get() : 'openssl';
    term.log('build',`Found OpenSSL at ${openssl}`);
    const mysql = isWindows() ? await MySQL.find() : 'mysql';
    term.log('build',`Found MySQL at ${mysql}`);
    const boost = isWindows() ? await Boost.install() : 'boost';
    if (isWindows()) { await SevenZipInstall.install(); }
    if (isWindows()) { await IMInstall.install() }

    if (types.includes('full') || types.includes('release')) {
        await TrinityCore.install(cmake, openssl, mysql, 'Release', compileArgs.concat(['dynamic']));
        await TrinityCore.install(cmake, openssl, mysql, 'Debug', compileArgs.concat(['dynamic']));
        await TrinityCore.install(cmake, openssl, mysql, 'RelWithDebInfo', compileArgs.concat(['dynamic']));
    } else {
        if (type == 'trinitycore-release') { await TrinityCore.install(cmake, openssl, mysql, 'Release', compileArgs); }
        if (isType('trinitycore') || isType('trinitycore-relwithdebinfo')) { await TrinityCore.install(cmake, openssl, mysql, 'RelWithDebInfo', compileArgs); }
        if (type == 'trinitycore-debug') { await TrinityCore.install(cmake, openssl, mysql, 'Debug', compileArgs); }
    }

    if (isType('mpqbuilder')) { await MPQBuilder.create(cmake); }
    if (isType('blpconverter')) { await BLPConverter.install(cmake); }
    if (isType('adtcreator')) { await ADTCreator.create(cmake); }

    if (!buildingScripts && isType('scripts')) {
        await Scripts.build();
        buildingScripts = true;
    }

    if(isType('config')) {
        await Config.create();
    }

    if (types.includes('release')) {
        term.log('build',`Creating ${bpaths.release_7z.get()}`);
        SevenZipInstall.makeArchive(bpaths.release_7z.abs().get(), ipaths.abs().get());
    }

    term.log('build','Installation successful!');
}

async function main() {
    term.Initialize(
          bpaths.terminal_history.get()
        , 100
        , process.argv.includes('--displayTimestamps')
        , process.argv.includes('--displayNames')
        );
    const build = commands.addCommand('build');
    await compile('scripts', []);
    //process.exit(0)

    const installedPrograms =
        ['trinitycore','trinitycore-release', 'trinitycore-relwithdebinfo', 'trinitycore-debug', 'mpqbuilder', 'blpconverter',
         'config', 'database', 'full', 'scripts', 'clean-install', 'clean-build', 'release', 'adtcreator'];

    for (const val of installedPrograms) {
        build.addCommand(val, '', `Builds ${val}`, async(args) => await compile(val, args));
    }

    build.addCommand('base', '', 'Builds only base dependencies', async(args) => await compile('', args));

    commands.addCommand('headers','','',async()=>{
        TrinityCore.headers();
    });

    commands.enterLoop();
}

if(isInteractive) {
    main();
} else {
    (async function(){
        await compile('full',[]);
        process.exit(0);
    }());
}