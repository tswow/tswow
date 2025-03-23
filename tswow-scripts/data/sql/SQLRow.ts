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
import { ObjectifyOptions } from '../cell/serialization/ObjectIteration';
import { CellSystem } from '../cell/systems/CellSystem';
import { Row } from '../table/Row';
import { SqlTable } from './SQLTable';
import { translate } from './SQLTranslate';

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
    protected _isDeleted = false;

    constructor(table: SqlTable<C, Q, SqlRow<C, Q>>, obj: {[key: string]: any}) {
        super(table);
        this.obj = obj;
    }

    /**
     * @warning Deleted base SQL rows (from the core) are not automatically restored when
     * building datascripts without the --rebuild flag. For example,
     * deleting creature_template entry=25 and later removing the deletion statement
     * will keep entry=25 deleted until it is explicitly undeleted
     * (OR MODIFIED IN ANY WAY) by a script,
     * OR datascripts are built with the --rebuild flag
     */
    delete() {
        this._isDeleted = true;
        this._dirty = true;
        return this;
    }

    undelete() {
        this._isDeleted = false;
        this._dirty = true;
        return this;
    }

    isDeleted() {
        return this._isDeleted;
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
    objectify(options?: ObjectifyOptions) {
        // ???????
        return Object.assign({}, this.obj);
    }

    protected _generatePreparedDeleteStatement() {
        const pkFields: string[] = Row.primaryKeyFields(this);
        const text = `DELETE FROM ${this.table.name} WHERE `
        + `${pkFields.map((x)=>{
            return `${x} = ?`
        }).join(' AND ')};`
        return text;
    }

    protected _generatePreparedDeleteStatementBulk(rows: number): string {
        const pkFields: string[] = Row.primaryKeyFields(this);
    
        if (pkFields.length === 0) {
            throw new Error("No primary key fields found for bulk delete.");
        }
    
        if (pkFields.length === 1) {
            // Single-column primary key case: Use `IN`
            const placeholders = new Array(rows).fill('?').join(',');
            return `DELETE FROM ${this.table.name} WHERE \`${pkFields[0]}\` IN (${placeholders});`;
        } else {
            // Multi-column primary key case: Use multiple `WHERE` conditions
            const whereClause = pkFields.map((x) => `\`${x}\` = ?`).join(' AND ');
            const bulkWhereClauses = new Array(rows).fill(`(${whereClause})`).join(' OR ');
    
            return `DELETE FROM ${this.table.name} WHERE ${bulkWhereClauses};`;
        }
    }

    protected _generateSQLStatementFields() {
        const obj = this.objectify();

        return `REPLACE INTO ${this.table.name} ` +
            `(${Object.keys(obj).map(x=>`\`${x}\``).join(',')}) ` +
            `VALUES `;
    }

    protected _generatePreparedStatement() {
        const obj = this.objectify();
        return `REPLACE INTO ${this.table.name} ` +
            `(${Object.keys(obj).map(x=>`\`${x}\``).join(',')}) ` +
            `VALUES (${Object.values(obj).map(() => '?')})`
    }

    protected _generatePreparedStatementBulk(rows: number): string {
        const obj = this.objectify();
        const columns = Object.keys(obj).map(x => `\`${x}\``).join(',');
        const valuesPlaceholders = Object.values(obj)
            .map(() => '?')
            .join(',');
    
        // Create a single placeholder group for each insert
        const insertPlaceholders = `(${valuesPlaceholders})`;
    
        // Repeat the placeholders for the number of inserts
        const bulkPlaceholders = new Array(rows).fill(insertPlaceholders).join(',');
    
        return `REPLACE INTO ${this.table.name} (${columns}) VALUES ${bulkPlaceholders}`;
    }
    

    protected _getPreparedStatements() {
        return Object.values(this.objectify())
    }

    protected _getPreparedDeleteValues() {
        return this.primaryKeys();
    }

    static generatePreparedStatement(row: SqlRow<any,any>) {
        return row._generatePreparedStatement();
    }

    static generatePreparedStatementBulk(row: SqlRow<any,any>, rows: number) {
        return row._generatePreparedStatementBulk(rows);
    }

    static generatePreparedDeleteStatement(row: SqlRow<any,any>) {
        return row._generatePreparedDeleteStatement();
    }

    static generatePreparedDeleteStatementBulk(row: SqlRow<any,any>, chunk_size: number) {
        return row._generatePreparedDeleteStatementBulk(chunk_size);
    }

    static getPreparedStatement(row: SqlRow<any,any>) {
        return row._getPreparedStatements();
    }

    static getPreparedStatementRaw(row: SqlRow<any,any>) {
        return row._generatePreparedStatement();
    }

    static getSQLStatementFields(row: SqlRow<any,any>) {
        return row._generateSQLStatementFields();
    }

    static getPreparedDeleteStatement(row: SqlRow<any,any>) {
        return row._getPreparedDeleteValues();
    }

    protected generateSql() {
        const obj = this.objectify();
        translate(this.table.name,obj,'OUT')
        for(let key in obj) {
            if(typeof(obj[key]) == 'string') {
                obj[key] = obj[key].split('\\').join('\\\\').split('"').join('\\"')
            }
        }
        if(this.isDeleted()) {
            const pkFields: string[] = Row.primaryKeyFields(this);
            const text = `DELETE FROM ${this.table.name} WHERE `
            + `${pkFields.map((x)=>{
                const value = obj[x];
                return `${x} = ${typeof(value)=='string'?`"${value}"`:value}`
            }).join(' AND ')};`
            return text;
        }

        return `REPLACE INTO ${this.table.name} ` +
        `(${Object.keys(obj).map(x=>`\`${x}\``).join(',')}) ` +
        `VALUES (${Object.values(obj).map(x => x === null ? 'null' : typeof(x) === 'string' ? `"${x}"` : x)})`;
    }

    protected cloneInternal(keys: any[], c?: C) {
        const row = SqlTable.createRow(this.table as SqlTable<any, any, any>, {});
        CellSystem.cloneFrom(row, this);
        if (c) {
            CellSystem.cloneFrom(row, c);
        }
        row.writePrimaryKeys(keys);
        SqlTable.addRow(this.table as SqlTable<any, any, any>, row);
        return row;
    }
}