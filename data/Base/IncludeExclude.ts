import { Cell, CPrim } from "wotlkdata/cell/Cell";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { MaskBase } from "wotlkdata/cell/systems/Mask";

export class IncludeExcludeMask<T,M extends MaskBase<T>> extends Subsystem<T> {
    readonly Include: M;
    readonly Exclude: M;

    constructor(owner: T,include: M, exclude: M) {
        super(owner);
        this.Include = include;
        this.Exclude = exclude;
    }
}

export class IncludeExclude<V extends CPrim,T> extends Subsystem<T> {
    readonly Include: Cell<V, T>;
    readonly Exclude: Cell<V, T>;

    constructor(owner: T,include: Cell<V, T>, exclude: Cell<V, T>) {
        super(owner);
        this.Include = include;
        this.Exclude = exclude;
    }
}