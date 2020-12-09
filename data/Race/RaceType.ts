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
export type RaceType = number 
    | 'HUMAN' | 'ORC' | 'DWARF' | 'NIGHTELF' | 'UNDEAD' 
    | 'TAUREN' | 'GNOME' | 'TROLL' | 'BLOODELF' | 'DRAENEI'

export function resolveRaceType(type: RaceType) {
    if(typeof(type)==='number') {
        return type;
    }

    switch(type) {
        case 'HUMAN': return 1;
        case 'ORC': return 2;
        case 'DWARF': return 3;
        case 'NIGHTELF': return 4;
        case 'UNDEAD': return 5;
        case 'TAUREN': return 6;
        case 'GNOME': return 7;
        case 'TROLL': return 8;
        case 'BLOODELF': return 10;
        case 'DRAENEI': return 11;
            default: throw new Error(`Invalid race type ${type}`);
    }
}