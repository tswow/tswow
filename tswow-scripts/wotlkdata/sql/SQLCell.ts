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
import { Cell, CPrim } from '../cell/cells/Cell';
import { CellReadOnly } from '../cell/cells/CellReadOnly';
import { SqlRow } from './SQLRow';

export class SQLCell<D extends CPrim, T extends SqlRow<any, any>> extends Cell<D, T> {
    protected name: string;
    constructor(owner: T, name: string) {
        super(owner);
        this.name = name;
    }

    get(): D {
        return SqlRow.getRowObj(this.owner)[this.name];
    }

    set(value: D): T {
        SqlRow.markDirty(this.owner);
        SqlRow.getRowObj(this.owner)[this.name] = value;
        return this.owner;
    }

    exists() {
        return true;
    }
}

export class SQLCellReadOnly<D extends CPrim, T extends SqlRow<any, any>> extends CellReadOnly<D, T> {
    protected name: string;
    constructor(owner: T, name: string) {
        super(owner);
        this.name = name;
    }

    protected set(value: D) {
        SqlRow.markDirty(this.owner);
        SqlRow.getRowObj(this.owner)[this.name] = value;
        return this.owner;
    }

    static set<D extends CPrim>(cell: SQLCellReadOnly<D,any>, v: D) {
        cell.set(v);
    }

    get(): D {
        return SqlRow.getRowObj(this.owner)[this.name];
    }
}
