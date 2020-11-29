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
import * as fs from 'fs';
import * as path from 'path';
import { SqlConnection } from './sql/SQLConnection';
import { Settings } from './Settings';
import { saveDbc } from './dbc/DBCSave';
import { DBC as _DBC } from './dbc/DBCFiles';
import { SQL as _SQL } from './sql/SQLFiles';
import { IdPrivate, GetIdRange as _GetIdRange, GetId as _GetId } from './ids/Ids';
import { LUAXML as _LUAXML, _writeLUAXML } from './luaxml/LUAXML';
import { Objects as _Objects } from './cell/ObjectIteration';

const patches: {name: string, cb: () => Promise<void>}[] = [];

class IdPublic extends IdPrivate {
    static readFile = () => IdPrivate.readFile(Settings.ID_FILE_PATH);
    static writeFile = () => IdPrivate.writeFile(Settings.ID_FILE_PATH);
}

function patchSubdirs(dir: string) {
    if (!fs.existsSync(dir)) { return; }

    const nodes = fs.readdirSync(dir).map(x => path.join(dir, x));

    nodes
        .filter(x => x.endsWith('js') && fs.statSync(x).isFile())
        .map(x => path.relative(__dirname, x))
        .forEach(x => require(x));

    const dirs = nodes
        .filter(x =>
            !x.endsWith('.d.ts') &&
            !x.endsWith('.js') &&
            !x.endsWith('node_modules') &&
            !x.endsWith('.map') &&
            fs.lstatSync(x).isDirectory());

    for (const subdir of dirs) {
        patchSubdirs(subdir);
    }
}

async function main() {
    await IdPublic.readFile();
    SqlConnection.connect();

    // Find all patch subdirectories
    for (const dir of Settings.PATCH_DIRECTORY) {
        try {
            patchSubdirs(dir);
        } catch (error) {
            console.error(`Error loading patch directory ${dir}`);
            process.exit(-1);
        }
    }

    for (const {name, cb} of patches) {
        try {
            await cb();
        } catch (error) {
            console.error(`Error in patch ${name}:`, error);
            process.exit(-1);
        }
    }

    await SqlConnection.finish(Settings.MYSQL_WRITE_TO_DB,
        Settings.SQL_WRITE_TO_FILE);
    saveDbc();

    await IdPublic.writeFile();

    if (Settings.LUAXML_SOURCE.length === 0 || Settings.LUAXML_CLIENT.length === 0) {
        console.log('No LUAXML settings, skipping LUAXML');
    } else {
        if (_DBC.ChrClasses.isLoaded()) {
            _LUAXML.anyfile('Interface/GlueXML/CharacterCreate.lua')
                .replace(3, `MAX_CLASSES_PER_RACE = ${_DBC.ChrClasses.rowCount};`);
        }

        _writeLUAXML(Settings.LUAXML_SOURCE, Settings.LUAXML_CLIENT);
    }
}

/**
 * Main entry point for registering patches
 * @param name
 * @param cb
 */
export function patch(name: string, cb: () => any) {
    patches.push({name, cb});
}

/**
 * Contains references to all DBC files
 */
export const DBC = _DBC;

/**
 * Contains references to all SQL tables
 */
export const SQL = _SQL;

/**
 * Finds a unique range of ids that will persist through multiple runs of the program
 */
export const GetIdRange = _GetIdRange;

/**
 * Finds a unique id that will persist through multiple runs of the program
 */
export const GetId = _GetId;

/**
 * Functions for writing LUA/XML patches
 */
export const LUAXML = _LUAXML;

/**
 * Exports uint32 so id files in tswow can use them.
 * Include this instead of defining it yourself.
 */
export type uint32 = number;

/**
 * Functions for transforming objects
 */
export const Objects = _Objects;

main();
