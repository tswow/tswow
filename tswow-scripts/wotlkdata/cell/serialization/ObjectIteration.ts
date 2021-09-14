import { CPrim } from "../cells/Cell";
import { getTransient } from "./Transient";

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
export type TypeOfTypes = 'string' | 'null' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export type EntryType = 'primitive' | 'cell' | 'system' | 'struct' | 'entity'

export type Entry = CPrim | {ref:'struct'|'entity', name: string};
export type Schema = {__schema_type: 'entity'|'struct', [key: string]: Schema|Entry}

export interface Objectified {
    objectify(): any;
}

let visitStack : any[] = [];
export let structSchemas : {[key: string]: Schema} = {}

export const Objects = {
    getEntryType(entry: any): EntryType {
        if(!entry || typeof(entry)!='object') return 'primitive';
        if(entry.__entity_id) return 'entity'
        if(entry.__struct_id) return 'struct';
        if(entry.isCell) return 'cell';
        if(entry.isSubsystem) return 'system';
        return 'primitive';
    },

    generateSchema(entry: any, objIn: Schema = {__schema_type:'entity'}): Schema {
        let type = this.getEntryType(entry);
        if(type != 'system' && type != 'struct' && type != 'entity') {
            throw new Error(`Tried generating schema from non-system: ${type}`);
        }

        if(type=='entity') {
            objIn.__schema_type = 'entity'
        }

        if(type=='struct') {
            objIn.__schema_type = 'struct'
        }

        this.getAllPropertyNames(entry).forEach(x=>{
            let val = entry[x]
            if(typeof(val) !== 'object') return;

            if(val.storeClassName && typeof(val.storeClassName) === 'string') {
                objIn[x] = val.storeClassName;
                return;
            }

            switch(this.getEntryType(entry[x])) {
                case 'primitive': return;
                case 'entity': {
                    objIn[x] = {ref:'entity',name:val.__entity_id};
                    break;
                }
                case 'struct': {
                    let structId = val.__struct_id;
                    if(!structSchemas[structId]) {
                        structSchemas[structId] = this.generateSchema(val)
                    }
                    objIn[x] = {ref:'struct',name:structId};
                    break;
                }
                case 'cell': {
                    objIn[x] = (typeof(entry[x].get()) as CPrim)
                    break;
                }
                case 'system': {
                    objIn[x] = this.generateSchema(entry[x],{__schema_type:'entity'})
                    break;
                }
            }
        });
        return objIn;
    },

    // https://stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object
    getAllPropertyNames(obj: any) {
        const result = new Set<string>();
        const transient = getTransient(obj);
        while (obj) {
            Object.getOwnPropertyNames(obj).forEach(p => {
                // proto is a bad property
                if (p === '__proto__' || transient.includes(p)) {
                    return;
                }
                result.add(p);
            });
            obj = Object.getPrototypeOf(obj);
        }

        return result;
    },

    objectifyObj(thiz: any) {
        const obj: {[key: string]: any} = {};
        visitStack.push(thiz);

        Objects.getAllPropertyNames(thiz).forEach((key: any) => {
            try {
                if (thiz[key] !== undefined && thiz[key] !== null) {
                    const val = thiz[key];
                    if (visitStack.findIndex((x) => x === val) >= 0) {
                        return;
                    }

                    if (typeof(val) !== 'object') {
                        return;
                    }

                    if (!val.objectify || typeof(val.objectify) !== 'function') {
                        return;
                    }

                    if (typeof(val.exists) === 'function' && !val.exists()) {
                        return;
                    }

                    obj[key] = val.objectify();
                }
            } catch(err) {
                obj[key] = "ERROR";
            }
        });

        visitStack.pop();
        return obj;
    },

    mapObject(
        objIn: any, type: TypeOfTypes[],
        filter: (key: string, obj: any) => boolean,
        map?: (key: string, obj: any) => any) {

        const objOut: {[key: string]: any} = {};

        Objects.getAllPropertyNames(objIn).forEach((x: any) => {
            const val = objIn[x];
            if (val === null && ! type.includes('null')) {
                return;
            } else if (val === undefined && ! type.includes('undefined')) {
                return;
            } else if (!type.includes(typeof(val))) {
                return;
            }

            if (filter ? filter(x, val) : true) {
                objOut[x] = map ? map(x, val) : val;
            }
        });
        return objOut;
    }
};