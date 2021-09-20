import { DBC } from "wotlkdata";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { SkillRaceClassInfoRow } from "wotlkdata/dbc/types/SkillRaceClassInfo";
import { Ids } from "../Misc/Ids";
import { SkillLine } from "./SkillLine";
import { SkillLineRegistry } from "./SkillLines";

export class SkillRaceClassFlags extends MaskCell32<SkillRaceClassInfo> {
    get IsProfession() { return this.bit(5); }
    get IsClassLine() { return this.bit(7); }
}

export class SkillRaceClassInfo extends CellSystemTop {
    @Transient
    readonly row: SkillRaceClassInfoRow;

    constructor(row: SkillRaceClassInfoRow) {
        super();
        this.row = row;
    }

    get ClassMask() { return new MaskCell32(this, this.row.ClassMask); }
    get Flags() { return new SkillRaceClassFlags(this, this.row.Flags); }
    get RaceMask() { return new MaskCell32(this, this.row.RaceMask); }

    get SkillCostIndex() { return this.wrap(this.row.SkillCostIndex); }
    get Skill() { return SkillLineRegistry.ref(this, this.row.SkillID); }
    get SkillTier() { return this.wrap(this.row.SkillTierID); }
    get ID() { return this.row.ID.get() }
}

export class SkillRaceClassInfos extends MultiRowSystem<SkillRaceClassInfo,SkillLine> {
    protected getAllRows(): SkillRaceClassInfo[] {
        return DBC.SkillRaceClassInfo.filter({SkillID: this.owner.ID}).map(x=>new SkillRaceClassInfo(x))
    }
    protected isDeleted(a: SkillRaceClassInfo): boolean {
        return a.row.isDeleted();
    }

    addGet() {
        const id = Ids.SkillRaceClassInfo.id();
        const row = DBC.SkillRaceClassInfo.add(id);
        row.SkillID.set(this.owner.ID);
        return new SkillRaceClassInfo(row);
    }

    addMod(callback: (srci: SkillRaceClassInfo)=>void) {
        callback(this.addGet());
        return this.owner;
    }
}