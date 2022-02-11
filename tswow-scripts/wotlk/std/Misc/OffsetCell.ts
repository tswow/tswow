import { Cell, CellWrapper } from "wotlkdata/wotlkdata/cell/cells/Cell";

export class OffsetCell<T> extends CellWrapper<number,T> {
    protected offset: number;

    constructor(owner: T, cell: Cell<number,any>, offset: number) {
        super(owner,cell);
        this.offset = offset;
    }

    set(value: number) {
        this.cell.set(value+this.offset);
        return this.owner;
    }

    get() {
        return this.cell.get()-this.offset;
    }
}