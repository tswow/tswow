import { MaskCellWrite, MaskCon } from "../../../data/cell/cells/MaskCell";
import { SkillRaceClassInfoRow } from "../../dbc/SkillRaceClassInfo";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
import { SkillLine } from "./SkillLine";
export declare enum SkillRaceClassFlags {
    IS_PROFESSION = 32,
    IS_CLASS_LINE = 128
}
export declare class SkillRaceClassInfo extends ClassRaceMaskEntry<SkillRaceClassInfoRow> {
    get ClassMask(): MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): MaskCellWrite<this, typeof RaceMask>;
    get Flags(): MaskCellWrite<this, typeof SkillRaceClassFlags>;
    get SkillCostIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Skill(): import("../Refs/Ref").RefStatic<this, SkillLine>;
    get SkillTier(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ID(): number;
}
export declare class SkillRaceClassInfos extends ClassRaceMaskSystem<SkillRaceClassInfo, SkillRaceClassInfoRow, SkillLine> {
    protected _addGet(classmask: number, racemask: number): SkillRaceClassInfo;
    protected getAllRows(): SkillRaceClassInfo[];
    protected isDeleted(a: SkillRaceClassInfo): boolean;
    add(classes?: MaskCon<keyof typeof ClassMask>, races?: MaskCon<keyof typeof RaceMask>): SkillLine;
}
