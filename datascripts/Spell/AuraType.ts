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
import { CellIndexWrapper } from "wotlkdata/cell/cells/CellArray";
import { EnumCellTransform } from "wotlkdata/cell/cells/EnumCell";
import { AddCasterHitTrigger, AddFlatModifier, AddPctModifier, AddTargetTrigger, AllowOnlyAbility, AllowTamePetType, AoECharm, ArenaPreparation, AurasVisible, BindSight, CannotBeDodged, ChannelDeathItem, CloneCaster, ComprehendLanguage, ConsumeNoAmmo, ControlVehicle, ConvertRune, DamageImmunity, DamageShield, DeflectSpells, DetectAmore, DetectStealth, DispelImmunity, EffectImmunity, Empathy, FarSight, FeatherFall, FeignDeath, Fly, ForceMoveForward, ForceReaction, Ghost, HasteRanged, HasteSpells, Hover, IgnoreHitDirection, IgnoreMeleeReset, IncreaseBaseHealthPercent, InitializeImages, InterruptRegen, ManaShield, MechanicDurationMod, MechanicDurationModNotStack, MechanicImmunity, MechanicImmunityMask, MeleeAttackPowerAttackerBonus, MeleeSlow, ModAbilityAffectedTargets, ModAoEAvoidance, ModAoEDamageAvoidance, ModAttackerMeleeCritChance, ModAttackerMeleeCritDamage, ModAttackerMeleeHitChance, ModAttackerRangedCritChance, ModAttackerRangedCritDamage, ModAttackerRangedHitChance, ModAttackerSpellAndWeaponCritChance, ModAttackerSpellCritChance, ModAttackerSpellHitChance, ModAttackPower, ModAttackPowerOfArmor, ModAttackPowerOfStatPercent, ModAttackPowerPct, ModAttackSpeed, ModAuraDurationByDispel, ModAuraDurationByDispelNotStack, ModBaseResistance, ModBaseResistancePct, ModBlockCritChance, ModBlockPercent, ModCastingSpeedNotStack, ModCharm, ModCombatResultChance, ModConfuse, ModCooldown, ModCreatureAoEDamageAvoidance, ModCritDamageBonus, ModCriticalHealAmount, ModCriticalThreat, ModCritPct, ModCritPercentVersus, ModDamageDone, ModDamageDoneCreature, ModDamageDoneVersus, ModDamageFromCaster, ModDamagePercentDone, ModDamagePercentTaken, ModDamageTaken, ModDebuffResistance, ModDecreaseSpeed, ModDetaunt, ModDetect, ModDetectedRange, ModDetectRange, ModDisarm, ModDisarmOffhand, ModDisarmRanged, ModDispelResist, ModDodgePercent, ModEnemyDodge, ModExpertise, ModFaction, ModFactionReputationGain, ModFear, ModFlatSpellDamageVersus, ModFlightSpeedNotStack, ModHealing, ModHealingDone, ModHealingDonePercent, ModHealingPct, ModHealingReceived, ModHealthRegenPercent, ModHitChance, ModHonorGainPct, ModHotPct, ModIgnoreShapeshift, ModIgnoreTargetResist, ModImmuneAuraApplySchool, ModIncreaseEnergy, ModIncreaseEnergyPercent, ModIncreaseFlightSpeed, ModIncreaseHealth, ModIncreaseHealth2, ModIncreaseHealth3, ModIncreaseHealthPercent, ModIncreaseMountedFlightSpeed, ModIncreaseMountSpeed, ModIncreaseSpeed, ModIncreasesSpellPctToHit, ModIncreaseSwimSpeed, ModIncreaseVehicleFlightSpeed, ModInvisibility, ModInvisibilityDetection, ModLanguage, ModManaRegenFromStat, ModManaRegenInterrupt, ModMechanicDamageTakenPercent, ModMechanicResistance, ModMeleeAttackPowerVersus, ModMeleeDamageTaken, ModMeleeDamageTakenPct, ModMeleeHaste, ModMeleeRangedHaste, ModMinimumSpeed, ModMountedFlightSpeedAlways, ModMountedSpeedAlways, ModMountedSpeedNotStack, ModOffhandDamagePct, ModPacify, ModPacifySilence, ModParryPercent, ModPercentStat, ModPetTalentPoints, ModPossess, ModPossessPet, ModPowerCostSchool, ModPowerCostSchoolPct, ModPowerRegen, ModPowerRegenPercent, ModRageFromDamageDealt, ModRangedAmmoHaste, ModRangedAttackPower, ModRangedAttackPowerOfStatPercent, ModRangedAttackPowerPct, ModRangedAttackPowerVersus, ModRangedDamageTaken, ModRangedDamageTakenPct, ModRangedHaste, ModRating, ModRatingFromStat, ModRegen, ModRegenDuringCombat, ModReputationGain, ModResistance, ModResistanceExclusive, ModResistanceOfStatPercent, ModResistancePct, ModRoot, ModScale, ModScale2, ModSchoolCritDmgTaken, ModShapeshift, ModShieldBlockValue, ModShieldBlockValuePct, ModSilence, ModSkill, ModSkillTalent, ModSpeedAlways, ModSpeedNotStack, ModSpellCritChance, ModSpellCritChanceSchool, ModSpellDamageFromHealing, ModSpellDamageOfAttackPower, ModSpellDamageOfStatPercent, ModSpellHealingOfAttackPower, ModSpellHealingOfStatPercent, ModSpellHitChance, ModStalked, ModStat, ModStealth, ModStealthLevel, ModStun, ModTargetAbilityAbsorbSchool, ModTargetAbsorbSchool, ModTargetArmorPct, ModTargetResistance, ModTargetResistBySpellClass, ModTaunt, ModThreat, ModTotalStatPercentage, ModTotalThreat, ModUnattackable, ModVehicleSpeedAlways, ModWaterBreathing, ModWeaponCritPercent, ModXpPct, ModXpQuestPct, Mounted, NoPvPCredit, NoReagentUse, ObsModHealth, ObsModPower, PeriodicDamage, PeriodicDamagePercent, PeriodicEnergize, PeriodicHeal, PeriodicHealthFunnel, PeriodicLeech, PeriodicManaLeech, PetDamageMulti, Phase, PowerBurn, PreventRegeneratePower, PreventResurrection, PreventsFleeing, ProcTriggerDamage, ProcTriggerSpell, RaidProcFromCharge, RaidProcFromChargeWithValue, RangedAttackPowerAttackerBonus, ReducePushback, ReflectSpells, ReflectSpellsSchool, RetainComboPoints, SafeFall, SchoolAbsorb, SchoolHealAbsorb, SchoolImmunity, ScreenEffect, SetVehicleId, ShareDamagePct, SpellMagnet, SpiritOfRedemption, SplitDamageFlat, SplitDamagePct, StateImmunity, Tamed, TrackCreatures, TrackResources, TrackStealthed, Transform, UnderwaterWalking, Untrackable, UseNormalMovementSpeed, WaterBreathing, WaterWalk } from "./EffectTemplates/AuraTemplates";
import { SpellEffect } from "./SpellEffect";

export class AuraType extends EnumCellTransform<SpellEffect> {
    constructor(owner: SpellEffect, effectIndex: number) {
        super(owner, new CellIndexWrapper(undefined, owner.row.EffectAura,effectIndex));
    }

    /** Enum Value:                                               0 */
    get None()                                { return this.value(0, x=>x) }
    /** Enum Value:                                               1 */
    get BindSight()                           { return this.value(1, x=>new BindSight(x)) }
    /** Enum Value:                                               2 */
    get ModPossess()                          { return this.value(2, x=>new ModPossess(x)) }
    /** Enum Value:                                               3 */
    get PeriodicDamage()                      { return this.value(3, x=>new PeriodicDamage(x)) }
    /** Enum Value:                                               4 */
    get Dummy()                               { return this.value(4, x=>x) }
    /** Enum Value:                                               5 */
    get ModConfuse()                          { return this.value(5, x=>new ModConfuse(x)) }
    /** Enum Value:                                               6 */
    get ModCharm()                            { return this.value(6, x=>new ModCharm(x)) }
    /** Enum Value:                                               7 */
    get ModFear()                             { return this.value(7, x=>new ModFear(x)) }
    /** Enum Value:                                               8 */
    get PeriodicHeal()                        { return this.value(8, x=>new PeriodicHeal(x)) }
    /** Enum Value:                                               9 */
    get ModAttackspeed()                      { return this.value(9, x=>new ModAttackSpeed(x)) }
    /** Enum Value:                                               10 */
    get ModThreat()                           { return this.value(10, x=>new ModThreat(x)) }
    /** Enum Value:                                               11 */
    get ModTaunt()                            { return this.value(11, x=>new ModTaunt(x)) }
    /** Enum Value:                                               12 */
    get ModStun()                             { return this.value(12, x=>new ModStun(x)) }
    /** Enum Value:                                               13 */
    get ModDamageDone()                       { return this.value(13, x=>new ModDamageDone(x)) }
    /** Enum Value:                                               14 */
    get ModDamageTaken()                      { return this.value(14, x=>new ModDamageTaken(x)) }
    /** Enum Value:                                               15 */
    get DamageShield()                        { return this.value(15, x=>new DamageShield(x)) }
    /** Enum Value:                                               16 */
    get ModStealth()                          { return this.value(16, x=>new ModStealth(x)) }
    /** Enum Value:                                               17 */
    get ModDetect()                           { return this.value(17, x=>new ModDetect(x)) }
    /** Enum Value:                                               18 */
    get ModInvisibility()                     { return this.value(18, x=>new ModInvisibility(x)) }
    /** Enum Value:                                               19 */
    get ModInvisibilityDetection()            { return this.value(19, x=>new ModInvisibilityDetection(x)) }
    /** Enum Value:                                               20 */
    get ObsModHealth()                        { return this.value(20, x=>new ObsModHealth(x)) }
    /** Enum Value:                                               21 */
    get ObsModPower()                         { return this.value(21, x=>new ObsModPower(x)) }
    /** Enum Value:                                               22 */
    get ModResistance()                       { return this.value(22, x=>new ModResistance(x)) }
    /** Enum Value:                                               23 */
    get PeriodicTriggerSpell()                { return this.value(23, x=>x) }
    /** Enum Value:                                               24 */
    get PeriodicEnergize()                    { return this.value(24, x=>new PeriodicEnergize(x)) }
    /** Enum Value:                                               25 */
    get ModPacify()                           { return this.value(25, x=>new ModPacify(x)) }
    /** Enum Value:                                               26 */
    get ModRoot()                             { return this.value(26, x=>new ModRoot(x)) }
    /** Enum Value:                                               27 */
    get ModSilence()                          { return this.value(27, x=>new ModSilence(x)) }
    /** Enum Value:                                               28 */
    get ReflectSpells()                       { return this.value(28, x=>new ReflectSpells(x)) }
    /** Enum Value:                                               29 */
    get ModStat()                             { return this.value(29, x=>new ModStat(x)) }
    /** Enum Value:                                               30 */
    get ModSkill()                            { return this.value(30, x=>new ModSkill(x)) }
    /** Enum Value:                                               31 */
    get ModIncreaseSpeed()                    { return this.value(31, x=>new ModIncreaseSpeed(x)) }
    /** Enum Value:                                               32 */
    get ModIncreaseMountedSpeed()             { return this.value(32, x=>new ModIncreaseMountSpeed(x)) }
    /** Enum Value:                                               33 */
    get ModDecreaseSpeed()                    { return this.value(33, x=>new ModDecreaseSpeed(x)) }
    /** Enum Value:                                               34 */
    get ModIncreaseHealth()                   { return this.value(34, x=>new ModIncreaseHealth(x)) }
    /** Enum Value:                                               35 */
    get ModIncreaseEnergy()                   { return this.value(35, x=>new ModIncreaseEnergy(x)) }
    /** Enum Value:                                               36 */
    get ModShapeshift()                       { return this.value(36, x=>new ModShapeshift(x)) }
    /** Enum Value:                                               37 */
    get EffectImmunity()                      { return this.value(37, x=>new EffectImmunity(x)) }
    /** Enum Value:                                               38 */
    get StateImmunity()                       { return this.value(38, x=>new StateImmunity(x)) }
    /** Enum Value:                                               39 */
    get SchoolImmunity()                      { return this.value(39, x=>new SchoolImmunity(x)) }
    /** Enum Value:                                               40 */
    get DamageImmunity()                      { return this.value(40, x=>new DamageImmunity(x)) }
    /** Enum Value:                                               41 */
    get DispelImmunity()                      { return this.value(41, x=>new DispelImmunity(x)) }
    /** Enum Value:                                               42 */
    get ProcTriggerSpell()                    { return this.value(42, x=>new ProcTriggerSpell(x)) }
    /** Enum Value:                                               43 */
    get ProcTriggerDamage()                   { return this.value(43, x=>new ProcTriggerDamage(x)) }
    /** Enum Value:                                               44 */
    get TrackCreatures()                      { return this.value(44, x=>new TrackCreatures(x)) }
    /** Enum Value:                                               45 */
    get TrackResources()                      { return this.value(45, x=>new TrackResources(x)) }
    /** Enum Value:                                               46 */
    get SpellAura46()                         { return this.value(46, x=>x) }
    /** Enum Value:                                               47 */
    get ModParryPercent()                     { return this.value(47, x=>new ModParryPercent(x)) }
    /** Enum Value:                                               48 */
    get SpellAura48()                         { return this.value(48, x=>x) }
    /** Enum Value:                                               49 */
    get ModDodgePercent()                     { return this.value(49, x=>new ModDodgePercent(x)) }
    /** Enum Value:                                               50 */
    get ModCriticalHealingAmount()            { return this.value(50, x=>new ModCriticalHealAmount(x)) }
    /** Enum Value:                                               51 */
    get ModBlockPercent()                     { return this.value(51, x=>new ModBlockPercent(x)) }
    /** Enum Value:                                               52 */
    get ModWeaponCritPercent()                { return this.value(52, x=>new ModWeaponCritPercent(x)) }
    /** Enum Value:                                               53 */
    get PeriodicLeech()                       { return this.value(53, x=>new PeriodicLeech(x)) }
    /** Enum Value:                                               54 */
    get ModHitChance()                        { return this.value(54, x=>new ModHitChance(x)) }
    /** Enum Value:                                               55 */
    get ModSpellHitChance()                   { return this.value(55, x=>new ModSpellHitChance(x)) }
    /** Enum Value:                                               56 */
    get Transform()                           { return this.value(56, x=>new Transform(x)) }
    /** Enum Value:                                               57 */
    get ModSpellCritChance()                  { return this.value(57, x=>new ModSpellCritChance(x)) }
    /** Enum Value:                                               58 */
    get ModIncreaseSwimSpeed()                { return this.value(58, x=>new ModIncreaseSwimSpeed(x)) }
    /** Enum Value:                                               59 */
    get ModDamageDoneCreature()               { return this.value(59, x=>new ModDamageDoneCreature(x)) }
    /** Enum Value:                                               60 */
    get ModPacifySilence()                    { return this.value(60, x=>new ModPacifySilence(x)) }
    /** Enum Value:                                               61 */
    get ModScale()                            { return this.value(61, x=>new ModScale(x)) }
    /** Enum Value:                                               62 */
    get PeriodicHealthFunnel()                { return this.value(62, x=>new PeriodicHealthFunnel(x)) }
    /** Enum Value:                                               63 */
    get SpellAura63()                         { return this.value(63, x=>x) }
    /** Enum Value:                                               64 */
    get PeriodicManaLeech()                   { return this.value(64, x=>new PeriodicManaLeech(x)) }
    /** Enum Value:                                               65 */
    get ModCastingSpeedNotStack()             { return this.value(65, x=>new ModCastingSpeedNotStack(x)) }
    /** Enum Value:                                               66 */
    get FeignDeath()                          { return this.value(66, x=>new FeignDeath(x)) }
    /** Enum Value:                                               67 */
    get ModDisarm()                           { return this.value(67, x=>new ModDisarm(x)) }
    /** Enum Value:                                               68 */
    get ModStalked()                          { return this.value(68, x=>new ModStalked(x)) }
    /** Enum Value:                                               69 */
    get SchoolAbsorb()                        { return this.value(69, x=>new SchoolAbsorb(x)) }
    /** Enum Value:                                               70 */
    get ExtraAttacks()                        { return this.value(70, x=>x) }
    /** Enum Value:                                               71 */
    get ModSpellCritChanceSchool()            { return this.value(71, x=>new ModSpellCritChanceSchool(x)) }
    /** Enum Value:                                               72 */
    get ModPowerCostSchoolPct()               { return this.value(72, x=>new ModPowerCostSchoolPct(x)) }
    /** Enum Value:                                               73 */
    get ModPowerCostSchool()                  { return this.value(73, x=>new ModPowerCostSchool(x)) }
    /** Enum Value:                                               74 */
    get ReflectSpellsSchool()                 { return this.value(74, x=>new ReflectSpellsSchool(x)) }
    /** Enum Value:                                               75 */
    get ModLanguage()                         { return this.value(75, x=>new ModLanguage(x)) }
    /** Enum Value:                                               76 */
    get FarSight()                            { return this.value(76, x=>new FarSight(x)) }
    /** Enum Value:                                               77 */
    get MechanicImmunity()                    { return this.value(77, x=>new MechanicImmunity(x)) }
    /** Enum Value:                                               78 */
    get Mounted()                             { return this.value(78, x=>new Mounted(x)) }
    /** Enum Value:                                               79 */
    get ModDamagePercentDone()                { return this.value(79, x=>new ModDamagePercentDone(x)) }
    /** Enum Value:                                               80 */
    get ModPercentStat()                      { return this.value(80, x=>new ModPercentStat(x)) }
    /** Enum Value:                                               81 */
    get SplitDamagePct()                      { return this.value(81, x=>new SplitDamagePct(x)) }
    /** Enum Value:                                               82 */
    get WaterBreathing()                      { return this.value(82, x=>new WaterBreathing(x)) }
    /** Enum Value:                                               83 */
    get ModBaseResistance()                   { return this.value(83, x=>new ModBaseResistance(x)) }
    /** Enum Value:                                               84 */
    get ModRegen()                            { return this.value(84, x=>new ModRegen(x)) }
    /** Enum Value:                                               85 */
    get ModPowerRegen()                       { return this.value(85, x=>new ModPowerRegen(x)) }
    /** Enum Value:                                               86 */
    get ChannelDeathItem()                    { return this.value(86, x=>new ChannelDeathItem(x)) }
    /** Enum Value:                                               87 */
    get ModDamagePercentTaken()               { return this.value(87, x=>new ModDamagePercentTaken(x)) }
    /** Enum Value:                                               88 */
    get ModHealthRegenPercent()               { return this.value(88, x=>new ModHealthRegenPercent(x)) }
    /** Enum Value:                                               89 */
    get PeriodicDamagePercent()               { return this.value(89, x=>new PeriodicDamagePercent(x)) }
    /** Enum Value:                                               90 */
    get SpellAura90()                         { return this.value(90, x=>x) }
    /** Enum Value:                                               91 */
    get ModDetectRange()                      { return this.value(91, x=>new ModDetectRange(x)) }
    /** Enum Value:                                               92 */
    get PreventsFleeing()                     { return this.value(92, x=>new PreventsFleeing(x)) }
    /** Enum Value:                                               93 */
    get ModUnattackable()                     { return this.value(93, x=>new ModUnattackable(x)) }
    /** Enum Value:                                               94 */
    get InterruptRegen()                      { return this.value(94, x=>new InterruptRegen(x)) }
    /** Enum Value:                                               95 */
    get Ghost()                               { return this.value(95, x=>new Ghost(x)) }
    /** Enum Value:                                               96 */
    get SpellMagnet()                         { return this.value(96, x=>new SpellMagnet(x)) }
    /** Enum Value:                                               97 */
    get ManaShield()                          { return this.value(97, x=>new ManaShield(x)) }
    /** Enum Value:                                               98 */
    get ModSkillTalent()                      { return this.value(98, x=>new ModSkillTalent(x)) }
    /** Enum Value:                                               99 */
    get ModAttackPower()                      { return this.value(99, x=>new ModAttackPower(x)) }
    /** Enum Value:                                               100 */
    get AurasVisible()                        { return this.value(100, x=>new AurasVisible(x)) }
    /** Enum Value:                                               101 */
    get ModResistancePct()                    { return this.value(101, x=>new ModResistancePct(x)) }
    /** Enum Value:                                               102 */
    get ModMeleeAttackPowerVersus()           { return this.value(102, x=>new ModMeleeAttackPowerVersus(x)) }
    /** Enum Value:                                               103 */
    get ModTotalThreat()                      { return this.value(103, x=>new ModTotalThreat(x)) }
    /** Enum Value:                                               104 */
    get WaterWalk()                           { return this.value(104, x=>new WaterWalk(x)) }
    /** Enum Value:                                               105 */
    get FeatherFall()                         { return this.value(105, x=>new FeatherFall(x)) }
    /** Enum Value:                                               106 */
    get Hover()                               { return this.value(106, x=>new Hover(x)) }
    /** Enum Value:                                               107 */
    get AddFlatModifier()                     { return this.value(107, x=>new AddFlatModifier(x)) }
    /** Enum Value:                                               108 */
    get AddPctModifier()                      { return this.value(108, x=>new AddPctModifier(x)) }
    /** Enum Value:                                               109 */
    get AddTargetTrigger()                    { return this.value(109, x=>new AddTargetTrigger(x)) }
    /** Enum Value:                                               110 */
    get ModPowerRegenPercent()                { return this.value(110, x=>new ModPowerRegenPercent(x)) }
    /** Enum Value:                                               111 */
    get AddCasterHitTrigger()                 { return this.value(111, x=>new AddCasterHitTrigger(x)) }
    /** Enum Value:                                               112 */
    get OverrideClassScripts()                { return this.value(112, x=>x) }
    /** Enum Value:                                               113 */
    get ModRangedDamageTaken()                { return this.value(113, x=>new ModRangedDamageTaken(x)) }
    /** Enum Value:                                               114 */
    get ModRangedDamageTakenPct()             { return this.value(114, x=>new ModRangedDamageTakenPct(x)) }
    /** Enum Value:                                               115 */
    get ModHealing()                          { return this.value(115, x=>new ModHealing(x)) }
    /** Enum Value:                                               116 */
    get ModRegenDuringCombat()                { return this.value(116, x=>new ModRegenDuringCombat(x)) }
    /** Enum Value:                                               117 */
    get ModMechanicResistance()               { return this.value(117, x=>new ModMechanicResistance(x)) }
    /** Enum Value:                                               118 */
    get ModHealingPct()                       { return this.value(118, x=>new ModHealingPct(x)) }
    /** Enum Value:                                               119 */
    get SpellAura119()                        { return this.value(119, x=>x) }
    /** Enum Value:                                               120 */
    get Untrackable()                         { return this.value(120, x=>new Untrackable(x)) }
    /** Enum Value:                                               121 */
    get Empathy()                             { return this.value(121, x=>new Empathy(x)) }
    /** Enum Value:                                               122 */
    get ModOffhandDamagePct()                 { return this.value(122, x=>new ModOffhandDamagePct(x)) }
    /** Enum Value:                                               123 */
    get ModTargetResistance()                 { return this.value(123, x=>new ModTargetResistance(x)) }
    /** Enum Value:                                               124 */
    get ModRangedAttackPower()                { return this.value(124, x=>new ModRangedAttackPower(x)) }
    /** Enum Value:                                               125 */
    get ModMeleeDamageTaken()                 { return this.value(125, x=>new ModMeleeDamageTaken(x)) }
    /** Enum Value:                                               126 */
    get ModMeleeDamageTakenPct()              { return this.value(126, x=>new ModMeleeDamageTakenPct(x)) }
    /** Enum Value:                                               127 */
    get RangedAttackPowerAttackerBonus()      { return this.value(127, x=>new RangedAttackPowerAttackerBonus(x)) }
    /** Enum Value:                                               128 */
    get ModPossessPet()                       { return this.value(128, x=>new ModPossessPet(x)) }
    /** Enum Value:                                               129 */
    get ModSpeedAlways()                      { return this.value(129, x=>new ModSpeedAlways(x)) }
    /** Enum Value:                                               130 */
    get ModMountedSpeedAlways()               { return this.value(130, x=>new ModMountedSpeedAlways(x)) }
    /** Enum Value:                                               131 */
    get ModRangedAttackPowerVersus()          { return this.value(131, x=>new ModRangedAttackPowerVersus(x)) }
    /** Enum Value:                                               132 */
    get ModIncreaseEnergyPercent()            { return this.value(132, x=>new ModIncreaseEnergyPercent(x)) }
    /** Enum Value:                                               133 */
    get ModIncreaseHealthPercent()            { return this.value(133, x=>new ModIncreaseHealthPercent(x)) }
    /** Enum Value:                                               134 */
    get ModManaRegenInterrupt()               { return this.value(134, x=>new ModManaRegenInterrupt(x)) }
    /** Enum Value:                                               135 */
    get ModHealingDone()                      { return this.value(135, x=>new ModHealingDone(x)) }
    /** Enum Value:                                               136 */
    get ModHealingDonePercent()               { return this.value(136, x=>new ModHealingDonePercent(x)) }
    /** Enum Value:                                               137 */
    get ModTotalStatPercentage()              { return this.value(137, x=>new ModTotalStatPercentage(x)) }
    /** Enum Value:                                               138 */
    get ModMeleeHaste()                       { return this.value(138, x=>new ModMeleeHaste(x)) }
    /** Enum Value:                                               139 */
    get ForceReaction()                       { return this.value(139, x=>new ForceReaction(x)) }
    /** Enum Value:                                               140 */
    get ModRangedHaste()                      { return this.value(140, x=>new ModRangedHaste(x)) }
    /** Enum Value:                                               141 */
    get ModRangedAmmoHaste()                  { return this.value(141, x=>new ModRangedAmmoHaste(x)) }
    /** Enum Value:                                               142 */
    get ModBaseResistancePct()                { return this.value(142, x=>new ModBaseResistancePct(x)) }
    /** Enum Value:                                               143 */
    get ModResistanceExclusive()              { return this.value(143, x=>new ModResistanceExclusive(x)) }
    /** Enum Value:                                               144 */
    get SafeFall()                            { return this.value(144, x=>new SafeFall(x)) }
    /** Enum Value:                                               145 */
    get ModPetTalentPoints()                  { return this.value(145, x=>new ModPetTalentPoints(x)) }
    /** Enum Value:                                               146 */
    get AllowTamePetType()                    { return this.value(146, x=>new AllowTamePetType(x)) }
    /** Enum Value:                                               147 */
    get MechanicImmunityMask()                { return this.value(147, x=>new MechanicImmunityMask(x)) }
    /** Enum Value:                                               148 */
    get RetainComboPoints()                   { return this.value(148, x=>new RetainComboPoints(x)) }
    /** Enum Value:                                               149 */
    get ReducePushback()                      { return this.value(149, x=>new ReducePushback(x)) }
    /** Enum Value:                                               150 */
    get ModShieldBlockvaluePct()              { return this.value(150, x=>new ModShieldBlockValuePct(x)) }
    /** Enum Value:                                               151 */
    get TrackStealthed()                      { return this.value(151, x=>new TrackStealthed(x)) }
    /** Enum Value:                                               152 */
    get ModDetectedRange()                    { return this.value(152, x=>new ModDetectedRange(x)) }
    /** Enum Value:                                               153 */
    get SplitDamageFlat()                     { return this.value(153, x=>new SplitDamageFlat(x)) }
    /** Enum Value:                                               154 */
    get ModStealthLevel()                     { return this.value(154, x=>new ModStealthLevel(x)) }
    /** Enum Value:                                               155 */
    get ModWaterBreathing()                   { return this.value(155, x=>new ModWaterBreathing(x)) }
    /** Enum Value:                                               156 */
    get ModReputationGain()                   { return this.value(156, x=>new ModReputationGain(x)) }
    /** Enum Value:                                               157 */
    get PetDamageMulti()                      { return this.value(157, x=>new PetDamageMulti(x)) }
    /** Enum Value:                                               158 */
    get ModShieldBlockvalue()                 { return this.value(158, x=>new ModShieldBlockValue(x)) }
    /** Enum Value:                                               159 */
    get NoPvpCredit()                         { return this.value(159, x=>new NoPvPCredit(x)) }
    /** Enum Value:                                               160 */
    get ModAoeAvoidance()                     { return this.value(160, x=>new ModAoEAvoidance(x)) }
    /** Enum Value:                                               161 */
    get ModHealthRegenInCombat()              { return this.value(161, x=>x) }
    /** Enum Value:                                               162 */
    get PowerBurn()                           { return this.value(162, x=>new PowerBurn(x)) }
    /** Enum Value:                                               163 */
    get ModCritDamageBonus()                  { return this.value(163, x=>new ModCritDamageBonus(x)) }
    /** Enum Value:                                               164 */
    get SpellAura164()                        { return this.value(164, x=>x) }
    /** Enum Value:                                               165 */
    get MeleeAttackPowerAttackerBonus()       { return this.value(165, x=>new MeleeAttackPowerAttackerBonus(x)) }
    /** Enum Value:                                               166 */
    get ModAttackPowerPct()                   { return this.value(166, x=>new ModAttackPowerPct(x)) }
    /** Enum Value:                                               167 */
    get ModRangedAttackPowerPct()             { return this.value(167, x=>new ModRangedAttackPowerPct(x)) }
    /** Enum Value:                                               168 */
    get ModDamageDoneVersus()                 { return this.value(168, x=>new ModDamageDoneVersus(x)) }
    /** Enum Value:                                               169 */
    get ModCritPercentVersus()                { return this.value(169, x=>new ModCritPercentVersus(x)) }
    /** Enum Value:                                               170 */
    get DetectAmore()                         { return this.value(170, x=>new DetectAmore(x)) }
    /** Enum Value:                                               171 */
    get ModSpeedNotStack()                    { return this.value(171, x=>new ModSpeedNotStack(x)) }
    /** Enum Value:                                               172 */
    get ModMountedSpeedNotStack()             { return this.value(172, x=>new ModMountedSpeedNotStack(x)) }
    /** Enum Value:                                               173 */
    get SpellAura173()                        { return this.value(173, x=>x) }
    /** Enum Value:                                               174 */
    get ModSpellDamageOfStatPercent()         { return this.value(174, x=>new ModSpellDamageOfStatPercent(x)) }
    /** Enum Value:                                               175 */
    get ModSpellHealingOfStatPercent()        { return this.value(175, x=>new ModSpellHealingOfStatPercent(x)) }
    /** Enum Value:                                               176 */
    get SpiritOfRedemption()                  { return this.value(176, x=>new SpiritOfRedemption(x)) }
    /** Enum Value:                                               177 */
    get AoeCharm()                            { return this.value(177, x=>new AoECharm(x)) }
    /** Enum Value:                                               178 */
    get ModDebuffResistance()                 { return this.value(178, x=>new ModDebuffResistance(x)) }
    /** Enum Value:                                               179 */
    get ModAttackerSpellCritChance()          { return this.value(179, x=>new ModAttackerSpellCritChance(x)) }
    /** Enum Value:                                               180 */
    get ModFlatSpellDamageVersus()            { return this.value(180, x=>new ModFlatSpellDamageVersus(x)) }
    /** Enum Value:                                               181 */
    get SpellAura181()                        { return this.value(181, x=>x) }
    /** Enum Value:                                               182 */
    get ModResistanceOfStatPercent()          { return this.value(182, x=>new ModResistanceOfStatPercent(x)) }
    /** Enum Value:                                               183 */
    get ModCriticalThreat()                   { return this.value(183, x=>new ModCriticalThreat(x)) }
    /** Enum Value:                                               184 */
    get ModAttackerMeleeHitChance()           { return this.value(184, x=>new ModAttackerMeleeHitChance(x)) }
    /** Enum Value:                                               185 */
    get ModAttackerRangedHitChance()          { return this.value(185, x=>new ModAttackerRangedHitChance(x)) }
    /** Enum Value:                                               186 */
    get ModAttackerSpellHitChance()           { return this.value(186, x=>new ModAttackerSpellHitChance(x)) }
    /** Enum Value:                                               187 */
    get ModAttackerMeleeCritChance()          { return this.value(187, x=>new ModAttackerMeleeCritChance(x)) }
    /** Enum Value:                                               188 */
    get ModAttackerRangedCritChance()         { return this.value(188, x=>new ModAttackerRangedCritChance(x)) }
    /** Enum Value:                                               189 */
    get ModRating()                           { return this.value(189, x=>new ModRating(x)) }
    /** Enum Value:                                               190 */
    get ModFactionReputationGain()            { return this.value(190, x=>new ModFactionReputationGain(x)) }
    /** Enum Value:                                               191 */
    get UseNormalMovementSpeed()              { return this.value(191, x=>new UseNormalMovementSpeed(x)) }
    /** Enum Value:                                               192 */
    get ModMeleeRangedHaste()                 { return this.value(192, x=>new ModMeleeRangedHaste(x)) }
    /** Enum Value:                                               193 */
    get MeleeSlow()                           { return this.value(193, x=>new MeleeSlow(x)) }
    /** Enum Value:                                               194 */
    get ModTargetAbsorbSchool()               { return this.value(194, x=>new ModTargetAbsorbSchool(x)) }
    /** Enum Value:                                               195 */
    get ModTargetAbilityAbsorbSchool()        { return this.value(195, x=>new ModTargetAbilityAbsorbSchool(x)) }
    /** Enum Value:                                               196 */
    get ModCooldown()                         { return this.value(196, x=>new ModCooldown(x)) }
    /** Enum Value:                                               197 */
    get ModAttackerSpellAndWeaponCritChance() { return this.value(197, x=>new ModAttackerSpellAndWeaponCritChance(x)) }
    /** Enum Value:                                               198 */
    get SpellAura198()                        { return this.value(198, x=>x) }
    /** Enum Value:                                               199 */
    get ModIncreasesSpellPctToHit()           { return this.value(199, x=>new ModIncreasesSpellPctToHit(x)) }
    /** Enum Value:                                               200 */
    get ModXpPct()                            { return this.value(200, x=>new ModXpPct(x)) }
    /** Enum Value:                                               201 */
    get Fly()                                 { return this.value(201, x=>new Fly(x)) }
    /** Enum Value:                                               202 */
    get CannotBeDodged()                      { return this.value(202, x=>new CannotBeDodged(x)) }
    /** Enum Value:                                               203 */
    get ModAttackerMeleeCritDamage()          { return this.value(203, x=>new ModAttackerMeleeCritDamage(x)) }
    /** Enum Value:                                               204 */
    get ModAttackerRangedCritDamage()         { return this.value(204, x=>new ModAttackerRangedCritDamage(x)) }
    /** Enum Value:                                               205 */
    get ModSchoolCritDmgTaken()               { return this.value(205, x=>new ModSchoolCritDmgTaken(x)) }
    /** Enum Value:                                               206 */
    get ModIncreaseVehicleFlightSpeed()       { return this.value(206, x=>new ModIncreaseVehicleFlightSpeed(x)) }
    /** Enum Value:                                               207 */
    get ModIncreaseMountedFlightSpeed()       { return this.value(207, x=>new ModIncreaseMountedFlightSpeed(x)) }
    /** Enum Value:                                               208 */
    get ModIncreaseFlightSpeed()              { return this.value(208, x=>new ModIncreaseFlightSpeed(x)) }
    /** Enum Value:                                               209 */
    get ModMountedFlightSpeedAlways()         { return this.value(209, x=>new ModMountedFlightSpeedAlways(x)) }
    /** Enum Value:                                               210 */
    get ModVehicleSpeedAlways()               { return this.value(210, x=>new ModVehicleSpeedAlways(x)) }
    /** Enum Value:                                               211 */
    get ModFlightSpeedNotStack()              { return this.value(211, x=>new ModFlightSpeedNotStack(x)) }
    /** Enum Value:                                               212 */
    get ModRangedAttackPowerOfStatPercent()   { return this.value(212, x=>new ModRangedAttackPowerOfStatPercent(x)) }
    /** Enum Value:                                               213 */
    get ModRageFromDamageDealt()              { return this.value(213, x=>new ModRageFromDamageDealt(x)) }
    /** Enum Value:                                               214 */
    get Tamed()                               { return this.value(214, x=>new Tamed(x)) }
    /** Enum Value:                                               215 */
    get ArenaPreparation()                    { return this.value(215, x=>new ArenaPreparation(x)) }
    /** Enum Value:                                               216 */
    get HasteSpells()                         { return this.value(216, x=>new HasteSpells(x)) }
    /** Enum Value:                                               217 */
    get SpellAura217()                        { return this.value(217, x=>x) }
    /** Enum Value:                                               218 */
    get HasteRanged()                         { return this.value(218, x=>new HasteRanged(x)) }
    /** Enum Value:                                               219 */
    get ModManaRegenFromStat()                { return this.value(219, x=>new ModManaRegenFromStat(x)) }
    /** Enum Value:                                               220 */
    get ModRatingFromStat()                   { return this.value(220, x=>new ModRatingFromStat(x)) }
    /** Enum Value:                                               221 */
    get ModDetaunt()                          { return this.value(221, x=>new ModDetaunt(x)) }
    /** Enum Value:                                               222 */
    get SpellAura222()                        { return this.value(222, x=>x) }
    /** Enum Value:                                               223 */
    get RaidProcFromCharge()                  { return this.value(223, x=>new RaidProcFromCharge(x)) }
    /** Enum Value:                                               224 */
    get SpellAura224()                        { return this.value(224, x=>x) }
    /** Enum Value:                                               225 */
    get RaidProcFromChargeWithValue()         { return this.value(225, x=>new RaidProcFromChargeWithValue(x)) }
    /** Enum Value:                                               226 */
    get PeriodicDummy()                       { return this.value(226, x=>x) }
    /** Enum Value:                                               227 */
    get PeriodicTriggerSpellWithValue()       { return this.value(227, x=>x) }
    /** Enum Value:                                               228 */
    get DetectStealth()                       { return this.value(228, x=>new DetectStealth(x)) }
    /** Enum Value:                                               229 */
    get ModAoeDamageAvoidance()               { return this.value(229, x=>new ModAoEDamageAvoidance(x)) }
    /** Enum Value:                                               230 */
    get ModIncreaseHealth2()                  { return this.value(230, x=>new ModIncreaseHealth2(x)) }
    /** Enum Value:                                               231 */
    get ProcTriggerSpellWithValue()           { return this.value(231, x=>x) }
    /** Enum Value:                                               232 */
    get MechanicDurationMod()                 { return this.value(232, x=>new MechanicDurationMod(x)) }
    /** Enum Value:                                               233 */
    get SpellAura233()                        { return this.value(233, x=>x) }
    /** Enum Value:                                               234 */
    get MechanicDurationModNotStack()         { return this.value(234, x=>new MechanicDurationModNotStack(x)) }
    /** Enum Value:                                               235 */
    get ModDispelResist()                     { return this.value(235, x=>new ModDispelResist(x)) }
    /** Enum Value:                                               236 */
    get ControlVehicle()                      { return this.value(236, x=>new ControlVehicle(x)) }
    /** Enum Value:                                               237 */
    get ModSpellDamageOfAttackPower()         { return this.value(237, x=>new ModSpellDamageOfAttackPower(x)) }
    /** Enum Value:                                               238 */
    get ModSpellHealingOfAttackPower()        { return this.value(238, x=>new ModSpellHealingOfAttackPower(x)) }
    /** Enum Value:                                               239 */
    get ModScale2()                           { return this.value(239, x=>new ModScale2(x)) }
    /** Enum Value:                                               240 */
    get ModExpertise()                        { return this.value(240, x=>new ModExpertise(x)) }
    /** Enum Value:                                               241 */
    get ForceMoveForward()                    { return this.value(241, x=>new ForceMoveForward(x)) }
    /** Enum Value:                                               242 */
    get ModSpellDamageFromHealing()           { return this.value(242, x=>new ModSpellDamageFromHealing(x)) }
    /** Enum Value:                                               243 */
    get ModFaction()                          { return this.value(243, x=>new ModFaction(x)) }
    /** Enum Value:                                               244 */
    get ComprehendLanguage()                  { return this.value(244, x=>new ComprehendLanguage(x)) }
    /** Enum Value:                                               245 */
    get ModAuraDurationByDispel()             { return this.value(245, x=>new ModAuraDurationByDispel(x)) }
    /** Enum Value:                                               246 */
    get ModAuraDurationByDispelNotStack()     { return this.value(246, x=>new ModAuraDurationByDispelNotStack(x)) }
    /** Enum Value:                                               247 */
    get CloneCaster()                         { return this.value(247, x=>new CloneCaster(x)) }
    /** Enum Value:                                               248 */
    get ModCombatResultChance()               { return this.value(248, x=>new ModCombatResultChance(x)) }
    /** Enum Value:                                               249 */
    get ConvertRune()                         { return this.value(249, x=>new ConvertRune(x)) }
    /** Enum Value:                                               250 */
    get ModIncreaseHealth3()                  { return this.value(250, x=>new ModIncreaseHealth3(x)) }
    /** Enum Value:                                               251 */
    get ModEnemyDodge()                       { return this.value(251, x=>new ModEnemyDodge(x)) }
    /** Enum Value:                                               252 */
    get SpellAura252()                        { return this.value(252, x=>x) }
    /** Enum Value:                                               253 */
    get ModBlockCritChance()                  { return this.value(253, x=>new ModBlockCritChance(x)) }
    /** Enum Value:                                               254 */
    get ModDisarmOffhand()                    { return this.value(254, x=>new ModDisarmOffhand(x)) }
    /** Enum Value:                                               255 */
    get ModMechanicDamageTakenPercent()       { return this.value(255, x=>new ModMechanicDamageTakenPercent(x)) }
    /** Enum Value:                                               256 */
    get NoReagentUse()                        { return this.value(256, x=>new NoReagentUse(x)) }
    /** Enum Value:                                               257 */
    get ModTargetResistBySpellClass()         { return this.value(257, x=>new ModTargetResistBySpellClass(x)) }
    /** Enum Value:                                               258 */
    get ModSpellVisual()                      { return this.value(258, x=>x) }
    /** Enum Value:                                               259 */
    get ModHotPct()                           { return this.value(259, x=>new ModHotPct(x)) }
    /** Enum Value:                                               260 */
    get ScreenEffect()                        { return this.value(260, x=>new ScreenEffect(x)) }
    /** Enum Value:                                               261 */
    get Phase()                               { return this.value(261, x=>new Phase(x)) }
    /** Enum Value:                                               262 */
    get AbilityIgnoreAurastate()              { return this.value(262, x=>x) }
    /** Enum Value:                                               263 */
    get AllowOnlyAbility()                    { return this.value(263, x=>new AllowOnlyAbility(x)) }
    /** Enum Value:                                               264 */
    get SpellAura264()                        { return this.value(264, x=>x) }
    /** Enum Value:                                               265 */
    get SpellAura265()                        { return this.value(265, x=>x) }
    /** Enum Value:                                               266 */
    get SpellAura266()                        { return this.value(266, x=>x) }
    /** Enum Value:                                               267 */
    get ModImmuneAuraApplySchool()            { return this.value(267, x=>new ModImmuneAuraApplySchool(x)) }
    /** Enum Value:                                               268 */
    get ModAttackPowerOfStatPercent()         { return this.value(268, x=>new ModAttackPowerOfStatPercent(x)) }
    /** Enum Value:                                               269 */
    get ModIgnoreTargetResist()               { return this.value(269, x=>new ModIgnoreTargetResist(x)) }
    /** Enum Value:                                               270 */
    get ModAbilityIgnoreTargetResist()        { return this.value(270, x=>x) }
    /** Enum Value:                                               271 */
    get ModDamageFromCaster()                 { return this.value(271, x=>new ModDamageFromCaster(x)) }
    /** Enum Value:                                               272 */
    get IgnoreMeleeReset()                    { return this.value(272, x=>new IgnoreMeleeReset(x)) }
    /** Enum Value:                                               273 */
    get SpellAura273()                        { return this.value(273, x=>x) }
    /** Enum Value:                                               274 */
    get ConsumeNoAmmo()                       { return this.value(274, x=>new ConsumeNoAmmo(x)) }
    /** Enum Value:                                               275 */
    get ModIgnoreShapeshift()                 { return this.value(275, x=>new ModIgnoreShapeshift(x)) }
    /** Enum Value:                                               276 */
    get SpellAura276()                        { return this.value(276, x=>x) }
    /** Enum Value:                                               277 */
    get ModAbilityAffectedTargets()           { return this.value(277, x=>new ModAbilityAffectedTargets(x)) }
    /** Enum Value:                                               278 */
    get ModDisarmRanged()                     { return this.value(278, x=>new ModDisarmRanged(x)) }
    /** Enum Value:                                               279 */
    get InitializeImages()                    { return this.value(279, x=>new InitializeImages(x)) }
    /** Enum Value:                                               280 */
    get ModTargetArmorPct()                   { return this.value(280, x=>new ModTargetArmorPct(x)) }
    /** Enum Value:                                               281 */
    get ModHonorGainPct()                     { return this.value(281, x=>new ModHonorGainPct(x)) }
    /** Enum Value:                                               282 */
    get IncreaseBaseHealthPercent()           { return this.value(282, x=>new IncreaseBaseHealthPercent(x)) }
    /** Enum Value:                                               283 */
    get ModHealingReceived()                  { return this.value(283, x=>new ModHealingReceived(x)) }
    /** Enum Value:                                               284 */
    get Linked()                              { return this.value(284, x=>x) }
    /** Enum Value:                                               285 */
    get ModAttackPowerOfArmor()               { return this.value(285, x=>new ModAttackPowerOfArmor(x)) }
    /** Enum Value:                                               286 */
    get AbilityPeriodicCrit()                 { return this.value(286, x=>x) }
    /** Enum Value:                                               287 */
    get DeflectSpells()                       { return this.value(287, x=>new DeflectSpells(x)) }
    /** Enum Value:                                               288 */
    get IgnoreHitDirection()                  { return this.value(288, x=>new IgnoreHitDirection(x)) }
    /** Enum Value:                                               289 */
    get SpellAura289()                        { return this.value(289, x=>x) }
    /** Enum Value:                                               290 */
    get ModCritPct()                          { return this.value(290, x=>new ModCritPct(x)) }
    /** Enum Value:                                               291 */
    get ModXpQuestPct()                       { return this.value(291, x=>new ModXpQuestPct(x)) }
    /** Enum Value:                                               292 */
    get OpenStable()                          { return this.value(292, x=>x) }
    /** Enum Value:                                               293 */
    get SpellAura293()                        { return this.value(293, x=>x) }
    /** Enum Value:                                               294 */
    get PreventRegeneratePower()              { return this.value(294, x=>new PreventRegeneratePower(x)) }
    /** Enum Value:                                               295 */
    get SpellAura295()                        { return this.value(295, x=>x) }
    /** Enum Value:                                               296 */
    get SetVehicleId()                        { return this.value(296, x=>new SetVehicleId(x)) }
    /** Enum Value:                                               297 */
    get SpellAura297()                        { return this.value(297, x=>x) }
    /** Enum Value:                                               298 */
    get SpellAura298()                        { return this.value(298, x=>x) }
    /** Enum Value:                                               299 */
    get SpellAura299()                        { return this.value(299, x=>x) }
    /** Enum Value:                                               300 */
    get ShareDamagePct()                      { return this.value(300, x=>new ShareDamagePct(x)) }
    /** Enum Value:                                               301 */
    get SchoolHealAbsorb()                    { return this.value(301, x=>new SchoolHealAbsorb(x)) }
    /** Enum Value:                                               302 */
    get SpellAura302()                        { return this.value(302, x=>x) }
    /** Enum Value:                                               303 */
    get ModDamageDoneVersusAurastate()        { return this.value(303, x=>x) }
    /** Enum Value:                                               304 */
    get ModDrunk()                            { return this.value(304, x=>x) }
    /** Enum Value:                                               305 */
    get ModMinimumSpeed()                     { return this.value(305, x=>new ModMinimumSpeed(x)) }
    /** Enum Value:                                               306 */
    get SpellAura306()                        { return this.value(306, x=>x) }
    /** Enum Value:                                               307 */
    get SpellAura307()                        { return this.value(307, x=>x) }
    /** Enum Value:                                               308 */
    get SpellAura308()                        { return this.value(308, x=>x) }
    /** Enum Value:                                               309 */
    get SpellAura309()                        { return this.value(309, x=>x) }
    /** Enum Value:                                               310 */
    get ModCreatureAoeDamageAvoidance()       { return this.value(310, x=>new ModCreatureAoEDamageAvoidance(x)) }
    /** Enum Value:                                               311 */
    get SpellAura311()                        { return this.value(311, x=>x) }
    /** Enum Value:                                               312 */
    get SpellAura312()                        { return this.value(312, x=>x) }
    /** Enum Value:                                               313 */
    get SpellAura313()                        { return this.value(313, x=>x) }
    /** Enum Value:                                               314 */
    get PreventResurrection()                 { return this.value(314, x=>new PreventResurrection(x)) }
    /** Enum Value:                                               315 */
    get UnderwaterWalking()                   { return this.value(315, x=>new UnderwaterWalking(x)) }
    /** Enum Value:                                               316 */
    get PeriodicHaste()                       { return this.value(316, x=>x) }
}
