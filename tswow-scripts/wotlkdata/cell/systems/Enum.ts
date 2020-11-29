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
import { Cell } from '../Cell';
import { Subsystem } from '../Subsystem';

export abstract class EnumBase<T> extends Subsystem<T> {
    abstract get(): number;
    abstract set(value: number): T;
}

function getEnumFieldName(name: string) {
    if (name.startsWith('set') && name.length > 3) {
        return name.substring(3);
    } else {
        return name;
    }
}

export class Enum<T> extends EnumBase<T> {

    constructor(owner: T, cell: Cell<number, any>) {
        super(owner);
        this.cell = cell;
    }

    private cell: Cell<number, any>;
    static getEnumKey(obj: any, index: number) {
        if (obj === undefined) {
            return index;
        }
        return obj.enumKeys ? obj.enumKeys[index] || index : index;
    }

    get(): number {
        return this.cell.get();
    }

    set(value: number): T {
        this.cell.set(value);
        return this.owner;
    }

    objectify() {
        return Enum.getEnumKey(this, this.get());
    }
}

export function EnumField(index: number) {
    return function(prototype: any, field: string) {
        if (prototype.enumKeys === undefined) {
            prototype.enumKeys = {};
        }
        prototype.enumKeys[index] = getEnumFieldName(field);
    };
}
