import { DBC } from "wotlkdata";
import { CellWrapper } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMaskCell32, MaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { CreatureType, CreatureTypeMask } from "../../Creature/CreatureType";
import { FactionRegistry } from "../../Faction/Faction";
import { Ids } from "../../Misc/Ids";
import { SchoolMask, SchoolTypes } from "../../Misc/School";
import { RefUnknown } from "../../Refs/Ref";
import { VehicleRegistry } from "../../Vehicle/Vehicle";
import { SpellEffectMechanic, SpellEffectMechanicMask } from "../SpellEffectMechanics";
import { SpellPowerType } from "../SpellPowerType";
import { ChanceBase, CountBase, DamageBase, DamageBasePct, HealBase, HealBasePct, ManaBase, PercentBase, PointsBase, PowerBase, PowerBasePct } from "./PointsBase";
import { TargetBase } from "./TargetBase";

// 1
export class BindSight extends TargetBase {}
// 2
export class ModPossess extends PointsBase {}
// 3
export class PeriodicDamage extends DamageBase {
    get DamagePeriod() { return this.wrap(this.owner.AuraPeriod); }
}
// 4
// 5
export class ModConfuse extends TargetBase {}
// 6
export class ModCharm extends ChanceBase {}
// 7
export class ModFear extends TargetBase {}
// 8
export class PeriodicHeal extends HealBase {
    get School() { return this.wrap(this.owner.MiscValueA); }
    get HealPeriod() { return this.wrap(this.owner.AuraPeriod); }
}
// 9
export class ModAttackSpeed extends PercentBase {}
// 10
export class ModThreat extends PercentBase {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 11
export class ModTaunt extends TargetBase {}
// 12
export class ModStun extends TargetBase {}
// 13
export class ModDamageDone extends DamageBasePct {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 14
export class ModDamageTaken extends DamageBasePct {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 15
export class DamageShield extends DamageBasePct {
    get School() {
        return makeEnumCell(SchoolTypes,this, this.owner.MiscValueA);
    }
}
// 16
export enum StealthType {
    NORMAL = 0,
    TRAP   = 1,
}

export class ModStealth extends PointsBase {
    get School() {
        return makeEnumCell(StealthType,this, this.owner.MiscValueA);
    }
}
// 17
export class ModDetect extends PointsBase {
    get Type() {
        return makeEnumCell(StealthType,this, this.owner.MiscValueA);
    }
}
// 18

export enum InvisibilityType
{
    GENERAL = 0,
    UNK1    = 1,
    UNK2    = 2,
    TRAP    = 3,
    UNK4    = 4,
    UNK5    = 5,
    DRUNK   = 6,
    UNK7    = 7,
    UNK8    = 8,
    UNK9    = 9,
    UNK10   = 10,
    UNK11   = 11,
};
export class ModInvisibility extends PointsBase {
    get Type() {
        return makeEnumCell(StealthType,this, this.owner.MiscValueA);
    }
}
// 19
export class ModInvisibilityDetection extends PointsBase {
    get Type() {
        return makeEnumCell(StealthType,this, this.owner.MiscValueA);
    }
}
// 20
export class ObsModHealth extends HealBasePct {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
    get AuraPeriod() { return this.wrap(this.owner.AuraPeriod); }
}
// 21
export class ObsModPower extends PowerBasePct {
    get AuraPeriod() { return this.wrap(this.owner.AuraPeriod); }
}
// 22
export class ModResistance extends PointsBase {
    get Resistance() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 23
// 24
export class PeriodicEnergize extends PowerBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 25
export class ModPacify extends TargetBase {}
// 26
export class ModRoot extends TargetBase {}
// 27
export class ModSilence extends TargetBase {}
// 28
export class ReflectSpells extends PercentBase {}
// 29
export enum StatMod {
    ALL       = -1,
    STRENGTH  = 0,
    AGILITY   = 1,
    STAMINA   = 2,
    INTELLECT = 3,
    SPIRIT    = 4,
}

export class ModStat extends PointsBase {
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueA);
    }
}
// 30
export class ModSkill extends PointsBase {
    get Skill() { return this.wrap(this.owner.MiscValueA); }
}
// 31
export class ModIncreaseSpeed extends PercentBase {}
// 32
export class ModIncreaseMountSpeed extends PercentBase {}
// 33
export class ModDecreaseSpeed extends PercentBase {}
// 34
export class ModIncreaseHealth extends PointsBase {}
// 35
export class ModIncreaseEnergy extends PointsBase {}
// 36
export class ShapeshiftFormCell extends CellWrapper<number,ModShapeshift>{
    setDisplayId(id: number) {
        let shapeshiftId = Ids.SpellShapeshiftForm.id()
        DBC.SpellShapeshiftForm.add(shapeshiftId)
           .CreatureDisplayID.set([id])
           .Flags.set(0)
        this.set(shapeshiftId);
        return this.owner;
    }

    set(value: number) {
        this.cell.set(value);
        return this.owner;
    }

    get() {
        return this.cell.get();
    }
}
export class ModShapeshift extends TargetBase {
    get Form() { return new ShapeshiftFormCell(this, this.owner.MiscValueA); }
}
// 37
/** TODO: Uses MiscValueA, which is not used in core */
export class EffectImmunity extends TargetBase {}
// 38
export class StateImmunity extends TargetBase {}
// 39
export class SchoolImmunity extends TargetBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 40
export class DamageImmunity extends TargetBase {}
// 41
export class DispelImmunity extends TargetBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 42
export class ProcTriggerSpell extends TargetBase {
    get TriggeredSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 43
export class ProcTriggerDamage extends DamageBase {}
// 44
export class TrackCreatures extends DamageBase {
    get CreatureType() {
        return makeEnumCell(CreatureType,this, this.owner.MiscValueA);
    }
}
// 45
export class TrackResources extends DamageBase {
    get ResourceType() { return this.wrap(this.owner.MiscValueA); }
}
// 46
// 47
export class ModParryPercent extends PercentBase {}
// 48
// 49
export class ModDodgePercent extends PercentBase {}
// 50
export class ModCriticalHealAmount extends HealBase {}
// 51
export class ModBlockPercent extends PercentBase {}
// 52
export class ModWeaponCritPercent extends PercentBase {}
// 53
export class PeriodicLeech extends DamageBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 54
export class ModHitChance extends PercentBase {}
// 55
export class ModSpellHitChance extends PercentBase {}
// 56
export class Transform extends TargetBase {
    get CreatureTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 57
export class ModSpellCritChance extends PercentBase {}
// 58
export class ModIncreaseSwimSpeed extends PercentBase {}
// 59
export class ModDamageDoneCreature extends DamageBase {
    get CreatureType() {
        return makeEnumCell(CreatureType,this, this.owner.MiscValueA);
    }
}
// 60
/** TODO: uses MiscValueA but no use in core(?) */
export class ModPacifySilence extends TargetBase {
    get CreatureType() {
        return makeEnumCell(CreatureType,this, this.owner.MiscValueA);
    }
}
// 61
export class ModScale extends PercentBase {}
// 62
export class PeriodicHealthFunnel extends HealBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 63
// 64
export class PeriodicManaLeech extends ManaBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 65
export class ModCastingSpeedNotStack extends PercentBase {}
// 66
export class FeignDeath extends TargetBase {}
// 67
export class ModDisarm extends TargetBase {}
// 68
export class ModStalked extends TargetBase {}
// 69
export class SchoolAbsorb extends DamageBase {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 70 (unused)
// 71
export class ModSpellCritChanceSchool extends PercentBase {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 72
export class ModPowerCostSchoolPct extends PercentBase {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 73
export class ModPowerCostSchool extends PointsBase {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 74
export class ReflectSpellsSchool extends PercentBase {
    get School() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 75
export class ModLanguage extends PercentBase {
    get Language() { return this.wrap(this.owner.MiscValueA); }
}
// 76
/** TODO: Parameters? */
export class FarSight extends TargetBase {}
// 77
export class MechanicImmunity extends TargetBase {
    get Mechanic() {
        return makeEnumCell(SpellEffectMechanic,this, this.wrapIndex(this.row.EffectMechanic,this.index));
    }
}
// 78
export class Mounted extends TargetBase {
    get CreatureTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 79
export class ModDamagePercentDone extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 80
export class ModPercentStat extends PercentBase {
    get School() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueA);
    }
}
// 81
export class SplitDamagePct extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 82
export class WaterBreathing extends TargetBase {}
// 83
export class ModBaseResistance extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 84
export class ModRegen extends HealBase {}
// 85
export class ModPowerRegen extends PowerBase {}
// 86
export class ChannelDeathItem extends CountBase {
    get Item() { return this.wrap(this.owner.ItemType); }
}
// 87
export class ModDamagePercentTaken extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 88
export class ModHealthRegenPercent extends PercentBase {

}
// 89
export class PeriodicDamagePercent extends PercentBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 90
// 91
export class ModDetectRange extends PointsBase {}
// 92
export class PreventsFleeing extends TargetBase {}
// 93
export class ModUnattackable extends TargetBase {}
// 94
export class InterruptRegen extends TargetBase {}
// 95
export class Ghost extends TargetBase {}
// 96
export class SpellMagnet extends TargetBase {}
// 97
export class ManaShield extends DamageBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 98
export class ModSkillTalent extends PointsBase {
    get Skill() { return this.wrap(this.owner.MiscValueA); }
}
// 99
export class ModAttackPower extends PointsBase {}
// 100
export class AurasVisible extends TargetBase {}
// 101
export class ModResistancePct extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 102
export class ModMeleeAttackPowerVersus extends PointsBase {
    get CreatureTypes() {
        return makeMaskCell32(CreatureTypeMask,this, this.owner.MiscValueA);
    }
}
// 103
export class ModTotalThreat extends PointsBase {}
// 104
export class WaterWalk extends TargetBase {}
// 105
export class FeatherFall extends TargetBase {}
// 106
export class Hover extends TargetBase {}
// 107

export enum SpellModOp {
    DAMAGE                    = 0,
    DURATION                  = 1,
    THREAT                    = 2,
    EFFECT1                   = 3,
    CHARGES                   = 4,
    RANGE                     = 5,
    RADIUS                    = 6,
    CRITICAL_CHANCE           = 7,
    ALL_EFFECTS               = 8,
    NOT_LOSE_CASTING_TIME     = 9,
    CASTING_TIME              = 10,
    COOLDOWN                  = 11,
    EFFECT2                   = 12,
    IGNORE_ARMOR              = 13,
    COST                      = 14,
    CRIT_DAMAGE_BONUS         = 15,
    RESIST_MISS_CHANCE        = 16,
    JUMP_TARGETS              = 17,
    CHANCE_OF_SUCCESS         = 18,
    ACTIVATION_TIME           = 19,
    DAMAGE_MULTIPLIER         = 20,
    GLOBAL_COOLDOWN           = 21,
    DOT                       = 22,
    EFFECT3                   = 23,
    BONUS_MULTIPLIER          = 24,
    PROC_PER_MINUTE           = 26,
    VALUE_MULTIPLIER          = 27,
    RESIST_DISPEL_CHANGE      = 28,
    CRIT_DAMAGE_BONUS2        = 29,
    SPELL_COST_REFUND_ON_FAIL = 30,
}

export class AddFlatModifier extends PointsBase {
    get School() {
        return makeEnumCell(SpellModOp,this, this.owner.MiscValueA);
    }
}
// 108
export class AddPctModifier extends PercentBase {
    get Operation() {
        return makeEnumCell(SpellModOp,this, this.owner.MiscValueA);
    }
}
// 109
export class AddTargetTrigger extends PointsBase {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 110
export class ModPowerRegenPercent extends PowerBasePct {}
// 111
export class AddCasterHitTrigger extends PointsBase {}
// 113
export class ModRangedDamageTaken extends PointsBase {}
// 114
export class ModRangedDamageTakenPct extends PercentBase {
    get MiscValueA() { return this.wrap(this.owner.MiscValueA); }
}
// 115
export class ModHealing extends HealBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 116
export class ModRegenDuringCombat extends HealBase {}
// 117
export class ModMechanicResistance extends PercentBase {
    get Mechanic() {
        return makeEnumCell(SpellEffectMechanic,this, this.wrapIndex(this.row.EffectMechanic,this.index));
    }
}
// 118
export class ModHealingPct extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 119

// 120
export class Untrackable extends TargetBase {}
// 121
export class Empathy extends TargetBase {}
// 122
export class ModOffhandDamagePct extends PercentBase {}
// 123
export class ModTargetResistance extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 124
export class ModRangedAttackPower extends PointsBase {}
// 125
export class ModMeleeDamageTaken extends PointsBase {}
// 126
export class ModMeleeDamageTakenPct extends PercentBase {}
// 127
export class RangedAttackPowerAttackerBonus extends PointsBase {}
// 128
export class ModPossessPet extends TargetBase {}
// 129
export class ModSpeedAlways extends PercentBase {}
// 130
export class ModMountedSpeedAlways extends PercentBase {}
// 131
export class ModRangedAttackPowerVersus extends PercentBase {
    get CreatureTypes() {
        return makeMaskCell32(CreatureTypeMask,this, this.owner.MiscValueA);
    }
}
// 132
export class ModIncreaseEnergyPercent extends PercentBase {}
// 133
export class ModIncreaseHealthPercent extends PercentBase {}
// 134
export class ModManaRegenInterrupt extends PercentBase {}
// 135
export class ModHealingDone extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 136
export class ModHealingDonePercent extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 137
export class ModTotalStatPercentage extends PercentBase {
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueA);
    }
}
// 138
export class ModMeleeHaste extends PercentBase {}
// 139
export class ForceReaction extends PointsBase {
    get Faction() {
        return FactionRegistry.ref(this, this.owner.MiscValueA);
    }
}
// 140
export class ModRangedHaste extends PercentBase {}
// 141
export class ModRangedAmmoHaste extends PercentBase {}
// 142
export class ModBaseResistancePct extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 143
export class ModResistanceExclusive extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 144
export class SafeFall extends PointsBase {}
// 145
export class ModPetTalentPoints extends PointsBase {}
// 146
export class AllowTamePetType extends TargetBase {
    MiscValueA() { return this.wrap(this.owner.MiscValueA); }
}
// 147
export class MechanicImmunityMask extends TargetBase {
    get Mechanics() {
        return makeMaskCell32(SpellEffectMechanicMask,this, this.owner.MiscValueA);
    }
}
// 148 (only premeditation)
export class RetainComboPoints extends TargetBase {}
// 149
export class ReducePushback extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 150
export class ModShieldBlockValuePct extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 151 (only track hidden)
export class TrackStealthed extends TargetBase {}
// 152
export class ModDetectedRange extends PercentBase {}
// 153 (unused?)
export class SplitDamageFlat extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 154
export class ModStealthLevel extends PointsBase {}
// 155
export class ModWaterBreathing extends PointsBase {}
// 156
export class ModReputationGain extends PercentBase {}
// 157 (unused/singleton?)
export class PetDamageMulti extends PercentBase {}
// 158
export class ModShieldBlockValue extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 159
export class NoPvPCredit extends TargetBase {}
// 160 (unused)
export class ModAoEAvoidance extends TargetBase {}
// 161
export class ModHealthRegenInCombat extends PointsBase {}
// 162
export class PowerBurn extends PowerBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 163

// 164
export class ModCritDamageBonus extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 165
export class MeleeAttackPowerAttackerBonus extends PointsBase {}
// 166
export class ModAttackPowerPct extends PercentBase {}
// 167
export class ModRangedAttackPowerPct extends PercentBase {}
// 168
export class ModDamageDoneVersus extends PointsBase {
    get CreatureTypes() {
        return makeMaskCell32(CreatureTypeMask,this, this.owner.MiscValueA);
    }
}
// 169
export class ModCritPercentVersus extends PercentBase {
    get CreatureTypes() {
        return makeMaskCell32(CreatureTypeMask,this, this.owner.MiscValueA);
    }
}
// 170
export class DetectAmore extends PointsBase {
    get AmoreAura() { return this.wrap(this.owner.MiscValueA); }
}
// 171
export class ModSpeedNotStack extends PercentBase {}
// 172
export class ModMountedSpeedNotStack extends PercentBase {}
// 173
// 174
/**
 * TODO: MiscValueA is always 126 or 36, is this is a school mask?
 */
export class ModSpellDamageOfStatPercent extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueA);
    }
}
// 175
export class ModSpellHealingOfStatPercent extends PercentBase {
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueA);
    }
}
// 176
export class SpiritOfRedemption extends TargetBase {}
// 177
export class AoECharm extends PointsBase {}
// 178
export class ModDebuffResistance extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 179
export class ModAttackerSpellCritChance extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 180
export class ModFlatSpellDamageVersus extends PointsBase {
    get CreatureTypes() {
        return makeMaskCell32(CreatureTypeMask,this, this.owner.MiscValueA);
    }
}
// 181
// 182
export class ModResistanceOfStatPercent extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueB);
    }
}
// 183
export class ModCriticalThreat extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 184
/**
 * TODO: MiscValueA unused?
 */
export class ModAttackerMeleeHitChance extends PercentBase {}
// 185
export class ModAttackerRangedHitChance extends PercentBase {}
// 186
export class ModAttackerSpellHitChance extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 187
/** TODO: Unused MiscValueA */
export class ModAttackerMeleeCritChance extends PercentBase {}
// 188
export class ModAttackerRangedCritChance extends PercentBase {}
// 189
export enum CombatRating {
    WEAPON_SKILL      = 0,
    DEFENSE_SKILL     = 1,
    DODGE             = 2,
    PARRY             = 3,
    BLOCK             = 4,
    HIT_MELEE         = 5,
    HIT_RANGED        = 6,
    HIT_SPELL         = 7,
    CRIT_MELEE        = 8,
    CRIT_RANGED       = 9,
    CRIT_SPELL        = 10,
    HIT_TAKEN_MELEE   = 11,
    HIT_TAKEN_RANGED  = 12,
    HIT_TAKEN_SPELL   = 13,
    CRIT_TAKEN_MELEE  = 14,
    CRIT_TAKEN_RANGED = 15,
    CRIT_TAKEN_SPELL  = 16,
    HASTE_MELEE       = 17,
    HASTE_RANGED      = 18,
    HASTE_SPELL       = 19,
}
export class ModRating extends PercentBase {
    get Rating() {
        return makeEnumCell(CombatRating,this, this.owner.MiscValueA);
    }
}
// 190
export class ModFactionReputationGain extends PercentBase {
    get Faction() { return this.wrap(this.owner.MiscValueA); }
}
// 191
export class UseNormalMovementSpeed extends PointsBase {}
// 192
export class ModMeleeRangedHaste extends PercentBase {}
// 193
export class MeleeSlow extends PercentBase {}
// 194
export class ModTargetAbsorbSchool extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 195
export class ModTargetAbilityAbsorbSchool extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 196
export class ModCooldown extends PercentBase {}
// 197
export class ModAttackerSpellAndWeaponCritChance extends PercentBase {}
// 198
// 199
export class ModIncreasesSpellPctToHit extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 200
export class ModXpPct extends PercentBase {}
// 201
export class Fly extends TargetBase {}
// 202
/** TODO: Unused MiscValueA? */
export class CannotBeDodged extends TargetBase {}
// 203
export class ModAttackerMeleeCritDamage extends PercentBase {}
// 204
export class ModAttackerRangedCritDamage extends PercentBase {}
// 205
export class ModSchoolCritDmgTaken extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 206
export class ModIncreaseVehicleFlightSpeed extends PercentBase {}
// 207
export class ModIncreaseMountedFlightSpeed extends PercentBase {}
// 208
export class ModIncreaseFlightSpeed extends PercentBase {}
// 209
export class ModMountedFlightSpeedAlways extends PercentBase {}
// 210
export class ModVehicleSpeedAlways extends PercentBase {}
// 211
export class ModFlightSpeedNotStack extends PercentBase {}
// 212
export class ModRangedAttackPowerOfStatPercent extends PercentBase {
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueA);
    }
}
// 213
export class ModRageFromDamageDealt extends PercentBase {}
// 214
export class Tamed extends PointsBase {}
// 215
export class ArenaPreparation extends TargetBase {}
// 216
export class HasteSpells extends PercentBase {}
// 217
// 218
export class HasteRanged extends PercentBase {}
// 219
export class ModManaRegenFromStat extends PercentBase {
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueA);
    }
}
// 220
export class ModRatingFromStat extends PercentBase {
    get Rating() {
        return makeEnumCell(CombatRating,this, this.owner.MiscValueA);
    }
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueB);
    }
}
// 221
export class ModDetaunt extends TargetBase {}
// 222
export class RaidProcFromCharge extends TargetBase {}
// 223
// 224
// 225
export class RaidProcFromChargeWithValue extends PointsBase {}
// 226
// 227
// 228
export class DetectStealth extends PointsBase {}
// 229
export class ModAoEDamageAvoidance extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 230
export class ModIncreaseHealth2 extends PointsBase {}
// 231
// 232
export class MechanicDurationMod extends PercentBase {
    get Mechanics() {
        return makeMaskCell32(SpellEffectMechanicMask,this, this.owner.MiscValueB);
    }
}
// 233
// 234
export class MechanicDurationModNotStack extends PercentBase {
    get Mechanics() {
        return makeMaskCell32(SpellEffectMechanicMask,this, this.owner.MiscValueA);
    }
}
// 235
export class ModDispelResist extends PercentBase {}
// 236
export class ControlVehicle extends TargetBase {}
// 237
export class ModSpellDamageOfAttackPower extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 238
export class ModSpellHealingOfAttackPower extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 239
export class ModScale2 extends PercentBase {}
// 240
export class ModExpertise extends PointsBase {}
// 241
export class ForceMoveForward extends TargetBase {}
// 242
export class ModSpellDamageFromHealing extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 243
export class ModFaction extends TargetBase {
    get Faction() { return this.wrap(this.owner.MiscValueA); }
}
// 244
export class ComprehendLanguage extends TargetBase {
    get Language() { return this.wrap(this.owner.MiscValueA); }
}
// 245
export class ModAuraDurationByDispel extends PercentBase {}
// 246
export class ModAuraDurationByDispelNotStack extends PercentBase {}
// 247
export class CloneCaster extends TargetBase {}
// 248
export class ModCombatResultChance extends TargetBase {
    get Rating() {
        return makeEnumCell(CombatRating,this, this.owner.MiscValueA);
    }
}
// 249
export enum RuneType {
    BLOOD  = 0,
    UNHOLY = 1,
    FROST  = 2,
    DEATH  = 3,
}

export class ConvertRune extends CountBase {
    get Rune() {
        return makeEnumCell(RuneType,this, this.owner.MiscValueA);
    }
}
// 250
export class ModIncreaseHealth3 extends PointsBase {}
// 251
export class ModEnemyDodge extends PercentBase {}
// 252
// 253
export class ModBlockCritChance extends PercentBase {}
// 254
export class ModDisarmOffhand extends TargetBase {}
// 255
export class ModMechanicDamageTakenPercent extends PercentBase {
    get Mechanic() {
        return makeEnumCell(SpellEffectMechanic,this, this.owner.MiscValueA);
    }
}
// 256
export class NoReagentUse extends TargetBase {}
// 257
export class ModTargetResistBySpellClass extends PointsBase {}
// 258
// 259
export class ModHotPct extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 260
export class ScreenEffect extends PointsBase {
    get Effect() { return new RefUnknown(this, this.owner.MiscValueA); }
}
// 261
export class Phase extends TargetBase {
    get PhaseMask() { return new MaskCell32(this, this.owner.MiscValueA); }
}
// 262
// 263
export class AllowOnlyAbility extends TargetBase {}
// 264
// 265
// 266
// 267
export class ModImmuneAuraApplySchool extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 268
export class ModAttackPowerOfStatPercent extends PercentBase {
    get Stat() {
        return makeEnumCell(StatMod,this, this.owner.MiscValueA);
    }
}
// 269
export class ModIgnoreTargetResist extends TargetBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 270
// 271
export class ModDamageFromCaster extends PercentBase {}
// 272
export class IgnoreMeleeReset extends TargetBase {}
// 273
// 274
export class ConsumeNoAmmo extends TargetBase {}
// 275
export class ModIgnoreShapeshift extends TargetBase {}
// 276
// 277
export class ModAbilityAffectedTargets extends TargetBase {}
// 278
export class ModDisarmRanged extends TargetBase {}
// 279
export class InitializeImages extends TargetBase {}
// 280
export class ModTargetArmorPct extends PercentBase {}
// 281
export class ModHonorGainPct extends PercentBase {}
// 282
export class IncreaseBaseHealthPercent extends PercentBase {}
// 283
export class ModHealingReceived extends PercentBase {}
// 284
// 285
export class ModAttackPowerOfArmor extends PointsBase {}
// 286
// 287
export class DeflectSpells extends PercentBase {}
// 288
export class IgnoreHitDirection extends PercentBase {}
// 289
// 290
export class ModCritPct extends PercentBase {}
// 291
export class ModXpQuestPct extends PercentBase {}
// 292
export class SetOpenStable extends TargetBase {}
// 293
// 294 (TODO: What is MiscValueA?)
export class PreventRegeneratePower extends TargetBase {
    get PowerType() {
        return makeEnumCell(SpellPowerType,this, this.owner.MiscValueB);
    }
}
// 295
// 296
export class SetVehicleId extends TargetBase {
    get Vehicle() { return VehicleRegistry.ref(this,this.owner.MiscValueA); }
}
// 297
// 298
// 299

// 300
export class ShareDamagePct extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 301
export class SchoolHealAbsorb extends PointsBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 302
// 303
// 304
// 305
export class ModMinimumSpeed extends PercentBase {}
// 306
// 307
// 308
// 309

// 310
export class ModCreatureAoEDamageAvoidance extends PercentBase {
    get Schools() {
        return makeMaskCell32(SchoolMask,this, this.owner.MiscValueA);
    }
}
// 311
// 312
// 313
// 314
export class PreventResurrection extends TargetBase {}
// 315
export class UnderwaterWalking extends TargetBase {}
// 316