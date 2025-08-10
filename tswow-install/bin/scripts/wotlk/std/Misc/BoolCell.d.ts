import { Cell } from "../../../data/cell/cells/Cell";
export declare class BoolCell<T> extends Cell<boolean, T> {
    protected cell: Cell<number, any>;
    constructor(owner: T, cell: Cell<number, any>);
    get(): boolean;
    set(value: boolean | 1 | 0): T;
}
