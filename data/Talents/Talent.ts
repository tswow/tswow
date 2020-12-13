import { Subsystem } from "wotlkdata/cell/Subsystem";
import { TalentRow } from "wotlkdata/dbc/types/Talent";
import { TalentRequirements } from "./TalentRequirements";
import { TalentTree } from "./TalentTree";

export class Talent extends Subsystem<TalentTree> {
    readonly row: TalentRow;
    constructor(owner: TalentTree, row: TalentRow) {
        super(owner);
        this.row = row;
    }

    get ID() { return this.row.ID.get() }
    get Column() { return this.wrap(this.row.ColumnIndex); }
    get Requirements() { return new TalentRequirements(this); }
    get RequiredSpell() { return this.wrap(this.row.RequiredSpellID); }
    get Row() { return this.wrap(this.row.TierID); }
    get TabID() { return this.wrap(this.row.TabID); }
    get Spells() { return this.wrapArray(this.row.SpellRank); }
}