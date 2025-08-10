import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare class TrivialSkill<T> extends CellSystem<T> {
    lowCell: Cell<number, any>;
    highCell: Cell<number, any>;
    constructor(owner: T, lowCell: Cell<number, any>, highCell: Cell<number, any>);
    get Low(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get High(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    set(low: number, high: number): T;
}
