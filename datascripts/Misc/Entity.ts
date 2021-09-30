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

import { TransformedClass, TransformedClassReadOnly } from "wotlkdata/cell/cells/EnumCell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { ArrayEntry } from "wotlkdata/cell/systems/ArraySystem";
import { CellSystem, CellSystemTop } from "wotlkdata/cell/systems/CellSystem";

export class MainEntity<T> extends CellSystemTop {
    @Transient
    readonly row: T;

    constructor(row: T) {
        super();
        this.row = row;
    }
}

export class TwoRowMainEntity<DBC,SQL> extends CellSystemTop {
    @Transient
    readonly dbc_row: DBC;

    @Transient
    readonly sql_row: SQL;

    constructor(dbc: DBC, sql: SQL) {
        super();
        this.dbc_row = dbc;
        this.sql_row = sql;
    }
}

export abstract class TransformedEntity<R,C> extends TransformedClass<C> {
    @Transient
    readonly row: R;
    constructor(row: R) {
        super();
        this.row = row;
    }
}

export abstract class TransformedEntityReadOnly<R,C> extends TransformedClassReadOnly<C> {
    @Transient
    readonly row: R;
    constructor(row: R) {
        super();
        this.row = row;
    }
}

export class ChildEntity<R,T extends MainEntity<R>> extends CellSystem<T> {
    @Transient
    get row() { return this.owner.row; }
}

export abstract class ArrayEntity<R,O,A extends ArrayEntry<O>> extends MainEntity<R> {
    filter(callback: (value: A, index: number)=>boolean) {
        let out: A[] = [];
        this.forEach((x,i)=>callback(x,i)?out.push(x):undefined)
        return out;
    }

    findIndex(callback: (value: A, index: number)=>boolean) {
        for(let i = 0; i< this.length; ++i) {
            let v = this.get(i);
            if(!v.isClear() && callback(v,i)) return i;
        }
        return -1;
    }

    find(callback: (value: A, index: number)=>boolean) {
        let index = this.findIndex(callback);
        return index >= 0 ? this.get(index) : undefined;
    }

    clear(index: number) {
        this.get(index).clear();
        return this;
    }

    clearAll() {
        for (let i = 0; i < this.length; ++i) {
            this.clear(i);
        }
        return this;
    }

    forEach(callback: (value: A, index: number)=>void) {
        for(let i = 0; i < this.length; ++i) {
            let v = this.get(i);
            if(!v.isClear()) callback(v,i);
        }
        return this;
    }

    addGet(): A {
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

    addMod(callback: (value: A)=>void) {
        callback(this.addGet());
        return this;
    }

    abstract get length(): number;

    mod(index: number, callback: (value: A)=>void) {
        callback(this.get(index));
        return this;
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