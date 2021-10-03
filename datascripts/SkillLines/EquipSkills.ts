import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { ClassMaskCon, makeClassmask } from "../Class/ClassType";
import { makeRacemask, RaceMaskCon } from "../Race/RaceType";
import { SelfRef } from "../Refs/Ref";
import { SkillLineAbility, SkillLineAbilityRegistry } from "../Spell/SpellSkillLines";
import { SkillLine } from "./SkillLine";
import { SkillLineRegistry } from "./SkillLines";

export class EquipSkill extends CellSystemTop {
    protected _skill: SkillLine;
    protected _ability: SkillLineAbility;

    constructor(skill: SkillLine, ability: SkillLineAbility) {
        super();
        this._skill = skill;
        this._ability = ability;
    }

    get Skill() { return new SelfRef(this, ()=>this._skill)}
    get Ability() { return new SelfRef(this, ()=>this._ability)}

    private enableAbil(cls: ClassMaskCon, race: RaceMaskCon) {
        let a = this.Ability.get();
            a.ClassMask.set(a.ClassMask.get()|makeClassmask(cls))
            .RaceMask.set(a.RaceMask.get()|makeRacemask(race))
            .ClassMaskForbidden.set(a.ClassMaskForbidden.get()&(~makeClassmask(cls)>>>0))
    }

    enable(cls?: ClassMaskCon, race?: RaceMaskCon) {
        this.Skill.get().enable(cls,race);
        this.enableAbil(cls,race);
        return this;
    }

    enableAutolearn(cls?: ClassMaskCon, race?: RaceMaskCon, rank?: number) {
        this.Skill.get().enableAutolearn(cls,race,rank);
        this.enableAbil(cls,race);
        return this;
    }

    clearClass(cls: ClassMaskCon) {
        this.Skill.get().clearClass(cls);
    }

    clearRace(race: RaceMaskCon) {
        this.Skill.get().clearRace(race);
    }
}

function equipSkill(skill: number, spell: number) {
    return new EquipSkill(
          SkillLineRegistry.load(skill)
        , SkillLineAbilityRegistry.query({Spell:spell})
    )
}

export const EquipSkills = {
      get Maces1H()     { return equipSkill(54,198)}
    , get Maces2H()     { return equipSkill(160,199)}
    , get Daggers()     { return equipSkill(173,1180)}
    , get Swords1H()    { return equipSkill(43,201)}
    , get Swords2H()    { return equipSkill(55,202)}
    , get Axes1H()      { return equipSkill(44,196)}
    , get Axes2H()      { return equipSkill(172,197)}
    , get Polearms()    { return equipSkill(229,200)}
    , get FistWeapons() { return equipSkill(0,15590)}
    , get Bows()        { return equipSkill(45,264)}
    , get Crossbows()   { return equipSkill(226,5011)}
    , get Guns()        { return equipSkill(46,266)}
    , get Staves()      { return equipSkill(136,227)}
    , get Thrown()      { return equipSkill(176,2567)}
    , get Wands()       { return equipSkill(228,5009)}
    , get Shields()     { return equipSkill(433,9116)}
    , get Cloth()       { return equipSkill(415,9078)}
    , get Leather()     { return equipSkill(414,9077)}
    , get Mail()        { return equipSkill(413,8737)}
    , get Plate()       { return equipSkill(293,750)}
    , load(skillid: number, spellId: number) {
        return equipSkill(skillid,spellId);
    }
}