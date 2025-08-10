import { Cell, CPrim } from './Cell';
export declare class DummyCell<D extends CPrim, T> extends Cell<D, T> {
    protected value: D;
    constructor(owner: T, value: D);
    get(): D;
    set(value: D): T;
}
