import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SkillLineRow } from "wotlkdata/dbc/types/SkillLine";
import { ClassMaskCon } from "../Class/ClassType";
import { MainEntity } from "../Misc/Entity";
import { RaceMaskCon } from "../Race/RaceType";
import { SpellIconCell } from "../Spell/SpellIcon";
import { SkillLineAbility } from "../Spell/SpellSkillLines";
import { SkillsAutolearn } from "./SkillAutolearn";
import { SkillCategory } from "./SkillCategory";
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
    get Category() { return new SkillCategory(this, this.row.CategoryID); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get Name() { return this.wrapLoc(this.row.DisplayName); }
    get ID() { return this.row.ID.get(); }
    get SkillCosts() { return this.wrap(this.row.SkillCostsID); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get RaceClassInfos() { return new SkillRaceClassInfos(this); }
    get Abilities() { return new SkillLineAbilities(this); }
    get Autolearn() { return new SkillsAutolearn(this, this.ID); }

    clearClass(cls: ClassMaskCon) {
        this.Autolearn.clearClass(cls)
        this.RaceClassInfos.clearClass(cls);
        return this;
    }

    clearRace(race: RaceMaskCon) {
        this.Autolearn.clearRace(race);
        this.RaceClassInfos.clearRace(race);
        return this;
    }

    enableAutolearn(cls?: ClassMaskCon, race?: RaceMaskCon, rank: number = 0) {
        this.enable(cls,race);
        this.Autolearn.addGet(cls,race).Rank.set(rank);
        return this;
    }

    enable(cls?: ClassMaskCon, race?: RaceMaskCon) {
        this.RaceClassInfos.addGet(cls,race)
        return this;
    }
}