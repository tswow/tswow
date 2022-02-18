/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2022 tswow <https://github.com/tswow/>
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
import { finish } from "../../../data";
import { BuildArgs } from "../../../data/Settings";
import { WFile } from "../../../util/FileTree";
import { ipaths } from "../../../util/Paths";

export type DataTableType = 'LIST'|'NUMBER_MAP'|'STRING_MAP'

export abstract class DataTable {
    protected abstract write(file: WFile);
    protected abstract type(): DataTableType
    static write(table: DataTable, file: WFile) {
        table.write(file);
    }
    static type(table: DataTable) {
        return table.type();
    }
}

export class DataList extends DataTable {
    protected type(): DataTableType {
        return 'LIST'
    }
    protected write(file: WFile) {
        file.writeJson({type:'List',values:this.values});
    }
    protected values: number[][] = []

    add(value: number[]) {
        this.values.push(value);
    }
}

export class NumberDataMap extends DataTable {
    protected type(): DataTableType {
        return 'NUMBER_MAP'
    }
    protected write(file: WFile) {
        file.writeJson({type:'NumberMap',values:this.values});
    }
    protected values: {[key: number]: number[]} = {}

    set(key: number, values: number[]) {
        this.values[key] = values;
    }
}

export class StringDataMap extends DataTable {
    protected type(): DataTableType {
        return 'STRING_MAP'
    }
    protected write(file: WFile) {
        file.writeJson({type: 'StringMap',values:this.values});
    }
    protected values: {[key: string]: number[]} = {}
    set(key: string, values: number[]) {
        this.values[key] = values;
    }
}

const dataTables: {[key: string]: DataTable} = {}

finish('data-tables',()=>{
    if(BuildArgs.READ_ONLY) {
        return
    }

    Object.entries(dataTables).forEach(([key,value])=>{
        const fname = ipaths.coredata.datatables.datafile(key)
        DataTable.write(value, fname);
    });
});

function loadTable(mod: string, id: string, expectedType: DataTableType) {
    let modid = `${mod}.${id}`
    let table = dataTables[modid];
    if(!table) {
        throw new Error(`No DataTable named ${modid}`);
    }
    let type = DataTable.type(table);
    if(type !== expectedType) {
        throw new Error(`Table ${modid} is a ${type}, not a ${expectedType}`)
    }
    return table;
}

export const DataTables = {
    CreateStringMap(mod: string, id: string) {
        let modid = `${mod}.${id}`
        if(dataTables[modid] !== undefined) {
            throw new Error(`Table ${modid} already registered`);
        }
        return dataTables[modid] = new StringDataMap();
    },

    CreateNumberMap(mod: string, id: string) {
        let modid = `${mod}.${id}`
        if(dataTables[modid] !== undefined) {
            throw new Error(`Table ${modid} already registered`);
        }
        return dataTables[modid] = new NumberDataMap();
    },

    CreateList(mod: string, id: string) {
        let modid = `${mod}.${id}`
        if(dataTables[modid] !== undefined) {
            throw new Error(`Table ${modid} already registered`);
        }
        return dataTables[modid] = new DataList();
    },

    LoadStringMap(mod: string, id: string) {
        return loadTable(mod,id,'STRING_MAP') as StringDataMap;
    },

    LoadNumberMap(mod: string, id: string) {
        return loadTable(mod,id,'NUMBER_MAP') as NumberDataMap;
    },

    LoadList(mod: string, id: string) {
        return loadTable(mod,id,'LIST') as DataList;
    },
}