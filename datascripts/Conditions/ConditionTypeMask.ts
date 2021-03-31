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
export type ConditionTypeMask = 'UNIT' | 'PLAYER' | 'GAMEOBJECT' | 'CORPSE_PLAYER'

export function resolveConditionTypeMask(mask: ConditionTypeMask) {
    switch(mask) {
        case 'UNIT': return 8;
        case 'PLAYER': return 16;
        case 'GAMEOBJECT': return 32;
        case 'CORPSE_PLAYER': return 128;
        default: throw new Error(`Invalid condition type mask: ${mask}`);
    }
}

export function getConditionTypeMask(mask: number) : ConditionTypeMask[] {
    const values : ConditionTypeMask[] = [];
    if(mask&8) { values.push('UNIT'); }
    if(mask&16) { values.push('PLAYER'); }
    if(mask&32) { values.push('GAMEOBJECT'); }
    if(mask&128) { values.push('CORPSE_PLAYER'); }
    return values;
}