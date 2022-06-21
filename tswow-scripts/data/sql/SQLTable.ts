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
import { inMemory } from '../query/Query';
import { Row } from '../table/Row';
import { Table } from '../table/Table';
import { SqlConnection } from './SQLConnection';
import { SqlRow } from './SQLRow';

export type SqlRowCreator<C, Q, R extends SqlRow<C, Q>> = (table: SqlTable<C, Q, R>, obj: {[key: string]: any}) => R;

export class SqlTable<C, Q, R extends SqlRow<C, Q>> extends Table<C, Q, R> {
    private cachedRows: {[key: string]: R} = {};
    private cachedFirst: R | undefined;
    protected rowCreator: SqlRowCreator<C, Q, R>;

    private get cachedValues() {
        return Object.values(this.cachedRows);
    }

    static cachedRowCount(table: SqlTable<any, any, any>) {
        return Object.values(table.cachedRows).length;
    }

    static cachedValues(table: SqlTable<any, any, any>)  {
        return table.cachedValues;
    }

    static createRow<C, Q, R extends SqlRow<C, Q>>(table: SqlTable<C, Q, R>, obj: {[key: string]: any}): R {
        return table.rowCreator(table, obj);
    }

    static addRow<C, Q, R extends SqlRow<C, Q>>(table: SqlTable<C, Q, R>, row: R) {
        table.cachedRows[Row.fullKey(row)] = row;
    }

    constructor(name: string, rowCreator: SqlRowCreator<C, Q, R>) {
        super(name);
        this.rowCreator = rowCreator;
    }

    first(): R {
        if (this.cachedFirst) {
            return this.cachedFirst;
        }
        this.cachedFirst = this.filterInt({} as any, true)[0];
        if (!this.cachedFirst) {
            this.cachedFirst = this.rowCreator(this, {});
        }
        return this.cachedFirst;
    }

    queryAll(where: Q): R[] {
        return this.filterInt(where, false);
    }

    private isPkLookup(where: Q): string {
        let fields: string[] = Row.primaryKeyFields(this.rowCreator(this,{}));
        if(fields.length != Object.entries(where).length) {
            return undefined;
        }
        for(let field of fields) {
            if(where[field] === undefined) {
                return undefined;
            }

            if(typeof(where[field]) == 'object') {
                return undefined;
            }
        }
        return fields.map(x=>where[x]).join('_')
    }

    private filterInt(where: Q, firstOnly = false): R[] {
        // Try looking up using only primary key
        let pkLookup = this.isPkLookup(where);
        let cacheMatches: R[] = []
        if(pkLookup) {
            let row = this.cachedRows[pkLookup];
            if(row) {
                return [row];
            }
        } else {
            for(let key in this.cachedRows) {
                let value = this.cachedRows[key];
                if(inMemory(where, value)) {
                    cacheMatches.push(value);
                }
            }
        }

        const dbMatches = SqlConnection.getRows(this, where, firstOnly)
            .filter(x => !this.cachedRows[Row.fullKey(x)]);
        dbMatches.forEach(x => this.cachedRows[Row.fullKey(x)] = x);
        return cacheMatches.concat(dbMatches);
    }

    addRow(row: R) {
        this.cachedRows[Row.fullKey(row)] = row;
    }

    // TODO/sqltable
    protected writeToFile(sqlfile: string): string {
        const dirtyRows = this.cachedValues.filter(SqlRow.isDirty);
        if (dirtyRows.length === 0) { return sqlfile; }
        return sqlfile + `--${this.name}\n` + dirtyRows.map(x => SqlRow.getSql(x)).join('\n') + '\n';
    }

    static writeSQL(table: SqlTable<any,any,any>) {
        // Very stupid
        let dummyRow: SqlRow<any,any>
        for(let row in table.cachedRows) {
            dummyRow = table.cachedRows[row];
            break;
        }
        if(!dummyRow) {
            return;
        }

        const normalQuery = SqlRow.generatePreparedStatement(dummyRow);
        const deleteQuery = SqlRow.generatePreparedDeleteStatement(dummyRow);

        let normalStatement = SqlConnection.world_dst.prepare(normalQuery)
        let deleteStatement = SqlConnection.world_dst.prepare(deleteQuery)

        SqlConnection.world_dst.prepare(table.rowCreator(table,{}))

        let values = table.cachedValues.filter(SqlRow.isDirty)

        values.forEach((x: SqlRow<any,any>)=>{
                if(x.isDeleted()) {
                    deleteStatement.writeNormal(SqlRow.getPreparedDeleteStatement(x))
                } else {
                    normalStatement.writeNormal(SqlRow.getPreparedStatement(x))
                }
                //SqlConnection.world_dst.write(SqlRow.getSql(x))
            });
        table.cachedRows = {};
    }
}
