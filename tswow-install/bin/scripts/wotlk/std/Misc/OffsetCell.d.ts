import { Cell, CellWrapper } from "../../../data/cell/cells/Cell";
export declare class OffsetCell<T> extends CellWrapper<number, T> {
    protected offset: number;
    constructor(owner: T, cell: Cell<number, any>, offset: number);
    set(value: number): T;
    get(): number;
}
