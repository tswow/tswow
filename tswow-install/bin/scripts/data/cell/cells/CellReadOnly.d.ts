import { CPrim } from './Cell';
import { CellRoot } from './CellRoot';
export declare abstract class CellReadOnly<D extends CPrim, T> extends CellRoot<T> {
    static make<D extends CPrim, T>(owner: T, getter: () => D, setter: (value: D) => T): CellSimpleReadOnly<D, T>;
    abstract get(): D;
    protected abstract set(value: D): T;
    protected objectify(): any;
    protected get isReadOnly(): boolean;
    protected deserialize(value: any): void;
    protected serialize(): void;
    static set<D extends CPrim>(cell: CellReadOnly<D, any>, value: D): void;
}
export declare class CellSimpleReadOnly<D extends CPrim, T> extends CellReadOnly<D, T> {
    get: () => D;
    protected set: (value: D) => T;
    constructor(owner: T, getter: () => D, setter: (value: D) => T);
}
export declare class CellWrapperReadOnly<D extends CPrim, T> extends CellReadOnly<D, T> {
    protected cell: CellReadOnly<D, any>;
    constructor(owner: T, cell: CellReadOnly<D, any>);
    get(): D;
    protected set(value: D): T;
}
