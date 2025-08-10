import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { creature_template_resistanceRow } from "../../sql/creature_template_resistance";
import { MainEntity } from "../Misc/Entity";
import { SchoolTypes } from "../Misc/School";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureResistance extends MainEntity<creature_template_resistanceRow> {
    get CreatureTemplate(): import("../Refs/Ref").RefReadOnly<this, CreatureTemplate>;
    get School(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof SchoolTypes>;
    get Resistance(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CreatureResistances extends MultiRowSystem<CreatureResistance, CreatureTemplate> {
    protected getAllRows(): CreatureResistance[];
    protected isDeleted(value: CreatureResistance): boolean;
    add(school: EnumCon<SchoolTypes>, resistance: number): CreatureTemplate;
}
