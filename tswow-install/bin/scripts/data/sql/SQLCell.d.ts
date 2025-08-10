import { Cell, CPrim } from '../cell/cells/Cell';
import { CellReadOnly } from '../cell/cells/CellReadOnly';
import { SqlRow } from './SQLRow';
export declare class SQLCell<D extends CPrim, T extends SqlRow<any, any>> extends Cell<D, T> {
    protected name: string;
    constructor(owner: T, name: string);
    get(): D;
    set(value: D): T;
    exists(): boolean;
}
export declare class SQLCellReadOnly<D extends CPrim, T extends SqlRow<any, any>> extends CellReadOnly<D, T> {
    protected name: string;
    constructor(owner: T, name: string);
    protected set(value: D): T;
    static set<D extends CPrim>(cell: SQLCellReadOnly<D, any>, v: D): void;
    get(): D;
}
