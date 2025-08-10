import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { BoundingBox } from "./BoundingBox";
export declare class GeoBox<T> extends CellSystem<T> {
    private minx;
    private maxx;
    private miny;
    private maxy;
    private minz;
    private maxz;
    constructor(owner: T, minx: Cell<number, any>, maxx: Cell<number, any>, miny: Cell<number, any>, maxy: Cell<number, any>, minz: Cell<number, any>, maxz: Cell<number, any>);
    get MinX(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get MaxX(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get MinY(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get MaxY(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get MinZ(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get MaxZ(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    set(box: BoundingBox | number): T;
    ToBoundingBox(): BoundingBox;
    scale(x: number, y: number, z: number): T;
}
