import { DamageBase, ChanceBase, HealBase, PercentBase, DamageBasePct, PointsBase, HealBasePct, PowerBasePct, PowerBase, ManaBase, CountBase } from "../EffectTemplates/PointsBase";
import { TargetBase } from "../EffectTemplates/TargetBase";
import { SchoolMask, SchoolEnum } from "../../Misc/School";
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { CreatureTypeEnum, CreatureTypeMask } from "../../Creature/CreatureType";
import { SpellEffectMechanicEnum, SpellEffectMechanicMask } from "../SpellEffectMechanics";

export function AuraID(id: number) {
    return function(target: any) {

    }
}

// 1
@AuraID(1)
export class BindSight<T> extends TargetBase<T> {}
// 2
@AuraID(2)
export class ModPossess<T> extends ChanceBase<T> {}
// 3
@AuraID(3)
export class PeriodicDamage<T> extends DamageBase<T> {
    get School() { return this.wrap(this.effect.MiscValueA); }
    get DamagePeriod() { return this.wrap(this.effect.AuraPeriod); }
}
// 4
// 5
@AuraID(5)
export class ModConfuse<T> extends TargetBase<T> {}
// 6
@AuraID(6)
export class ModCharm<T> extends ChanceBase<T> {}
// 7
@AuraID(7)
export class ModFear<T> extends TargetBase<T> {}
// 8
@AuraID(8)
export class PeriodicHeal<T> extends HealBase<T> {
    get School() { return this.wrap(this.effect.MiscValueA); }
    get HealPeriod() { return this.wrap(this.effect.AuraPeriod); }
}
// 9
@AuraID(9)
export class ModAttackSpeed<T> extends PercentBase<T> {}
// 10
@AuraID(10)
export class ModThreat<T> extends PercentBase<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 11
@AuraID(11)
export class ModTaunt<T> extends TargetBase<T> {}
// 12
@AuraID(12)
export class ModStun<T> extends TargetBase<T> {}
// 13
@AuraID(13)
export class ModDamageDone<T> extends DamageBasePct<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 14
@AuraID(14)
export class ModDamageTaken<T> extends DamageBasePct<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 15
@AuraID(15)
export class DamageShield<T> extends DamageBasePct<T> {
    get School() { return new SchoolEnum(this, this.effect.MiscValueA); }
}
// 16
export class StealthType<T> extends Enum<T> {
    setNormal() { return this.set(0); }
    setTrap() { return this.set(1); }
}

@AuraID(16)
export class ModStealth<T> extends PointsBase<T> {
    get Type() { return new StealthType(this, this.effect.MiscValueA); }
}
// 17
@AuraID(16)
export class ModDetect<T> extends PointsBase<T> {
    get Type() { return new StealthType(this, this.effect.MiscValueA); }
}
// 18

export class InvisibilityType<T> extends Enum<T>
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
export class ModInvisibility<T> extends PointsBase<T> {
    get Type() { return new StealthType(this, this.effect.MiscValueA); }
}
// 19
@AuraID(19)
export class ModInvisibilityDetection<T> extends PointsBase<T> {
    get Type() { return new StealthType(this, this.effect.MiscValueA); }
}
// 20
@AuraID(20)
export class ObsModHealth<T> extends HealBasePct<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
    get AuraPeriod() { return this.wrap(this.effect.AuraPeriod); }
}
// 21
@AuraID(21)
export class ObsModPower<T> extends PowerBasePct<T> {
    get AuraPeriod() { return this.wrap(this.effect.AuraPeriod); }
}
// 22
@AuraID(22)
export class ModResistance<T> extends PointsBase<T> {
    get Resistance() { return new SchoolMask(this.owner, this.effect.MiscValueA); }
}
// 23
@AuraID(23)
export class PeriodicTriggerSpell<T> extends TargetBase<T> {
    get TriggeredSpell() { return this.wrap(this.effect.TriggerSpell); }
    get Period() { return this.wrap(this.effect.AuraPeriod); }
}
// 24
@AuraID(24)
export class PeriodicEnergize<T> extends PowerBase<T> {
    get Period() { return this.wrap(this.effect.AuraPeriod); }
}
// 25
@AuraID(25)
export class ModPacify<T> extends TargetBase<T> {}
// 26
@AuraID(26)
export class ModRoot<T> extends TargetBase<T> {}
// 27
@AuraID(27)
export class ModSilence<T> extends TargetBase<T> {}
// 28
@AuraID(28)
export class ReflectSpells<T> extends PercentBase<T> {}
// 29
export class StatMod<T> extends Enum<T> {
    setAll() { return this.set(-1); }
    setStrength() { return this.set(0); }
    setAgility() { return this.set(1); }
    setStamina() { return this.set(2); }
    setIntellect() { return this.set(3); }
    setSpirit() { return this.set(4); }
}

@AuraID(29)
export class ModStat<T> extends PointsBase<T> {
    get Stat() { return new StatMod(this, this.effect.MiscValueA); }
}
// 30
@AuraID(30)
export class ModSkill<T> extends PointsBase<T> {
    get Skill() { return this.wrap(this.effect.MiscValueA); }
}
// 31
@AuraID(31)
export class ModIncreaseSpeed<T> extends PercentBase<T> {}
// 32
@AuraID(32)
export class ModIncreaseMountSpeed<T> extends PercentBase<T> {}
// 33
@AuraID(33)
export class ModDecreaseSpeed<T> extends PercentBase<T> {}
// 34
@AuraID(34)
export class ModIncreaseHealth<T> extends PointsBase<T> {}
// 35
@AuraID(35)
export class ModIncreaseEnergy<T> extends PointsBase<T> {}
// 36
@AuraID(36)
export class ModShapeshift<T> extends TargetBase<T> {
    get Form() { return this.wrap(this.effect.MiscValueA); }
}
// 37
/** TODO: Uses MiscValueA, which is not used in core */
@AuraID(37)
export class EffectImmunity<T> extends TargetBase<T> {}
// 38
@AuraID(38)
export class StateImmunity<T> extends TargetBase<T> {}
// 39
@AuraID(39)
export class SchoolImmunity<T> extends TargetBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 40
@AuraID(40)
export class DamageImmunity<T> extends TargetBase<T> {}
// 41
@AuraID(41)
export class DispelImmunity<T> extends TargetBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 42
@AuraID(42)
export class ProcTriggerSpell<T> extends TargetBase<T> {
    get TriggeredSpell() { return this.wrap(this.effect.TriggerSpell); }
}
// 43
@AuraID(43)
export class ProcTriggerDamage<T> extends DamageBase<T> {}
// 44
@AuraID(44)
export class TrackCreatures<T> extends DamageBase<T> {
    get CreatureType() { return new CreatureTypeEnum(this, this.effect.MiscValueA); }
}
// 45
@AuraID(45)
export class TrackResources<T> extends DamageBase<T> {
    get ResourceType() { return this.wrap(this.effect.MiscValueA); }
}
// 46
// 47
@AuraID(47)
export class ModParryPercent<T> extends PercentBase<T> {}
// 48
// 49
@AuraID(49)
export class ModDodgePercent<T> extends PercentBase<T> {}
// 50
@AuraID(50)
export class ModCriticalHealAmount<T> extends HealBase<T> {}
// 51
@AuraID(51)
export class ModBlockPercent<T> extends PercentBase<T> {}
// 52
@AuraID(51)
export class ModWeaponCritPercent<T> extends PercentBase<T> {}
// 53
@AuraID(53)
export class PeriodicLeech<T> extends DamageBase<T> {
    get Period() { return this.wrap(this.effect.AuraPeriod); }
}
// 54
@AuraID(54)
export class ModHitChance<T> extends PercentBase<T> {}
// 55
@AuraID(54)
export class ModSpellHitChance<T> extends PercentBase<T> {}
// 56
@AuraID(56)
export class Transform<T> extends TargetBase<T> {
    get CreatureTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 57
@AuraID(57)
export class ModSpellCritChance<T> extends PercentBase<T> {}
// 58
@AuraID(58)
export class ModIncreaseSwimSpeed<T> extends PercentBase<T> {}
// 59
@AuraID(59)
export class ModDamageDoneCreature<T> extends DamageBase<T> {
    get CreatureType() { return new CreatureTypeEnum(this, this.effect.MiscValueA); }
}
// 60
/** TODO: uses MiscValueA but no use in core(?) */
@AuraID(60)
export class ModPacifySilence<T> extends TargetBase<T> {
    get CreatureType() { return new CreatureTypeEnum(this, this.effect.MiscValueA); }
}
// 61
@AuraID(61)
export class ModScale<T> extends PercentBase<T> {}
// 62
@AuraID(62)
export class ModPeroidicHealthFunnel<T> extends HealBase<T> {
    get Period() { return this.wrap(this.effect.AuraPeriod); }
}
// 63
// 64
@AuraID(64)
export class ModPeriodicManaLeech<T> extends ManaBase<T> {
    get Period() { return this.wrap(this.effect.AuraPeriod); }
}
// 65
@AuraID(65)
export class ModCastingSpeedNotStack<T> extends PercentBase<T> {}
// 66
@AuraID(66)
export class FeignDeath<T> extends TargetBase<T> {}
// 67
@AuraID(67)
export class Disarm<T> extends TargetBase<T> {}
// 68
@AuraID(68)
export class ModStalked<T> extends TargetBase<T> {}
// 69
@AuraID(69)
export class SchoolAbsorb<T> extends DamageBase<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 70 (unused)
// 71
@AuraID(71)
export class CritChanceSchool<T> extends PercentBase<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 72
@AuraID(72)
export class ModPowerCostSchoolPct<T> extends PercentBase<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 73
@AuraID(73)
export class ModPowerCostSchool<T> extends PointsBase<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 74
@AuraID(74)
export class ModReflectSpellsSchool<T> extends PercentBase<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 75
@AuraID(75)
export class ModLanguage<T> extends PercentBase<T> {
    get Language() { return this.wrap(this.effect.MiscValueA); }
}
// 76
/** TODO: Parameters? */
@AuraID(76)
export class FarSight<T> extends TargetBase<T> {}
// 77
@AuraID(77)
export class MechanicImmunity<T> extends TargetBase<T> {
    get Mechanic() { return new SpellEffectMechanicEnum(this, this.effect.MiscValueA); }
}
// 78
@AuraID(78)
export class Mounted<T> extends TargetBase<T> {
    get CreatureTemplate() { return this.wrap(this.effect.MiscValueA); }
}
// 79
@AuraID(79)
export class ModDamagePercentDone<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 80
@AuraID(80)
export class ModPercentStat<T> extends PercentBase<T> {
    get Stat() { return new StatMod(this, this.effect.MiscValueA); }
}
// 81
@AuraID(81)
export class SplitDamagePct<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 82
@AuraID(82)
export class WaterBreathing<T> extends TargetBase<T> {}
// 83
@AuraID(83)
export class ModBaseResistance<T> extends PointsBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 84
@AuraID(84)
export class ModRegen<T> extends HealBase<T> {}
// 85
@AuraID(85)
export class ModPowerRegen<T> extends PowerBase<T> {}
// 86
@AuraID(86)
export class ChannelDeathItem<T> extends CountBase<T> {
    get Item() { return this.wrap(this.effect.ItemType); }
}
// 87
@AuraID(87)
export class ModDamagePercentTaken<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 88
@AuraID(88)
export class ModHealthRegenPercent<T> extends PercentBase<T> {

}
// 89
@AuraID(89)
export class PeriodicDamagePercent<T> extends PercentBase<T> {
    get Period() { return this.wrap(this.effect.AuraPeriod); }
}
// 90
// 91
@AuraID(91)
export class ModDetectRange<T> extends PointsBase<T> {}
// 92
@AuraID(92)
export class ModPreventsFleeing<T> extends TargetBase<T> {}
// 93
@AuraID(93)
export class ModUnattackable<T> extends TargetBase<T> {}
// 94
@AuraID(94)
export class InterruptRegen<T> extends TargetBase<T> {}
// 95
@AuraID(95)
export class Ghost<T> extends TargetBase<T> {}
// 96
@AuraID(96)
export class SpellMagnet<T> extends TargetBase<T> {}
// 97
@AuraID(97)
export class ManaShield<T> extends DamageBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 98
@AuraID(98)
export class ModSkillTalent<T> extends PointsBase<T> {
    get Skill() { return this.wrap(this.effect.MiscValueA); }
}
// 99
@AuraID(99)
export class ModAttackPower<T> extends PointsBase<T> {}
// 100
@AuraID(100)
export class AurasVisible<T> extends TargetBase<T> {}
// 101
@AuraID(101)
export class ModResistancePct<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 102
@AuraID(101)
export class ModMeleeAttackPowerVersus<T> extends PointsBase<T> {
    get CreatureTypes() { return new CreatureTypeMask(this, this.effect.MiscValueA); }
}
// 103
@AuraID(103)
export class ModTotalThreat<T> extends PointsBase<T> {}
// 104
@AuraID(104)
export class WaterWalk<T> extends TargetBase<T> {}
// 105
@AuraID(105)
export class FeatherFall<T> extends TargetBase<T> {}
// 106
@AuraID(106)
export class Hover<T> extends TargetBase<T> {}
// 107

export class SpellModOp<T> extends Enum<T> {
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
export class AddFlatModifier<T> extends PointsBase<T> {
    get Operation() { return new SpellModOp(this, this.effect.MiscValueA); }
}
// 108
@AuraID(108)
export class AddPctModifier<T> extends PercentBase<T> {
    get Operation() { return new SpellModOp(this, this.effect.MiscValueA); }
}
// 109
@AuraID(109)
export class AddTargetTrigger<T> extends PointsBase<T> {
    get TriggerSpell() { return this.wrap(this.effect.TriggerSpell); }
}
// 110
@AuraID(110)
export class ModPowerRegenPercent<T> extends PowerBasePct<T> {}
// 111
@AuraID(111)
export class CasterHitTrigger<T> extends PointsBase<T> {}
// 112
@AuraID(112)
export class OverrideClassScripts<T> extends PointsBase<T> {
    get MiscValueA() { return this.wrap(this.effect.MiscValueA); }
}
// 113
@AuraID(113)
export class ModRangedDamageTaken<T> extends PointsBase<T> {
    get MiscValueA() { return this.wrap(this.effect.MiscValueA); }
}
// 114
@AuraID(114)
export class ModRangedDamageTakenPct<T> extends PercentBase<T> {
    get MiscValueA() { return this.wrap(this.effect.MiscValueA); }
}
// 115
@AuraID(115)
export class ModHealing<T> extends HealBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 116
@AuraID(116)
export class ModRegenDuringCombat<T> extends HealBase<T> {}
// 117
@AuraID(117)
export class ModMechanicResistance<T> extends PercentBase<T> {
    get Mechanics() { return new SpellEffectMechanicEnum(this, this.effect.MiscValueA); }
}
// 118
@AuraID(118)
export class ModHealingPct<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 119

// 120
@AuraID(120)
export class Untrackable<T> extends TargetBase<T> {}
// 121
@AuraID(121)
export class Empathy<T> extends TargetBase<T> {}
// 122
@AuraID(122)
export class ModOffhandDamagePct<T> extends PercentBase<T> {}
// 123
@AuraID(123)
export class ModTargetResistance<T> extends PointsBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); } 
}
// 124
@AuraID(124)
export class ModRangedAttackPower<T> extends PointsBase<T> {}
// 125
@AuraID(125)
export class ModMeleeDamageTaken<T> extends PointsBase<T> {}
// 126
@AuraID(126)
export class ModMeleeDamageTakenPct<T> extends PercentBase<T> {}
// 127
@AuraID(127)
export class RangedAttackPowerAttackerBonus<T> extends PointsBase<T> {}
// 128
@AuraID(128)
export class ModPossessPet<T> extends TargetBase<T> {}
// 129
@AuraID(129)
export class ModSpeedAlways<T> extends PercentBase<T> {}
// 130
@AuraID(130)
export class ModMountedSpeedAlways<T> extends PercentBase<T> {}
// 131
@AuraID(131)
export class ModRangedAttackPowerVersus<T> extends PercentBase<T> {
    get CreatureType() { return new CreatureTypeMask(this, this.effect.MiscValueA); }
}
// 132
@AuraID(132)
export class ModIncreaseEnergyPercent<T> extends PercentBase<T> {}
// 133
@AuraID(133)
export class ModIncreaseHealthPercent<T> extends PercentBase<T> {}
// 134
@AuraID(134)
export class ModManaRegenInterrupt<T> extends PercentBase<T> {}
// 135
@AuraID(135)
export class ModHealingDone<T> extends PointsBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 136
@AuraID(135)
export class ModHealingDonePercent<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 137
@AuraID(137)
export class ModTotalStatPercentage<T> extends PercentBase<T> {
    get Stat() { return new StatMod(this, this.effect.MiscValueA); }
}
// 138
@AuraID(138)
export class ModMeleeHaste<T> extends PercentBase<T> {}
// 139
@AuraID(139)
export class ForceReaction<T> extends PointsBase<T> {
    get FactionID() { return this.wrap(this.effect.MiscValueA); }
}
// 140
@AuraID(140)
export class ModRangedHaste<T> extends PercentBase<T> {}
// 141
@AuraID(141)
export class ModRangedAmmoHaste<T> extends PercentBase<T> {}
// 142
@AuraID(142)
export class ModBaseResistancePct<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 143
@AuraID(143)
export class ModResistanceExclusive<T> extends PointsBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 144
@AuraID(144)
export class SafeFall<T> extends PointsBase<T> {}
// 145
@AuraID(145)
export class ModPetTalentPoints<T> extends PointsBase<T> {}
// 146
@AuraID(146)
export class AllowTamePetType<T> extends TargetBase<T> {
    MiscValueA() { return this.wrap(this.effect.MiscValueA); }
}
// 147
@AuraID(147)
export class MechanicImmunityMask<T> extends TargetBase<T> {
    get Mechanics() { return new SpellEffectMechanicMask(this, this.effect.MiscValueA); }
}
// 148 (only premeditation)
@AuraID(148)
export class RetainComboPoints<T> extends TargetBase<T> {}
// 149
@AuraID(149)
export class ReducePushback<T> extends PointsBase<T> {
    get School() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 150
@AuraID(150)
export class ModShieldBlockValuePct<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 151 (only track hidden)
@AuraID(151)
export class TrackStealthed<T> extends TargetBase<T> {}
// 152
@AuraID(152)
export class ModDetectedRange<T> extends PercentBase<T> {}
// 153 (unused?)
@AuraID(153)
export class SplitDamageFlat<T> extends PointsBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 154
@AuraID(154)
export class ModStealthLevel<T> extends PointsBase<T> {}
// 155
@AuraID(155)
export class ModWaterBreathing<T> extends PointsBase<T> {}
// 156
@AuraID(156)
export class ModReputationGain<T> extends PercentBase<T> {}
// 157 (unused/singleton?)
@AuraID(157)
export class PetDamageMulti<T> extends PercentBase<T> {}
// 158
@AuraID(158)
export class ModShieldBlockValue<T> extends PointsBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 159
@AuraID(159)
export class NoPvPCredit<T> extends TargetBase<T> {}
// 160 (unused)
@AuraID(160)
export class ModAoEAvoidance<T> extends TargetBase<T> {}
// 161
@AuraID(161)
export class ModHealthRegenInCombat<T> extends PointsBase<T> {}
// 162
@AuraID(162)
export class PowerBurn<T> extends PowerBase<T> {
    get Period() { return this.wrap(this.effect.AuraPeriod); }
}
// 163

// 164
@AuraID(164)
export class ModCritDamageBonus<T> extends PercentBase<T> {
    get Schools() { return new SchoolMask(this, this.effect.MiscValueA); }
}
// 165
@AuraID(165)
export class MeleeAttackPowerAttackerBonus<T> extends PointsBase<T> {}
// 166
@AuraID(166)
export class ModAttackPowerPct<T> extends PercentBase<T> {}
// 167
@AuraID(167)
export class ModRangedAttackPowerPct<T> extends PercentBase<T> {}
// 168
@AuraID(168)
export class ModDamageVersus<T> extends PointsBase<T> {
    get CreatureTypes() { return new CreatureTypeMask(this, this.effect.MiscValueA); }
}
// 169
@AuraID(169)
export class ModCritPercentVersus<T> extends PercentBase<T> {
    get CreatureTypes() { return new CreatureTypeMask(this, this.effect.MiscValueA); }
}
// 170
@AuraID(170)
export class DetectAmore<T> extends PointsBase<T> {
    get AmoreAura() { return this.wrap(this.effect.MiscValueA); }
}
// 171
@AuraID(171)
export class ModSpeedNotStack<T> extends PercentBase<T> {}
// 172
@AuraID(172)
export class ModMountedSpeedNotStack<T> extends PercentBase<T> {}
// 173
@AuraID(173)
export class ModSpellDamageofStatPercent<T> extends PercentBase<T> {
}
// 174
// 175
// 176
// 177
// 178
// 179

// 180
// 181
// 182
// 183
// 184
// 185
// 186
// 187
// 188
// 189

// 190
// 191
// 192
// 193
// 194
// 195
// 196
// 197
// 198
// 199

// 200
// 201
// 202
// 203
// 204
// 205
// 206
// 207
// 208
// 209

// 210
// 211
// 212
// 213
// 214
// 215
// 216
// 217
// 218
// 219

// 220
// 221
// 222
// 223
// 224
// 225
// 226
// 227
// 228
// 229

// 230
// 231
// 232
// 233
// 234
// 235
// 236
// 237
// 238
// 239

// 240
// 241
// 242
// 243
// 244
// 245
// 246
// 247
// 248
// 249

// 250
// 251
// 252
// 253
// 254
// 255
// 256
// 257
// 258
// 259

// 260
// 261
// 262
// 263
// 264
// 265
// 266
// 267
// 268
// 269

// 270
// 271
// 272
// 273
// 274
// 275
// 276
// 277
// 278
// 279

// 280
// 281
// 282
// 283
// 284
// 285
// 286
// 287
// 288
// 289

// 290
// 291
// 292
// 293
// 294
// 295
// 296
// 297
// 298
// 299

// 300
// 301
// 302
// 303
// 304
// 305
// 306
// 307
// 308
// 309

// 310
// 311
// 312
// 313
// 314
// 315
// 316
// 317
// 318
// 319

// 320
// 321
// 322
// 323
// 324
// 325
// 326
// 327
// 328
// 329