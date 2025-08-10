import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
import { SelfRef } from "../Refs/Ref";
import { SkillLineAbility } from "../Spell/SpellSkillLines";
import { SkillLine } from "./SkillLine";
export declare class EquipSkill extends CellSystemTop {
    protected _skill: SkillLine;
    protected _ability: SkillLineAbility;
    constructor(skill: SkillLine, ability: SkillLineAbility);
    get Skill(): SelfRef<this, SkillLine>;
    get Ability(): SelfRef<this, SkillLineAbility>;
    private enableAbil;
    /**
     * @warning this enables the skill to be learnt by all races of the matched classes
     */
    enableClass(cls?: MaskCon<keyof typeof ClassMask>): this;
    /**
     * @warning this enables the skill to be learnt by all classes of the matched races
     */
    enableRace(race?: MaskCon<keyof typeof RaceMask>): this;
    /**
     * @warning this enables the skill to be learnt by all races of the matched classes (race parameter only decides what races learn it by default)
     */
    enableAutolearnClass(cls: MaskCon<keyof typeof ClassMask>, autoLearnRace?: MaskCon<keyof typeof RaceMask>, rank?: number): this;
    /**
     * @warning this enables the skill to be learnt by all classes of the matched classes (class parameter only decides what classes learn it by default)
     */
    enableAutolearnRace(race?: MaskCon<keyof typeof RaceMask>, autoLearnCls?: MaskCon<keyof typeof ClassMask>, rank?: number): this;
    clearClass(cls: MaskCon<keyof typeof ClassMask>): void;
    clearRace(race: MaskCon<keyof typeof RaceMask>): void;
}
export declare const EquipSkills: {
    readonly Maces1H: EquipSkill;
    readonly Maces2H: EquipSkill;
    readonly Daggers: EquipSkill;
    readonly Swords1H: EquipSkill;
    readonly Swords2H: EquipSkill;
    readonly Axes1H: EquipSkill;
    readonly Axes2H: EquipSkill;
    readonly Polearms: EquipSkill;
    readonly FistWeapons: EquipSkill;
    readonly Bows: EquipSkill;
    readonly Crossbows: EquipSkill;
    readonly Guns: EquipSkill;
    readonly Staves: EquipSkill;
    readonly Thrown: EquipSkill;
    readonly Wands: EquipSkill;
    readonly Shields: EquipSkill;
    readonly Cloth: EquipSkill;
    readonly Leather: EquipSkill;
    readonly Mail: EquipSkill;
    readonly Plate: EquipSkill;
    load(skillid: number, spellId: number): EquipSkill;
};
