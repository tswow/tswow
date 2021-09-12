import { DamageBase, ChanceBase, HealBase, PercentBase, DamageBasePct, PointsBase, HealBasePct, PowerBasePct, PowerBase, ManaBase, CountBase } from "./PointsBase";
import { TargetBase } from "./TargetBase";
import { SchoolMask, SchoolEnum } from "../../Misc/School";
import { CreatureTypeEnum, CreatureTypeMask } from "../../Creature/CreatureType";
import { SpellEffectMechanicEnum, SpellEffectMechanicMask } from "../SpellEffectMechanics";
import { SpellPowerType } from "../SpellPowerType";
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell, MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { CellWrapper } from "wotlkdata/cell/cells/Cell";
import { Ids } from "../../Misc/Ids";
import { DBC } from "wotlkdata";

export const all_auras : any = {}
export function AuraID(id: number) {
    return function(target: any) {
        all_auras[id] = target;
    }
}

// 1
@AuraID(1)
export class BindSight extends TargetBase {}
// 2
@AuraID(2)
export class ModPossess extends ChanceBase {}
// 3
@AuraID(3)
export class PeriodicDamage extends DamageBase {
    get DamagePeriod() { return this.wrap(this.owner.AuraPeriod); }
}
// 4
// 5
@AuraID(5)
export class ModConfuse extends TargetBase {}
// 6
@AuraID(6)
export class ModCharm extends ChanceBase {}
// 7
@AuraID(7)
export class ModFear extends TargetBase {}
// 8
@AuraID(8)
export class PeriodicHeal extends HealBase {
    get School() { return this.wrap(this.owner.MiscValueA); }
    get HealPeriod() { return this.wrap(this.owner.AuraPeriod); }
}
// 9
@AuraID(9)
export class ModAttackSpeed extends PercentBase {}
// 10
@AuraID(10)
export class ModThreat extends PercentBase {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 11
@AuraID(11)
export class ModTaunt extends TargetBase {}
// 12
@AuraID(12)
export class ModStun extends TargetBase {}
// 13
@AuraID(13)
export class ModDamageDone extends DamageBasePct {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 14
@AuraID(14)
export class ModDamageTaken extends DamageBasePct {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 15
@AuraID(15)
export class DamageShield extends DamageBasePct {
    get School() { return new SchoolEnum(this, this.owner.MiscValueA); }
}
// 16
export class StealthType<T> extends EnumCellWrapper<T> {
    setNormal() { return this.set(0); }
    setTrap() { return this.set(1); }
}

@AuraID(16)
export class ModStealth extends PointsBase {
    get Type() { return new StealthType(this, this.owner.MiscValueA); }
}
// 17
@AuraID(16)
export class ModDetect extends PointsBase {
    get Type() { return new StealthType(this, this.owner.MiscValueA); }
}
// 18

export class InvisibilityType<T> extends EnumCellWrapper<T>
{
    setGeneral() { return this.set(0); }
    setUnk1() { return this.set(1); }
    setUnk2() { return this.set(2); }
    setTrap() { return this.set(3); }
    setUnk4() { return this.set(4); }
    setUnk5() { return this.set(5); }
    setDrunk() { return this.set(6); }
    setUnk7() { return this.set(7); }
    setUnk8() { return this.set(8); }
    setUnk9() { return this.set(9); }
    setUnk10() { return this.set(10); }
    setUnk11() { return this.set(11); }
};
@AuraID(18)
export class ModInvisibility extends PointsBase {
    get Type() { return new StealthType(this, this.owner.MiscValueA); }
}
// 19
@AuraID(19)
export class ModInvisibilityDetection extends PointsBase {
    get Type() { return new StealthType(this, this.owner.MiscValueA); }
}
// 20
@AuraID(20)
export class ObsModHealth extends HealBasePct {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
    get AuraPeriod() { return this.wrap(this.owner.AuraPeriod); }
}
// 21
@AuraID(21)
export class ObsModPower extends PowerBasePct {
    get AuraPeriod() { return this.wrap(this.owner.AuraPeriod); }
}
// 22
@AuraID(22)
export class ModResistance extends PointsBase {
    get Resistance() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 23
// 24
@AuraID(24)
export class PeriodicEnergize extends PowerBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 25
@AuraID(25)
export class ModPacify extends TargetBase {}
// 26
@AuraID(26)
export class ModRoot extends TargetBase {}
// 27
@AuraID(27)
export class ModSilence extends TargetBase {}
// 28
@AuraID(28)
export class ReflectSpells extends PercentBase {}
// 29
export class StatMod<T> extends EnumCellWrapper<T> {
    setAll() { return this.set(-1); }
    setStrength() { return this.set(0); }
    setAgility() { return this.set(1); }
    setStamina() { return this.set(2); }
    setIntellect() { return this.set(3); }
    setSpirit() { return this.set(4); }
}

@AuraID(29)
export class ModStat extends PointsBase {
    get Stat() { return new StatMod(this, this.owner.MiscValueA); }
}
// 30
@AuraID(30)
export class ModSkill extends PointsBase {
    get Skill() { return this.wrap(this.owner.MiscValueA); }
}
// 31
@AuraID(31)
export class ModIncreaseSpeed extends PercentBase {}
// 32
@AuraID(32)
export class ModIncreaseMountSpeed extends PercentBase {}
// 33
@AuraID(33)
export class ModDecreaseSpeed extends PercentBase {}
// 34
@AuraID(34)
export class ModIncreaseHealth extends PointsBase {}
// 35
@AuraID(35)
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
@AuraID(36)
export class ModShapeshift extends TargetBase {
    get Form() { return new ShapeshiftFormCell(this, this.owner.MiscValueA); }
}
// 37
/** TODO: Uses MiscValueA, which is not used in core */
@AuraID(37)
export class EffectImmunity extends TargetBase {}
// 38
@AuraID(38)
export class StateImmunity extends TargetBase {}
// 39
@AuraID(39)
export class SchoolImmunity extends TargetBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 40
@AuraID(40)
export class DamageImmunity extends TargetBase {}
// 41
@AuraID(41)
export class DispelImmunity extends TargetBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 42
@AuraID(42)
export class ProcTriggerSpell extends TargetBase {
    get TriggeredSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 43
@AuraID(43)
export class ProcTriggerDamage extends DamageBase {}
// 44
@AuraID(44)
export class TrackCreatures extends DamageBase {
    get CreatureType() { return new CreatureTypeEnum(this, this.owner.MiscValueA); }
}
// 45
@AuraID(45)
export class TrackResources extends DamageBase {
    get ResourceType() { return this.wrap(this.owner.MiscValueA); }
}
// 46
// 47
@AuraID(47)
export class ModParryPercent extends PercentBase {}
// 48
// 49
@AuraID(49)
export class ModDodgePercent extends PercentBase {}
// 50
@AuraID(50)
export class ModCriticalHealAmount extends HealBase {}
// 51
@AuraID(51)
export class ModBlockPercent extends PercentBase {}
// 52
@AuraID(51)
export class ModWeaponCritPercent extends PercentBase {}
// 53
@AuraID(53)
export class PeriodicLeech extends DamageBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 54
@AuraID(54)
export class ModHitChance extends PercentBase {}
// 55
@AuraID(54)
export class ModSpellHitChance extends PercentBase {}
// 56
@AuraID(56)
export class Transform extends TargetBase {
    get CreatureTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 57
@AuraID(57)
export class ModSpellCritChance extends PercentBase {}
// 58
@AuraID(58)
export class ModIncreaseSwimSpeed extends PercentBase {}
// 59
@AuraID(59)
export class ModDamageDoneCreature extends DamageBase {
    get CreatureType() { return new CreatureTypeEnum(this, this.owner.MiscValueA); }
}
// 60
/** TODO: uses MiscValueA but no use in core(?) */
@AuraID(60)
export class ModPacifySilence extends TargetBase {
    get CreatureType() { return new CreatureTypeEnum(this, this.owner.MiscValueA); }
}
// 61
@AuraID(61)
export class ModScale extends PercentBase {}
// 62
@AuraID(62)
export class PeriodicHealthFunnel extends HealBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 63
// 64
@AuraID(64)
export class PeriodicManaLeech extends ManaBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 65
@AuraID(65)
export class ModCastingSpeedNotStack extends PercentBase {}
// 66
@AuraID(66)
export class FeignDeath extends TargetBase {}
// 67
@AuraID(67)
export class ModDisarm extends TargetBase {}
// 68
@AuraID(68)
export class ModStalked extends TargetBase {}
// 69
@AuraID(69)
export class SchoolAbsorb extends DamageBase {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 70 (unused)
// 71
@AuraID(71)
export class ModSpellCritChanceSchool extends PercentBase {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 72
@AuraID(72)
export class ModPowerCostSchoolPct extends PercentBase {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 73
@AuraID(73)
export class ModPowerCostSchool extends PointsBase {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 74
@AuraID(74)
export class ReflectSpellsSchool extends PercentBase {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 75
@AuraID(75)
export class ModLanguage extends PercentBase {
    get Language() { return this.wrap(this.owner.MiscValueA); }
}
// 76
/** TODO: Parameters? */
@AuraID(76)
export class FarSight extends TargetBase {}
// 77
@AuraID(77)
export class MechanicImmunity extends TargetBase {
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.owner.MiscValueA); }
}
// 78
@AuraID(78)
export class Mounted extends TargetBase {
    get CreatureTemplate() { return this.wrap(this.owner.MiscValueA); }
}
// 79
@AuraID(79)
export class ModDamagePercentDone extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 80
@AuraID(80)
export class ModPercentStat extends PercentBase {
    get Stat() { return new StatMod(this, this.owner.MiscValueA); }
}
// 81
@AuraID(81)
export class SplitDamagePct extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 82
@AuraID(82)
export class WaterBreathing extends TargetBase {}
// 83
@AuraID(83)
export class ModBaseResistance extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 84
@AuraID(84)
export class ModRegen extends HealBase {}
// 85
@AuraID(85)
export class ModPowerRegen extends PowerBase {}
// 86
@AuraID(86)
export class ChannelDeathItem extends CountBase {
    get Item() { return this.wrap(this.owner.ItemType); }
}
// 87
@AuraID(87)
export class ModDamagePercentTaken extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 88
@AuraID(88)
export class ModHealthRegenPercent extends PercentBase {

}
// 89
@AuraID(89)
export class PeriodicDamagePercent extends PercentBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 90
// 91
@AuraID(91)
export class ModDetectRange extends PointsBase {}
// 92
@AuraID(92)
export class PreventsFleeing extends TargetBase {}
// 93
@AuraID(93)
export class ModUnattackable extends TargetBase {}
// 94
@AuraID(94)
export class InterruptRegen extends TargetBase {}
// 95
@AuraID(95)
export class Ghost extends TargetBase {}
// 96
@AuraID(96)
export class SpellMagnet extends TargetBase {}
// 97
@AuraID(97)
export class ManaShield extends DamageBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 98
@AuraID(98)
export class ModSkillTalent extends PointsBase {
    get Skill() { return this.wrap(this.owner.MiscValueA); }
}
// 99
@AuraID(99)
export class ModAttackPower extends PointsBase {}
// 100
@AuraID(100)
export class AurasVisible extends TargetBase {}
// 101
@AuraID(101)
export class ModResistancePct extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 102
@AuraID(101)
export class ModMeleeAttackPowerVersus extends PointsBase {
    get CreatureTypes() { return new CreatureTypeMask(this, this.owner.MiscValueA); }
}
// 103
@AuraID(103)
export class ModTotalThreat extends PointsBase {}
// 104
@AuraID(104)
export class WaterWalk extends TargetBase {}
// 105
@AuraID(105)
export class FeatherFall extends TargetBase {}
// 106
@AuraID(106)
export class Hover extends TargetBase {}
// 107

export class SpellModOp<T> extends EnumCellWrapper<T> {
    @EnumField(0)
    setDamage(){return this.set(0)}
    @EnumField(1)
    setDuration(){return this.set(1)}
    @EnumField(2)
    setThreat(){return this.set(2)}
    @EnumField(3)
    setEffect1(){return this.set(3)}
    @EnumField(4)
    setCharges(){return this.set(4)}
    @EnumField(5)
    setRange(){return this.set(5)}
    @EnumField(6)
    setRadius(){return this.set(6)}
    @EnumField(7)
    setCriticalChance(){return this.set(7)}
    @EnumField(8)
    setAllEffects(){return this.set(8)}
    @EnumField(9)
    setNotLoseCastingTime(){return this.set(9)}
    @EnumField(10)
    setCastingTime(){return this.set(10)}
    @EnumField(11)
    setCooldown(){return this.set(11)}
    @EnumField(12)
    setEffect2(){return this.set(12)}
    @EnumField(13)
    setIgnoreArmor(){return this.set(13)}
    @EnumField(14)
    setCost(){return this.set(14)}
    @EnumField(15)
    setCritDamageBonus(){return this.set(15)}
    @EnumField(16)
    setResistMissChance(){return this.set(16)}
    @EnumField(17)
    setJumpTargets(){return this.set(17)}
    @EnumField(18)
    setChanceOfSuccess(){return this.set(18)}
    @EnumField(19)
    setActivationTime(){return this.set(19)}
    @EnumField(20)
    setDamageMultiplier(){return this.set(20)}
    @EnumField(21)
    setGlobalCooldown(){return this.set(21)}
    @EnumField(22)
    setDot(){return this.set(22)}
    @EnumField(23)
    setEffect3(){return this.set(23)}
    @EnumField(24)
    setBonusMultiplier(){return this.set(24)}
    // spellmod 25
    @EnumField(26)
    setProcPerMinute(){return this.set(26)}
    @EnumField(27)
    setValueMultiplier(){return this.set(27)}
    @EnumField(28)
    setResistDispelChange(){return this.set(28)}
    @EnumField(29)
    setCritDamageBonus2(){return this.set(29)}
    @EnumField(30)
    setSpellCostRefundOnFail(){return this.set(30)}
}

@AuraID(107)
export class AddFlatModifier extends PointsBase {
    get Operation() { return new SpellModOp(this, this.owner.MiscValueA); }
}
// 108
@AuraID(108)
export class AddPctModifier extends PercentBase {
    get Operation() { return new SpellModOp(this, this.owner.MiscValueA); }
}
// 109
@AuraID(109)
export class AddTargetTrigger extends PointsBase {
    get TriggerSpell() { return this.wrap(this.owner.TriggerSpell); }
}
// 110
@AuraID(110)
export class ModPowerRegenPercent extends PowerBasePct {}
// 111
@AuraID(111)
export class AddCasterHitTrigger extends PointsBase {}
// 113
@AuraID(113)
export class ModRangedDamageTaken extends PointsBase {}
// 114
@AuraID(114)
export class ModRangedDamageTakenPct extends PercentBase {
    get MiscValueA() { return this.wrap(this.owner.MiscValueA); }
}
// 115
@AuraID(115)
export class ModHealing extends HealBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 116
@AuraID(116)
export class ModRegenDuringCombat extends HealBase {}
// 117
@AuraID(117)
export class ModMechanicResistance extends PercentBase {
    get Mechanics() { return new SpellEffectMechanicEnum(this, this.owner.MiscValueA); }
}
// 118
@AuraID(118)
export class ModHealingPct extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 119

// 120
@AuraID(120)
export class Untrackable extends TargetBase {}
// 121
@AuraID(121)
export class Empathy extends TargetBase {}
// 122
@AuraID(122)
export class ModOffhandDamagePct extends PercentBase {}
// 123
@AuraID(123)
export class ModTargetResistance extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 124
@AuraID(124)
export class ModRangedAttackPower extends PointsBase {}
// 125
@AuraID(125)
export class ModMeleeDamageTaken extends PointsBase {}
// 126
@AuraID(126)
export class ModMeleeDamageTakenPct extends PercentBase {}
// 127
@AuraID(127)
export class RangedAttackPowerAttackerBonus extends PointsBase {}
// 128
@AuraID(128)
export class ModPossessPet extends TargetBase {}
// 129
@AuraID(129)
export class ModSpeedAlways extends PercentBase {}
// 130
@AuraID(130)
export class ModMountedSpeedAlways extends PercentBase {}
// 131
@AuraID(131)
export class ModRangedAttackPowerVersus extends PercentBase {
    get CreatureType() { return new CreatureTypeMask(this, this.owner.MiscValueA); }
}
// 132
@AuraID(132)
export class ModIncreaseEnergyPercent extends PercentBase {}
// 133
@AuraID(133)
export class ModIncreaseHealthPercent extends PercentBase {}
// 134
@AuraID(134)
export class ModManaRegenInterrupt extends PercentBase {}
// 135
@AuraID(135)
export class ModHealingDone extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 136
@AuraID(135)
export class ModHealingDonePercent extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 137
@AuraID(137)
export class ModTotalStatPercentage extends PercentBase {
    get Stat() { return new StatMod(this, this.owner.MiscValueA); }
}
// 138
@AuraID(138)
export class ModMeleeHaste extends PercentBase {}
// 139
@AuraID(139)
export class ForceReaction extends PointsBase {
    get FactionID() { return this.wrap(this.owner.MiscValueA); }
}
// 140
@AuraID(140)
export class ModRangedHaste extends PercentBase {}
// 141
@AuraID(141)
export class ModRangedAmmoHaste extends PercentBase {}
// 142
@AuraID(142)
export class ModBaseResistancePct extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 143
@AuraID(143)
export class ModResistanceExclusive extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 144
@AuraID(144)
export class SafeFall extends PointsBase {}
// 145
@AuraID(145)
export class ModPetTalentPoints extends PointsBase {}
// 146
@AuraID(146)
export class AllowTamePetType extends TargetBase {
    MiscValueA() { return this.wrap(this.owner.MiscValueA); }
}
// 147
@AuraID(147)
export class MechanicImmunityMask extends TargetBase {
    get Mechanics() { return new SpellEffectMechanicMask(this, this.owner.MiscValueA); }
}
// 148 (only premeditation)
@AuraID(148)
export class RetainComboPoints extends TargetBase {}
// 149
@AuraID(149)
export class ReducePushback extends PointsBase {
    get School() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 150
@AuraID(150)
export class ModShieldBlockValuePct extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 151 (only track hidden)
@AuraID(151)
export class TrackStealthed extends TargetBase {}
// 152
@AuraID(152)
export class ModDetectedRange extends PercentBase {}
// 153 (unused?)
@AuraID(153)
export class SplitDamageFlat extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 154
@AuraID(154)
export class ModStealthLevel extends PointsBase {}
// 155
@AuraID(155)
export class ModWaterBreathing extends PointsBase {}
// 156
@AuraID(156)
export class ModReputationGain extends PercentBase {}
// 157 (unused/singleton?)
@AuraID(157)
export class PetDamageMulti extends PercentBase {}
// 158
@AuraID(158)
export class ModShieldBlockValue extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 159
@AuraID(159)
export class NoPvPCredit extends TargetBase {}
// 160 (unused)
@AuraID(160)
export class ModAoEAvoidance extends TargetBase {}
// 161
@AuraID(161)
export class ModHealthRegenInCombat extends PointsBase {}
// 162
@AuraID(162)
export class PowerBurn extends PowerBase {
    get Period() { return this.wrap(this.owner.AuraPeriod); }
}
// 163

// 164
@AuraID(164)
export class ModCritDamageBonus extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 165
@AuraID(165)
export class MeleeAttackPowerAttackerBonus extends PointsBase {}
// 166
@AuraID(166)
export class ModAttackPowerPct extends PercentBase {}
// 167
@AuraID(167)
export class ModRangedAttackPowerPct extends PercentBase {}
// 168
@AuraID(168)
export class ModDamageDoneVersus extends PointsBase {
    get CreatureTypes() { return new CreatureTypeMask(this, this.owner.MiscValueA); }
}
// 169
@AuraID(169)
export class ModCritPercentVersus extends PercentBase {
    get CreatureTypes() { return new CreatureTypeMask(this, this.owner.MiscValueA); }
}
// 170
@AuraID(170)
export class DetectAmore extends PointsBase {
    get AmoreAura() { return this.wrap(this.owner.MiscValueA); }
}
// 171
@AuraID(171)
export class ModSpeedNotStack extends PercentBase {}
// 172
@AuraID(172)
export class ModMountedSpeedNotStack extends PercentBase {}
// 173
// 174
/**
 * TODO: MiscValueA is always 126 or 36, is this is a school mask?
 */
@AuraID(174)
export class ModSpellDamageOfStatPercent extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
    get Stat() { return new StatMod(this, this.owner.MiscValueB); }
}
// 175
@AuraID(175)
export class ModSpellHealingOfStatPercent extends PercentBase {
    get Stat() { return new StatMod(this, this.owner.MiscValueA); }
}
// 176
@AuraID(176)
export class SpiritOfRedemption extends TargetBase {}
// 177
@AuraID(177)
export class AoECharm extends PointsBase {}
// 178
@AuraID(178)
export class ModDebuffResistance extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 179
@AuraID(179)
export class ModAttackerSpellCritChance extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 180
@AuraID(180)
export class ModFlatSpellDamageVersus extends PointsBase {
    get CreatureTypes() { return new CreatureTypeMask(this, this.owner.MiscValueA); }
}
// 181
// 182
@AuraID(182)
export class ModResistanceOfStatPercent extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
    get Stat() { return new StatMod(this, this.owner.MiscValueB); }
}
// 183
@AuraID(183)
export class ModCriticalThreat extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 184
/**
 * TODO: MiscValueA unused?
 */
@AuraID(184)
export class ModAttackerMeleeHitChance extends PercentBase {}
// 185
@AuraID(185)
export class ModAttackerRangedHitChance extends PercentBase {}
// 186
@AuraID(186)
export class ModAttackerSpellHitChance extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 187
/** TODO: Unused MiscValueA */
@AuraID(187)
export class ModAttackerMeleeCritChance extends PercentBase {}
// 188
@AuraID(188)
export class ModAttackerRangedCritChance extends PercentBase {}
// 189
export class CombatRating<T> extends EnumCellWrapper<T> {
    @EnumField(0)
    setWeaponSkill() { return this.set(0); }
    @EnumField(1)
    setDefenseSkill() { return this.set(1); }
    @EnumField(2)
    setDodge() { return this.set(2); }
    @EnumField(3)
    setParry() { return this.set(3); }
    @EnumField(4)
    setBlock() { return this.set(4); }
    @EnumField(5)
    setHitMelee() { return this.set(5); }
    @EnumField(6)
    setHitRanged() { return this.set(6); }
    @EnumField(7)
    setHitSpell() { return this.set(7); }
    @EnumField(8)
    setCritMelee() { return this.set(8); }
    @EnumField(9)
    setCritRanged() { return this.set(9); }
    @EnumField(10)
    setCritSpell() { return this.set(10); }
    @EnumField(11)
    setHitTakenMelee() { return this.set(11); }
    @EnumField(12)
    setHitTakenRanged() { return this.set(12); }
    @EnumField(13)
    setHitTakenSpell() { return this.set(13); }
    @EnumField(14)
    setCritTakenMelee() { return this.set(14); }
    @EnumField(15)
    setCritTakenRanged() { return this.set(15); }
    @EnumField(16)
    setCritTakenSpell() { return this.set(16); }
    @EnumField(17)
    setHasteMelee() { return this.set(17); }
    @EnumField(18)
    setHasteRanged() { return this.set(18); }
    @EnumField(19)
    setHasteSpell() { return this.set(19); }
    /*
    @EnumField(19)
    setWeaponSkillMainhand() { return this.set(20); }
    @EnumField(21)
    setWeaponSkillOffhand() { return this.set(21); }
    @EnumField(22)
    setWeaponSkillRanged() { return this.set(22); }
    @EnumField(23)
    setExpertise() { return this.set(23); }
    @EnumField(24)
    setArmorPenetration() { return this.set(24); }
    */
}
@AuraID(189)
export class ModRating extends PercentBase {
    get Rating() { return new CombatRating(this, this.owner.MiscValueA); }
}
// 190
@AuraID(190)
export class ModFactionReputationGain extends PercentBase {
    get Faction() { return this.wrap(this.owner.MiscValueA); }
}
// 191
@AuraID(191)
export class UseNormalMovementSpeed extends PointsBase {}
// 192
@AuraID(192)
export class ModMeleeRangedHaste extends PercentBase {}
// 193
@AuraID(193)
export class MeleeSlow extends PercentBase {}
// 194
@AuraID(194)
export class ModTargetAbsorbSchool extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 195
@AuraID(195)
export class ModTargetAbilityAbsorbSchool extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 196
@AuraID(196)
export class ModCooldown extends PercentBase {}
// 197
@AuraID(197)
export class ModAttackerSpellAndWeaponCritChance extends PercentBase {}
// 198
// 199
@AuraID(199)
export class ModIncreasesSpellPctToHit extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 200
@AuraID(200)
export class ModXpPct extends PercentBase {}
// 201
@AuraID(201)
export class Fly extends TargetBase {}
// 202
/** TODO: Unused MiscValueA? */
@AuraID(202)
export class CannotBeDodged extends TargetBase {}
// 203
@AuraID(203)
export class ModAttackerMeleeCritDamage extends PercentBase {}
// 204
@AuraID(204)
export class ModAttackerRangedCritDamage extends PercentBase {}
// 205
@AuraID(205)
export class ModSchoolCritDmgTaken extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 206
@AuraID(206)
export class ModIncreaseVehicleFlightSpeed extends PercentBase {}
// 207
@AuraID(207)
export class ModIncreaseMountedFlightSpeed extends PercentBase {}
// 208
@AuraID(208)
export class ModIncreaseFlightSpeed extends PercentBase {}
// 209
@AuraID(209)
export class ModMountedFlightSpeedAlways extends PercentBase {}
// 210
@AuraID(210)
export class ModVehicleSpeedAlways extends PercentBase {}
// 211
@AuraID(211)
export class ModFlightSpeedNotStack extends PercentBase {}
// 212
@AuraID(212)
export class ModRangedAttackPowerOfStatPercent extends PercentBase {
    get Stat() { return new StatMod(this, this.owner.MiscValueA); }
}
// 213
@AuraID(213)
export class ModRageFromDamageDealt extends PercentBase {}
// 214
@AuraID(214)
export class Tamed extends PointsBase {}
// 215
@AuraID(215)
export class ArenaPreparation extends TargetBase {}
// 216
@AuraID(216)
export class HasteSpells extends PercentBase {}
// 217
// 218
@AuraID(218)
export class HasteRanged extends PercentBase {}
// 219
@AuraID(219)
export class ModManaRegenFromStat extends PercentBase {
    get Stat() { return new StatMod(this, this.owner.MiscValueA); }
}
// 220
@AuraID(220)
export class ModRatingFromStat extends PercentBase {
    get Rating() { return new CombatRating(this, this.owner.MiscValueA); }
    get Stat() { return new StatMod(this, this.owner.MiscValueA); }
}
// 221
@AuraID(221)
export class ModDetaunt extends TargetBase {}
// 222
@AuraID(223)
export class RaidProcFromCharge extends TargetBase {}
// 223
// 224
// 225
@AuraID(225)
export class RaidProcFromChargeWithValue extends PointsBase {}
// 226
// 227
// 228
@AuraID(228)
export class DetectStealth extends PointsBase {}
// 229
@AuraID(229)
export class ModAoEDamageAvoidance extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 230
@AuraID(230)
export class ModIncreaseHealth2 extends PointsBase {}
// 231
// 232
@AuraID(232)
export class MechanicDurationMod extends PercentBase {
    get Mechanics() { return new SpellEffectMechanicMask(this, this.owner.MiscValueA); }
}
// 233
// 234
@AuraID(234)
export class MechanicDurationModNotStack extends PercentBase {
    get Mechanics() { return new SpellEffectMechanicMask(this, this.owner.MiscValueA); }
}
// 235
@AuraID(235)
export class ModDispelResist extends PercentBase {}
// 236
@AuraID(236)
export class ControlVehicle extends TargetBase {}
// 237
@AuraID(237)
export class ModSpellDamageOfAttackPower extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 238
@AuraID(238)
export class ModSpellHealingOfAttackPower extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 239
@AuraID(239)
export class ModScale2 extends PercentBase {}
// 240
@AuraID(240)
export class ModExpertise extends PointsBase {}
// 241
@AuraID(241)
export class ForceMoveForward extends TargetBase {}
// 242
@AuraID(242)
export class ModSpellDamageFromHealing extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 243
@AuraID(243)
export class ModFaction extends TargetBase {
    get Faction() { return this.wrap(this.owner.MiscValueA); }
}
// 244
@AuraID(244)
export class ComprehendLanguage extends TargetBase {
    get Language() { return this.wrap(this.owner.MiscValueA); }
}
// 245
@AuraID(245)
export class ModAuraDurationByDispel extends PercentBase {}
// 246
@AuraID(246)
export class ModAuraDurationByDispelNotStack extends PercentBase {}
// 247
@AuraID(247)
export class CloneCaster extends TargetBase {}
// 248
@AuraID(248)
export class ModCombatResultChance extends TargetBase {
    get Rating() { return new CombatRating(this, this.owner.MiscValueA); }
}
// 249
export class RuneType<T> extends EnumCellWrapper<T> {
    @EnumField(0)
    setBlood() { return this.set(0); }

    @EnumField(1)
    setUnholy() { return this.set(1); }

    @EnumField(2)
    setFrost() { return this.set(2); }

    @EnumField(3)
    setDeath() { return this.set(3); }
}

@AuraID(249)
export class ConvertRune extends CountBase {
    get Rune() { return new RuneType(this, this.owner.MiscValueA); }
}
// 250
@AuraID(250)
export class ModIncreaseHealth3 extends PointsBase {}
// 251
@AuraID(251)
export class ModEnemyDodge extends PercentBase {}
// 252
// 253
@AuraID(253)
export class ModBlockCritChance extends PercentBase {}
// 254
@AuraID(254)
export class ModDisarmOffhand extends TargetBase {}
// 255
@AuraID(255)
export class ModMechanicDamageTakenPercent extends PercentBase {
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.owner.MiscValueA); }
}
// 256
@AuraID(256)
export class NoReagentUse extends TargetBase {}
// 257
@AuraID(257)
export class ModTargetResistBySpellClass extends PointsBase {}
// 258
// 259
@AuraID(259)
export class ModHotPct extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 260
@AuraID(260)
export class ScreenEffect extends PointsBase {
    get EffectID() { return this.wrap(this.owner.MiscValueA); }
}
// 261
@AuraID(261)
export class Phase extends TargetBase {
    get PhaseMask() { return new MaskCell32(this, this.owner.MiscValueA); }
}
// 262
// 263
@AuraID(263)
export class AllowOnlyAbility extends TargetBase {}
// 264
// 265
// 266
// 267
@AuraID(267)
export class ModImmuneAuraApplySchool extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 268
@AuraID(268)
export class ModAttackPowerOfStatPercent extends PercentBase {
    get Stat() { return new StatMod(this, this.owner.MiscValueA); }
}
// 269
@AuraID(269)
export class ModIgnoreTargetResist extends TargetBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 270
// 271
@AuraID(271)
export class ModDamageFromCaster extends PercentBase {}
// 272
@AuraID(272)
export class IgnoreMeleeReset extends TargetBase {}
// 273
// 274
@AuraID(274)
export class ConsumeNoAmmo extends TargetBase {}
// 275
@AuraID(275)
export class ModIgnoreShapeshift extends TargetBase {}
// 276
// 277
@AuraID(277)
export class ModAbilityAffectedTargets extends TargetBase {}
// 278
@AuraID(278)
export class ModDisarmRanged extends TargetBase {}
// 279
@AuraID(279)
export class InitializeImages extends TargetBase {}
// 280
@AuraID(280)
export class ModTargetArmorPct extends PercentBase {}
// 281
@AuraID(281)
export class ModHonorGainPct extends PercentBase {}
// 282
@AuraID(282)
export class IncreaseBaseHealthPercent extends PercentBase {}
// 283
@AuraID(283)
export class ModHealingReceived extends PercentBase {}
// 284
// 285
@AuraID(285)
export class ModAttackPowerOfArmor extends PointsBase {}
// 286
// 287
@AuraID(287)
export class DeflectSpells extends PercentBase {}
// 288
@AuraID(288)
export class IgnoreHitDirection extends PercentBase {}
// 289
// 290
@AuraID(290)
export class ModCritPct extends PercentBase {}
// 291
@AuraID(291)
export class ModXpQuestPct extends PercentBase {}
// 292
@AuraID(292)
export class SetOpenStable extends TargetBase {}
// 293
// 294 (TODO: What is MiscValueA?)
@AuraID(294)
export class PreventRegeneratePower extends TargetBase {
    get PowerType() { return new SpellPowerType(this, this.owner.MiscValueB); }
}
// 295
// 296
@AuraID(296)
export class SetVehicleId extends TargetBase {
    get VehicleID() { return this.wrap(this.owner.MiscValueA); }
}
// 297
// 298
// 299

// 300
@AuraID(300)
export class ShareDamagePct extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 301
@AuraID(301)
export class SchoolHealAbsorb extends PointsBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 302
// 303
// 304
// 305
@AuraID(305)
export class ModMinimumSpeed extends PercentBase {}
// 306
// 307
// 308
// 309

// 310
@AuraID(310)
export class ModCreatureAoEDamageAvoidance extends PercentBase {
    get Schools() { return new SchoolMask(this, this.owner.MiscValueA); }
}
// 311
// 312
// 313
// 314
@AuraID(314)
export class PreventResurrection extends TargetBase {}
// 315
@AuraID(315)
export class UnderwaterWalking extends TargetBase {}
// 316