import { DBC } from "wotlkdata";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { SkillRaceClassInfoRow } from "wotlkdata/dbc/types/SkillRaceClassInfo";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMaskCon } from "../Class/ClassType";
import { ClassMask } from "../Misc/ClassMask";
import { Ids } from "../Misc/Ids";
import { RaceMask } from "../Misc/RaceMask";
import { RaceMaskCon } from "../Race/RaceType";
import { SkillLine } from "./SkillLine";
import { SkillLineRegistry } from "./SkillLines";

export class SkillRaceClassFlags extends MaskCell32<SkillRaceClassInfo> {
    get IsProfession() { return this.bit(5); }
    get IsClassLine() { return this.bit(7); }
}

export class SkillRaceClassInfo extends ClassRaceMaskEntry<SkillRaceClassInfoRow> {
    get ClassMask(): ClassMask<this> {
        return new ClassMask(this, this.row.ClassMask);
    }
    get RaceMask(): RaceMask<this> {
        return new RaceMask(this, this.row.RaceMask);
    }
    get Flags() { return new SkillRaceClassFlags(this, this.row.Flags); }
    get SkillCostIndex() { return this.wrap(this.row.SkillCostIndex); }
    get Skill() { return SkillLineRegistry.ref(this, this.row.SkillID); }
    get SkillTier() { return this.wrap(this.row.SkillTierID); }
    get ID() { return this.row.ID.get() }
}

export class SkillRaceClassInfos extends ClassRaceMaskSystem<SkillRaceClassInfo,SkillRaceClassInfoRow,SkillLine> {
    protected _addGet(classmask: number, racemask: number): SkillRaceClassInfo {
        const id = Ids.SkillRaceClassInfo.id();
        const row = DBC.SkillRaceClassInfo.add(id);
        row.SkillID.set(this.owner.ID);
        row.ClassMask.set(classmask);
        row.RaceMask.set(racemask);
        return new SkillRaceClassInfo(row);
    }
    protected getAllRows(): SkillRaceClassInfo[] {
        return DBC.SkillRaceClassInfo.filter({SkillID: this.owner.ID}).map(x=>new SkillRaceClassInfo(x))
    }
    protected isDeleted(a: SkillRaceClassInfo): boolean {
        return a.row.isDeleted();
    }

    add(classes?: ClassMaskCon, races?: RaceMaskCon) {
        this.addGet(classes,races);
        return this.owner;
    }
}