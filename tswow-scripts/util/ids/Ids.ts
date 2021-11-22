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
import { Allocator } from './Allocator';

export class IdRange {
    readonly low: number;
    readonly high: number;
    readonly name: string;
    readonly mod: string;
    readonly table: string;
    readonly isNew: boolean;

    constructor(isNew: boolean, table: string, mod: string, name: string, low: number, high: number) {
        this.isNew = isNew;
        this.table = table;
        this.mod = mod;
        this.name = name;
        this.low = low;
        this.high = high;
    }

    offset(offset: number) {
        if (this.low + offset > this.high) {
            throw new Error(`Offset ${offset} out of range: ${this.low}-${this.high}`);
        }
        return this.low + offset;
    }

    contains(entry: IdRange) {
        return entry.low >= this.low && entry.low <= this.high ||
            this.low >= entry.low && this.low <= entry.high;
    }

    get size() {return (this.high - this.low) + 1; }
    get fullName() {return fullName(this.mod, this.name); }

    equals(range: IdRange) {
        return this.low === range.low &&
            this.high === range.high &&
            this.name === range.name &&
            this.mod === range.mod &&
            this.table === range.table;
    }
}

class Table {
    entries: {[id: string]: IdRange} = {};
}

let mappings: {[table: string]: Table} = {};
let allocators: {[table: string]: Allocator} = {}

function getAllocator(table: string) {
    return allocators[table] || (allocators[table] = new Allocator());
}

function fullName(mod: string, name: string) {
    return `${mod}:${name}`;
}

export function iterateIds(callback: (range: IdRange) => any) {
    for(const table of Object.values(mappings)) {
        for(const entry of Object.values(table.entries)) {
            callback(entry);
        }
    }
}

export class IdPrivate {
    protected static flushMemory() {
        mappings = {};
        allocators = {};
    }

    protected static async writeFile(filename: string) {
        let str = ``;
        Object.entries(mappings)
            .sort(([ta],[tb])=>ta>tb ? 1 : -1)
            .forEach(([_,table])=>{
                Object.values(table.entries)
                    .sort((a,b)=>a.fullName > b.fullName ? 1 : -1)
                    .forEach(entry=>{
                        str += (`${entry.table}|${entry.fullName}|${entry.low}|${entry.high}|\n`);
                    })
            })
        fs.writeFileSync(filename, str);
    }

    protected static async readFile(filename: string) {
        this.flushMemory();
        if (!fs.existsSync(filename)) { return; }

        const str = fs.readFileSync(filename).toString();

        let stage = 0;
        let name = '';
        let table = '';
        let low = '';
        let curstr = '';

        for (let i = 0; i < str.length; ++i) {
            const chr = str.charAt(i);
            if(chr === '\n' || chr === '\r') continue;
            if (chr !== '|') {
                curstr += chr;
                continue;
            }
            switch (stage) {
                case 0:
                    table = curstr;
                    break;
                case 1:
                    name = curstr;
                    break;
                case 2:
                    low = curstr;
                    break;
                case 3:
                    ++i;
                    let map = mappings[table];
                    if (map === undefined) { map = mappings[table] = new Table(); }
                    const [mod, iname] = name.split(':');
                    const range = map.entries[name] = new IdRange(false, table, mod, iname, parseInt(low, 10), parseInt(curstr, 10));
                    getAllocator(table).add(range.low, (range.high - range.low) + 1);
                    stage = -1;
            }
            ++stage;
            curstr = '';
        }
    }

    protected static getMappings() {
        return mappings;
    }
}

export function GetId(table: string, mod: string, name: string, startid: number = 100000) {
    return GetIdRange(table, mod, name, 1, startid).low;
}

export function GetIdRange(table: string, mod: string, name: string, size: number, startid: number = 10000) {
    let forward = mappings[table];
    if (!forward) { forward = mappings[table] = new Table(); }
    const fullname = mod + ':' + name;
    if (mod.includes(':') || name.includes(':') ||
        fullname.includes('.') || fullname.includes(';') || fullname.includes('|')) {
            throw new Error('Identifiers cannot include any of the characters : . ; |');
    }

    if (forward.entries[fullname]) { return forward.entries[fullname]; }
    const id = getAllocator(table).add(startid, size);
    const entry = new IdRange(true, table, mod, name, id, id + size - 1);
    forward.entries[fullname] = entry;
    return entry;
}

export function GetTempId(table: string, startId: number) {
    return getAllocator(table).add(startId,1);
}