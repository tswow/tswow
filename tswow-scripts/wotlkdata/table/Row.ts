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
import { Table } from './Table';
import { deepAssign } from './DeepAssign';
import { MainSystem } from '../cell/MainSystem';
import { PKFIELDS_FIELD } from './PrimaryKey';

export abstract class Row<C, Q> extends MainSystem {
    constructor(table: Table<C, Q, Row<C, Q>>) {
        super();
        this.table = table;
    }

    protected get fullKey() { return this.primaryKeys().join('_'); }

    protected table: Table<C, Q, Row<C, Q>>;
    static writePrimaryKeys(row: Row<any, any>, keys: any[]) {
        row.writePrimaryKeys(keys);
    }

    static primaryKeyFields(row: Row<any, any>) {
        return (row as any)[PKFIELDS_FIELD] || [];
    }

    static fullKey(row: Row<any, any>) {
        return row.fullKey;
    }

    protected abstract writePrimaryKeys(keys: any[]): void;

    protected primaryKeys(): any[] {
        return Row.primaryKeyFields(this).map((x: any) => (this as any)[x].get());
    }

    copyTo(targetRow: this) {
        const pks = targetRow.primaryKeys();
        MainSystem.cloneFrom(targetRow, this);
        targetRow.writePrimaryKeys(pks);
    }
}
