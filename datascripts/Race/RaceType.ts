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

export const ALL_RACES: RaceType[] = [
      'HUMAN','ORC','DWARF','NIGHTELF','UNDEAD'
    , 'TAUREN','GNOME','TROLL','BLOODELF','DRAENEI'
]

export function getRaceType(v: number): RaceType {
    switch(v) {
        case 1: return 'HUMAN'
        case 2: return 'ORC'
        case 3: return 'DWARF'
        case 4: return 'NIGHTELF'
        case 5: return 'UNDEAD'
        case 6: return 'TAUREN'
        case 7: return 'GNOME'
        case 8: return 'TROLL'
        case 10: return 'BLOODELF'
        case 11: return 'DRAENEI'
        default: return v;
    }
}

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

export function makeRacemask(races: RaceType[]) {
    return races
        .map(x=>resolveRaceType(x))
        .reduce((p,c)=>p|(1<<(c-1)),0);
}