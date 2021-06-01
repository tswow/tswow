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

export type CPrim = number | string | boolean | bigint;

export abstract class Cell<D extends CPrim, T> extends CellRoot<T> {
    abstract get(): D;
    abstract set(value: D): T;

    protected objectify(): any {
        return this.get();
    }
}

export class CellWrapper<D extends CPrim, T> extends Cell<D, T> {
    constructor(owner: T, cell: Cell<D, any>) {
        super(owner);
        this.cell = cell;
    }

    protected cell: Cell<D, any>;
    get(): D {
        return this.cell.get();
    }

    set(value: D): T {
        this.cell.set(value);
        return this.owner;
    }

    protected objectify(): any {
        return this.cell.get();
    }
}

export class FunctionalCell<D extends CPrim,T> extends Cell<D,T> {
    protected setter: (value: D)=>any;
    protected getter: ()=>D;

    constructor(owner: T, getter: ()=>D, setter: (value: D)=>any) {
        super(owner);
        this.getter = getter;
        this.setter = setter;
    }
    get(): D {
        return this.getter();
    }

    set(value: D): T {
        this.setter(value);
        return this.owner;
    }
}