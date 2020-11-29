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
import { dbAssemble } from './Database';
import { createConfig } from './Config';
import { createMpqBuilder } from './MPQBuilder';
import { installTrinityCore } from './TrinityCore';
import { installBlender, installBlenderWmoAddon } from './Blender';
import { findCmake } from './Cmake';
import { findOpenSSL } from './OpenSSL';
import { findMysql } from './MySQL';
import { buildTranspiler } from './Transpiler';
import { buildScripts } from './Scripts';
import { installBoost } from './Boost';
import { installSZip } from './7Zip';

let buildingScripts = false;

async function compile(type: string, compileArgs: string[]) {
    // Load necessary libraries
    const types = type.split(' ');
    function isType(check: string) {
        return types.includes('full') || types.includes(check);
    }
    const cmake = isWindows() ? await findCmake() : 'cmake';
    term.log(`Found cmake at ${cmake}`);
    const openssl = isWindows() ? await findOpenSSL() : 'openssl';
    term.log(`Found OpenSSL at ${openssl}`);
    const mysql = isWindows() ? await findMysql() : 'mysql';
    term.log(`Found MySQL at ${mysql}`);
    const boost = isWindows() ? await installBoost() : 'boost';
    if (isWindows()) { await installSZip(); }

    if (isWindows()) {
        if (isType('blender')) { await installBlender(); }
        if (isType('wmo')) { await installBlenderWmoAddon(); }
    }

    if (!isWindows()) {
        // Ubunu only
        wsys.exec('sudo apt-get update && sudo apt-get install -y git cmake make gcc g++ clang libmysqlclient-dev libssl-dev libbz2-dev libreadline-dev libncurses-dev mysql-server libace-6.* libace-dev', 'inherit');
    }

    if (isType('trinitycore-release')) { await installTrinityCore(cmake, openssl, mysql, 'Release', compileArgs); }
    if (isType('trinitycore-debug') && isWindows()) { await installTrinityCore(cmake, openssl, mysql, 'Debug', compileArgs); }
    if (isType('mpqbuilder')) { await createMpqBuilder(cmake); }
    if (isType('database')) { await dbAssemble(); }

    if (!buildingScripts && isType('scripts')) {
        buildTranspiler(build_path(), install_path());
        await buildScripts(build_path(), install_path());
        buildingScripts = true;
    }

    await createConfig();
    term.log('Installation successful!');
}

async function main() {
    const build = commands.addCommand('build');

    const installedPrograms = isWindows() ?
        ['blender', 'wmo', 'trinitycore-release', 'trinitycore-debug', 'mpqbuilder', 'config', 'database', 'full', 'scripts'] :
        ['trinitycore-release', 'trinitycore-debug', 'mpqbuilder', 'release', 'config', 'full', 'scripts'];

    for (const val of installedPrograms) {
        build.addCommand(val, '', `Builds ${val}`, async(args) => await compile(val, args));
    }

    build.addCommand('base', '', 'Builds only base dependencies', async(args) => await compile('', args));

    commands.enterLoop();
}

main();
