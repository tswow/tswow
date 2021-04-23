import { DBC } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { MaskCell } from "wotlkdata/cell/systems/Mask";
import { SkillRaceClassInfoRow } from "wotlkdata/dbc/types/SkillRaceClassInfo";
import { Ids } from "../Misc/Ids";
import { SkillLine } from "./SkillLine";

export class SkillRaceClassFlags extends MaskCell<SkillRaceClassInfo> {
    get IsProfession() { return this.bit(5); }
    get IsClassLine() { return this.bit(7); }
}

export class SkillRaceClassInfo extends Subsystem<SkillLine> {
    readonly row: SkillRaceClassInfoRow;

    constructor(owner: SkillLine, row: SkillRaceClassInfoRow) {
        super(owner);
        this.row = row;
    }

    get ClassMask() { return new MaskCell(this, this.row.ClassMask); }
    get Flags() { return new SkillRaceClassFlags(this, this.row.Flags); }
    get RaceMask() { return new MaskCell(this, this.row.RaceMask); }

    get SkillCostIndex() { return this.wrap(this.row.SkillCostIndex); }
    get SkillID() { return this.wrap(this.row.SkillID); }
    get SkillTierID() { return this.wrap(this.row.SkillTierID); }
    get ID() { return this.row.ID.get() }
}

export class SkillRaceClassInfos extends Subsystem<SkillLine> {
    protected rows() { 
        return DBC.SkillRaceClassInfo.filter({SkillID: this.owner.ID})
    }

    get length() { return this.rows().length; }

    forEach(callback: (srci: SkillRaceClassInfo, index: number) => any) {
        const rows = this.rows();
        for(let i=0;i<rows.length; ++i) {
            callback(new SkillRaceClassInfo(this.owner, rows[i]),i);
        }
    }

    add() {
        const id = Ids.SkillRaceClassInfo.id();
        const row = DBC.SkillRaceClassInfo.add(id);
        row.SkillID.set(this.owner.ID);
        return new SkillRaceClassInfo(this.owner, row);
    }

    getIndex(index: number) {
        return this.rows()[index];
    }
}