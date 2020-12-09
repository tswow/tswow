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
export type ClassType = 
    'WARRIOR' | 'PALADIN' | 'HUNTER' | 'ROGUE' | 
    'PRIEST' | 'DEATH_KNIGHT' | 'SHAMAN' | 'MAGE' | 
    'WARLOCK' | 'DRUID' | number

export function resolveClassType(type: ClassType) {
    if(typeof(type)==='number') {
        return type;
    }

    switch(type) {
        case 'WARRIOR': return 1;
        case 'PALADIN': return 2;
        case 'HUNTER': return 3;
        case 'ROGUE': return 4;
        case 'PRIEST': return 5;
        case 'DEATH_KNIGHT': return 6;
        case 'SHAMAN': return 7;
        case 'MAGE': return 8;
        case 'WARLOCK': return 9;
        case 'DRUID': return 11;
        default: throw new Error(`Invalid class type: ${type}`)
    }
}