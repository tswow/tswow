import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureAttackTime extends CellSystem<CreatureTemplate> {
    set(melee: number, ranged?: number, meleeVariance?: number, rangedVariance?: number): CreatureTemplate;
    get MeleeBase(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    get RangedBase(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    get MeleeVariance(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    get RangedVariance(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
}
