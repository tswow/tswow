import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export declare class MinMaxCell<T> extends CellSystem<T> {
    protected minCell: Cell<number, any>;
    protected maxCell: Cell<number, any>;
    constructor(owner: T, minCell: Cell<number, any>, maxCell: Cell<number, any>);
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    is(min: number, max: number): boolean;
    isWithin(lowerMin: number, upperMax: number): boolean;
    isAbove(lowerMin: number): boolean;
    isBelow(upperMax: number): boolean;
    set(min: number, max: number): T;
}
export declare class MinTargetMaxCell<T> extends CellSystem<T> {
    protected minCell: Cell<number, any>;
    protected targetCell: Cell<number, any>;
    protected maxCell: Cell<number, any>;
    constructor(owner: T, minCell: Cell<number, any>, targetCell: Cell<number, any>, maxCell: Cell<number, any>);
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Target(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    isWithin(lowerMin: number, upperMax: number): boolean;
    isAbove(lowerMin: number): boolean;
    isBelow(upperMax: number): boolean;
    set(min: number, target: number, max: number): T;
}
export declare class MinMax2DCell<T> extends CellSystem<T> {
    protected minX: Cell<number, any>;
    protected minY: Cell<number, any>;
    protected maxX: Cell<number, any>;
    protected maxY: Cell<number, any>;
    constructor(owner: T, minX: Cell<number, any>, minY: Cell<number, any>, maxX: Cell<number, any>, maxY: Cell<number, any>);
    get MinX(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get MinY(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get MaxX(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get MaxY(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    set(minX: number, minY: number, maxX: number, maxY: number): T;
}
export declare class Boundary<T> extends CellSystem<T> {
    protected left: Cell<number, any>;
    protected top: Cell<number, any>;
    protected right: Cell<number, any>;
    protected bottom: Cell<number, any>;
    constructor(owner: T, left: Cell<number, any>, top: Cell<number, any>, right: Cell<number, any>, bottom: Cell<number, any>);
    GetMiddle(): {
        x: number;
        y: number;
    };
    get Left(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Top(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Right(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Bottom(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    set(left: number, top: number, right: number, bottom: number): T;
}
export declare class HorizontalBoundary<T> extends CellSystem<T> {
    protected left: Cell<number, any>;
    protected right: Cell<number, any>;
    constructor(owner: T, left: Cell<number, any>, right: Cell<number, any>);
    GetMiddle(): number;
    get Left(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Right(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    set(left: number, right: number): T;
}
