/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";

export const ProbabilityUnits = [
    /** Probability between 0 and 1 */
    '[0-1]',
    /** Probability between 0 and 100 */
    '[0-100]',
    /** Probability between 1 and 101 (used by some blizzard fields) */
    '[1-101]',
    /** Probability between 0 and 99 (used by some blizzard fields) */
    '[0-99]',
    /** Automatically uses the source (getters) or target (setters) type */
    'AUTO'
] as const

export type ProbabilityUnit = typeof ProbabilityUnits[number]

export function convertProbability(
      num: number
    , from: ProbabilityUnit
    , to: ProbabilityUnit
): number {
    if(from === to || from === 'AUTO' || to === 'AUTO') return num;
    switch(from) {
        case '[0-1]':
            switch(to) {
                case '[0-100]': return num*100;
                case '[1-101]': return (num*100)+1;
                case '[0-99]': return num === 0 ? 0 : (num*100)-1
            }
            break;
        case '[0-100]':
            switch(to) {
                case '[0-1]': return num/100;
                case '[1-101]': return num+1;
                case '[0-99]': return num === 0 ? 0 : num-1;
            }
            break;
        case '[1-101]':
            switch(to) {
                case '[0-1]': return (num-1)/100;
                case '[0-100]': return num-1;
                case '[0-99]': return num<=1 ? 0 : num-2;
            }
        case '[0-99]':
            switch(to) {
                case '[0-1]': return num === 0 ? 0 : (num/100) - 1
                case '[0-100]': return num === 0 ? 0 : num - 1
                case '[1-101]': return num === 0 ? 0 : num + 2
            }
    }
    throw new Error(`Invalid probability conversion: ${from}->${to}`)
}

export class ProbabilityCell<T> extends CellSystem<T> {
    protected cell: Cell<number,any>
    protected unit: ProbabilityUnit

    constructor(owner: T, unit: ProbabilityUnit, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
        this.unit = unit;
    }

    get(type: ProbabilityUnit = this.unit): number {
        return convertProbability(this.cell.get(), this.unit, type);
    }

    set(value: number, type: ProbabilityUnit = this.unit): T {
        this.cell.set(convertProbability(value, type,this.unit))
        return this.owner;
    }

    objectify() {
        return `${convertProbability(this.cell.get(),this.unit,'[0-100]')}%`
    }
}