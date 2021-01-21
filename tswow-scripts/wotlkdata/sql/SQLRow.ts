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
import { SqlTable } from './SQLTable';
import { Row } from '../table/Row';
import { MainSystem } from '../cell/MainSystem';

/**
 * Represents a single row in the SQL table. If this row was loaded directly from the db,
 * changes made to it will automatically be written to the database once your patch
 * is finished.
 *
 * @motivation I wanted SqlRows to behave as similar to DBCRows as possible, which is
 * why we write changes to things read directly from source to be applied automatically.
 *
 * @details To automatically apply changes, we keep all loaded SqlRows in the current connection,
 * and keep a dirty tag on each which enables if we change any property on it. When a patch has been applied,
 * the sql connection checks through all loaded rows and writes them if they're dirty.
 */
export abstract class SqlRow<C, Q> extends Row<C, Q> {
    protected obj: {[key: string]: any};
    protected _dirty = false;

    constructor(table: SqlTable<C, Q, SqlRow<C, Q>>, obj: {[key: string]: any}) {
        super(table);
        this.obj = obj;
    }

    static markDirty(row: SqlRow<any, any>) {
        row._dirty = true;
    }

    static isDirty(row: SqlRow<any, any>) {
        return row._dirty;
    }

    static getSql(row: SqlRow<any, any>): string {
        return row.generateSql();
    }

    static getRowObj(row: SqlRow<any, any>): {[key: string]: any} {
        return row.obj;
    }

    protected writePrimaryKeys(keys: any[]) {
        this._dirty = true;
        Row.primaryKeyFields(this).forEach((x: any, i: number) => {
            this.obj[x] = keys[i];
        });
    }

    // TODO: This doesn't work, don't know why.
    objectify() {
        return Object.assign({}, this.obj);
    }

    protected generateSql() {
        // @CACHE
        const obj = this.objectify();
        return `INSERT INTO ${this.table.name} ` +
        `(${Object.keys(obj).join(',')}) ` +
        `VALUES (${Object.values(obj).map(x => x === null ? 'null' : typeof(x) === 'string' ? `"${x}"` : x)}) ` +
        `ON DUPLICATE KEY UPDATE ` +
        `${Object.keys(obj).map(x => `${x} = ${obj[x] === null ? 'null' : typeof(obj[x]) === 'string' ? `"${obj[x]}"` : obj[x]}`).join(', ')}`;
    }

    protected cloneInternal(keys: any[], c?: C) {
        const row = SqlTable.createRow(this.table as SqlTable<any, any, any>, {});
        MainSystem.cloneFrom(row, this);
        if (c) {
            MainSystem.cloneFrom(row, c);
        }
        row.writePrimaryKeys(keys);
        SqlTable.addRow(this.table as SqlTable<any, any, any>, row);
        return row;
    }
}