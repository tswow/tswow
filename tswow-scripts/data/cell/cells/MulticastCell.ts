import { Cell, CPrim } from "./Cell";

export class MulticastCell<D extends CPrim,T> extends Cell<D,T> {
    constructor(owner: T, cells: Cell<D,any>[]) {
        super(owner);
        this.cells = cells;
        // always initialize multicast cells
        this.set(this.get());
    }

    exists() { return true; }

    protected cells: Cell<D,any>[];

    get(): D {
        return this.cells[0].get();
    }

    set(value: D): T {
        this.cells.forEach(x=>x.set(value));
        return this.owner;
    }
}