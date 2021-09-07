import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Cell } from "wotlkdata/cell/cells/Cell";

export class MinMaxCell<T> extends CellSystem<T> {
    protected minCell: Cell<number,any>;
    protected maxCell: Cell<number,any>;

    
    constructor(owner: T,minCell: Cell<number,any>, maxCell: Cell<number,any>) {
        super(owner);
        this.minCell = minCell;
        this.maxCell = maxCell;
    }

    get Min() { return this.ownerWrap(this.minCell); }
    get Max() { return this.ownerWrap(this.maxCell); }

    set(min: number, max: number) {
        this.Min.set(min);
        this.Max.set(max);
        return this.owner;
    }
}