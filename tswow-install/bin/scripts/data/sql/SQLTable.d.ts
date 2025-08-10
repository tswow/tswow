import { Table } from '../table/Table';
import { SqlRow } from './SQLRow';
export type SqlRowCreator<C, Q, R extends SqlRow<C, Q>> = (table: SqlTable<C, Q, R>, obj: {
    [key: string]: any;
}) => R;
export declare class SqlTable<C, Q, R extends SqlRow<C, Q>> extends Table<C, Q, R> {
    private cachedRows;
    private cachedFirst;
    protected rowCreator: SqlRowCreator<C, Q, R>;
    private get cachedValues();
    static cachedRowCount(table: SqlTable<any, any, any>): number;
    static cachedValues(table: SqlTable<any, any, any>): any[];
    static createRow<C, Q, R extends SqlRow<C, Q>>(table: SqlTable<C, Q, R>, obj: {
        [key: string]: any;
    }): R;
    static addRow<C, Q, R extends SqlRow<C, Q>>(table: SqlTable<C, Q, R>, row: R): void;
    constructor(name: string, rowCreator: SqlRowCreator<C, Q, R>);
    first(): R;
    queryAll(where: Q): R[];
    private isPkLookup;
    private filterInt;
    addRow(row: R): void;
    protected writeToFile(sqlfile: string): string;
    static writeSQL(table: SqlTable<any, any, any>): void;
}
