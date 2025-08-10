import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Position } from "../Misc/Position";
import { CreatureInstance } from "./CreatureInstance";
export declare class CreaturePosition extends CellSystem<CreatureInstance> {
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureInstance>;
    get X(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureInstance>;
    get Y(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureInstance>;
    get Z(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureInstance>;
    get Orientation(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureInstance>;
    set(pos: Position): CreatureInstance;
    setSplit(map: number, x: number, y: number, z: number, o: number): CreatureInstance;
}
