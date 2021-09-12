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
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Cell } from "wotlkdata/cell/cells/Cell";

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

export class ClassTypeCell<T> extends CellSystem<T> {
    protected cell: Cell<number,any>;

    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }

    set(value: ClassType) {
        this.cell.set(resolveClassType(value));
        return this.owner;
    }

    get() {
        return getClassType(this.cell.get());
    }
}

export function makeClassmask(races: ClassType[]) {
    return races
        .map(x=>resolveClassType(x))
        .reduce((p,c)=>p|(1<<(c-1)),0);
}