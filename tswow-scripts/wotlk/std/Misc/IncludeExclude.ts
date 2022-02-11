import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { MaskCell } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";

export class IncludeExcludeMask<T,M extends MaskCell<T>> extends CellSystem<T> {
    readonly Include: M;
    readonly Exclude: M;

    constructor(owner: T,include: M, exclude: M) {
        super(owner);
        this.Include = include;
        this.Exclude = exclude;
    }
}

export class IncludeExclude<V extends CPrim,T> extends CellSystem<T> {
    readonly Include: Cell<V, T>;
    readonly Exclude: Cell<V, T>;

    constructor(owner: T,include: Cell<V, T>, exclude: Cell<V, T>) {
        super(owner);
        this.Include = include;
        this.Exclude = exclude;
    }
}