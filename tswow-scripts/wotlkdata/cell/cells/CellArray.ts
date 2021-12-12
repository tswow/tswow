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
import { Cell, CPrim } from './Cell';
import { CellRoot } from './CellRoot';

export abstract class CellArray<D extends CPrim, T> extends CellRoot<T> {
    get(): D[] {
        const array: D[] = [];
        for (let i = 0; i < this.length(); ++i) {
            array.push(this.getIndex(i));
        }
        return array;
    }
    set(value: D[]): T {
        for (let i = 0; i < Math.min(this.length(),value.length); ++i) {
            this.setIndex(i, value[i]);
        }
        return this.owner;
    }

    fill(value: D) {
        for(let i=0;i<this.length();++i) {
            this.setIndex(i, value);
        }
        return this.owner;
    }

    protected deserialize(value: any) {
        this.set(value);
    }

    abstract setIndex(index: number, value: D): T;
    abstract getIndex(index: number): D;
    abstract length(): number;

    protected objectify(): any {
        return this.get();
    }
}

export class CellArrayWrapper<D extends CPrim, T> extends CellArray<D, T> {
    protected cell: CellArray<D, any>;

    constructor(owner: T, cell: CellArray<D, any>) {
        super(owner);
        this.cell = cell;
    }

    length() {
        return this.cell.length();
    }

    setIndex(index: number, value: D): T {
        this.cell.setIndex(index, value);
        return this.owner;
    }

    getIndex(index: number): D {
        return this.cell.getIndex(index);
    }

    protected objectify(): any {
        return this.cell.get();
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