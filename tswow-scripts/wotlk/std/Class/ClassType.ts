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

export const CLASS_TYPES = {
      WARRIOR      : 1
    , PALADIN      : 2
    , HUNTER       : 3
    , ROGUE        : 4
    , PRIEST       : 5
    , DEATH_KNIGHT : 6
    , SHAMAN       : 7
    , MAGE         : 8
    , WARLOCK      : 9
    , DRUID        : 11
} as const

export type ClassType = keyof typeof CLASS_TYPES | number
export function resolveClassType(type: ClassType) {
    return typeof(type) === 'string' ? CLASS_TYPES[type] : type;
}

export function getClassType(type: ClassType): ClassType {
    if(typeof(type) == 'string') return type;
    switch(type) {
        case 1: return 'WARRIOR';
        case 2: return 'PALADIN';
        case 3: return 'HUNTER';
        case 4: return 'ROGUE';
        case 5: return 'PRIEST';
        case 6: return 'DEATH_KNIGHT'
        case 7: return 'SHAMAN';
        case 8: return 'MAGE';
        case 9: return 'WARLOCK';
        case 11: return 'DRUID';
        default: return type;
    }
}

export type ClassMaskCon = ClassType|ClassType[]|undefined
export function makeClassmask(classes: ClassMaskCon) {
    return classes === undefined
        ? 0
        : (!Array.isArray(classes) ? [classes]:classes)
            .map(x=>resolveClassType(x))
            .reduce((p,c)=>p|(1<<(c-1)),0);
}