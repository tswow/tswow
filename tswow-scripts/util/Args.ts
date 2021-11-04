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
export namespace Arguments {
    export function hasFlag(flagname: string, args: string[] = process.argv) {
        args.forEach(x=>{
            if(x.startsWith(flagname)) return true;
        })
    }

    export function getString(flagname: string, defVal: string, args: string[] = process.argv) {
        let v = args.find(x=>x.startsWith(flagname));
        if(!v) return defVal
        return v.match(/.+?\= *(.+?)/)[1]
    }

    export function getNumber(flagname: string, defVal: number, args: string[] = process.argv) {
        return parseInt(getString(flagname,defVal.toString(),args));
    }
}
