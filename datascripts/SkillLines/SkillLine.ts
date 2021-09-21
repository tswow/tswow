import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SkillLineRow } from "wotlkdata/dbc/types/SkillLine";
import { MainEntity } from "../Misc/Entity";
import { SpellIconCell } from "../Spell/SpellIcon";
import { SkillLineAbility } from "../Spell/SpellSkillLines";
import { SkillRaceClassInfos } from "./SkillRaceClassInfo";

export class SkillLineAbilities extends MultiRowSystem<SkillLineAbility,SkillLine> {
    protected getAllRows(): SkillLineAbility[] {
        return DBC.SkillLineAbility
            .filter({SkillLine:this.owner.ID})
            .map(x=>new SkillLineAbility(x))
    }
    protected isDeleted(value: SkillLineAbility): boolean {
        return value.row.isDeleted();
    }
}

export class SkillLine extends MainEntity<SkillLineRow> {
    get AlternateVerb() { return this.wrapLoc(this.row.AlternateVerb); }
    get CanLink() { return this.wrap(this.row.CanLink); }
    get Category() { return this.wrap(this.row.CategoryID); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get Name() { return this.wrapLoc(this.row.DisplayName); }
    get ID() { return this.row.ID.get(); }
    get SkillCosts() { return this.wrap(this.row.SkillCostsID); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get RaceClassInfos() { return new SkillRaceClassInfos(this); }
    get Abilities() { return new SkillLineAbilities(this); }
}