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

export abstract class CellReadOnly<D extends CPrim, T> extends CellRoot<T> {
    static make<D extends CPrim, T>(owner: T, getter: () => D, setter: (value: D) => T) {
        return new CellSimpleReadOnly<D, T>(owner, getter, setter);
    }

    abstract get(): D;
    protected abstract set(value: D): T;

    protected objectify(): any {
        return this.get();
    }

    get isReadOnly() { return true; }

    protected deserialize(value: any) {
        throw new Error(`Attempting to deserialize read-only property`);
    }

    protected serialize() {}
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