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
import { CellSystem } from '../cell/systems/CellSystem';
import { Row } from '../table/Row';
import { Table } from '../table/Table';
import { DBCBuffer } from './DBCBuffer';
import { DBCFile } from './DBCFile';

/**
 * Represents a DBC row either in or outside of a DBC file.
 *
 * If you get one directly from a dbc file, editing its properties are
 * automatically saved to the dbc file.
 */
export abstract class DBCRow<C, Q> extends Row<C, Q> {
    constructor(table: Table<C, Q, DBCRow<C, Q>>, buffer: DBCBuffer, index: number) {
        super(table);
        this.buffer = buffer;
        this._index = index;
        this.offset = index * this.buffer.rowSize;
    }

    protected uniqueId = 0;
    private _index: number;
    get index() {return this._index; }
    protected offset: number;
    protected buffer: DBCBuffer;

    static setIndex(row: DBCRow<any, any>, index: number) {
        row._index = index;
        row.offset = row.index * row.buffer.rowSize;
    }

    static getOffset(row: DBCRow<any, any>) {
        return row.offset;
    }

    delete() {
        this.buffer.delete(this._index);
        return this;
    }

    isDeleted() {
        return this.buffer.isDeleted(this._index);
    }

    undelete() {
        this.buffer.undelete(this._index);
        return this;
    }

    protected writePrimaryKeys(keys: any[]) {
        Row.primaryKeyFields(this).forEach((x: any, i: number) => {
            (this as any)[x].set(keys[i]);
        });
    }

    protected cloneInternal(keys: any[], c?: C) {
        const index = this.buffer.addRow(this.index);
        const row = DBCFile.createRow(this.table as DBCFile<any, any, any>, index);
        if (c) {
            CellSystem.cloneFrom(row, c);
        }
        row.writePrimaryKeys(keys);
        return row;
    }

    protected isStack(): this is DBCStackRow<C, Q> {
        return false;
    }
}

export abstract class DBCStackRow<C, Q> extends DBCRow<C, Q> {
    static writesIndex(row: DBCStackRow<any, any>) {
        return row.writesIndex();
    }

    static stackSize(row: DBCStackRow<any, any>) {
        return row.stackSize();
    }

    static startId(row: DBCStackRow<any, any>) {
        return row.startId();
    }

    abstract writesIndex(): boolean;

    protected abstract stackSize(): number;
    protected abstract startId(): number;

    protected isStack() {
        return true;
    }
}
