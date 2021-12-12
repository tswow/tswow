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
import { CPrim } from './Cell';
import { CellRoot } from './CellRoot';

export abstract class CellReadOnly<D extends CPrim, T> extends CellRoot<T> {
    static make<D extends CPrim, T>(owner: T, getter: () => D, setter: (value: D) => T) {
        return new CellSimpleReadOnly<D, T>(owner, getter, setter);
    }

    abstract get(): D;
    protected abstract set(value: D): T;

    protected objectify(): any {
        return this.get();
    }

    protected get isReadOnly() { return true; }

    protected deserialize(value: any) {
        throw new Error(`Attempting to deserialize read-only property`);
    }

    protected serialize() {}

    static set<D extends CPrim>(cell: CellReadOnly<D,any>, value: D) {
        cell.set(value);
    }
}

export class CellSimpleReadOnly<D extends CPrim, T> extends CellReadOnly<D, T> {
    get: () => D;
    protected set: (value: D) => T;
    constructor(owner: T, getter: () => D, setter: (value: D) => T) {
        super(owner);
        this.get = getter;
        this.set = setter;
    }
}

export class CellWrapperReadOnly<D extends CPrim,T> extends CellReadOnly<D,T> {
    protected cell: CellReadOnly<D,any>;

    constructor(owner: T, cell: CellReadOnly<D,any>) {
        super(owner);
        this.cell = cell;
    }

    get(): D {
        return this.cell.get();
    }

    protected set(value: D): T {
        CellReadOnly.set(this.cell, value);
        return this.owner;
    }
}