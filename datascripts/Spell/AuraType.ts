/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Cell } from "wotlkdata/cell/Cell";
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { SpellEffect } from "./SpellEffect";

export class AuraType extends Enum<SpellEffect> {
    constructor(owner: SpellEffect, effectIndex: number) {
        super(owner, Cell.wrapIndex(SpellEffect.owner(owner).row.EffectAura,effectIndex));
    }

    /** */
    @EnumField(0)
    setNone() { return this.set(0);  };
    /** */
    @EnumField(1)
    setBindSight() { return this.set(1);  };
    /** */
    @EnumField(2)
    setModPossess() { return this.set(2);  };
    /** */
    @EnumField(3)
    setPeriodicDamage() { return this.set(3);  };
    /** */
    @EnumField(4)
    setDummy() { return this.set(4);  };
    /** */
    @EnumField(5)
    setModConfuse() { return this.set(5);  };
    /** */
    @EnumField(6)
    setModCharm() { return this.set(6);  };
    /** */
    @EnumField(7)
    setModFear() { return this.set(7);  };
    /** */
    @EnumField(8)
    setPeriodicHeal() { return this.set(8);  };
    /** */
    @EnumField(9)
    setModAttackspeed() { return this.set(9);  };
    /** */
    @EnumField(10)
    setModThreat() { return this.set(10);  };
    /** */
    @EnumField(11)
    setModTaunt() { return this.set(11);  };
    /** */
    @EnumField(12)
    setModStun() { return this.set(12);  };
    /** */
    @EnumField(13)
    setModDamageDone() { return this.set(13);  };
    /** */
    @EnumField(14)
    setModDamageTaken() { return this.set(14);  };
    /** */
    @EnumField(15)
    setDamageShield() { return this.set(15);  };
    /** */
    @EnumField(16)
    setModStealth() { return this.set(16);  };
    /** */
    @EnumField(17)
    setModDetect() { return this.set(17);  };
    /** */
    @EnumField(18)
    setModInvisibility() { return this.set(18);  };
    /** */
    @EnumField(19)
    setModInvisibilityDetection() { return this.set(19);  };
    /** */
    @EnumField(20)
    setObsModHealth() { return this.set(20);  };
    /** */
    @EnumField(21)
    setObsModPower() { return this.set(21);  };
    /** */
    @EnumField(22)
    setModResistance() { return this.set(22);  };
    /** */
    @EnumField(23)
    setPeriodicTriggerSpell() { return this.set(23);  };
    /** */
    @EnumField(24)
    setPeriodicEnergize() { return this.set(24);  };
    /** */
    @EnumField(25)
    setModPacify() { return this.set(25);  };
    /** */
    @EnumField(26)
    setModRoot() { return this.set(26);  };
    /** */
    @EnumField(27)
    setModSilence() { return this.set(27);  };
    /** */
    @EnumField(28)
    setReflectSpells() { return this.set(28);  };
    /** */
    @EnumField(29)
    setModStat() { return this.set(29);  };
    /** */
    @EnumField(30)
    setModSkill() { return this.set(30);  };
    /** */
    @EnumField(31)
    setModIncreaseSpeed() { return this.set(31);  };
    /** */
    @EnumField(32)
    setModIncreaseMountedSpeed() { return this.set(32);  };
    /** */
    @EnumField(33)
    setModDecreaseSpeed() { return this.set(33);  };
    /** */
    @EnumField(34)
    setModIncreaseHealth() { return this.set(34);  };
    /** */
    @EnumField(35)
    setModIncreaseEnergy() { return this.set(35);  };
    /** */
    @EnumField(36)
    setModShapeshift() { return this.set(36);  };
    /** */
    @EnumField(37)
    setEffectImmunity() { return this.set(37);  };
    /** */
    @EnumField(38)
    setStateImmunity() { return this.set(38);  };
    /** */
    @EnumField(39)
    setSchoolImmunity() { return this.set(39);  };
    /** */
    @EnumField(40)
    setDamageImmunity() { return this.set(40);  };
    /** */
    @EnumField(41)
    setDispelImmunity() { return this.set(41);  };
    /** */
    @EnumField(42)
    setProcTriggerSpell() { return this.set(42);  };
    /** */
    @EnumField(43)
    setProcTriggerDamage() { return this.set(43);  };
    /** */
    @EnumField(44)
    setTrackCreatures() { return this.set(44);  };
    /** */
    @EnumField(45)
    setTrackResources() { return this.set(45);  };
    /** */
    @EnumField(46)
    setSpellAura46() { return this.set(46);  };
    /** */
    @EnumField(47)
    setModParryPercent() { return this.set(47);  };
    /** */
    @EnumField(48)
    setSpellAura48() { return this.set(48);  };
    /** */
    @EnumField(49)
    setModDodgePercent() { return this.set(49);  };
    /** */
    @EnumField(50)
    setModCriticalHealingAmount() { return this.set(50);  };
    /** */
    @EnumField(51)
    setModBlockPercent() { return this.set(51);  };
    /** */
    @EnumField(52)
    setModWeaponCritPercent() { return this.set(52);  };
    /** */
    @EnumField(53)
    setPeriodicLeech() { return this.set(53);  };
    /** */
    @EnumField(54)
    setModHitChance() { return this.set(54);  };
    /** */
    @EnumField(55)
    setModSpellHitChance() { return this.set(55);  };
    /** */
    @EnumField(56)
    setTransform() { return this.set(56);  };
    /** */
    @EnumField(57)
    setModSpellCritChance() { return this.set(57);  };
    /** */
    @EnumField(58)
    setModIncreaseSwimSpeed() { return this.set(58);  };
    /** */
    @EnumField(59)
    setModDamageDoneCreature() { return this.set(59);  };
    /** */
    @EnumField(60)
    setModPacifySilence() { return this.set(60);  };
    /** */
    @EnumField(61)
    setModScale() { return this.set(61);  };
    /** */
    @EnumField(62)
    setPeriodicHealthFunnel() { return this.set(62);  };
    /** */
    @EnumField(63)
    setSpellAura63() { return this.set(63);  };
    /** */
    @EnumField(64)
    setPeriodicManaLeech() { return this.set(64);  };
    /** */
    @EnumField(65)
    setModCastingSpeedNotStack() { return this.set(65);  };
    /** */
    @EnumField(66)
    setFeignDeath() { return this.set(66);  };
    /** */
    @EnumField(67)
    setModDisarm() { return this.set(67);  };
    /** */
    @EnumField(68)
    setModStalked() { return this.set(68);  };
    /** */
    @EnumField(69)
    setSchoolAbsorb() { return this.set(69);  };
    /** */
    @EnumField(70)
    setExtraAttacks() { return this.set(70);  };
    /** */
    @EnumField(71)
    setModSpellCritChanceSchool() { return this.set(71);  };
    /** */
    @EnumField(72)
    setModPowerCostSchoolPct() { return this.set(72);  };
    /** */
    @EnumField(73)
    setModPowerCostSchool() { return this.set(73);  };
    /** */
    @EnumField(74)
    setReflectSpellsSchool() { return this.set(74);  };
    /** */
    @EnumField(75)
    setModLanguage() { return this.set(75);  };
    /** */
    @EnumField(76)
    setFarSight() { return this.set(76);  };
    /** */
    @EnumField(77)
    setMechanicImmunity() { return this.set(77);  };
    /** */
    @EnumField(78)
    setMounted() { return this.set(78);  };
    /** */
    @EnumField(79)
    setModDamagePercentDone() { return this.set(79);  };
    /** */
    @EnumField(80)
    setModPercentStat() { return this.set(80);  };
    /** */
    @EnumField(81)
    setSplitDamagePct() { return this.set(81);  };
    /** */
    @EnumField(82)
    setWaterBreathing() { return this.set(82);  };
    /** */
    @EnumField(83)
    setModBaseResistance() { return this.set(83);  };
    /** */
    @EnumField(84)
    setModRegen() { return this.set(84);  };
    /** */
    @EnumField(85)
    setModPowerRegen() { return this.set(85);  };
    /** */
    @EnumField(86)
    setChannelDeathItem() { return this.set(86);  };
    /** */
    @EnumField(87)
    setModDamagePercentTaken() { return this.set(87);  };
    /** */
    @EnumField(88)
    setModHealthRegenPercent() { return this.set(88);  };
    /** */
    @EnumField(89)
    setPeriodicDamagePercent() { return this.set(89);  };
    /** */
    @EnumField(90)
    setSpellAura90() { return this.set(90);  };
    /** */
    @EnumField(91)
    setModDetectRange() { return this.set(91);  };
    /** */
    @EnumField(92)
    setPreventsFleeing() { return this.set(92);  };
    /** */
    @EnumField(93)
    setModUnattackable() { return this.set(93);  };
    /** */
    @EnumField(94)
    setInterruptRegen() { return this.set(94);  };
    /** */
    @EnumField(95)
    setGhost() { return this.set(95);  };
    /** */
    @EnumField(96)
    setSpellMagnet() { return this.set(96);  };
    /** */
    @EnumField(97)
    setManaShield() { return this.set(97);  };
    /** */
    @EnumField(98)
    setModSkillTalent() { return this.set(98);  };
    /** */
    @EnumField(99)
    setModAttackPower() { return this.set(99);  };
    /** */
    @EnumField(100)
    setAurasVisible() { return this.set(100);  };
    /** */
    @EnumField(101)
    setModResistancePct() { return this.set(101);  };
    /** */
    @EnumField(102)
    setModMeleeAttackPowerVersus() { return this.set(102);  };
    /** */
    @EnumField(103)
    setModTotalThreat() { return this.set(103);  };
    /** */
    @EnumField(104)
    setWaterWalk() { return this.set(104);  };
    /** */
    @EnumField(105)
    setFeatherFall() { return this.set(105);  };
    /** */
    @EnumField(106)
    setHover() { return this.set(106);  };
    /** */
    @EnumField(107)
    setAddFlatModifier() { return this.set(107);  };
    /** */
    @EnumField(108)
    setAddPctModifier() { return this.set(108);  };
    /** */
    @EnumField(109)
    setAddTargetTrigger() { return this.set(109);  };
    /** */
    @EnumField(110)
    setModPowerRegenPercent() { return this.set(110);  };
    /** */
    @EnumField(111)
    setAddCasterHitTrigger() { return this.set(111);  };
    /** */
    @EnumField(112)
    setOverrideClassScripts() { return this.set(112);  };
    /** */
    @EnumField(113)
    setModRangedDamageTaken() { return this.set(113);  };
    /** */
    @EnumField(114)
    setModRangedDamageTakenPct() { return this.set(114);  };
    /** */
    @EnumField(115)
    setModHealing() { return this.set(115);  };
    /** */
    @EnumField(116)
    setModRegenDuringCombat() { return this.set(116);  };
    /** */
    @EnumField(117)
    setModMechanicResistance() { return this.set(117);  };
    /** */
    @EnumField(118)
    setModHealingPct() { return this.set(118);  };
    /** */
    @EnumField(119)
    setSpellAura119() { return this.set(119);  };
    /** */
    @EnumField(120)
    setUntrackable() { return this.set(120);  };
    /** */
    @EnumField(121)
    setEmpathy() { return this.set(121);  };
    /** */
    @EnumField(122)
    setModOffhandDamagePct() { return this.set(122);  };
    /** */
    @EnumField(123)
    setModTargetResistance() { return this.set(123);  };
    /** */
    @EnumField(124)
    setModRangedAttackPower() { return this.set(124);  };
    /** */
    @EnumField(125)
    setModMeleeDamageTaken() { return this.set(125);  };
    /** */
    @EnumField(126)
    setModMeleeDamageTakenPct() { return this.set(126);  };
    /** */
    @EnumField(127)
    setRangedAttackPowerAttackerBonus() { return this.set(127);  };
    /** */
    @EnumField(128)
    setModPossessPet() { return this.set(128);  };
    /** */
    @EnumField(129)
    setModSpeedAlways() { return this.set(129);  };
    /** */
    @EnumField(130)
    setModMountedSpeedAlways() { return this.set(130);  };
    /** */
    @EnumField(131)
    setModRangedAttackPowerVersus() { return this.set(131);  };
    /** */
    @EnumField(132)
    setModIncreaseEnergyPercent() { return this.set(132);  };
    /** */
    @EnumField(133)
    setModIncreaseHealthPercent() { return this.set(133);  };
    /** */
    @EnumField(134)
    setModManaRegenInterrupt() { return this.set(134);  };
    /** */
    @EnumField(135)
    setModHealingDone() { return this.set(135);  };
    /** */
    @EnumField(136)
    setModHealingDonePercent() { return this.set(136);  };
    /** */
    @EnumField(137)
    setModTotalStatPercentage() { return this.set(137);  };
    /** */
    @EnumField(138)
    setModMeleeHaste() { return this.set(138);  };
    /** */
    @EnumField(139)
    setForceReaction() { return this.set(139);  };
    /** */
    @EnumField(140)
    setModRangedHaste() { return this.set(140);  };
    /** */
    @EnumField(141)
    setModRangedAmmoHaste() { return this.set(141);  };
    /** */
    @EnumField(142)
    setModBaseResistancePct() { return this.set(142);  };
    /** */
    @EnumField(143)
    setModResistanceExclusive() { return this.set(143);  };
    /** */
    @EnumField(144)
    setSafeFall() { return this.set(144);  };
    /** */
    @EnumField(145)
    setModPetTalentPoints() { return this.set(145);  };
    /** */
    @EnumField(146)
    setAllowTamePetType() { return this.set(146);  };
    /** */
    @EnumField(147)
    setMechanicImmunityMask() { return this.set(147);  };
    /** */
    @EnumField(148)
    setRetainComboPoints() { return this.set(148);  };
    /** */
    @EnumField(149)
    setReducePushback() { return this.set(149);  };
    /** */
    @EnumField(150)
    setModShieldBlockvaluePct() { return this.set(150);  };
    /** */
    @EnumField(151)
    setTrackStealthed() { return this.set(151);  };
    /** */
    @EnumField(152)
    setModDetectedRange() { return this.set(152);  };
    /** */
    @EnumField(153)
    setSplitDamageFlat() { return this.set(153);  };
    /** */
    @EnumField(154)
    setModStealthLevel() { return this.set(154);  };
    /** */
    @EnumField(155)
    setModWaterBreathing() { return this.set(155);  };
    /** */
    @EnumField(156)
    setModReputationGain() { return this.set(156);  };
    /** */
    @EnumField(157)
    setPetDamageMulti() { return this.set(157);  };
    /** */
    @EnumField(158)
    setModShieldBlockvalue() { return this.set(158);  };
    /** */
    @EnumField(159)
    setNoPvpCredit() { return this.set(159);  };
    /** */
    @EnumField(160)
    setModAoeAvoidance() { return this.set(160);  };
    /** */
    @EnumField(161)
    setModHealthRegenInCombat() { return this.set(161);  };
    /** */
    @EnumField(162)
    setPowerBurn() { return this.set(162);  };
    /** */
    @EnumField(163)
    setModCritDamageBonus() { return this.set(163);  };
    /** */
    @EnumField(164)
    setSpellAura164() { return this.set(164);  };
    /** */
    @EnumField(165)
    setMeleeAttackPowerAttackerBonus() { return this.set(165);  };
    /** */
    @EnumField(166)
    setModAttackPowerPct() { return this.set(166);  };
    /** */
    @EnumField(167)
    setModRangedAttackPowerPct() { return this.set(167);  };
    /** */
    @EnumField(168)
    setModDamageDoneVersus() { return this.set(168);  };
    /** */
    @EnumField(169)
    setModCritPercentVersus() { return this.set(169);  };
    /** */
    @EnumField(170)
    setDetectAmore() { return this.set(170);  };
    /** */
    @EnumField(171)
    setModSpeedNotStack() { return this.set(171);  };
    /** */
    @EnumField(172)
    setModMountedSpeedNotStack() { return this.set(172);  };
    /** */
    @EnumField(173)
    setSpellAura173() { return this.set(173);  };
    /** */
    @EnumField(174)
    setModSpellDamageOfStatPercent() { return this.set(174);  };
    /** */
    @EnumField(175)
    setModSpellHealingOfStatPercent() { return this.set(175);  };
    /** */
    @EnumField(176)
    setSpiritOfRedemption() { return this.set(176);  };
    /** */
    @EnumField(177)
    setAoeCharm() { return this.set(177);  };
    /** */
    @EnumField(178)
    setModDebuffResistance() { return this.set(178);  };
    /** */
    @EnumField(179)
    setModAttackerSpellCritChance() { return this.set(179);  };
    /** */
    @EnumField(180)
    setModFlatSpellDamageVersus() { return this.set(180);  };
    /** */
    @EnumField(181)
    setSpellAura181() { return this.set(181);  };
    /** */
    @EnumField(182)
    setModResistanceOfStatPercent() { return this.set(182);  };
    /** */
    @EnumField(183)
    setModCriticalThreat() { return this.set(183);  };
    /** */
    @EnumField(184)
    setModAttackerMeleeHitChance() { return this.set(184);  };
    /** */
    @EnumField(185)
    setModAttackerRangedHitChance() { return this.set(185);  };
    /** */
    @EnumField(186)
    setModAttackerSpellHitChance() { return this.set(186);  };
    /** */
    @EnumField(187)
    setModAttackerMeleeCritChance() { return this.set(187);  };
    /** */
    @EnumField(188)
    setModAttackerRangedCritChance() { return this.set(188);  };
    /** */
    @EnumField(189)
    setModRating() { return this.set(189);  };
    /** */
    @EnumField(190)
    setModFactionReputationGain() { return this.set(190);  };
    /** */
    @EnumField(191)
    setUseNormalMovementSpeed() { return this.set(191);  };
    /** */
    @EnumField(192)
    setModMeleeRangedHaste() { return this.set(192);  };
    /** */
    @EnumField(193)
    setMeleeSlow() { return this.set(193);  };
    /** */
    @EnumField(194)
    setModTargetAbsorbSchool() { return this.set(194);  };
    /** */
    @EnumField(195)
    setModTargetAbilityAbsorbSchool() { return this.set(195);  };
    /** */
    @EnumField(196)
    setModCooldown() { return this.set(196);  };
    /** */
    @EnumField(197)
    setModAttackerSpellAndWeaponCritChance() { return this.set(197);  };
    /** */
    @EnumField(198)
    setSpellAura198() { return this.set(198);  };
    /** */
    @EnumField(199)
    setModIncreasesSpellPctToHit() { return this.set(199);  };
    /** */
    @EnumField(200)
    setModXpPct() { return this.set(200);  };
    /** */
    @EnumField(201)
    setFly() { return this.set(201);  };
    /** */
    @EnumField(202)
    setCannotBeDodged() { return this.set(202);  };
    /** */
    @EnumField(203)
    setModAttackerMeleeCritDamage() { return this.set(203);  };
    /** */
    @EnumField(204)
    setModAttackerRangedCritDamage() { return this.set(204);  };
    /** */
    @EnumField(205)
    setModSchoolCritDmgTaken() { return this.set(205);  };
    /** */
    @EnumField(206)
    setModIncreaseVehicleFlightSpeed() { return this.set(206);  };
    /** */
    @EnumField(207)
    setModIncreaseMountedFlightSpeed() { return this.set(207);  };
    /** */
    @EnumField(208)
    setModIncreaseFlightSpeed() { return this.set(208);  };
    /** */
    @EnumField(209)
    setModMountedFlightSpeedAlways() { return this.set(209);  };
    /** */
    @EnumField(210)
    setModVehicleSpeedAlways() { return this.set(210);  };
    /** */
    @EnumField(211)
    setModFlightSpeedNotStack() { return this.set(211);  };
    /** */
    @EnumField(212)
    setModRangedAttackPowerOfStatPercent() { return this.set(212);  };
    /** */
    @EnumField(213)
    setModRageFromDamageDealt() { return this.set(213);  };
    /** */
    @EnumField(214)
    setTamed() { return this.set(214);  };
    /** */
    @EnumField(215)
    setArenaPreparation() { return this.set(215);  };
    /** */
    @EnumField(216)
    setHasteSpells() { return this.set(216);  };
    /** */
    @EnumField(217)
    setSpellAura217() { return this.set(217);  };
    /** */
    @EnumField(218)
    setHasteRanged() { return this.set(218);  };
    /** */
    @EnumField(219)
    setModManaRegenFromStat() { return this.set(219);  };
    /** */
    @EnumField(220)
    setModRatingFromStat() { return this.set(220);  };
    /** */
    @EnumField(221)
    setModDetaunt() { return this.set(221);  };
    /** */
    @EnumField(222)
    setSpellAura222() { return this.set(222);  };
    /** */
    @EnumField(223)
    setRaidProcFromCharge() { return this.set(223);  };
    /** */
    @EnumField(224)
    setSpellAura224() { return this.set(224);  };
    /** */
    @EnumField(225)
    setRaidProcFromChargeWithValue() { return this.set(225);  };
    /** */
    @EnumField(226)
    setPeriodicDummy() { return this.set(226);  };
    /** */
    @EnumField(227)
    setPeriodicTriggerSpellWithValue() { return this.set(227);  };
    /** */
    @EnumField(228)
    setDetectStealth() { return this.set(228);  };
    /** */
    @EnumField(229)
    setModAoeDamageAvoidance() { return this.set(229);  };
    /** */
    @EnumField(230)
    setModIncreaseHealth2() { return this.set(230);  };
    /** */
    @EnumField(231)
    setProcTriggerSpellWithValue() { return this.set(231);  };
    /** */
    @EnumField(232)
    setMechanicDurationMod() { return this.set(232);  };
    /** */
    @EnumField(233)
    setSpellAura233() { return this.set(233);  };
    /** */
    @EnumField(234)
    setMechanicDurationModNotStack() { return this.set(234);  };
    /** */
    @EnumField(235)
    setModDispelResist() { return this.set(235);  };
    /** */
    @EnumField(236)
    setControlVehicle() { return this.set(236);  };
    /** */
    @EnumField(237)
    setModSpellDamageOfAttackPower() { return this.set(237);  };
    /** */
    @EnumField(238)
    setModSpellHealingOfAttackPower() { return this.set(238);  };
    /** */
    @EnumField(239)
    setModScale2() { return this.set(239);  };
    /** */
    @EnumField(240)
    setModExpertise() { return this.set(240);  };
    /** */
    @EnumField(241)
    setForceMoveForward() { return this.set(241);  };
    /** */
    @EnumField(242)
    setModSpellDamageFromHealing() { return this.set(242);  };
    /** */
    @EnumField(243)
    setModFaction() { return this.set(243);  };
    /** */
    @EnumField(244)
    setComprehendLanguage() { return this.set(244);  };
    /** */
    @EnumField(245)
    setModAuraDurationByDispel() { return this.set(245);  };
    /** */
    @EnumField(246)
    setModAuraDurationByDispelNotStack() { return this.set(246);  };
    /** */
    @EnumField(247)
    setCloneCaster() { return this.set(247);  };
    /** */
    @EnumField(248)
    setModCombatResultChance() { return this.set(248);  };
    /** */
    @EnumField(249)
    setConvertRune() { return this.set(249);  };
    /** */
    @EnumField(250)
    setModIncreaseHealth3() { return this.set(250);  };
    /** */
    @EnumField(251)
    setModEnemyDodge() { return this.set(251);  };
    /** */
    @EnumField(252)
    setSpellAura252() { return this.set(252);  };
    /** */
    @EnumField(253)
    setModBlockCritChance() { return this.set(253);  };
    /** */
    @EnumField(254)
    setModDisarmOffhand() { return this.set(254);  };
    /** */
    @EnumField(255)
    setModMechanicDamageTakenPercent() { return this.set(255);  };
    /** */
    @EnumField(256)
    setNoReagentUse() { return this.set(256);  };
    /** */
    @EnumField(257)
    setModTargetResistBySpellClass() { return this.set(257);  };
    /** */
    @EnumField(258)
    setModSpellVisual() { return this.set(258);  };
    /** */
    @EnumField(259)
    setModHotPct() { return this.set(259);  };
    /** */
    @EnumField(260)
    setScreenEffect() { return this.set(260);  };
    /** */
    @EnumField(261)
    setPhase() { return this.set(261);  };
    /** */
    @EnumField(262)
    setAbilityIgnoreAurastate() { return this.set(262);  };
    /** */
    @EnumField(263)
    setAllowOnlyAbility() { return this.set(263);  };
    /** */
    @EnumField(264)
    setSpellAura264() { return this.set(264);  };
    /** */
    @EnumField(265)
    setSpellAura265() { return this.set(265);  };
    /** */
    @EnumField(266)
    setSpellAura266() { return this.set(266);  };
    /** */
    @EnumField(267)
    setModImmuneAuraApplySchool() { return this.set(267);  };
    /** */
    @EnumField(268)
    setModAttackPowerOfStatPercent() { return this.set(268);  };
    /** */
    @EnumField(269)
    setModIgnoreTargetResist() { return this.set(269);  };
    /** */
    @EnumField(270)
    setModAbilityIgnoreTargetResist() { return this.set(270);  };
    /** */
    @EnumField(271)
    setModDamageFromCaster() { return this.set(271);  };
    /** */
    @EnumField(272)
    setIgnoreMeleeReset() { return this.set(272);  };
    /** */
    @EnumField(273)
    setSpellAura273() { return this.set(273);  };
    /** */
    @EnumField(274)
    setConsumeNoAmmo() { return this.set(274);  };
    /** */
    @EnumField(275)
    setModIgnoreShapeshift() { return this.set(275);  };
    /** */
    @EnumField(276)
    setSpellAura276() { return this.set(276);  };
    /** */
    @EnumField(277)
    setModAbilityAffectedTargets() { return this.set(277);  };
    /** */
    @EnumField(278)
    setModDisarmRanged() { return this.set(278);  };
    /** */
    @EnumField(279)
    setInitializeImages() { return this.set(279);  };
    /** */
    @EnumField(280)
    setModTargetArmorPct() { return this.set(280);  };
    /** */
    @EnumField(281)
    setModHonorGainPct() { return this.set(281);  };
    /** */
    @EnumField(282)
    setIncreaseBaseHealthPercent() { return this.set(282);  };
    /** */
    @EnumField(283)
    setModHealingReceived() { return this.set(283);  };
    /** */
    @EnumField(284)
    setLinked() { return this.set(284);  };
    /** */
    @EnumField(285)
    setModAttackPowerOfArmor() { return this.set(285);  };
    /** */
    @EnumField(286)
    setAbilityPeriodicCrit() { return this.set(286);  };
    /** */
    @EnumField(287)
    setDeflectSpells() { return this.set(287);  };
    /** */
    @EnumField(288)
    setIgnoreHitDirection() { return this.set(288);  };
    /** */
    @EnumField(289)
    setSpellAura289() { return this.set(289);  };
    /** */
    @EnumField(290)
    setModCritPct() { return this.set(290);  };
    /** */
    @EnumField(291)
    setModXpQuestPct() { return this.set(291);  };
    /** */
    @EnumField(292)
    setOpenStable() { return this.set(292);  };
    /** */
    @EnumField(293)
    setSpellAura293() { return this.set(293);  };
    /** */
    @EnumField(294)
    setPreventRegeneratePower() { return this.set(294);  };
    /** */
    @EnumField(295)
    setSpellAura295() { return this.set(295);  };
    /** */
    @EnumField(296)
    setSetVehicleId() { return this.set(296);  };
    /** */
    @EnumField(297)
    setSpellAura297() { return this.set(297);  };
    /** */
    @EnumField(298)
    setSpellAura298() { return this.set(298);  };
    /** */
    @EnumField(299)
    setSpellAura299() { return this.set(299);  };
    /** */
    @EnumField(300)
    setShareDamagePct() { return this.set(300);  };
    /** */
    @EnumField(301)
    setSchoolHealAbsorb() { return this.set(301);  };
    /** */
    @EnumField(302)
    setSpellAura302() { return this.set(302);  };
    /** */
    @EnumField(303)
    setModDamageDoneVersusAurastate() { return this.set(303);  };
    /** */
    @EnumField(304)
    setModDrunk() { return this.set(304);  };
    /** */
    @EnumField(305)
    setModMinimumSpeed() { return this.set(305);  };
    /** */
    @EnumField(306)
    setSpellAura306() { return this.set(306);  };
    /** */
    @EnumField(307)
    setSpellAura307() { return this.set(307);  };
    /** */
    @EnumField(308)
    setSpellAura308() { return this.set(308);  };
    /** */
    @EnumField(309)
    setSpellAura309() { return this.set(309);  };
    /** */
    @EnumField(310)
    setModCreatureAoeDamageAvoidance() { return this.set(310);  };
    /** */
    @EnumField(311)
    setSpellAura311() { return this.set(311);  };
    /** */
    @EnumField(312)
    setSpellAura312() { return this.set(312);  };
    /** */
    @EnumField(313)
    setSpellAura313() { return this.set(313);  };
    /** */
    @EnumField(314)
    setPreventResurrection() { return this.set(314);  };
    /** */
    @EnumField(315)
    setUnderwaterWalking() { return this.set(315);  };
    /** */
    @EnumField(316)
    setPeriodicHaste() { return this.set(316);  };
}
