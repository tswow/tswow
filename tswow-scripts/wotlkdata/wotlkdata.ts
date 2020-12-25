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
import { cleanSQL } from './sql/SQLClean';

type PatchCollection = {name: string, callback: () => Promise<void>}[];

const setups: PatchCollection = [];
const reads: PatchCollection = [];
const writes: PatchCollection = [];
const patches: PatchCollection = [];
const finishes: PatchCollection = [];

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
        .forEach(x => {
            require(x);
            applyStage(setups);
        });

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

async function applyStage(collection: PatchCollection) {
    for (const {name, callback} of collection) {
        try {
            await callback();
        } catch (error) {
            console.error(`Error in patch ${name}:`, error);
            process.exit(-1);
        }
    }
    collection.splice(0, collection.length);
}

let ctime: number = 0;
function time(msg: string) {
    let diff = Date.now()-ctime;
    console.log(`${msg} in ${(diff/1000).toFixed(2)} seconds.`);
    ctime = Date.now();
}

async function main() {
    ctime = Date.now();
    await IdPublic.readFile();
    SqlConnection.connect();

    try{
        await cleanSQL();
    } catch(err) {
        console.error(err.stack);
        process.exit(0);
    }
    time(`Loaded/Cleaned SQL`);


    // Find all patch subdirectories
    for (const dir of Settings.PATCH_DIRECTORY) {
        if (!fs.lstatSync(dir).isDirectory()) {
            continue;
        }

        try {
            patchSubdirs(dir);
        } catch (error) {
            console.error(`Error in patch ${dir}:`, error);
            process.exit(-1);
        }
    }

    applyStage(reads);
    applyStage(writes);
    applyStage(patches);
    applyStage(finishes);

    time(`Executed scripts`);

    await SqlConnection.finish(Settings.MYSQL_WRITE_TO_DB,
        Settings.SQL_WRITE_TO_FILE);

    time(`Wrote SQL`);
    saveDbc();
    time(`Wrote DBC`);

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

    time(`Wrote LUAXML`);
}

/**
 * Step 1 of script loading.
 * - Runs CONCURRENTLY with global scopes.
 * - Runs BEFORE read/write/patch/finish
 *
 * This stage should:
 * - Initialize ALL the modules own public entities
 * - Modify ONLY the modules own public entities
 * - NOT read other modules public entities (stateless library functions are fine)
 * @param name
 * @param callback
 */
export function setup(name: string, callback: () => any) {
    setups.push({name, callback});
}

/**
 * Step 2 of script loading.
 * - Runs AFTER setup and global scope.
 * - Runs BEFORE write/patch/finish
 *
 * This stage should:
 * - Read entities from other modules
 * - NOT modify any public entities.
 * @param name
 * @param callback
 */
export function read(name: string, callback: () => any) {
    reads.push({name, callback});
}

/**
 * Step 3 of script loading.
 * - Runs AFTER global scope, setup and read.
 * - Runs BEFORE patch/finish
 *
 * This stage should:
 * - NOT read other modules public entities (stateless library functions are fine)
 * - Modify ONLY the modules own public entities.
 * @param name
 * @param callback
 */
export function write(name: string, callback: () => any) {
    reads.push({name, callback});
}


/**
 * Step 4 of script loading
 * - Runs AFTER global scope, setup, read and write.
 * - Runs BEFORE finish
 *
 * This stage should:
 * - Be called at most once by a single module.
 * - Never be called from a library module.
 * - Read or modify any public entities.
 * @param name
 * @param callback
 */
export function patch(name: string, callback: () => any) {
    if (patches.length > 0) {
        throw new Error(`Multiple patches: ${name} and ${patches[0].name}. Only ONE patch should ever run.`);
    }
    patches.push({name, callback});
}

/**
 * Step 5 of script loading (final step)
 * - Runs AFTER global scope, setup, read, write and patch.
 *
 * This stage should:
 * - Not access any public entities in other modules.
 * - NOT modify any public entities at all
 * - Serialize entity builders
 * - Find and report any conflicts in entity builders.
 * @param name
 * @param callback
 */
export function finish(name: string, callback: () => any) {
    finishes.push({name, callback});
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
