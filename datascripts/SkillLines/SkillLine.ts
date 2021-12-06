import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { MaskCon } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { SkillLineRow } from "wotlkdata/wotlkdata/dbc/types/SkillLine";
import { ClassMask } from "../Class/ClassRegistry";
import { MainEntity } from "../Misc/Entity";
import { RaceMask } from "../Race/RaceType";
import { SpellIconCell } from "../Spell/SpellIcon";
import { SkillLineAbility } from "../Spell/SpellSkillLines";
import { SkillsAutolearn } from "./SkillAutolearn";
import { SkillCategory } from "./SkillCategory";
import { SkillRaceClassInfo, SkillRaceClassInfos } from "./SkillRaceClassInfo";

export class SkillLineAbilities extends MultiRowSystem<SkillLineAbility,SkillLine> {
    protected getAllRows(): SkillLineAbility[] {
        return DBC.SkillLineAbility
            .queryAll({SkillLine:this.owner.ID})
            .map(x=>new SkillLineAbility(x))
    }
    protected isDeleted(value: SkillLineAbility): boolean {
        return value.row.isDeleted();
    }
}

export class SkillLine extends MainEntity<SkillLineRow> {
    get AlternateVerb() { return this.wrapLoc(this.row.AlternateVerb); }
    get CanLink() { return this.wrap(this.row.CanLink); }
    get Category() {
        return makeEnumCell(SkillCategory, this, this.row.CategoryID);
    }
    get Description() { return this.wrapLoc(this.row.Description); }
    get Name() { return this.wrapLoc(this.row.DisplayName); }
    get ID() { return this.row.ID.get(); }
    get SkillCosts() { return this.wrap(this.row.SkillCostsID); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get RaceClassInfos() { return new SkillRaceClassInfos(this); }
    get Spells() { return new SkillLineAbilities(this); }
    get Autolearn() { return new SkillsAutolearn(this, this.ID); }

    clearClass(cls: MaskCon<keyof typeof ClassMask>) {
        this.Autolearn.clearClass(cls)
        this.RaceClassInfos.clearClass(cls);
        return this;
    }

    clearRace(race: MaskCon<keyof typeof RaceMask>) {
        this.Autolearn.clearRace(race);
        this.RaceClassInfos.clearRace(race);
        return this;
    }

    enableAutolearn(cls?: MaskCon<keyof typeof ClassMask>, race?: MaskCon<keyof typeof RaceMask>, rank: number = 0, callback?: (value: SkillRaceClassInfo)=>void) {
        this.enable(cls,race,callback);
        this.Autolearn.addGet(cls,race).Rank.set(rank);
        return this;
    }

    enable(cls?: MaskCon<keyof typeof ClassMask>, race?: MaskCon<keyof typeof RaceMask>, callback?: (value: SkillRaceClassInfo)=>void) {
        let rci = this.RaceClassInfos.addGet(cls,race)
        if(callback) {
            callback(rci);
        }
        return this;
    }
}