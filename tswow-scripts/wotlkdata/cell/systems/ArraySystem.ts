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
import { CellSystem, CellSystemTop } from './CellSystem';

export abstract class ArraySystem<A extends ArrayEntry<T>, T> extends CellSystem<T> {
    constructor(owner: T) {
        super(owner);
    }

    clear(index: number) {
        this.get(index).clear();
        return this.owner;
    }

    clearAll() {
        for (let i = 0; i < this.length; ++i) {
            this.clear(i);
        }
        return this.owner;
    }

    protected getFree(): A {
        for (let i = 0; i < this.length; ++i) {
            const cur = this.get(i);
            if (cur.isClear()) {
                // Clear non-id fields
                cur.clear();
                return cur;
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    abstract get length(): number;
    mod(index: number, callback: (value: A)=>void): T {
        callback(this.get(index));
        return this.owner;
    }

    abstract get(index: number): A;

    objectify() {
        const values: any[] = [];
        for (let i = 0; i < this.length; ++i) {
            const v = this.get(i);
            if (v.isClear()) {
                values.push('<empty>')
            } else {
                values.push(v.objectify());
            }
        }
        return values;
    }
}

export abstract class ArrayEntry<T> extends CellSystemTop {
    protected container: T;

    constructor(owner: T, index: number) {
        super();
        this.container = owner;
        this.index = index;
    }

    readonly index: number;
    static getIndex(entry: ArrayEntry<any>) {
        return entry.index;
    }
    abstract clear(): this;
    abstract isClear(): boolean;
}