import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare class Substruct<T, O> extends CellSystem<T> {
    protected realOwner: O;
    constructor(owner: T, realOwner: O);
    injectThis(self: any): void;
}
