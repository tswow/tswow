import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { WorldSafeLocRef } from "../WorldSafeLocs/WorldSafeLocs";
export declare class BattlegroundSafeLoc<T> extends CellSystem<T> {
    protected loc: WorldSafeLocRef<T>;
    protected o: Cell<number, any>;
    protected map: Cell<number, any>;
    constructor(owner: T, loc: WorldSafeLocRef<T>, map: Cell<number, any>, o: Cell<number, any>);
    get Loc(): WorldSafeLocRef<T>;
    get O(): Cell<number, any>;
    setSpread(x: number, y: number, z: number, o: number): T;
    set(obj: {
        map?: number;
        x: number;
        y: number;
        z: number;
        o: number;
    }): T;
}
