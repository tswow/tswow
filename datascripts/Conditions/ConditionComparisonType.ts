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
export type ComparisonType = 'EQUAL' | 'HIGHER' |'LESS' | 'GREATER_OR_EQUAL' | 'LESS_OR_EQUAL'

export function resolveComparison(type: ComparisonType) {
    switch(type) {
        case 'EQUAL': return 0;
        case 'HIGHER': return 1;
        case 'LESS': return 2;
        case 'GREATER_OR_EQUAL': return 3;
        case 'LESS_OR_EQUAL': return 4;
        default: throw new Error(`Invalid comparison type ${type}`);
    }
}

export function getComparison(id: number) : ComparisonType {
    switch(id) {
        case 0: return 'EQUAL'
        case 1: return 'HIGHER'
        case 2: return 'LESS'
        case 3: return 'GREATER_OR_EQUAL'
        case 4: return 'LESS_OR_EQUAL'
        default: throw new Error(`Invalid comparison type ${id}`);
    }
}