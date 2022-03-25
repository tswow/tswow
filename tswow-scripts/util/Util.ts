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

 /**
  * Contains utility functions that don't fit anywhere else.
  */
export namespace util {
    export function isModuleOrParent(mod: string, parent: string) {
        return mod === parent || mod.startsWith(parent+'.');
    }

    export function intListArgument(prefix: string, args: string[]): number[] {
        let match = args.find((x)=>x.startsWith(prefix));
        if(!match) return [];
        match.trimLeft();
        match = match.substring(prefix.length);
        return match.split(',').map(x=>parseInt(x))
    }

    export function intPairListArgument(prefix: string, args: string[]): [number,number][] {
        let match = args.find(x=>x.startsWith(prefix));
        if(!match) return [];
        match.trimLeft()
        match = match.substring(prefix.length);
        return match.split(',')
            .map(x=>x.split('.'))
            .map(([x,y])=>[parseInt(x),parseInt(y)])
    }

    export function stringListArgument(prefix: string, args: string[]): string[] {
        let match = args.find(x=>x.startsWith(prefix));
        if(!match) return []
        match = match.substring(prefix.length);
        return match.split(',');
    }

    export function stringArgument(prefix: string, def: string, args: string[]): string {
        let match = args.find(x=>x.startsWith(prefix));
        if(!match) return def;
        match = match.substring(prefix.length);
        return match;
    }

    /**
     * Converts a json with flat keys ({"a.b.c":"data"}) to a hierarchy ({"a":{"b":{"c":"data"}}})
     * from https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
     * @param data Object to convert
     * @returns `data` converted to a hierarchy
     */
    export function unflattenJson(data: any) {
        'use strict';
        if (Object(data) !== data || Array.isArray(data)) {
            return data;
        }
        const result: any = {};
        let cur: any, prop, idx, last, temp;
        for (const p in data) {
            if (data[p] === undefined) {
                throw new Error(`Internal error: unflattened json missing property ${p}`);
            } else {

                cur = result, prop = '', last = 0;
                do {
                    idx = p.indexOf('.', last);
                    temp = p.substring(last, idx !== -1 ? idx : undefined);
                    cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp, 10)) ? [] : {}));
                    prop = temp;
                    last = idx + 1;
                } while (idx >= 0);
                cur[prop] = data[p];
            }
        }
        return result[''];
    }

    /**
     * Transform a string to snake case
     * @param str
     */
    export function toDashCase(str: string) {
        return str.split(' ').join('-').split('').map(c=>
            c == c.toUpperCase() ? `-${c.toLowerCase()}` : c
        ).join('');
    }

    /**
     * Converts a json hierarchy ({"a":{"b":{"c":"data"}}}) to flat keys ({"a.b.c":"data"})
     * from https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
     * @param data Object to convert
     * @returns `data` converted to flat keys
     */
    export function flattenJson(data: any) {
        const result: any = {};
        function recurse (cur: any, prop: any) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                 for (let i = 0, l = cur.length; i < l; i++) {
                     recurse(cur[i], prop ? prop + '.' + i : '' + i);
                 }
                // @ts-ignore - ???
                if (l === 0) {
                    result[prop] = [];
                }
            } else {
                let isEmpty = true;
                for (const p in cur) {
                    if (cur[p] === undefined) {
                        throw new Error(`Internal error: missing key in unflattened json ${p}`);
                    } else {
                        isEmpty = false;
                        recurse(cur[p], prop ? prop + '.' + p : p);
                    }
                }
                if (isEmpty) {
                    result[prop] = {};
                }
            }
        }
        recurse(data, '');
        return result;
    }

    export function getLocales() {
        return [
              'frFR'
            , 'deDE'
            , 'enGB'
            , 'enUS'
            , 'itIT'
            , 'koKR'
            , 'zhCN'
            , 'zhTW'
            , 'ruRU'
            , 'esES'
            , 'esMX'
            , 'ptBR']
    }
}
