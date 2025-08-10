import { Table } from '../table/Table';
import { DBCBuffer } from './DBCBuffer';
import { DBCRow } from './DBCRow';
export type AnyFile = DBCFile<any, any, any>;
export type DBCRowCreator<C, Q, R extends DBCRow<C, Q>> = (table: DBCFile<C, Q, R>, buffer: DBCBuffer, offset: number) => R;
/**
 * Represents an entire DBC file loaded in memory, with all rows fully loaded.
 */
export declare class DBCFile<C, Q, R extends DBCRow<C, Q>> extends Table<C, Q, R> {
    private loaded;
    protected buffer: DBCBuffer;
    protected rowMaker: DBCRowCreator<C, Q, R>;
    constructor(name: string, rowMaker: DBCRowCreator<C, Q, R>);
    private checkSort;
    binarySort(minVal: number, scorer: (row: R) => number): void;
    quickSort(comparator: (row1: R, row2: R) => number): void;
    swap(index1: number, index2: number): void;
    move(fromIndex: number, toIndex: number): void;
    static getBuffer(file: DBCFile<any, any, any>): DBCBuffer;
    static createRow(file: DBCFile<any, any, any>, offset: number): any;
    get rowCount(): number;
    isLoaded(): boolean;
    write(filePath: string): void;
    private defaultPath;
    first(): R;
    read(dbcpath?: string): this;
    private load;
    protected makeRow(index: number): R;
    highest(callback: (row: R) => number): R;
    lowest(callback: (row: R) => number): R;
    protected fastSearch(value: number): R;
    getName(): string;
    getRow(index: number): R;
    queryAll(predicate: Q): R[];
}
