import { CellSystem } from "../systems/CellSystem";
import { Cell, CPrim } from "./Cell";
export declare class ContainerCell<T extends CPrim, O> extends Cell<T, O> {
    protected value: T;
    constructor(owner: O, value: T);
    get(): T;
    set(value: T): O;
}
export declare class ObjContainerCell<T, O> extends CellSystem<O> {
    protected value: T;
    constructor(owner: O, value: T);
    get(): T;
    set(value: T): O;
    mod(callback: (value: T) => void): O;
}
