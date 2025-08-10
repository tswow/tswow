import { Cell, CPrim } from './Cell';
import { CellRoot } from './CellRoot';
export declare abstract class CellArray<D extends CPrim, T> extends CellRoot<T> {
    get(): D[];
    set(value: D[]): T;
    fill(value: D): T;
    protected deserialize(value: any): void;
    abstract setIndex(index: number, value: D): T;
    abstract getIndex(index: number): D;
    abstract length(): number;
    protected objectify(): any;
}
export declare class CellArrayWrapper<D extends CPrim, T> extends CellArray<D, T> {
    protected cell: CellArray<D, any>;
    constructor(owner: T, cell: CellArray<D, any>);
    length(): number;
    setIndex(index: number, value: D): T;
    getIndex(index: number): D;
    protected objectify(): any;
}
export declare class CellIndexWrapper<D extends CPrim, T> extends Cell<D, T> {
    protected cell: CellArray<D, any>;
    protected index: number;
    constructor(owner: T, cell: CellArray<D, any>, index: number);
    get(): D;
    set(value: D): T;
}
