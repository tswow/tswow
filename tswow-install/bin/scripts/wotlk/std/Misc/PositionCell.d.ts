import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Position } from "./Position";
export declare class PositionXYZCell<T> extends CellSystem<T> {
    readonly _x: Cell<number, any>;
    readonly _y: Cell<number, any>;
    readonly _z: Cell<number, any>;
    constructor(owner: T, x: Cell<number, any>, y: Cell<number, any>, z: Cell<number, any>);
    get X(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Y(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Z(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    setSpread(x: number, y: number, z: number): T;
    set(obj: {
        x: number;
        y: number;
        z: number;
    }): T;
    toPosition(map: number, o?: number): {
        x: number;
        y: number;
        z: number;
        map: number;
        o: number;
    };
}
export declare class PositionMapXYZCell<T> extends CellSystem<T> {
    protected readonly _map: Cell<number, any>;
    protected readonly _x: Cell<number, any>;
    protected readonly _y: Cell<number, any>;
    protected readonly _z: Cell<number, any>;
    constructor(owner: T, map: Cell<number, any>, x: Cell<number, any>, y: Cell<number, any>, z: Cell<number, any>);
    get X(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Y(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Z(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Map(): import("../Refs/Ref").RefNoCreate<T, import("../Map/Map").Map>;
    setSpread(map: number, x: number, y: number, z: number): T;
    toPosition(): Position;
    set(position: {
        x: number;
        y: number;
        z: number;
        map: number;
        o?: number;
    }): T;
}
export declare class PositionXYZOCell<T> extends CellSystem<T> {
    protected readonly _x: Cell<number, any>;
    protected readonly _y: Cell<number, any>;
    protected readonly _z: Cell<number, any>;
    protected readonly _o: Cell<number, any>;
    constructor(owner: T, x: Cell<number, any>, y: Cell<number, any>, z: Cell<number, any>, o: Cell<number, any>);
    get X(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Y(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Z(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get O(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    setSpread(x: number, y: number, z: number, o: number): T;
    set(obj: {
        x: number;
        y: number;
        z: number;
        o: number;
        map?: number;
    }): T;
    toPosition(map: number): Position;
}
export declare class PositionMapXYZOCell<T> extends CellSystem<T> {
    protected readonly _map: Cell<number, any>;
    protected readonly _x: Cell<number, any>;
    protected readonly _y: Cell<number, any>;
    protected readonly _z: Cell<number, any>;
    protected readonly _o: Cell<number, any>;
    constructor(owner: T, map: Cell<number, any>, x: Cell<number, any>, y: Cell<number, any>, z: Cell<number, any>, o: Cell<number, any>);
    get X(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Y(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Z(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get O(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Map(): import("../Refs/Ref").RefNoCreate<T, import("../Map/Map").Map>;
    setSpread(map: number, x: number, y: number, z: number, o: number): T;
    set(obj: {
        map: number;
        x: number;
        y: number;
        z: number;
        o: number;
    }): T;
    toPosition(): Position;
}
export declare class QuaternionCell<T> extends CellSystem<T> {
    protected readonly _x: Cell<number, any>;
    protected readonly _y: Cell<number, any>;
    protected readonly _z: Cell<number, any>;
    protected readonly _w: Cell<number, any>;
    constructor(owner: T, x: Cell<number, any>, y: Cell<number, any>, z: Cell<number, any>, w: Cell<number, any>);
    get X(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Y(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Z(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get W(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    set(obj: {
        x: number;
        y: number;
        z: number;
        w: number;
    }): T;
    setSpread(x: number, y: number, z: number, w: number): T;
}
export declare class PositionXYCell<T> extends CellSystem<T> {
    protected x: Cell<number, any>;
    protected y: Cell<number, any>;
    constructor(owner: T, x: Cell<number, any>, y: Cell<number, any>);
    get X(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Y(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    setSpread(x: number, y: number): T;
    set(obj: {
        x: number;
        y: number;
    }): T;
}
