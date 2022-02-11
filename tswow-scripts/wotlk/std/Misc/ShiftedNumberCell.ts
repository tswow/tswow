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

export enum ShiftedNumbers {
    STORED_AS_MINUS_ONE,
    STORED_AS_PLUS_ONE,
    NO_CHANGE,
}

export type ShiftedNumber = keyof typeof ShiftedNumbers

export enum ShiftedNumberConversions {
    EFFECTIVE,
    STORED,
}
export type ShiftedNumberConversion = keyof typeof ShiftedNumberConversions

export function convertShiftedNumber(
      value: number
    , type: ShiftedNumber
    , conv: ShiftedNumberConversion
) {
    if(conv === 'STORED') return value;
    switch(type) {
        case 'NO_CHANGE': return value;
        case 'STORED_AS_PLUS_ONE': return value + 1;
        case 'STORED_AS_MINUS_ONE': return value - 1;
    }
}

export class ShiftedNumberCell<T> extends CellSystem<T> {
    protected numberType: ShiftedNumber|(()=>ShiftedNumber)
    protected cell: Cell<number,any>

    protected getType() {
        return typeof(this.numberType) === 'function'
            ? this.numberType()
            : this.numberType
    }

    AsCell() {
        return this.cell;
    }

    constructor(owner: T, numberType: ShiftedNumber|(()=>ShiftedNumber), cell: Cell<number,any>) {
        super(owner);
        this.numberType = numberType
        this.cell = cell;
    }

    get Type() { return this.numberType; }

    objectify() {
        if(this.get('EFFECTIVE') !== this.get('STORED')) {
            return {
                  effective: this.get('EFFECTIVE')
                , stored: this.get('STORED')
            }
        } else {
            return this.get();
        }
    }

    set(value: number, conversion: ShiftedNumberConversion = 'STORED') {
        if(conversion === 'STORED') {
            this.cell.set(value)
        } else {
            switch(this.getType()) {
                case 'STORED_AS_MINUS_ONE':
                    this.cell.set(value-1);
                    break;
                case 'STORED_AS_PLUS_ONE':
                    this.cell.set(value+1);
                    break;
                case 'NO_CHANGE':
                    this.cell.set(value);
                    break;
            }
        }
        return this.owner;
    }

    get(conversion: ShiftedNumberConversion = 'STORED') {
        if(conversion === 'STORED') {
            return this.cell.get();
        } else {
            switch(this.getType()) {
                case 'STORED_AS_MINUS_ONE':
                    return this.cell.get()+1;
                case 'STORED_AS_PLUS_ONE':
                    return this.cell.get()-1;
                case 'NO_CHANGE':
                    return this.cell.get();
            }
        }
    }
}