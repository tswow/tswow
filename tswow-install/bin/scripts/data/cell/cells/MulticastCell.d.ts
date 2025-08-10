import { Cell, CPrim } from "./Cell";
export declare class MulticastCell<D extends CPrim, T> extends Cell<D, T> {
    constructor(owner: T, cells: Cell<D, any>[]);
    exists(): boolean;
    protected cells: Cell<D, any>[];
    get(): D;
    set(value: D): T;
}
