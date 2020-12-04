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
import { Enum, EnumField } from "wotlkdata/cell/Systems/Enum";
import { Spell } from "./Spell";

export class AuraType extends Enum<Spell> {
    constructor(owner: Spell, effectIndex: number) {
        super(owner, Cell.wrapIndex(owner.row.EffectAura,effectIndex));
    }

    /** */
    @EnumField(0)
    None() { return this.set(0);  };
    /** */
    @EnumField(1)
    BindSight() { return this.set(1);  };
    /** */
    @EnumField(2)
    ModPossess() { return this.set(2);  };
    /** */
    @EnumField(3)
    PeriodicDamage() { return this.set(3);  };
    /** */
    @EnumField(4)
    Dummy() { return this.set(4);  };
    /** */
    @EnumField(5)
    ModConfuse() { return this.set(5);  };
    /** */
    @EnumField(6)
    ModCharm() { return this.set(6);  };
    /** */
    @EnumField(7)
    ModFear() { return this.set(7);  };
    /** */
    @EnumField(8)
    PeriodicHeal() { return this.set(8);  };
    /** */
    @EnumField(9)
    ModAttackspeed() { return this.set(9);  };
    /** */
    @EnumField(10)
    ModThreat() { return this.set(10);  };
    /** */
    @EnumField(11)
    ModTaunt() { return this.set(11);  };
    /** */
    @EnumField(12)
    ModStun() { return this.set(12);  };
    /** */
    @EnumField(13)
    ModDamageDone() { return this.set(13);  };
    /** */
    @EnumField(14)
    ModDamageTaken() { return this.set(14);  };
    /** */
    @EnumField(15)
    DamageShield() { return this.set(15);  };
    /** */
    @EnumField(16)
    ModStealth() { return this.set(16);  };
    /** */
    @EnumField(17)
    ModDetect() { return this.set(17);  };
    /** */
    @EnumField(18)
    ModInvisibility() { return this.set(18);  };
    /** */
    @EnumField(19)
    ModInvisibilityDetection() { return this.set(19);  };
    /** */
    @EnumField(20)
    ObsModHealth() { return this.set(20);  };
    /** */
    @EnumField(21)
    ObsModPower() { return this.set(21);  };
    /** */
    @EnumField(22)
    ModResistance() { return this.set(22);  };
    /** */
    @EnumField(23)
    PeriodicTriggerSpell() { return this.set(23);  };
    /** */
    @EnumField(24)
    PeriodicEnergize() { return this.set(24);  };
    /** */
    @EnumField(25)
    ModPacify() { return this.set(25);  };
    /** */
    @EnumField(26)
    ModRoot() { return this.set(26);  };
    /** */
    @EnumField(27)
    ModSilence() { return this.set(27);  };
    /** */
    @EnumField(28)
    ReflectSpells() { return this.set(28);  };
    /** */
    @EnumField(29)
    ModStat() { return this.set(29);  };
    /** */
    @EnumField(30)
    ModSkill() { return this.set(30);  };
    /** */
    @EnumField(31)
    ModIncreaseSpeed() { return this.set(31);  };
    /** */
    @EnumField(32)
    ModIncreaseMountedSpeed() { return this.set(32);  };
    /** */
    @EnumField(33)
    ModDecreaseSpeed() { return this.set(33);  };
    /** */
    @EnumField(34)
    ModIncreaseHealth() { return this.set(34);  };
    /** */
    @EnumField(35)
    ModIncreaseEnergy() { return this.set(35);  };
    /** */
    @EnumField(36)
    ModShapeshift() { return this.set(36);  };
    /** */
    @EnumField(37)
    EffectImmunity() { return this.set(37);  };
    /** */
    @EnumField(0)
    StateImmunity() { return this.set(38);  };
    /** */
    @EnumField(0)
    SchoolImmunity() { return this.set(39);  };
    /** */
    @EnumField(0)
    DamageImmunity() { return this.set(40);  };
    /** */
    @EnumField(0)
    DispelImmunity() { return this.set(41);  };
    /** */
    @EnumField(0)
    ProcTriggerSpell() { return this.set(42);  };
    /** */
    @EnumField(0)
    ProcTriggerDamage() { return this.set(43);  };
    /** */
    @EnumField(0)
    TrackCreatures() { return this.set(44);  };
    /** */
    @EnumField(0)
    TrackResources() { return this.set(45);  };
    /** */
    @EnumField(0)
    SpellAura46() { return this.set(46);  };
    /** */
    @EnumField(0)
    ModParryPercent() { return this.set(47);  };
    /** */
    @EnumField(0)
    SpellAura48() { return this.set(48);  };
    /** */
    @EnumField(0)
    ModDodgePercent() { return this.set(49);  };
    /** */
    @EnumField(0)
    ModCriticalHealingAmount() { return this.set(50);  };
    /** */
    @EnumField(0)
    ModBlockPercent() { return this.set(51);  };
    /** */
    @EnumField(0)
    ModWeaponCritPercent() { return this.set(52);  };
    /** */
    @EnumField(0)
    PeriodicLeech() { return this.set(53);  };
    /** */
    @EnumField(0)
    ModHitChance() { return this.set(54);  };
    /** */
    @EnumField(0)
    ModSpellHitChance() { return this.set(55);  };
    /** */
    @EnumField(0)
    Transform() { return this.set(56);  };
    /** */
    @EnumField(0)
    ModSpellCritChance() { return this.set(57);  };
    /** */
    @EnumField(0)
    ModIncreaseSwimSpeed() { return this.set(58);  };
    /** */
    @EnumField(0)
    ModDamageDoneCreature() { return this.set(59);  };
    /** */
    @EnumField(0)
    ModPacifySilence() { return this.set(60);  };
    /** */
    @EnumField(0)
    ModScale() { return this.set(61);  };
    /** */
    @EnumField(0)
    PeriodicHealthFunnel() { return this.set(62);  };
    /** */
    @EnumField(0)
    SpellAura63() { return this.set(63);  };
    /** */
    @EnumField(0)
    PeriodicManaLeech() { return this.set(64);  };
    /** */
    @EnumField(0)
    ModCastingSpeedNotStack() { return this.set(65);  };
    /** */
    @EnumField(0)
    FeignDeath() { return this.set(66);  };
    /** */
    @EnumField(0)
    ModDisarm() { return this.set(67);  };
    /** */
    @EnumField(0)
    ModStalked() { return this.set(68);  };
    /** */
    @EnumField(0)
    SchoolAbsorb() { return this.set(69);  };
    /** */
    @EnumField(0)
    ExtraAttacks() { return this.set(70);  };
    /** */
    @EnumField(0)
    ModSpellCritChanceSchool() { return this.set(71);  };
    /** */
    @EnumField(0)
    ModPowerCostSchoolPct() { return this.set(72);  };
    /** */
    @EnumField(0)
    ModPowerCostSchool() { return this.set(73);  };
    /** */
    @EnumField(0)
    ReflectSpellsSchool() { return this.set(74);  };
    /** */
    @EnumField(0)
    ModLanguage() { return this.set(75);  };
    /** */
    @EnumField(0)
    FarSight() { return this.set(76);  };
    /** */
    @EnumField(0)
    MechanicImmunity() { return this.set(77);  };
    /** */
    @EnumField(0)
    Mounted() { return this.set(78);  };
    /** */
    @EnumField(0)
    ModDamagePercentDone() { return this.set(79);  };
    /** */
    @EnumField(0)
    ModPercentStat() { return this.set(80);  };
    /** */
    @EnumField(0)
    SplitDamagePct() { return this.set(81);  };
    /** */
    @EnumField(0)
    WaterBreathing() { return this.set(82);  };
    /** */
    @EnumField(0)
    ModBaseResistance() { return this.set(83);  };
    /** */
    @EnumField(0)
    ModRegen() { return this.set(84);  };
    /** */
    @EnumField(0)
    ModPowerRegen() { return this.set(85);  };
    /** */
    @EnumField(0)
    ChannelDeathItem() { return this.set(86);  };
    /** */
    @EnumField(0)
    ModDamagePercentTaken() { return this.set(87);  };
    /** */
    @EnumField(0)
    ModHealthRegenPercent() { return this.set(88);  };
    /** */
    @EnumField(0)
    PeriodicDamagePercent() { return this.set(89);  };
    /** */
    @EnumField(0)
    SpellAura90() { return this.set(90);  };
    /** */
    @EnumField(0)
    ModDetectRange() { return this.set(91);  };
    /** */
    @EnumField(0)
    PreventsFleeing() { return this.set(92);  };
    /** */
    @EnumField(0)
    ModUnattackable() { return this.set(93);  };
    /** */
    @EnumField(0)
    InterruptRegen() { return this.set(94);  };
    /** */
    @EnumField(0)
    Ghost() { return this.set(95);  };
    /** */
    @EnumField(0)
    SpellMagnet() { return this.set(96);  };
    /** */
    @EnumField(0)
    ManaShield() { return this.set(97);  };
    /** */
    @EnumField(0)
    ModSkillTalent() { return this.set(98);  };
    /** */
    @EnumField(0)
    ModAttackPower() { return this.set(99);  };
    /** */
    @EnumField(0)
    AurasVisible() { return this.set(100);  };
    /** */
    @EnumField(0)
    ModResistancePct() { return this.set(101);  };
    /** */
    @EnumField(0)
    ModMeleeAttackPowerVersus() { return this.set(102);  };
    /** */
    @EnumField(0)
    ModTotalThreat() { return this.set(103);  };
    /** */
    @EnumField(0)
    WaterWalk() { return this.set(104);  };
    /** */
    @EnumField(0)
    FeatherFall() { return this.set(105);  };
    /** */
    @EnumField(0)
    Hover() { return this.set(106);  };
    /** */
    @EnumField(0)
    AddFlatModifier() { return this.set(107);  };
    /** */
    @EnumField(0)
    AddPctModifier() { return this.set(108);  };
    /** */
    @EnumField(0)
    AddTargetTrigger() { return this.set(109);  };
    /** */
    @EnumField(0)
    ModPowerRegenPercent() { return this.set(110);  };
    /** */
    @EnumField(0)
    AddCasterHitTrigger() { return this.set(111);  };
    /** */
    @EnumField(0)
    OverrideClassScripts() { return this.set(112);  };
    /** */
    @EnumField(0)
    ModRangedDamageTaken() { return this.set(113);  };
    /** */
    @EnumField(0)
    ModRangedDamageTakenPct() { return this.set(114);  };
    /** */
    @EnumField(0)
    ModHealing() { return this.set(115);  };
    /** */
    @EnumField(0)
    ModRegenDuringCombat() { return this.set(116);  };
    /** */
    @EnumField(0)
    ModMechanicResistance() { return this.set(117);  };
    /** */
    @EnumField(0)
    ModHealingPct() { return this.set(118);  };
    /** */
    @EnumField(0)
    SpellAura119() { return this.set(119);  };
    /** */
    @EnumField(0)
    Untrackable() { return this.set(120);  };
    /** */
    @EnumField(0)
    Empathy() { return this.set(121);  };
    /** */
    @EnumField(0)
    ModOffhandDamagePct() { return this.set(122);  };
    /** */
    @EnumField(0)
    ModTargetResistance() { return this.set(123);  };
    /** */
    @EnumField(0)
    ModRangedAttackPower() { return this.set(124);  };
    /** */
    @EnumField(0)
    ModMeleeDamageTaken() { return this.set(125);  };
    /** */
    @EnumField(0)
    ModMeleeDamageTakenPct() { return this.set(126);  };
    /** */
    @EnumField(0)
    RangedAttackPowerAttackerBonus() { return this.set(127);  };
    /** */
    @EnumField(0)
    ModPossessPet() { return this.set(128);  };
    /** */
    @EnumField(0)
    ModSpeedAlways() { return this.set(129);  };
    /** */
    @EnumField(0)
    ModMountedSpeedAlways() { return this.set(130);  };
    /** */
    @EnumField(0)
    ModRangedAttackPowerVersus() { return this.set(131);  };
    /** */
    @EnumField(0)
    ModIncreaseEnergyPercent() { return this.set(132);  };
    /** */
    @EnumField(0)
    ModIncreaseHealthPercent() { return this.set(133);  };
    /** */
    @EnumField(0)
    ModManaRegenInterrupt() { return this.set(134);  };
    /** */
    @EnumField(0)
    ModHealingDone() { return this.set(135);  };
    /** */
    @EnumField(0)
    ModHealingDonePercent() { return this.set(136);  };
    /** */
    @EnumField(0)
    ModTotalStatPercentage() { return this.set(137);  };
    /** */
    @EnumField(0)
    ModMeleeHaste() { return this.set(138);  };
    /** */
    @EnumField(0)
    ForceReaction() { return this.set(139);  };
    /** */
    @EnumField(0)
    ModRangedHaste() { return this.set(140);  };
    /** */
    @EnumField(0)
    ModRangedAmmoHaste() { return this.set(141);  };
    /** */
    @EnumField(0)
    ModBaseResistancePct() { return this.set(142);  };
    /** */
    @EnumField(0)
    ModResistanceExclusive() { return this.set(143);  };
    /** */
    @EnumField(0)
    SafeFall() { return this.set(144);  };
    /** */
    @EnumField(0)
    ModPetTalentPoints() { return this.set(145);  };
    /** */
    @EnumField(0)
    AllowTamePetType() { return this.set(146);  };
    /** */
    @EnumField(0)
    MechanicImmunityMask() { return this.set(147);  };
    /** */
    @EnumField(0)
    RetainComboPoints() { return this.set(148);  };
    /** */
    @EnumField(0)
    ReducePushback() { return this.set(149);  };
    /** */
    @EnumField(0)
    ModShieldBlockvaluePct() { return this.set(150);  };
    /** */
    @EnumField(0)
    TrackStealthed() { return this.set(151);  };
    /** */
    @EnumField(0)
    ModDetectedRange() { return this.set(152);  };
    /** */
    @EnumField(0)
    SplitDamageFlat() { return this.set(153);  };
    /** */
    @EnumField(0)
    ModStealthLevel() { return this.set(154);  };
    /** */
    @EnumField(0)
    ModWaterBreathing() { return this.set(155);  };
    /** */
    @EnumField(0)
    ModReputationGain() { return this.set(156);  };
    /** */
    @EnumField(0)
    PetDamageMulti() { return this.set(157);  };
    /** */
    @EnumField(0)
    ModShieldBlockvalue() { return this.set(158);  };
    /** */
    @EnumField(0)
    NoPvpCredit() { return this.set(159);  };
    /** */
    @EnumField(0)
    ModAoeAvoidance() { return this.set(160);  };
    /** */
    @EnumField(0)
    ModHealthRegenInCombat() { return this.set(161);  };
    /** */
    @EnumField(0)
    PowerBurn() { return this.set(162);  };
    /** */
    @EnumField(0)
    ModCritDamageBonus() { return this.set(163);  };
    /** */
    @EnumField(0)
    SpellAura164() { return this.set(164);  };
    /** */
    @EnumField(0)
    MeleeAttackPowerAttackerBonus() { return this.set(165);  };
    /** */
    @EnumField(0)
    ModAttackPowerPct() { return this.set(166);  };
    /** */
    @EnumField(0)
    ModRangedAttackPowerPct() { return this.set(167);  };
    /** */
    @EnumField(0)
    ModDamageDoneVersus() { return this.set(168);  };
    /** */
    @EnumField(0)
    ModCritPercentVersus() { return this.set(169);  };
    /** */
    @EnumField(0)
    DetectAmore() { return this.set(170);  };
    /** */
    @EnumField(0)
    ModSpeedNotStack() { return this.set(171);  };
    /** */
    @EnumField(0)
    ModMountedSpeedNotStack() { return this.set(172);  };
    /** */
    @EnumField(0)
    SpellAura173() { return this.set(173);  };
    /** */
    @EnumField(0)
    ModSpellDamageOfStatPercent() { return this.set(174);  };
    /** */
    @EnumField(0)
    ModSpellHealingOfStatPercent() { return this.set(175);  };
    /** */
    @EnumField(0)
    SpiritOfRedemption() { return this.set(176);  };
    /** */
    @EnumField(0)
    AoeCharm() { return this.set(177);  };
    /** */
    @EnumField(0)
    ModDebuffResistance() { return this.set(178);  };
    /** */
    @EnumField(0)
    ModAttackerSpellCritChance() { return this.set(179);  };
    /** */
    @EnumField(0)
    ModFlatSpellDamageVersus() { return this.set(180);  };
    /** */
    @EnumField(0)
    SpellAura181() { return this.set(181);  };
    /** */
    @EnumField(0)
    ModResistanceOfStatPercent() { return this.set(182);  };
    /** */
    @EnumField(0)
    ModCriticalThreat() { return this.set(183);  };
    /** */
    @EnumField(0)
    ModAttackerMeleeHitChance() { return this.set(184);  };
    /** */
    @EnumField(0)
    ModAttackerRangedHitChance() { return this.set(185);  };
    /** */
    @EnumField(0)
    ModAttackerSpellHitChance() { return this.set(186);  };
    /** */
    @EnumField(0)
    ModAttackerMeleeCritChance() { return this.set(187);  };
    /** */
    @EnumField(0)
    ModAttackerRangedCritChance() { return this.set(188);  };
    /** */
    @EnumField(0)
    ModRating() { return this.set(189);  };
    /** */
    @EnumField(0)
    ModFactionReputationGain() { return this.set(190);  };
    /** */
    @EnumField(0)
    UseNormalMovementSpeed() { return this.set(191);  };
    /** */
    @EnumField(0)
    ModMeleeRangedHaste() { return this.set(192);  };
    /** */
    @EnumField(0)
    MeleeSlow() { return this.set(193);  };
    /** */
    @EnumField(0)
    ModTargetAbsorbSchool() { return this.set(194);  };
    /** */
    @EnumField(0)
    ModTargetAbilityAbsorbSchool() { return this.set(195);  };
    /** */
    @EnumField(0)
    ModCooldown() { return this.set(196);  };
    /** */
    @EnumField(0)
    ModAttackerSpellAndWeaponCritChance() { return this.set(197);  };
    /** */
    @EnumField(0)
    SpellAura198() { return this.set(198);  };
    /** */
    @EnumField(0)
    ModIncreasesSpellPctToHit() { return this.set(199);  };
    /** */
    @EnumField(0)
    ModXpPct() { return this.set(200);  };
    /** */
    @EnumField(0)
    Fly() { return this.set(201);  };
    /** */
    @EnumField(0)
    CannotBeDodged() { return this.set(202);  };
    /** */
    @EnumField(0)
    ModAttackerMeleeCritDamage() { return this.set(203);  };
    /** */
    @EnumField(0)
    ModAttackerRangedCritDamage() { return this.set(204);  };
    /** */
    @EnumField(0)
    ModSchoolCritDmgTaken() { return this.set(205);  };
    /** */
    @EnumField(0)
    ModIncreaseVehicleFlightSpeed() { return this.set(206);  };
    /** */
    @EnumField(0)
    ModIncreaseMountedFlightSpeed() { return this.set(207);  };
    /** */
    @EnumField(0)
    ModIncreaseFlightSpeed() { return this.set(208);  };
    /** */
    @EnumField(0)
    ModMountedFlightSpeedAlways() { return this.set(209);  };
    /** */
    @EnumField(0)
    ModVehicleSpeedAlways() { return this.set(210);  };
    /** */
    @EnumField(0)
    ModFlightSpeedNotStack() { return this.set(211);  };
    /** */
    @EnumField(0)
    ModRangedAttackPowerOfStatPercent() { return this.set(212);  };
    /** */
    @EnumField(0)
    ModRageFromDamageDealt() { return this.set(213);  };
    /** */
    @EnumField(0)
    Tamed() { return this.set(214);  };
    /** */
    @EnumField(0)
    ArenaPreparation() { return this.set(215);  };
    /** */
    @EnumField(0)
    HasteSpells() { return this.set(216);  };
    /** */
    @EnumField(0)
    SpellAura217() { return this.set(217);  };
    /** */
    @EnumField(0)
    HasteRanged() { return this.set(218);  };
    /** */
    @EnumField(0)
    ModManaRegenFromStat() { return this.set(219);  };
    /** */
    @EnumField(0)
    ModRatingFromStat() { return this.set(220);  };
    /** */
    @EnumField(0)
    ModDetaunt() { return this.set(221);  };
    /** */
    @EnumField(0)
    SpellAura222() { return this.set(222);  };
    /** */
    @EnumField(0)
    RaidProcFromCharge() { return this.set(223);  };
    /** */
    @EnumField(0)
    SpellAura224() { return this.set(224);  };
    /** */
    @EnumField(0)
    RaidProcFromChargeWithValue() { return this.set(225);  };
    /** */
    @EnumField(0)
    PeriodicDummy() { return this.set(226);  };
    /** */
    @EnumField(0)
    PeriodicTriggerSpellWithValue() { return this.set(227);  };
    /** */
    @EnumField(0)
    DetectStealth() { return this.set(228);  };
    /** */
    @EnumField(0)
    ModAoeDamageAvoidance() { return this.set(229);  };
    /** */
    @EnumField(0)
    ModIncreaseHealth2() { return this.set(230);  };
    /** */
    @EnumField(0)
    ProcTriggerSpellWithValue() { return this.set(231);  };
    /** */
    @EnumField(0)
    MechanicDurationMod() { return this.set(232);  };
    /** */
    @EnumField(0)
    SpellAura233() { return this.set(233);  };
    /** */
    @EnumField(0)
    MechanicDurationModNotStack() { return this.set(234);  };
    /** */
    @EnumField(0)
    ModDispelResist() { return this.set(235);  };
    /** */
    @EnumField(0)
    ControlVehicle() { return this.set(236);  };
    /** */
    @EnumField(0)
    ModSpellDamageOfAttackPower() { return this.set(237);  };
    /** */
    @EnumField(0)
    ModSpellHealingOfAttackPower() { return this.set(238);  };
    /** */
    @EnumField(0)
    ModScale2() { return this.set(239);  };
    /** */
    @EnumField(0)
    ModExpertise() { return this.set(240);  };
    /** */
    @EnumField(0)
    ForceMoveForward() { return this.set(241);  };
    /** */
    @EnumField(0)
    ModSpellDamageFromHealing() { return this.set(242);  };
    /** */
    @EnumField(0)
    ModFaction() { return this.set(243);  };
    /** */
    @EnumField(0)
    ComprehendLanguage() { return this.set(244);  };
    /** */
    @EnumField(0)
    ModAuraDurationByDispel() { return this.set(245);  };
    /** */
    @EnumField(0)
    ModAuraDurationByDispelNotStack() { return this.set(246);  };
    /** */
    @EnumField(0)
    CloneCaster() { return this.set(247);  };
    /** */
    @EnumField(0)
    ModCombatResultChance() { return this.set(248);  };
    /** */
    @EnumField(0)
    ConvertRune() { return this.set(249);  };
    /** */
    @EnumField(0)
    ModIncreaseHealth3() { return this.set(250);  };
    /** */
    @EnumField(0)
    ModEnemyDodge() { return this.set(251);  };
    /** */
    @EnumField(0)
    SpellAura252() { return this.set(252);  };
    /** */
    @EnumField(0)
    ModBlockCritChance() { return this.set(253);  };
    /** */
    @EnumField(0)
    ModDisarmOffhand() { return this.set(254);  };
    /** */
    @EnumField(0)
    ModMechanicDamageTakenPercent() { return this.set(255);  };
    /** */
    @EnumField(0)
    NoReagentUse() { return this.set(256);  };
    /** */
    @EnumField(0)
    ModTargetResistBySpellClass() { return this.set(257);  };
    /** */
    @EnumField(0)
    ModSpellVisual() { return this.set(258);  };
    /** */
    @EnumField(0)
    ModHotPct() { return this.set(259);  };
    /** */
    @EnumField(0)
    ScreenEffect() { return this.set(260);  };
    /** */
    @EnumField(0)
    Phase() { return this.set(261);  };
    /** */
    @EnumField(0)
    AbilityIgnoreAurastate() { return this.set(262);  };
    /** */
    @EnumField(0)
    AllowOnlyAbility() { return this.set(263);  };
    /** */
    @EnumField(0)
    SpellAura264() { return this.set(264);  };
    /** */
    @EnumField(0)
    SpellAura265() { return this.set(265);  };
    /** */
    @EnumField(0)
    SpellAura266() { return this.set(266);  };
    /** */
    @EnumField(0)
    ModImmuneAuraApplySchool() { return this.set(267);  };
    /** */
    @EnumField(0)
    ModAttackPowerOfStatPercent() { return this.set(268);  };
    /** */
    @EnumField(0)
    ModIgnoreTargetResist() { return this.set(269);  };
    /** */
    @EnumField(0)
    ModAbilityIgnoreTargetResist() { return this.set(270);  };
    /** */
    @EnumField(0)
    ModDamageFromCaster() { return this.set(271);  };
    /** */
    @EnumField(0)
    IgnoreMeleeReset() { return this.set(272);  };
    /** */
    @EnumField(0)
    SpellAura273() { return this.set(273);  };
    /** */
    @EnumField(0)
    ConsumeNoAmmo() { return this.set(274);  };
    /** */
    @EnumField(0)
    ModIgnoreShapeshift() { return this.set(275);  };
    /** */
    @EnumField(0)
    SpellAura276() { return this.set(276);  };
    /** */
    @EnumField(0)
    ModAbilityAffectedTargets() { return this.set(277);  };
    /** */
    @EnumField(0)
    ModDisarmRanged() { return this.set(278);  };
    /** */
    @EnumField(0)
    InitializeImages() { return this.set(279);  };
    /** */
    @EnumField(0)
    ModTargetArmorPct() { return this.set(280);  };
    /** */
    @EnumField(0)
    ModHonorGainPct() { return this.set(281);  };
    /** */
    @EnumField(0)
    IncreaseBaseHealthPercent() { return this.set(282);  };
    /** */
    @EnumField(0)
    ModHealingReceived() { return this.set(283);  };
    /** */
    @EnumField(0)
    Linked() { return this.set(284);  };
    /** */
    @EnumField(0)
    ModAttackPowerOfArmor() { return this.set(285);  };
    /** */
    @EnumField(0)
    AbilityPeriodicCrit() { return this.set(286);  };
    /** */
    @EnumField(0)
    DeflectSpells() { return this.set(287);  };
    /** */
    @EnumField(0)
    IgnoreHitDirection() { return this.set(288);  };
    /** */
    @EnumField(0)
    SpellAura289() { return this.set(289);  };
    /** */
    @EnumField(0)
    ModCritPct() { return this.set(290);  };
    /** */
    @EnumField(0)
    ModXpQuestPct() { return this.set(291);  };
    /** */
    @EnumField(0)
    OpenStable() { return this.set(292);  };
    /** */
    @EnumField(0)
    SpellAura293() { return this.set(293);  };
    /** */
    @EnumField(0)
    PreventRegeneratePower() { return this.set(294);  };
    /** */
    @EnumField(0)
    SpellAura295() { return this.set(295);  };
    /** */
    @EnumField(0)
    SetVehicleId() { return this.set(296);  };
    /** */
    @EnumField(0)
    SpellAura297() { return this.set(297);  };
    /** */
    @EnumField(0)
    SpellAura298() { return this.set(298);  };
    /** */
    @EnumField(0)
    SpellAura299() { return this.set(299);  };
    /** */
    @EnumField(0)
    ShareDamagePct() { return this.set(300);  };
    /** */
    @EnumField(0)
    SchoolHealAbsorb() { return this.set(301);  };
    /** */
    @EnumField(0)
    SpellAura302() { return this.set(302);  };
    /** */
    @EnumField(0)
    ModDamageDoneVersusAurastate() { return this.set(303);  };
    /** */
    @EnumField(0)
    ModDrunk() { return this.set(304);  };
    /** */
    @EnumField(0)
    ModMinimumSpeed() { return this.set(305);  };
    /** */
    @EnumField(0)
    SpellAura306() { return this.set(306);  };
    /** */
    @EnumField(0)
    SpellAura307() { return this.set(307);  };
    /** */
    @EnumField(0)
    SpellAura308() { return this.set(308);  };
    /** */
    @EnumField(0)
    SpellAura309() { return this.set(309);  };
    /** */
    @EnumField(0)
    ModCreatureAoeDamageAvoidance() { return this.set(310);  };
    /** */
    @EnumField(0)
    SpellAura311() { return this.set(311);  };
    /** */
    @EnumField(0)
    SpellAura312() { return this.set(312);  };
    /** */
    @EnumField(0)
    SpellAura313() { return this.set(313);  };
    /** */
    @EnumField(0)
    PreventResurrection() { return this.set(314);  };
    /** */
    @EnumField(0)
    UnderwaterWalking() { return this.set(315);  };
    /** */
    @EnumField(0)
    PeriodicHaste() { return this.set(316);  };
}
