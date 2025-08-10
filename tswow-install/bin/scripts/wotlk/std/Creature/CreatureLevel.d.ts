import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureLevel extends CellSystem<CreatureTemplate> {
    set(min: number, max?: number): CreatureTemplate;
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
}
