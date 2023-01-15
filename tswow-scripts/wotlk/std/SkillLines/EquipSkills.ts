import { MaskCell32, MaskCon } from "../../../data/cell/cells/MaskCell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
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

    private enableAbil(cls: MaskCon<keyof typeof ClassMask>, race: MaskCon<keyof typeof RaceMask>) {
        let a = this.Ability.get();
            a.ClassMask.set(cls,'OR')
             .RaceMask.set(race,'OR')
             .ClassMaskForbidden.set(cls,'NOT')
    }

    /**
     * @warning this enables the skill to be learnt by all races of the matched classes
     */
    enableClass(cls?: MaskCon<keyof typeof ClassMask>) {
        if(this.Skill.get().RaceClassInfos.length === 0) {
            this.Skill.get().enable(cls,MaskCell32.AllBits);
        } else {
            this.Skill.get().RaceClassInfos.forEach(x=>x.ClassMask.add(cls).RaceMask.add(MaskCell32.AllBits))
        }
        this.enableAbil(cls,MaskCell32.AllBits);
        return this;
    }

    /**
     * @warning this enables the skill to be learnt by all classes of the matched races
     */
    enableRace(race?: MaskCon<keyof typeof RaceMask>) {
        if(this.Skill.get().RaceClassInfos.length === 0) {
            this.Skill.get().enable(MaskCell32.AllBits,race);
        } else {
            this.Skill.get().RaceClassInfos.forEach(x=>x.ClassMask.add(MaskCell32.AllBits).RaceMask.add(race))
        }
        this.enableAbil(MaskCell32.AllBits,race);
        return this;
    }

    /**
     * @warning this enables the skill to be learnt by all races of the matched classes (race parameter only decides what races learn it by default)
     */
    enableAutolearnClass(cls: MaskCon<keyof typeof ClassMask>, autoLearnRace: MaskCon<keyof typeof RaceMask> = MaskCell32.AllBits, rank: number = 1) {
        if(this.Skill.get().RaceClassInfos.length === 0) {
            this.Skill.get().enable(cls,MaskCell32.AllBits);
        } else {
            this.Skill.get().RaceClassInfos.forEach(x=>x.ClassMask.add(cls).RaceMask.add(MaskCell32.AllBits))
        }
        this.Skill.get().Autolearn.addGet(cls,autoLearnRace).Rank.set(rank);
        this.enableAbil(cls,MaskCell32.AllBits);
        return this;
    }

    /**
     * @warning this enables the skill to be learnt by all classes of the matched classes (class parameter only decides what classes learn it by default)
     */
    enableAutolearnRace(race: MaskCon<keyof typeof RaceMask> = MaskCell32.AllBits, autoLearnCls: MaskCon<keyof typeof ClassMask> = MaskCell32.AllBits, rank: number = 1) {
        if(this.Skill.get().RaceClassInfos.length === 0) {
            this.Skill.get().enable(MaskCell32.AllBits,race);
        } else {
            this.Skill.get().RaceClassInfos.forEach(x=>x.ClassMask.add(MaskCell32.AllBits).RaceMask.add(race))
        }
        this.Skill.get().Autolearn.addGet(autoLearnCls,race).Rank.set(rank);
        this.enableAbil(MaskCell32.AllBits,race);
        return this;
    }

    clearClass(cls: MaskCon<keyof typeof ClassMask>) {
        this.Skill.get().clearClass(cls);
    }

    clearRace(race: MaskCon<keyof typeof RaceMask>) {
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
    , get FistWeapons() { return equipSkill(473,15590)}
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