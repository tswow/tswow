import { PercentCell } from "../../Misc/PercentCell";
import { SchoolMask } from "../../Misc/School";
import { ShiftedNumberCell } from "../../Misc/ShiftedNumberCell";
import { RefUnknown } from "../../Refs/Ref";
import { EffectClassSet } from "../SpellClassSet";
import { DispelType } from "../SpellDispelType";
import { SpellEffectMechanic } from "../SpellEffectMechanics";
import { SpellImplicitTarget } from "../SpellImplicitTarget";
import { EffectTemplate } from "./EffectTemplate";
import { CountBase, DamageBase, DamageBasePct, HealBase, HealBasePct, PointsBase, PointsRoot, PowerBase, PowerBasePct } from "./PointsBase";
import { TargetBase } from "./TargetBase";
export declare class SchoolDamage extends DamageBase {
}
export declare class TeleportUnits extends EffectTemplate {
    get TeleportedUnit(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get TeleportedTarget(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
}
export declare class EnvironmentalDamage extends DamageBase {
    get Source(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get AreaType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get BonusMultiplier(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Radius(): import("../SpellRadius").SpellRadiusRef<this>;
}
export declare class PowerDrain extends PowerBase {
}
export declare class HealthLeech extends DamageBase {
}
export declare class Heal extends HealBase {
}
export declare class BindHome extends EffectTemplate {
    get ImplicitTargetA(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get ImplicitTargetB(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
}
export declare enum TotemCreatureTargetMask {
    SUMMON1 = 1,
    SUMMON2 = 2,
    SUMMON3 = 4,
    SUMMON4 = 8
}
export declare enum TotemCreatureCommand {
    REACT_PASSIVE = 0,
    REACT_DEFENSIVE = 1,
    REACT_AGGRESSIVE = 2,
    STAY = 3,
    FOLLOW = 4,
    ATTACK = 5
}
export declare class CommandTotemCreature extends EffectTemplate {
    get Target(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Command(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteQuest extends TargetBase {
    get Quest(): import("../../Refs/Ref").RefStatic<this, import("../../Quest/Quest").Quest>;
}
export declare class WeaponDamageNoSchool extends DamageBase {
}
export declare class Resurrect extends HealBase {
}
export declare class ExtraAttacks extends DamageBase {
}
export declare class CreateItem extends TargetBase {
    get Item(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ItemCount(): ShiftedNumberCell<this>;
}
export declare class Weapon extends EffectTemplate {
}
export declare class Summon extends TargetBase {
    /**
     * Entry in creature_templates
     */
    get SummonedCreature(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * Entry in SummonProperties.dbc
     */
    get SummonProperties(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class Leap extends TargetBase {
}
export declare class Energize extends PowerBase {
}
export declare class WeaponPercentDamage extends DamageBasePct {
    /**
     * Percentage (in whole percentage, i.e. value of "200" = 200%)
     */
    get Percentage(): PercentCell<this>;
    setSingleTarget(): import("../SpellEffect").SpellEffect;
    setAoE(radius: number, radiusPerLevel: number, radiusMax: number): import("../SpellEffect").SpellEffect;
}
export declare class TriggerMissile extends TargetBase {
    get MissileSpell(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class OpenLock extends EffectTemplate {
    get LockType(): import("../../Refs/Ref").RefDynamic<this, import("../../Locks/LockType").LockType>;
    get SkillValue(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ImplicitTargetA(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get ImplicitTargetB(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    setGameObject(lockType: number): import("../SpellEffect").SpellEffect;
}
export declare class LearnSpell extends TargetBase {
    get LearntSpell(): import("../../../../data/cell/cells/CellArray").CellIndexWrapper<number, import("../SpellEffect").SpellEffect>;
}
export declare class Dispel extends PointsBase {
    get DispelType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof DispelType>;
}
export declare class Language extends TargetBase {
    /**
     * Reference to Languages.dbc
     */
    get Language(): import("../../Refs/Ref").RefNoCreate<this, import("../../Languages/Languages").WoWLanguage>;
}
export declare class Jump extends TargetBase {
    get MinHeight(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxHeight(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class JumpDest extends TargetBase {
    get MinHeight(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxHeight(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class TeleportUnitFaceCaster extends EffectTemplate {
    get TeleportedUnit(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get TeleportedTarget(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
}
export declare class SkillStep extends TargetBase {
    get Tier(): ShiftedNumberCell<this>;
    get Skill(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class AddHonor extends CountBase {
}
export declare class TradeSkill extends EffectTemplate {
}
export declare class TransDoor extends TargetBase {
    get GOTemplate(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class EnchantItem extends EffectTemplate {
    get EnchantingItem(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Enchant(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class EnchantItemTemp extends EffectTemplate {
    get EnchantingItem(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Enchant(): import("../../Refs/Ref").RefStatic<this, import("../../Enchant/Enchantment").Enchantment>;
}
export declare class SummonPet extends EffectTemplate {
    get SummonedCreature(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class LearnPetSpell extends TargetBase {
    get LearntSpell(): import("../../../../data/cell/cells/CellArray").CellIndexWrapper<number, import("../SpellEffect").SpellEffect>;
}
export declare class WeaponDamage extends DamageBase {
}
export declare class CreateRandomItem extends TargetBase {
    /**
     * Reference to spell_loot_template
     */
    get LootTemplate(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SendEvent extends EffectTemplate {
    get Event(): RefUnknown<this>;
}
export declare class PowerBurn extends PowerBase {
}
export declare class Threat extends TargetBase {
    get ThreatBase(): ShiftedNumberCell<this>;
    get ThreatDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class TriggerSpell extends EffectTemplate {
    get TriggerSpell(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CreateManaGem extends TargetBase {
    get ItemType(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HealMaxHealth extends TargetBase {
}
export declare class InterruptCast extends TargetBase {
    get Mechanic(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellEffectMechanic>;
}
export declare class Pickpocket extends EffectTemplate {
    get ImplicitTargetA(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
    get ImplicitTargetB(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellImplicitTarget>;
}
export declare class AddFarsight extends TargetBase {
}
export declare class ApplyGlyph extends EffectTemplate {
    get Glyph(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ClassMask(): EffectClassSet<this>;
}
export declare class HealMechanical extends HealBase {
}
export declare class SummonObjectWild extends TargetBase {
    get GOTemplate(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ScriptEffect extends TargetBase {
}
export declare class Sanctuary extends TargetBase {
}
export declare class AddComboPoints extends CountBase {
}
export declare enum GameObjectActions {
    NONE = 0,
    ANIM_CUSTOM0 = 1,
    ANIM_CUSTOM1 = 2,
    ANIM_CUSTOM2 = 3,
    ANIM_CUSTOM3 = 4,
    DISTURB = 5,
    UNLOCK = 6,
    LOCK = 7,
    OPEN = 8,
    OPEN_AND_UNLOCK = 9,
    CLOSE = 10,
    TOGGLE_OPEN = 11,
    DESTROY = 12,
    REBUILD = 13,
    CREATION = 14,
    DESPAWN = 15,
    MAKE_INERT = 16,
    MAKE_ACTIVE = 17,
    CLOSE_AND_LOCK = 18,
    USE_ART_KIT0 = 19,
    USE_ART_KIT1 = 20,
    USE_ART_KIT2 = 21,
    USE_ART_KIT3 = 22,
    SET_TAP_LIST = 23
}
export declare class ActivateObject extends TargetBase {
    get Action(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof GameObjectActions>;
}
export declare class GameObjectDamage extends DamageBase {
}
export declare class GameObjectRepair extends PointsRoot {
    get RepairBase(): ShiftedNumberCell<this>;
    get RepairDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RepairPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RepairPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare enum GameObjectDestructibleState {
    INTACT = 0,
    DAMAGED = 1,
    DESTROYED = 2,
    REBUILDING = 3
}
export declare class SetGameObjectDestructibleState extends DamageBase {
    get State(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof GameObjectDestructibleState>;
}
export declare class KillCredit extends TargetBase {
    get CreatureTemplate(): import("../../Refs/Ref").RefStatic<this, import("../../Creature/CreatureTemplate").CreatureTemplate>;
}
export declare class EnchantHeldItem extends EffectTemplate {
    get Enchant(): import("../../Refs/Ref").RefStatic<this, import("../../Enchant/Enchantment").Enchantment>;
}
export declare class ResurrectSelf extends EffectTemplate {
    get HealthBase(): ShiftedNumberCell<this>;
    get HealthDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HealthPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HealthPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get BonusMultiplier(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MultipleValue(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Mana(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class Charge extends TargetBase {
}
export declare class CastButtons extends EffectTemplate {
    /**
     * Actual ButtonID is this value + 132
     */
    get Button(): RefUnknown<this>;
    get ButtonCount(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class Knockback extends TargetBase {
    get HeightBase(): ShiftedNumberCell<this>;
    get HeightDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HeightPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get KnockbackAmount(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class MakeDrunk extends PointsRoot {
    get DrunknessBase(): ShiftedNumberCell<this>;
    get DrunknessDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DrunknessPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DrunknessPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class Reputation extends PointsBase {
    get Faction(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SummonObjectSlot1 extends TargetBase {
    get GOTemplate(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SummonObjectSlot2 extends TargetBase {
    get GOTemplate(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SummonObjectSlot3 extends TargetBase {
    get GOTemplate(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SummonObjectSlot4 extends TargetBase {
    get GOTemplate(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DispelMechanic extends TargetBase {
    get SchoolMask(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class DestroyAllTotems extends EffectTemplate {
    get ClassMask(): EffectClassSet<this>;
}
export declare class DurabilityDamage extends DamageBase {
    get Slot(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DurabilityDamagePercent extends DamageBasePct {
    get Slot(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class Skill extends TargetBase {
    get Skill(): import("../../Refs/Ref").RefStatic<this, import("../../SkillLines/SkillLine").SkillLine>;
    get SkillTier(): ShiftedNumberCell<this>;
}
export declare class SendTaxi extends TargetBase {
    get Taxi(): import("../../Refs/Ref").RefNoCreate<this, import("../../Taxi/Taxi").TaxiPath>;
}
export declare class PullTowards extends TargetBase {
    get SpeedZ(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ModifyThreatPercent extends TargetBase {
    get ThreatPercentBase(): PercentCell<this>;
    get ThreatPercentDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class StealBeneficialBuff extends CountBase {
    get DispelMask(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class RedirectThreat extends TargetBase {
    get ThreatBase(): ShiftedNumberCell<this>;
    get ThreatDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class PlaySound extends TargetBase {
    get Sound(): import("../../Sound/SoundEntry").SoundEntryRef<this>;
}
export declare class PlayMusic extends TargetBase {
    get Sound(): import("../../Sound/SoundEntry").SoundEntryRef<this>;
}
export declare class HealPercent extends HealBasePct {
}
export declare class EnergizePercent extends PowerBasePct {
}
export declare class LeapBack extends TargetBase {
}
export declare class ClearQuest extends TargetBase {
    get Quest(): import("../../Refs/Ref").RefStatic<this, import("../../Quest/Quest").Quest>;
}
export declare class ForceCast extends EffectTemplate {
    get TriggerSpell(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Mechanic(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellEffectMechanic>;
}
export declare class ForceCastWithValue extends PointsBase {
    get TriggerSpell(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Mechanic(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellEffectMechanic>;
}
export declare class TriggerSpellWithValue extends PointsBase {
    get TriggerSpell(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class KnockbackDest extends TargetBase {
    get HeightBase(): ShiftedNumberCell<this>;
    get HeightDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HeightPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get KnockbackAmount(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class PullTowardsDest extends TargetBase {
    get SpeedZ(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare enum RuneType {
    BLOOD = 0,
    UNHOLY = 1,
    FROST = 2,
    DEATH = 3
}
export declare class ActivateRune extends CountBase {
    get RuneType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof RuneType>;
}
export declare class FailQuest extends TargetBase {
    get Quest(): import("../../Refs/Ref").RefStatic<this, import("../../Quest/Quest").Quest>;
}
export declare class TriggerMissileWithValue extends TargetBase {
    get MissileSpell(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PointsBase(): ShiftedNumberCell<this>;
    get PointsPerLevel(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PointsPerCombo(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PointsDieSides(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ChargeDest extends TargetBase {
}
export declare class StartQuest extends TargetBase {
    get Quest(): import("../../Refs/Ref").RefStatic<this, import("../../Quest/Quest").Quest>;
}
export declare class CanTitanGrip extends TargetBase {
    get PenaltySpell(): import("../../Refs/Ref").RefStatic<this, import("../Spell").Spell>;
}
export declare class EnchantPrismaticItem extends EffectTemplate {
    get Enchant(): import("../../Refs/Ref").RefStatic<this, import("../../Enchant/Enchantment").Enchantment>;
}
export declare class RemoveAura extends TargetBase {
    get RemovedSpell(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
