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
export type ConditionTypeID = 'UNIT' | 'PLAYER' | 'GAMEOBJECT' | 'CORPSE_PLAYER'

export function resolveConditionTypeID(id: ConditionTypeID) {
    switch(id) {
        case 'UNIT': return 3;
        case 'PLAYER': return 4;
        case 'GAMEOBJECT': return 5;
        case 'CORPSE_PLAYER': return 7;
        default: throw new Error(`Invalid condition type: ${id}`);
    }
}

export function getConditionTypeID(id: number) : ConditionTypeID{
    switch(id) {
        case 3: return 'UNIT'
        case 4: return 'PLAYER'
        case 5: return 'GAMEOBJECT'
        case 7: return 'CORPSE_PLAYER'
        default: throw new Error(`Invalid condition type: ${id}`);
    }
}