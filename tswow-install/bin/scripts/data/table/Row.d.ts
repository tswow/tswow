import { CellSystemTop } from '../cell/systems/CellSystem';
import { Table } from './Table';
export declare abstract class Row<C, Q> extends CellSystemTop {
    constructor(table: Table<C, Q, Row<C, Q>>);
    protected get fullKey(): string;
    protected table: Table<C, Q, Row<C, Q>>;
    static writePrimaryKeys(row: Row<any, any>, keys: any[]): void;
    static primaryKeyFields(row: Row<any, any>): any;
    static fullKey(row: Row<any, any>): string;
    protected abstract writePrimaryKeys(keys: any[]): void;
    protected primaryKeys(): any[];
    abstract isDeleted(): boolean;
    abstract delete(): void;
    abstract undelete(): void;
    copyTo(targetRow: this): void;
}
