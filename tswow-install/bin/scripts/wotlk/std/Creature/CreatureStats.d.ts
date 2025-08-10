import { creature_templateRow } from "../../sql/creature_template";
import { ChildEntity } from "../Misc/Entity";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureStats extends ChildEntity<creature_templateRow, CreatureTemplate> {
    get HealthMod(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    get ManaMod(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    get ArmorMod(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    get DamageMod(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    get ExperienceMod(): import("../../../data/cell/cells/Cell").CellWrapper<number, CreatureTemplate>;
    set(health: number, mana: number, armor: number, damage: number, experience: number): CreatureTemplate;
}
