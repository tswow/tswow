import { Row } from '../table/Row';
import { Table } from '../table/Table';
import { DBCBuffer } from './DBCBuffer';
/**
 * Represents a DBC row either in or outside of a DBC file.
 *
 * If you get one directly from a dbc file, editing its properties are
 * automatically saved to the dbc file.
 */
export declare abstract class DBCRow<C, Q> extends Row<C, Q> {
    constructor(table: Table<C, Q, DBCRow<C, Q>>, buffer: DBCBuffer, index: number);
    protected uniqueId: number;
    private _index;
    get index(): number;
    protected offset: number;
    protected buffer: DBCBuffer;
    static setIndex(row: DBCRow<any, any>, index: number): void;
    static getOffset(row: DBCRow<any, any>): number;
    delete(): this;
    isDeleted(): boolean;
    undelete(): this;
    protected writePrimaryKeys(keys: any[]): void;
    protected cloneInternal(keys: any[], c?: C): any;
    protected isStack(): this is DBCStackRow<C, Q>;
}
export declare abstract class DBCStackRow<C, Q> extends DBCRow<C, Q> {
    static writesIndex(row: DBCStackRow<any, any>): boolean;
    static stackSize(row: DBCStackRow<any, any>): number;
    static startId(row: DBCStackRow<any, any>): number;
    abstract writesIndex(): boolean;
    protected abstract stackSize(): number;
    protected abstract startId(): number;
    protected isStack(): this is DBCStackRow<C, Q>;
}
