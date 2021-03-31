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
export type RelationType = 'SELF' | 'PARTY' | 'RAID_OR_PARTY' | 'OWNED_BY' | 'PASSENGER_OF' | 'CREATED_BY'

export function resolveRelation(type: RelationType) {
    switch(type) {
        case 'SELF': return 0;
        case 'PARTY': return 1;
        case 'OWNED_BY': return 2;
        case 'PASSENGER_OF': return 3;
        case 'CREATED_BY': return 4;
        default: throw new Error(`Invalid relation type: ${type}`);
    }
}

export function getRelation(id: number) : RelationType {
    switch(id) {
        case 0: return 'SELF'
        case 1: return 'PARTY'
        case 2: return 'OWNED_BY'
        case 3: return 'PASSENGER_OF'
        case 4: return 'CREATED_BY'
        default: throw new Error(`Invalid relation type: ${id}`);
    }
}