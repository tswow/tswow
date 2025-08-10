import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { RaceMask } from "../Race/RaceType";
import { Class } from "./Class";
export declare class ClassStartInventory extends CellSystem<Class> {
    add(items: number, amount: number, races?: MaskCon<keyof typeof RaceMask>): Class;
}
