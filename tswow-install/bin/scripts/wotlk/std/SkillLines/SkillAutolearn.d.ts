import { MaskCellWrite } from "../../../data/cell/cells/MaskCell";
import { playercreateinfo_skillsRow } from "../../sql/playercreateinfo_skills";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
export declare class SkillAutolearn extends ClassRaceMaskEntry<playercreateinfo_skillsRow> {
    get ClassMask(): MaskCellWrite<this, typeof ClassMask>;
    get RaceMask(): MaskCellWrite<this, typeof RaceMask>;
    get Skill(): import("../Refs/Ref").RefReadOnly<this, import("./SkillLine").SkillLine>;
    get Rank(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SkillsAutolearn<T> extends ClassRaceMaskSystem<SkillAutolearn, playercreateinfo_skillsRow, T> {
    protected skill: number;
    constructor(owner: T, skill: number);
    protected _addGet(classmask: number, racemask: number): SkillAutolearn;
    protected getAllRows(): SkillAutolearn[];
    protected isDeleted(value: SkillAutolearn): boolean;
}
