import { Cell } from "../../../data/cell/cells/Cell";

export class BoolCell<T> extends Cell<boolean,T> {
    protected cell: Cell<number,any>

    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }

    get(): boolean {
        return this.cell.get() === 0 ? false : true
    }

    set(value: boolean|1|0): T {
        this.cell.set(typeof(value) === 'number' ? value : value === true ? 1 : 0);
        return this.owner;
    }
}