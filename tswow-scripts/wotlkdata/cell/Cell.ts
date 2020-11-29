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
import { CellArray } from './CellArray';
import { CellRoot } from './CellRoot';

export type CPrim = number | string | boolean | bigint;

export abstract class Cell<D extends CPrim, T> extends CellRoot<T, D> {
    static make<D extends CPrim, T>(owner: T, getter: () => D, setter: (value: D) => any) {
        return new CellSimple<D, T>(owner, getter, setter);
    }

    static wrapIndex<D extends CPrim>(cell: CellArray<D, any>, index: number) {
        return new CellIndexWrapper(undefined, cell, index);
    }

    abstract get(): D;
    abstract set(value: D): T;

    protected objectify(): any {
        return this.get();
    }
}

export class CellIndexWrapper<D extends CPrim, T> extends Cell<D, T> {
    protected cell: CellArray<D, any>;
    protected index: number;

    constructor(owner: T, cell: CellArray<D, any>, index: number) {
        super(owner);
        this.cell = cell;
        this.index = index;
    }

    get(): D {
        return this.cell.getIndex(this.index);
    }

    set(value: D): T {
        this.cell.setIndex(this.index, value);
        return this.owner;
    }
}

export class CellSimple<D extends CPrim, T> extends Cell<D, T> {
    private setter: (value: D) => any;
    get: () => D;

    set(value: D) {
        this.setter(value);
        return this.owner;
    }
    constructor(owner: T, getter: () => D, setter: (value: D) => any) {
        super(owner);
        this.get = getter;
        this.setter = setter;
    }
}

