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
import { CellRoot } from './CellRoot';
import { CPrim } from './Cell';

export abstract class CellArray<D extends CPrim, T> extends CellRoot<T, D[]> {
    readonly length: number;

    static make<D extends CPrim, T>(owner: T, size: number, getter: (index: number) => D, setter: (index: number, value: D) => any) {
        return new CellArraySimple<D, T>(owner, size, getter, setter);
    }

    constructor(owner: T, length: number) {
        super(owner);
        this.length = length;
    }

    get(): D[] {
        const array: D[] = [];
        for (let i = 0; i < this.length; ++i) {
            array.push(this.getIndex(i));
        }
        return array;
    }
    set(value: D[]): T {
        for (let i = 0; i < this.length; ++i) {
            this.setIndex(i, value[i]);
        }
        return this.owner;
    }

    abstract setIndex(index: number, value: D): T;
    abstract getIndex(index: number): D;

    protected objectify(): any {
        return this.get();
    }
}

export class CellArraySimple<D extends CPrim, T> extends CellArray<D, T> {
    private setter: (index: number, value: D) => any;
    getIndex: (index: number) => D;
    setIndex(index: number, value: D) {
        this.setter(index, value);
        return this.owner;
    }
    constructor(owner: T, size: number, getter: (index: number) => D, setter: (index: number, value: D) => any) {
        super(owner, size);
        this.getIndex = getter;
        this.setIndex = setter;
        this.setter = setter;
    }
}
