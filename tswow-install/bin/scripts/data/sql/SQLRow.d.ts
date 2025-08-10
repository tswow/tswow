import { ObjectifyOptions } from '../cell/serialization/ObjectIteration';
import { Row } from '../table/Row';
import { SqlTable } from './SQLTable';
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
export declare abstract class SqlRow<C, Q> extends Row<C, Q> {
    protected obj: {
        [key: string]: any;
    };
    protected _dirty: boolean;
    protected _isDeleted: boolean;
    constructor(table: SqlTable<C, Q, SqlRow<C, Q>>, obj: {
        [key: string]: any;
    });
    /**
     * @warning Deleted base SQL rows (from the core) are not automatically restored when
     * building datascripts without the --rebuild flag. For example,
     * deleting creature_template entry=25 and later removing the deletion statement
     * will keep entry=25 deleted until it is explicitly undeleted
     * (OR MODIFIED IN ANY WAY) by a script,
     * OR datascripts are built with the --rebuild flag
     */
    delete(): this;
    undelete(): this;
    isDeleted(): boolean;
    static markDirty(row: SqlRow<any, any>): void;
    static isDirty(row: SqlRow<any, any>): boolean;
    static getSql(row: SqlRow<any, any>): string;
    static getRowObj(row: SqlRow<any, any>): {
        [key: string]: any;
    };
    protected writePrimaryKeys(keys: any[]): void;
    objectify(options?: ObjectifyOptions): {
        [key: string]: any;
    };
    protected _generatePreparedDeleteStatement(): string;
    protected _generatePreparedStatement(): string;
    protected _getPreparedStatements(): any[];
    protected _getPreparedDeleteValues(): any[];
    static generatePreparedStatement(row: SqlRow<any, any>): string;
    static generatePreparedDeleteStatement(row: SqlRow<any, any>): string;
    static getPreparedStatement(row: SqlRow<any, any>): any[];
    static getPreparedDeleteStatement(row: SqlRow<any, any>): any[];
    protected generateSql(): string;
    protected cloneInternal(keys: any[], c?: C): any;
}
