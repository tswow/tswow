import { CellReadOnly } from './CellReadOnly';
export type CPrim = number | string | boolean | bigint;
export declare abstract class Cell<D extends CPrim, T> extends CellReadOnly<D, T> {
    abstract get(): D;
    abstract set(value: D): T;
    protected objectify(): any;
    protected deserialize(value: any): void;
    protected get isReadOnly(): boolean;
}
export declare class CellWrapper<D extends CPrim, T> extends Cell<D, T> {
    constructor(owner: T, cell: Cell<D, any>);
    protected cell: Cell<D, any>;
    get(): D;
    set(value: D): T;
    protected objectify(): any;
}
export declare class FunctionalCell<D extends CPrim, T> extends Cell<D, T> {
    protected setter: (value: D) => any;
    protected getter: () => D;
    constructor(owner: T, getter: () => D, setter: (value: D) => any);
    get(): D;
    set(value: D): T;
}
export declare class CellUnlocker<D extends CPrim, T> extends Cell<D, T> {
    protected cell: CellReadOnly<D, any>;
    constructor(owner: T, cell: CellReadOnly<D, any>);
    get(): D;
    set(value: D): T;
}
