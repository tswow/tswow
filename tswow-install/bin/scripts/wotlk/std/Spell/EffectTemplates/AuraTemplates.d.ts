import { CellWrapper } from "../../../../data/cell/cells/Cell";
import { MaskCell32 } from "../../../../data/cell/cells/MaskCell";
import { CreatureType, CreatureTypeMask } from "../../Creature/CreatureType";
import { SchoolMask, SchoolTypes } from "../../Misc/School";
import { RefUnknown } from "../../Refs/Ref";
import { SpellEffectMechanic, SpellEffectMechanicMask } from "../SpellEffectMechanics";
import { SpellPowerType } from "../SpellPowerType";
import { ChanceBase, CountBase, DamageBase, DamageBasePct, HealBase, HealBasePct, ManaBase, PercentBase, PointsBase, PowerBase, PowerBasePct } from "./PointsBase";
import { TargetBase } from "./TargetBase";
export declare class BindSight extends TargetBase {
}
export declare class ModPossess extends PointsBase {
}
export declare class PeriodicDamage extends DamageBase {
    get DamagePeriod(): CellWrapper<number, this>;
}
export declare class ModConfuse extends TargetBase {
}
export declare class ModCharm extends ChanceBase {
}
export declare class ModFear extends TargetBase {
}
export declare class PeriodicHeal extends HealBase {
    get School(): CellWrapper<number, this>;
    get HealPeriod(): CellWrapper<number, this>;
}
export declare class ModAttackSpeed extends PercentBase {
}
export declare class ModThreat extends PercentBase {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModTaunt extends TargetBase {
}
export declare class ModStun extends TargetBase {
}
export declare class ModDamageDone extends DamageBasePct {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModDamageTaken extends DamageBasePct {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class DamageShield extends DamageBasePct {
    get School(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SchoolTypes>;
}
export declare enum StealthType {
    NORMAL = 0,
    TRAP = 1
}
export declare class ModStealth extends PointsBase {
    get School(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StealthType>;
}
export declare class ModDetect extends PointsBase {
    get Type(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StealthType>;
}
export declare enum InvisibilityType {
    GENERAL = 0,
    UNK1 = 1,
    UNK2 = 2,
    TRAP = 3,
    UNK4 = 4,
    UNK5 = 5,
    DRUNK = 6,
    UNK7 = 7,
    UNK8 = 8,
    UNK9 = 9,
    UNK10 = 10,
    UNK11 = 11
}
export declare class ModInvisibility extends PointsBase {
    get Type(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StealthType>;
}
export declare class ModInvisibilityDetection extends PointsBase {
    get Type(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StealthType>;
}
export declare class ObsModHealth extends HealBasePct {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
    get AuraPeriod(): CellWrapper<number, this>;
}
export declare class ObsModPower extends PowerBasePct {
    get AuraPeriod(): CellWrapper<number, this>;
}
export declare class ModResistance extends PointsBase {
    get Resistance(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class PeriodicEnergize extends PowerBase {
    get Period(): CellWrapper<number, this>;
}
export declare class ModPacify extends TargetBase {
}
export declare class ModRoot extends TargetBase {
}
export declare class ModSilence extends TargetBase {
}
export declare class ReflectSpells extends PercentBase {
}
export declare enum StatMod {
    ALL = -1,
    STRENGTH = 0,
    AGILITY = 1,
    STAMINA = 2,
    INTELLECT = 3,
    SPIRIT = 4
}
export declare class ModStat extends PointsBase {
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class ModSkill extends PointsBase {
    get Skill(): CellWrapper<number, this>;
}
export declare class ModIncreaseSpeed extends PercentBase {
}
export declare class ModIncreaseMountSpeed extends PercentBase {
}
export declare class ModDecreaseSpeed extends PercentBase {
}
export declare class ModIncreaseHealth extends PointsBase {
}
export declare class ModIncreaseEnergy extends PointsBase {
}
export declare class ShapeshiftFormCell extends CellWrapper<number, ModShapeshift> {
    setDisplayId(id: number): ModShapeshift;
    set(value: number): ModShapeshift;
    get(): number;
}
export declare class ModShapeshift extends TargetBase {
    get Form(): ShapeshiftFormCell;
}
/** TODO: Uses MiscValueA, which is not used in core */
export declare class EffectImmunity extends TargetBase {
}
export declare class StateImmunity extends TargetBase {
}
export declare class SchoolImmunity extends TargetBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class DamageImmunity extends TargetBase {
}
export declare class DispelImmunity extends TargetBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ProcTriggerSpell extends TargetBase {
    get TriggeredSpell(): CellWrapper<number, this>;
}
export declare class ProcTriggerDamage extends DamageBase {
}
export declare class TrackCreatures extends DamageBase {
    get CreatureType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureType>;
}
export declare class TrackResources extends DamageBase {
    get ResourceType(): CellWrapper<number, this>;
}
export declare class ModParryPercent extends PercentBase {
}
export declare class ModDodgePercent extends PercentBase {
}
export declare class ModCriticalHealAmount extends HealBase {
}
export declare class ModBlockPercent extends PercentBase {
}
export declare class ModWeaponCritPercent extends PercentBase {
}
export declare class PeriodicLeech extends DamageBase {
    get Period(): CellWrapper<number, this>;
}
export declare class ModHitChance extends PercentBase {
}
export declare class ModSpellHitChance extends PercentBase {
}
export declare class Transform extends TargetBase {
    get CreatureTemplate(): CellWrapper<number, this>;
}
export declare class ModSpellCritChance extends PercentBase {
}
export declare class ModIncreaseSwimSpeed extends PercentBase {
}
export declare class ModDamageDoneCreature extends DamageBase {
    get CreatureType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureType>;
}
/** TODO: uses MiscValueA but no use in core(?) */
export declare class ModPacifySilence extends TargetBase {
    get CreatureType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureType>;
}
export declare class ModScale extends PercentBase {
}
export declare class PeriodicHealthFunnel extends HealBase {
    get Period(): CellWrapper<number, this>;
}
export declare class PeriodicManaLeech extends ManaBase {
    get Period(): CellWrapper<number, this>;
}
export declare class ModCastingSpeedNotStack extends PercentBase {
}
export declare class FeignDeath extends TargetBase {
}
export declare class ModDisarm extends TargetBase {
}
export declare class ModStalked extends TargetBase {
}
export declare class SchoolAbsorb extends DamageBase {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModSpellCritChanceSchool extends PercentBase {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModPowerCostSchoolPct extends PercentBase {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModPowerCostSchool extends PointsBase {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ReflectSpellsSchool extends PercentBase {
    get School(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModLanguage extends PercentBase {
    get Language(): CellWrapper<number, this>;
}
/** TODO: Parameters? */
export declare class FarSight extends TargetBase {
}
export declare class MechanicImmunity extends TargetBase {
    get Mechanic(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellEffectMechanic>;
}
export declare class Mounted extends TargetBase {
    get CreatureTemplate(): CellWrapper<number, this>;
}
export declare class ModDamagePercentDone extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModPercentStat extends PercentBase {
    get School(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class SplitDamagePct extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class WaterBreathing extends TargetBase {
}
export declare class ModBaseResistance extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModRegen extends HealBase {
}
export declare class ModPowerRegen extends PowerBase {
}
export declare class ChannelDeathItem extends CountBase {
    get Item(): CellWrapper<number, this>;
}
export declare class ModDamagePercentTaken extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModHealthRegenPercent extends PercentBase {
}
export declare class PeriodicDamagePercent extends PercentBase {
    get Period(): CellWrapper<number, this>;
}
export declare class ModDetectRange extends PointsBase {
}
export declare class PreventsFleeing extends TargetBase {
}
export declare class ModUnattackable extends TargetBase {
}
export declare class InterruptRegen extends TargetBase {
}
export declare class Ghost extends TargetBase {
}
export declare class SpellMagnet extends TargetBase {
}
export declare class ManaShield extends DamageBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModSkillTalent extends PointsBase {
    get Skill(): CellWrapper<number, this>;
}
export declare class ModAttackPower extends PointsBase {
}
export declare class AurasVisible extends TargetBase {
}
export declare class ModResistancePct extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModMeleeAttackPowerVersus extends PointsBase {
    get CreatureTypes(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CreatureTypeMask>;
}
export declare class ModTotalThreat extends PointsBase {
}
export declare class WaterWalk extends TargetBase {
}
export declare class FeatherFall extends TargetBase {
}
export declare class Hover extends TargetBase {
}
export declare enum SpellModOp {
    DAMAGE = 0,
    DURATION = 1,
    THREAT = 2,
    EFFECT1 = 3,
    CHARGES = 4,
    RANGE = 5,
    RADIUS = 6,
    CRITICAL_CHANCE = 7,
    ALL_EFFECTS = 8,
    NOT_LOSE_CASTING_TIME = 9,
    CASTING_TIME = 10,
    COOLDOWN = 11,
    EFFECT2 = 12,
    IGNORE_ARMOR = 13,
    COST = 14,
    CRIT_DAMAGE_BONUS = 15,
    RESIST_MISS_CHANCE = 16,
    JUMP_TARGETS = 17,
    CHANCE_OF_SUCCESS = 18,
    ACTIVATION_TIME = 19,
    DAMAGE_MULTIPLIER = 20,
    GLOBAL_COOLDOWN = 21,
    DOT = 22,
    EFFECT3 = 23,
    BONUS_MULTIPLIER = 24,
    PROC_PER_MINUTE = 26,
    VALUE_MULTIPLIER = 27,
    RESIST_DISPEL_CHANGE = 28,
    CRIT_DAMAGE_BONUS2 = 29,
    SPELL_COST_REFUND_ON_FAIL = 30
}
export declare class AddFlatModifier extends PointsBase {
    get Operation(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellModOp>;
}
export declare class AddPctModifier extends PercentBase {
    get Operation(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellModOp>;
}
export declare class AddTargetTrigger extends PointsBase {
    get TriggerSpell(): CellWrapper<number, this>;
}
export declare class ModPowerRegenPercent extends PowerBasePct {
}
export declare class AddCasterHitTrigger extends PointsBase {
}
export declare class ModRangedDamageTaken extends PointsBase {
}
export declare class ModRangedDamageTakenPct extends PercentBase {
    get MiscValueA(): CellWrapper<number, this>;
}
export declare class ModHealing extends HealBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModRegenDuringCombat extends HealBase {
}
export declare class ModMechanicResistance extends PercentBase {
    get Mechanic(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellEffectMechanic>;
}
export declare class ModHealingPct extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class Untrackable extends TargetBase {
}
export declare class Empathy extends TargetBase {
}
export declare class ModOffhandDamagePct extends PercentBase {
}
export declare class ModTargetResistance extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModRangedAttackPower extends PointsBase {
}
export declare class ModMeleeDamageTaken extends PointsBase {
}
export declare class ModMeleeDamageTakenPct extends PercentBase {
}
export declare class RangedAttackPowerAttackerBonus extends PointsBase {
}
export declare class ModPossessPet extends TargetBase {
}
export declare class ModSpeedAlways extends PercentBase {
}
export declare class ModMountedSpeedAlways extends PercentBase {
}
export declare class ModRangedAttackPowerVersus extends PercentBase {
    get CreatureTypes(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CreatureTypeMask>;
}
export declare class ModIncreaseEnergyPercent extends PercentBase {
}
export declare class ModIncreaseHealthPercent extends PercentBase {
}
export declare class ModManaRegenInterrupt extends PercentBase {
}
export declare class ModHealingDone extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModHealingDonePercent extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModTotalStatPercentage extends PercentBase {
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class ModMeleeHaste extends PercentBase {
}
export declare class ForceReaction extends PointsBase {
    get Faction(): import("../../Refs/Ref").RefNoCreate<this, import("../../Faction/Faction").Faction>;
}
export declare class ModRangedHaste extends PercentBase {
}
export declare class ModRangedAmmoHaste extends PercentBase {
}
export declare class ModBaseResistancePct extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModResistanceExclusive extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class SafeFall extends PointsBase {
}
export declare class ModPetTalentPoints extends PointsBase {
}
export declare class AllowTamePetType extends TargetBase {
    MiscValueA(): CellWrapper<number, this>;
}
export declare class MechanicImmunityMask extends TargetBase {
    get Mechanics(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellEffectMechanicMask>;
}
export declare class RetainComboPoints extends TargetBase {
}
export declare class ReducePushback extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModShieldBlockValuePct extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class TrackStealthed extends TargetBase {
}
export declare class ModDetectedRange extends PercentBase {
}
export declare class SplitDamageFlat extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModStealthLevel extends PointsBase {
}
export declare class ModWaterBreathing extends PointsBase {
}
export declare class ModReputationGain extends PercentBase {
}
export declare class PetDamageMulti extends PercentBase {
}
export declare class ModShieldBlockValue extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class NoPvPCredit extends TargetBase {
}
export declare class ModAoEAvoidance extends TargetBase {
}
export declare class ModHealthRegenInCombat extends PointsBase {
}
export declare class PowerBurn extends PowerBase {
    get Period(): CellWrapper<number, this>;
}
export declare class ModCritDamageBonus extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class MeleeAttackPowerAttackerBonus extends PointsBase {
}
export declare class ModAttackPowerPct extends PercentBase {
}
export declare class ModRangedAttackPowerPct extends PercentBase {
}
export declare class ModDamageDoneVersus extends PointsBase {
    get CreatureTypes(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CreatureTypeMask>;
}
export declare class ModCritPercentVersus extends PercentBase {
    get CreatureTypes(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CreatureTypeMask>;
}
export declare class DetectAmore extends PointsBase {
    get AmoreAura(): CellWrapper<number, this>;
}
export declare class ModSpeedNotStack extends PercentBase {
}
export declare class ModMountedSpeedNotStack extends PercentBase {
}
/**
 * TODO: MiscValueA is always 126 or 36, is this is a school mask?
 */
export declare class ModSpellDamageOfStatPercent extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class ModSpellHealingOfStatPercent extends PercentBase {
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class SpiritOfRedemption extends TargetBase {
}
export declare class AoECharm extends PointsBase {
}
export declare class ModDebuffResistance extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModAttackerSpellCritChance extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModFlatSpellDamageVersus extends PointsBase {
    get CreatureTypes(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CreatureTypeMask>;
}
export declare class ModResistanceOfStatPercent extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class ModCriticalThreat extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
/**
 * TODO: MiscValueA unused?
 */
export declare class ModAttackerMeleeHitChance extends PercentBase {
}
export declare class ModAttackerRangedHitChance extends PercentBase {
}
export declare class ModAttackerSpellHitChance extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
/** TODO: Unused MiscValueA */
export declare class ModAttackerMeleeCritChance extends PercentBase {
}
export declare class ModAttackerRangedCritChance extends PercentBase {
}
export declare enum CombatRating {
    WEAPON_SKILL = 0,
    DEFENSE_SKILL = 1,
    DODGE = 2,
    PARRY = 3,
    BLOCK = 4,
    HIT_MELEE = 5,
    HIT_RANGED = 6,
    HIT_SPELL = 7,
    CRIT_MELEE = 8,
    CRIT_RANGED = 9,
    CRIT_SPELL = 10,
    HIT_TAKEN_MELEE = 11,
    HIT_TAKEN_RANGED = 12,
    HIT_TAKEN_SPELL = 13,
    CRIT_TAKEN_MELEE = 14,
    CRIT_TAKEN_RANGED = 15,
    CRIT_TAKEN_SPELL = 16,
    HASTE_MELEE = 17,
    HASTE_RANGED = 18,
    HASTE_SPELL = 19
}
export declare class ModRating extends PercentBase {
    get Rating(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CombatRating>;
}
export declare class ModFactionReputationGain extends PercentBase {
    get Faction(): CellWrapper<number, this>;
}
export declare class UseNormalMovementSpeed extends PointsBase {
}
export declare class ModMeleeRangedHaste extends PercentBase {
}
export declare class MeleeSlow extends PercentBase {
}
export declare class ModTargetAbsorbSchool extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModTargetAbilityAbsorbSchool extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModCooldown extends PercentBase {
}
export declare class ModAttackerSpellAndWeaponCritChance extends PercentBase {
}
export declare class ModIncreasesSpellPctToHit extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModXpPct extends PercentBase {
}
export declare class Fly extends TargetBase {
}
/** TODO: Unused MiscValueA? */
export declare class CannotBeDodged extends TargetBase {
}
export declare class ModAttackerMeleeCritDamage extends PercentBase {
}
export declare class ModAttackerRangedCritDamage extends PercentBase {
}
export declare class ModSchoolCritDmgTaken extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModIncreaseVehicleFlightSpeed extends PercentBase {
}
export declare class ModIncreaseMountedFlightSpeed extends PercentBase {
}
export declare class ModIncreaseFlightSpeed extends PercentBase {
}
export declare class ModMountedFlightSpeedAlways extends PercentBase {
}
export declare class ModVehicleSpeedAlways extends PercentBase {
}
export declare class ModFlightSpeedNotStack extends PercentBase {
}
export declare class ModRangedAttackPowerOfStatPercent extends PercentBase {
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class ModRageFromDamageDealt extends PercentBase {
}
export declare class Tamed extends PointsBase {
}
export declare class ArenaPreparation extends TargetBase {
}
export declare class HasteSpells extends PercentBase {
}
export declare class HasteRanged extends PercentBase {
}
export declare class ModManaRegenFromStat extends PercentBase {
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class ModRatingFromStat extends PercentBase {
    get Rating(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CombatRating>;
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class ModDetaunt extends TargetBase {
}
export declare class RaidProcFromCharge extends TargetBase {
}
export declare class RaidProcFromChargeWithValue extends PointsBase {
}
export declare class DetectStealth extends PointsBase {
}
export declare class ModAoEDamageAvoidance extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModIncreaseHealth2 extends PointsBase {
}
export declare class MechanicDurationMod extends PercentBase {
    get Mechanics(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellEffectMechanicMask>;
}
export declare class MechanicDurationModNotStack extends PercentBase {
    get Mechanics(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellEffectMechanicMask>;
}
export declare class ModDispelResist extends PercentBase {
}
export declare class ControlVehicle extends TargetBase {
}
export declare class ModSpellDamageOfAttackPower extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModSpellHealingOfAttackPower extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModScale2 extends PercentBase {
}
export declare class ModExpertise extends PointsBase {
}
export declare class ForceMoveForward extends TargetBase {
}
export declare class ModSpellDamageFromHealing extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModFaction extends TargetBase {
    get Faction(): CellWrapper<number, this>;
}
export declare class ComprehendLanguage extends TargetBase {
    get Language(): CellWrapper<number, this>;
}
export declare class ModAuraDurationByDispel extends PercentBase {
}
export declare class ModAuraDurationByDispelNotStack extends PercentBase {
}
export declare class CloneCaster extends TargetBase {
}
export declare class ModCombatResultChance extends TargetBase {
    get Rating(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CombatRating>;
}
export declare enum RuneType {
    BLOOD = 0,
    UNHOLY = 1,
    FROST = 2,
    DEATH = 3
}
export declare class ConvertRune extends CountBase {
    get Rune(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof RuneType>;
}
export declare class ModIncreaseHealth3 extends PointsBase {
}
export declare class ModEnemyDodge extends PercentBase {
}
export declare class ModBlockCritChance extends PercentBase {
}
export declare class ModDisarmOffhand extends TargetBase {
}
export declare class ModMechanicDamageTakenPercent extends PercentBase {
    get Mechanic(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellEffectMechanic>;
}
export declare class NoReagentUse extends TargetBase {
}
export declare class ModTargetResistBySpellClass extends PointsBase {
}
export declare class ModHotPct extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ScreenEffect extends PointsBase {
    get Effect(): RefUnknown<this>;
}
export declare class Phase extends TargetBase {
    get PhaseMask(): MaskCell32<this>;
}
export declare class AllowOnlyAbility extends TargetBase {
}
export declare class ModImmuneAuraApplySchool extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModAttackPowerOfStatPercent extends PercentBase {
    get Stat(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatMod>;
}
export declare class ModIgnoreTargetResist extends TargetBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModDamageFromCaster extends PercentBase {
}
export declare class IgnoreMeleeReset extends TargetBase {
}
export declare class ConsumeNoAmmo extends TargetBase {
}
export declare class ModIgnoreShapeshift extends TargetBase {
}
export declare class ModAbilityAffectedTargets extends TargetBase {
}
export declare class ModDisarmRanged extends TargetBase {
}
export declare class InitializeImages extends TargetBase {
}
export declare class ModTargetArmorPct extends PercentBase {
}
export declare class ModHonorGainPct extends PercentBase {
}
export declare class IncreaseBaseHealthPercent extends PercentBase {
}
export declare class ModHealingReceived extends PercentBase {
}
export declare class ModAttackPowerOfArmor extends PointsBase {
}
export declare class DeflectSpells extends PercentBase {
}
export declare class IgnoreHitDirection extends PercentBase {
}
export declare class ModCritPct extends PercentBase {
}
export declare class ModXpQuestPct extends PercentBase {
}
export declare class SetOpenStable extends TargetBase {
}
export declare class PreventRegeneratePower extends TargetBase {
    get PowerType(): import("../../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellPowerType>;
}
export declare class SetVehicleId extends TargetBase {
    get Vehicle(): import("../../Refs/Ref").RefDynamic<this, import("../../Vehicle/Vehicle").Vehicle>;
}
export declare class ShareDamagePct extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class SchoolHealAbsorb extends PointsBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class ModMinimumSpeed extends PercentBase {
}
export declare class ModCreatureAoEDamageAvoidance extends PercentBase {
    get Schools(): import("../../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
}
export declare class PreventResurrection extends TargetBase {
}
export declare class UnderwaterWalking extends TargetBase {
}
