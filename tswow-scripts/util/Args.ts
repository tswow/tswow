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
 * Contains functions for parsing command-line arguments.
 */
export namespace Args {
    export function hasFlag(flags: string|string[], args: (string[])|(string[][])) {
        if(typeof(flags) === 'string') flags = [flags];
        let out: string[] = []
        for(let element of args) {
            if(typeof(element) === 'string') out.push(element)
            else out = out.concat(element);
        }
        flags = flags.map(x=>x.startsWith('--') ? x.substring(2) : x)
        return flags.findIndex((flag)=>out.find((arg)=>arg === flag || arg == '--'+flag)) >= 0;
    }

    export function getString(flagname: string, defVal: string, args: string[] = process.argv) {
        if(flagname.startsWith('--')) {
            flagname = flagname.substring(2);
        }
        let v = args.find(x=>x.startsWith(flagname) || x.startsWith(`--${flagname}`));
        if(!v) return defVal
        return v.match(/.+?\= *(.+?)/)[1]
    }

    export function getNumber(flagname: string, defVal: number, args: string[] = process.argv) {
        return parseInt(getString(flagname,defVal.toString(),args));
    }
}
