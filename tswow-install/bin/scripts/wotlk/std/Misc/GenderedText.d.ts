import { CellSystem, LocSystem } from "../../../data/cell/systems/CellSystem";
import { loc_constructor } from "../../../data/primitives";
export type GenderedTextMode = 'WRITE_BOTH' | 'WRITE_MALE';
export declare class GenderedText<T> extends CellSystem<T> {
    protected defaultMode: GenderedTextMode;
    protected male: LocSystem<any>;
    protected female: LocSystem<any>;
    constructor(owner: T, defaultMode: GenderedTextMode, male: LocSystem<any>, female: LocSystem<any>);
    get Male(): import("../../../data/cell/systems/CellSystem").WrappedLoc<T>;
    get Female(): import("../../../data/cell/systems/CellSystem").WrappedLoc<T>;
    clear(): T;
    set(con: loc_constructor): T;
}
