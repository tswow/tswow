import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { creature_equip_templateRow } from "../../sql/creature_equip_template";
import { MainEntity } from "../Misc/Entity";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureEquip extends MainEntity<creature_equip_templateRow> {
    get CreatureTemplate(): import("../Refs/Ref").RefReadOnly<this, CreatureTemplate>;
    get Index(): number;
    get RightHand(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LeftHand(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Ranged(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CreatureEquipment extends MultiRowSystem<CreatureEquip, CreatureTemplate> {
    protected getAllRows(): CreatureEquip[];
    protected isDeleted(value: CreatureEquip): boolean;
    add(rightHand?: number, leftHand?: number, ranged?: number): CreatureTemplate;
}
