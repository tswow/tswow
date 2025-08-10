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
import { Args } from '../util/Args';
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
import { ClientExtensions } from './ClientExtensions';
import { CMake } from './Cmake';
import { bpaths, spaths } from './CompilePaths';
import { Config } from './Config';
import { IMInstall } from './ImageMagick';
import { MPQBuilder } from './MPQBuilder';
import { MySQL } from './MySQL';
import { NodeJS } from './Node';
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
    await NodeJS.install();
    if (isWindows()) { await SevenZipInstall.install(); }
    if (isWindows()) { await IMInstall.install() }

    // Determine the build type that was used
    let actualBuildType = 'RelWithDebInfo'; // default

    if (types.includes('full') || types.includes('release')) {
        actualBuildType = 'RelWithDebInfo';
        await TrinityCore.install(cmake, openssl, mysql, actualBuildType, compileArgs.concat(['dynamic']));
    } else {
        if (type == 'trinitycore-release') {
            actualBuildType = 'Release';
            await TrinityCore.install(cmake, openssl, mysql, actualBuildType, compileArgs);
        }
        if (isType('trinitycore-relwithdebinfo')) {
            actualBuildType = 'RelWithDebInfo';
            await TrinityCore.install(cmake, openssl, mysql, actualBuildType, compileArgs);
        }
        if (type == 'trinitycore-debug') {
            actualBuildType = 'Debug';
            await TrinityCore.install(cmake, openssl, mysql, actualBuildType, compileArgs);
        }
    }
    // Always create config with the correct build type after TrinityCore installation
    if (types.includes('full') || types.includes('release') ||
        isType('trinitycore-relwithdebinfo') || type == 'trinitycore-debug' ||
        type == 'trinitycore-release') {
        await Config.create(actualBuildType);
    }

    if (isType('mpqbuilder')) { await MPQBuilder.create(cmake); }
    if (isType('blpconverter')) { await BLPConverter.install(cmake); }
    if (isType('adtcreator')) { await ADTCreator.create(cmake); }
    if (isType('client-extensions')) { await ClientExtensions.create(cmake); }

    if (!buildingScripts && isType('scripts')) {
        await Scripts.build();
        buildingScripts = true;
    }

    if(isType('config')) {
        await Config.create(actualBuildType);
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

    const installedPrograms =
        [
              'trinitycore-release'
            , 'trinitycore-relwithdebinfo'
            , 'trinitycore-debug'
            , 'mpqbuilder'
            , 'blpconverter'
            , 'config'
            , 'database'
            , 'full'
            , 'scripts'
            , 'clean-install'
            , 'clean-build'
            , 'release'
            , 'adtcreator'
            , 'client-extensions'
        ];

    for (const val of installedPrograms) {
        build.addCommand(val, '', `Builds ${val}`, async(args) => await compile(val, args));
    }

    build.addCommand('base', '', 'Builds only base dependencies', async(args) => await compile('', args));

    commands.addCommand('headers','','',async(args)=>{
        TrinityCore.headers(Args.hasFlag('global-only',args));
    });

    commands.enterLoop();
}


(async function(){
    if(!spaths.tswow_scripts.wotlk.global_d_ts.exists()) {
        TrinityCore.headers(true);
    }

    if(Args.hasFlag('gdts-only', [process.argv])) {
        TrinityCore.headers(true);
        process.exit(0);
    }

    if(isInteractive) {
        main();
    } else {
        // Parse command line arguments to extract build type
        const specifiedTarget = process.argv.find(arg =>
            arg !== '--release' &&
            !arg.startsWith('--') &&
            !arg.includes('node') &&
            !arg.endsWith('.js') &&
            !arg.includes('CompileTsWow') &&
            !arg.includes('ipaths') &&
            !arg.includes('bpaths')
        );

        // List of all valid build targets from installedPrograms
        const validTargets = [
            'trinitycore-release',
            'trinitycore-relwithdebinfo',
            'trinitycore-debug',
            'mpqbuilder',
            'blpconverter',
            'config',
            'scripts',
            'adtcreator',
            'client-extensions'
        ];

        // Use the specified target if it's valid, otherwise default to full/release
        const buildType = (specifiedTarget && validTargets.includes(specifiedTarget))
            ? specifiedTarget
            : (process.argv.includes('--release') ? 'release' : 'full');

        await compile(buildType, []);
        process.exit(0);
    }
}())
