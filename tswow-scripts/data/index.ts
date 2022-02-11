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
import { GetId as _GetId, GetIdRange as _GetIdRange, IdPrivate } from '../util/ids/Ids';
import { ipaths } from '../util/Paths';
import { Objects as _Objects } from './cell/serialization/ObjectIteration';
import { DBCFile } from './dbc/DBCFile';
import { DBC as _DBC, DBCFiles, DBCLoader as _DBCLoader } from '../wotlk/DBCFiles';
import { LUAXML as _LUAXML, _writeLUAXML } from './luaxml/LUAXML';
import { BuildArgs, DatascriptModules, dataset } from './Settings';
import { cleanSQL } from './sql/SQLClean';
import { Connection, SqlConnection } from './sql/SQLConnection';
import { SQL as _SQL } from '../wotlk/SQLFiles';
import { __internal_wotlk_save } from '../wotlk/internal/__wotlkEvents';

type PatchCollection = {name: string, callback: () => Promise<void>}[];

const setups: PatchCollection = [];
const reads: PatchCollection = [];
const writes: PatchCollection = [];
const patches: PatchCollection = [];
const finishes: PatchCollection = [];
const luaxmls: PatchCollection = [];
const sorts: PatchCollection = [];

export type Stages = 'SETUP' | 'READ' | 'WRITE' | 'PATCH' | 'FINISH' | 'LUAXML' | 'SORT'
let cur_stage: Stages = 'SETUP'
export function GetStage() {
    return cur_stage;
}

class IdPublic extends IdPrivate {
    static readFile = () => IdPrivate.readFile(dataset.ids_txt.get());
    static writeFile = () => IdPrivate.writeFile(dataset.ids_txt.get());
}

function profileScripts() {
    return process.argv.includes('--profile-scripts')
}
let profiling: {[key: string]: number} = {}

async function applyStage(collection: PatchCollection) {
    for (const {name, callback} of collection) {
        try {
            await callback();
        } catch (error) {
            console.error(`Error in patch ${name}:`, error);
            process.exit(4);
        }
    }
    collection.splice(0, collection.length);
}

let ctime: number = 0;
function time(msg: string) {
    if(BuildArgs.USE_TIMER) {
        let diff = Date.now()-ctime;
        console.log(`${msg} in ${(diff/1000).toFixed(2)} seconds.`);
        ctime = Date.now();
    }
}

async function mainWrap() {
    try {
        await main();
    } catch(error: any) {
        console.error(error.message+error.stack);
        process.exit(1);
    }
}

async function main() {
    if(process.argv.includes('bin/scripts/tswow/test')) return;
    ipaths.coredata.last_datascript.remove();
    if(BuildArgs.LOG_SQL) {
        SqlConnection.logFile = fs.openSync(ipaths.coredata.last_datascript.get(),'a');
    }

    ctime = Date.now();
    await IdPublic.readFile();
    SqlConnection.connect();

    if(BuildArgs.WRITE_SERVER) {
        try{
            await cleanSQL();
        } catch(err: any) {
            console.error(err.stack);
            process.exit(2);
        }
        time(`Loaded/Cleaned SQL`);
    }

    // Find all patch subdirectories
    for (let dir of DatascriptModules) {
        try {
            dir.datascripts.build.toDirectory()
                .iterate('RECURSE','FILES','FULL',node=>{
                    if(!node.endsWith('.js') || !node.isFile()) {
                        return;
                    }
                    let ts = dir.datascripts.join(node.relativeTo(dir.datascripts.build))
                        .toFile().withExtension('.ts')
                    if(!ts.exists()) {
                        return;
                    }
                    let v = Date.now();
                    if((!BuildArgs.INLINE_ONLY) || node.toFile().readString().includes('InlineScripts')) {
                        require(node.relativeTo(__dirname).get());
                        if(profileScripts()) {
                            profiling[ts.relativeTo(dir.datascripts).get()] = Date.now()-v
                        }
                        applyStage(setups);
                    }

                })
        } catch (error) {
            console.error(`Error in patch ${dir.get()}:`, error);
            process.exit(3);
        }
    }

    cur_stage = 'READ'
    await applyStage(reads);
    cur_stage = 'WRITE'
    await applyStage(writes);
    cur_stage = 'PATCH'
    await applyStage(patches);
    cur_stage = 'FINISH'
    await applyStage(finishes);

    if(BuildArgs.WRITE_CLIENT) {
        // todo: move to stdlib
        if (_DBC.ChrClasses.isLoaded()) {
            _LUAXML.anyfile('Interface/GlueXML/CharacterCreate.lua')
                .replace(3, `MAX_CLASSES_PER_RACE = ${_DBC.ChrClasses.rowCount};`);
        }

        _writeLUAXML();
        time(`Wrote LUAXML`);
    }

    cur_stage = 'LUAXML'
    await applyStage(luaxmls);
    dataset.luaxml.copy(BuildArgs.CLIENT_PATCH_DIR,false);

    for(const file of DBCFiles) {
        DBCFile.getBuffer(file).applyDeletes();
    }

    cur_stage = 'SORT'
    if(!BuildArgs.READ_ONLY) {
        await applyStage(sorts);
    }
    time(`Executed scripts`);

    await __internal_wotlk_save();
    SqlConnection.allDbs().filter(x=>x!==undefined).map(x=>Connection.end(x));

    if(!BuildArgs.READ_ONLY) {
        await IdPublic.writeFile();
        time(`Wrote IDs`)
    }

    if(profileScripts()) {
        Object.entries(profiling)
            .sort(([_,a],[__,b])=>
                a > b ? 1 : -1
            )
            .forEach(([file,time])=>{
                if(time === 0) return;
                let color =
                  time < 10   ? '\x1b[36m' // cyan
                : time < 100  ? '\x1b[32m' // green
                : time < 1000 ? '\x1b[33m' // yellow
                : '\x1b[31m'               // red
                console.log(`${file}: ${color}${time}ms\x1b[0m`)
            })
    }
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
 * Step 5 of script loading (final step that can handle existing data)
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
 * Step 6 of script loading (final step)
 * - Runs AFTER luaxml data has been written
 *
 * This stage should:
 * - Write any custom luaxml
 *
 * @param name
 * @param callback
 */
export function luaxml(name: string, callback: () => any) {
    luaxmls.push({name,callback});
}

/**
 * Step 7 of script loading (final step)
 * - Runs AFTER global scope, setup, read, write, patch, finish and luaxml.
 *
 * This stage should:
 * - Sort DBC files in place.
 *
 * At this stage, all previous DBC pointers can become invalid, and the only valid
 * API operation is calling DBCTable#sort and reading the rows it calls back with
 *
 * @param name
 * @param callback
 */
export function sort(name: string, callback: () => any) {
    sorts.push({name,callback});
}

/**
 * Contains references to all DBC files
 */
export const DBC = _DBC;

/**
 * Contains references to dbc classes that can load new dbc files into memory
 */
export const DBCLoader = _DBCLoader

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

mainWrap();