import { DBC } from "wotlkdata";
import { makeMaskCell32, MaskCellWrite, MaskCon } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { SkillRaceClassInfoRow } from "wotlkdata/wotlkdata/dbc/types/SkillRaceClassInfo";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { Ids } from "../Misc/Ids";
import { RaceMask } from "../Race/RaceType";
import { SkillLine } from "./SkillLine";
import { SkillLineRegistry } from "./SkillLines";

export enum SkillRaceClassFlags {
    IS_PROFESSION = 0x20,
    IS_CLASS_LINE = 0x80,
}

export class SkillRaceClassInfo extends ClassRaceMaskEntry<SkillRaceClassInfoRow> {
    get ClassMask(): MaskCellWrite<this,typeof ClassMask> {
        return makeMaskCell32(ClassMask, this,this.wrapUnlock(this.row.ClassMask));
    }
    get RaceMask(): MaskCellWrite<this,typeof RaceMask> {
        // hack
        return makeMaskCell32(RaceMask, this,this.wrapUnlock(this.row.RaceMask));
    }
    get Flags() {
        return makeMaskCell32(SkillRaceClassFlags,this, this.row.Flags);
    }
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
        row.Flags.set(0);
        return new SkillRaceClassInfo(row);
    }
    protected getAllRows(): SkillRaceClassInfo[] {
        return DBC.SkillRaceClassInfo.queryAll({SkillID: this.owner.ID}).map(x=>new SkillRaceClassInfo(x))
    }
    protected isDeleted(a: SkillRaceClassInfo): boolean {
        return a.row.isDeleted();
    }

    add(
          classes: MaskCon<keyof typeof ClassMask> = 0xffffffff
        , races: MaskCon<keyof typeof RaceMask> = 0xffffffff
    ) {
        this.addGet(classes,races);
        return this.owner;
    }
}