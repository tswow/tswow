import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { MaskCell } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare class IncludeExcludeMask<T, M extends MaskCell<T>> extends CellSystem<T> {
    readonly Include: M;
    readonly Exclude: M;
    constructor(owner: T, include: M, exclude: M);
}
export declare class IncludeExcludeGeneric<T, M, N> extends CellSystem<T> {
    readonly Include: M;
    readonly Exclude: N;
    constructor(owner: T, include: M, exclude: N);
}
export declare class IncludeExclude<V extends CPrim, T> extends CellSystem<T> {
    readonly Include: Cell<V, T>;
    readonly Exclude: Cell<V, T>;
    constructor(owner: T, include: Cell<V, T>, exclude: Cell<V, T>);
}
