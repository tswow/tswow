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
import { PeriodicDamage, BindSight, ModPossess, ModConfuse, ModCharm, ModFear, PeriodicHeal, ModAttackSpeed, ModThreat, ModTaunt, ModStun, ModDamageDone, ModDamageTaken, DamageShield, ModStealth, ModDetect, ModInvisibility, ModInvisibilityDetection, ObsModHealth, ObsModPower, ModResistance, PeriodicEnergize, ModPacify, ModRoot, ModSilence, ReflectSpells, ModStat, ModSkill, ModIncreaseSpeed, ModIncreaseMountSpeed, ModDecreaseSpeed, ModIncreaseHealth, ModIncreaseEnergy, ModShapeshift, EffectImmunity, StateImmunity, SchoolImmunity, DamageImmunity, DispelImmunity, ProcTriggerSpell, ProcTriggerDamage, TrackCreatures, TrackResources, ModParryPercent, ModDodgePercent, ModCriticalHealAmount, ModBlockPercent, ModWeaponCritPercent, PeriodicLeech, ModHitChance, ModSpellHitChance, Transform, ModSpellCritChance, ModIncreaseSwimSpeed, ModDamageDoneCreature, ModPacifySilence, ModScale, PeriodicHealthFunnel, PeriodicManaLeech, ModCastingSpeedNotStack, FeignDeath, ModDisarm, ModStalked, SchoolAbsorb, ModSpellCritChanceSchool, ModPowerCostSchoolPct, ModPowerCostSchool, ReflectSpellsSchool, ModLanguage, FarSight, MechanicImmunity, Mounted, ModDamagePercentDone, ModPercentStat, SplitDamagePct, WaterBreathing, ModBaseResistance, ModRegen, ModPowerRegen, ChannelDeathItem, ModDamagePercentTaken, ModHealthRegenPercent, PeriodicDamagePercent, ModDetectRange, PreventsFleeing, ModUnattackable, InterruptRegen, Ghost, SpellMagnet, ManaShield, ModSkillTalent, ModAttackPower, AurasVisible, ModResistancePct, ModMeleeAttackPowerVersus, ModTotalThreat, WaterWalk, FeatherFall, Hover, AddFlatModifier, AddPctModifier, AddTargetTrigger, ModPowerRegenPercent, AddCasterHitTrigger, ModRangedDamageTaken, ModRangedDamageTakenPct, ModHealing, ModRegenDuringCombat, ModMechanicResistance, ModHealingPct, Untrackable, Empathy, ModOffhandDamagePct, ModTargetResistance, ModRangedAttackPower, ModMeleeDamageTaken, ModMeleeDamageTakenPct, RangedAttackPowerAttackerBonus, ModPossessPet, ModSpeedAlways, ModMountedSpeedAlways, ModRangedAttackPowerVersus, ModIncreaseEnergyPercent, ModIncreaseHealthPercent, ModManaRegenInterrupt, ModHealingDone, ModHealingDonePercent, ModTotalStatPercentage, ModMeleeHaste, ForceReaction, ModRangedHaste, ModRangedAmmoHaste, ModBaseResistancePct, ModResistanceExclusive, SafeFall, ModPetTalentPoints, AllowTamePetType, MechanicImmunityMask, RetainComboPoints, ReducePushback, ModShieldBlockValuePct, TrackStealthed, ModDetectedRange, SplitDamageFlat, ModStealthLevel, ModWaterBreathing, ModReputationGain, PetDamageMulti, ModShieldBlockValue, NoPvPCredit, ModAoEAvoidance, PowerBurn, ModCritDamageBonus, MeleeAttackPowerAttackerBonus, ModAttackPowerPct, ModRangedAttackPowerPct, ModDamageDoneVersus, ModCritPercentVersus, DetectAmore, ModSpeedNotStack, ModMountedSpeedNotStack, ModSpellDamageOfStatPercent, ModSpellHealingOfStatPercent, SpiritOfRedemption, AoECharm, ModDebuffResistance, ModAttackerSpellCritChance, ModFlatSpellDamageVersus, ModResistanceOfStatPercent, ModCriticalThreat, ModAttackerMeleeHitChance, ModAttackerRangedHitChance, ModAttackerSpellHitChance, ModAttackerMeleeCritChance, ModAttackerRangedCritChance, ModRating, ModFactionReputationGain, UseNormalMovementSpeed, ModMeleeRangedHaste, MeleeSlow, ModTargetAbsorbSchool, ModTargetAbilityAbsorbSchool, ModCooldown, ModAttackerSpellAndWeaponCritChance, ModIncreasesSpellPctToHit, ModXpPct, Fly, CannotBeDodged, ModAttackerMeleeCritDamage, ModAttackerRangedCritDamage, ModSchoolCritDmgTaken, ModIncreaseVehicleFlightSpeed, ModIncreaseMountedFlightSpeed, ModIncreaseFlightSpeed, ModMountedFlightSpeedAlways, ModVehicleSpeedAlways, ModFlightSpeedNotStack, ModRangedAttackPowerOfStatPercent, ModRageFromDamageDealt, Tamed, ArenaPreparation, HasteSpells, HasteRanged, ModManaRegenFromStat, ModRatingFromStat, ModDetaunt, RaidProcFromCharge, RaidProcFromChargeWithValue, DetectStealth, ModAoEDamageAvoidance, ModIncreaseHealth2, MechanicDurationMod, MechanicDurationModNotStack, ModDispelResist, ControlVehicle, ModSpellDamageOfAttackPower, ModSpellHealingOfAttackPower, ModScale2, ModExpertise, ForceMoveForward, ModSpellDamageFromHealing, ModFaction, ComprehendLanguage, ModAuraDurationByDispel, ModAuraDurationByDispelNotStack, CloneCaster, ModCombatResultChance, ConvertRune, ModIncreaseHealth3, ModEnemyDodge, ModBlockCritChance, ModDisarmOffhand, ModMechanicDamageTakenPercent, NoReagentUse, ModTargetResistBySpellClass, ModHotPct, ScreenEffect, Phase, AllowOnlyAbility, ModImmuneAuraApplySchool, ModAttackPowerOfStatPercent, ModIgnoreTargetResist, ModDamageFromCaster, IgnoreMeleeReset, ConsumeNoAmmo, ModIgnoreShapeshift, ModAbilityAffectedTargets, ModDisarmRanged, InitializeImages, ModTargetArmorPct, ModHonorGainPct, IncreaseBaseHealthPercent, ModHealingReceived, ModAttackPowerOfArmor, DeflectSpells, IgnoreHitDirection, ModCritPct, ModXpQuestPct, PreventRegeneratePower, SetVehicleId, ShareDamagePct, SchoolHealAbsorb, ModMinimumSpeed, ModCreatureAoEDamageAvoidance, PreventResurrection, UnderwaterWalking } from "./EffectTemplates/AuraTemplates";
import { ExtraAttacks } from "./EffectTemplates/EffectTemplates";

export class AuraType<T> extends Enum<SpellEffect<T>> {
    constructor(owner: SpellEffect<T>, effectIndex: number) {
        super(owner, Cell.wrapIndex(owner.row.EffectAura,effectIndex));
    }

    /** */
    @EnumField(0)
    setNone() { return this.set(0);  };
    /** */
    @EnumField(1)
    setBindSight(): BindSight<T> { return new BindSight(this.end.end, this.set(1));  };
    /** */
    @EnumField(2)
    setModPossess() { return new ModPossess(this.end.end, this.set(2));  };
    /** */
    @EnumField(3)
    setPeriodicDamage() { return new PeriodicDamage(this.end.end, this.set(3));  };
    /** */
    @EnumField(4)
    setDummy() { return this.set(4);  };
    /** */
    @EnumField(5)
    setModConfuse() { return new ModConfuse(this.end.end, this.set(5));  };
    /** */
    @EnumField(6)
    setModCharm() { return new ModCharm(this.end.end, this.set(6));  };
    /** */
    @EnumField(7)
    setModFear() { return new ModFear(this.end.end, this.set(7));  };
    /** */
    @EnumField(8)
    setPeriodicHeal() { return new PeriodicHeal(this.end.end, this.set(8));  };
    /** */
    @EnumField(9)
    setModAttackspeed() { return new ModAttackSpeed(this.end.end, this.set(9));  };
    /** */
    @EnumField(10)
    setModThreat() { return new ModThreat(this.end.end, this.set(10));  };
    /** */
    @EnumField(11)
    setModTaunt() { return new ModTaunt(this.end.end, this.set(11));  };
    /** */
    @EnumField(12)
    setModStun() { return new ModStun(this.end.end, this.set(12));  };
    /** */
    @EnumField(13)
    setModDamageDone() { return new ModDamageDone(this.end.end, this.set(13));  };
    /** */
    @EnumField(14)
    setModDamageTaken() { return new ModDamageTaken(this.end.end, this.set(14));  };
    /** */
    @EnumField(15)
    setDamageShield() { return new DamageShield(this.end.end, this.set(15));  };
    /** */
    @EnumField(16)
    setModStealth() { return new ModStealth(this.end.end, this.set(16));  };
    /** */
    @EnumField(17)
    setModDetect() { return new ModDetect(this.end.end, this.set(17));  };
    /** */
    @EnumField(18)
    setModInvisibility() { return new ModInvisibility(this.end.end, this.set(18));  };
    /** */
    @EnumField(19)
    setModInvisibilityDetection() { return new ModInvisibilityDetection(this.end.end, this.set(19));  };
    /** */
    @EnumField(20)
    setObsModHealth() { return new ObsModHealth(this.end.end, this.set(20));  };
    /** */
    @EnumField(21)
    setObsModPower() { return new ObsModPower(this.end.end, this.set(21));  };
    /** */
    @EnumField(22)
    setModResistance() { return new ModResistance(this.end.end, this.set(22));  };
    /** */
    @EnumField(23)
    setPeriodicTriggerSpell() { return this.set(23);  };
    /** */
    @EnumField(24)
    setPeriodicEnergize() { return new PeriodicEnergize(this.end.end, this.set(24));  };
    /** */
    @EnumField(25)
    setModPacify() { return new ModPacify(this.end.end, this.set(25));  };
    /** */
    @EnumField(26)
    setModRoot() { return new ModRoot(this.end.end, this.set(26));  };
    /** */
    @EnumField(27)
    setModSilence() { return new ModSilence(this.end.end, this.set(27));  };
    /** */
    @EnumField(28)
    setReflectSpells() { return new ReflectSpells(this.end.end, this.set(28));  };
    /** */
    @EnumField(29)
    setModStat() { return new ModStat(this.end.end, this.set(29));  };
    /** */
    @EnumField(30)
    setModSkill() { return new ModSkill(this.end.end, this.set(30));  };
    /** */
    @EnumField(31)
    setModIncreaseSpeed() { return new ModIncreaseSpeed(this.end.end, this.set(31));  };
    /** */
    @EnumField(32)
    setModIncreaseMountedSpeed() { return new ModIncreaseMountSpeed(this.end.end, this.set(32));  };
    /** */
    @EnumField(33)
    setModDecreaseSpeed() { return new ModDecreaseSpeed(this.end.end, this.set(33));  };
    /** */
    @EnumField(34)
    setModIncreaseHealth() { return new ModIncreaseHealth(this.end.end, this.set(34));  };
    /** */
    @EnumField(35)
    setModIncreaseEnergy() { return new ModIncreaseEnergy(this.end.end, this.set(35));  };
    /** */
    @EnumField(36)
    setModShapeshift() { return new ModShapeshift(this.end.end, this.set(36));  };
    /** */
    @EnumField(37)
    setEffectImmunity() { return new EffectImmunity(this.end.end, this.set(37));  };
    /** */
    @EnumField(38)
    setStateImmunity() { return new StateImmunity(this.end.end, this.set(38));  };
    /** */
    @EnumField(39)
    setSchoolImmunity() { return new SchoolImmunity(this.end.end, this.set(39));  };
    /** */
    @EnumField(40)
    setDamageImmunity() { return new DamageImmunity(this.end.end, this.set(40));  };
    /** */
    @EnumField(41)
    setDispelImmunity() { return new DispelImmunity(this.end.end, this.set(41));  };
    /** */
    @EnumField(42)
    setProcTriggerSpell() { return new ProcTriggerSpell(this.end.end, this.set(42));  };
    /** */
    @EnumField(43)
    setProcTriggerDamage() { return new ProcTriggerDamage(this.end.end, this.set(43));  };
    /** */
    @EnumField(44)
    setTrackCreatures() { return new TrackCreatures(this.end.end, this.set(44));  };
    /** */
    @EnumField(45)
    setTrackResources() { return new TrackResources(this.end.end, this.set(45));  };
    /** */
    @EnumField(46)
    setSpellAura46() { return this.set(46);  };
    /** */
    @EnumField(47)
    setModParryPercent() { return new ModParryPercent(this.end.end, this.set(47));  };
    /** */
    @EnumField(48)
    setSpellAura48() { return this.set(48);  };
    /** */
    @EnumField(49)
    setModDodgePercent() { return new ModDodgePercent(this.end.end, this.set(49));  };
    /** */
    @EnumField(50)
    setModCriticalHealingAmount() { return new ModCriticalHealAmount(this.end.end, this.set(50));  };
    /** */
    @EnumField(51)
    setModBlockPercent() { return new ModBlockPercent(this.end.end, this.set(51));  };
    /** */
    @EnumField(52)
    setModWeaponCritPercent() { return new ModWeaponCritPercent(this.end.end, this.set(52));  };
    /** */
    @EnumField(53)
    setPeriodicLeech() { return new PeriodicLeech(this.end.end, this.set(53));  };
    /** */
    @EnumField(54)
    setModHitChance() { return new ModHitChance(this.end.end, this.set(54));  };
    /** */
    @EnumField(55)
    setModSpellHitChance() { return new ModSpellHitChance(this.end.end, this.set(55));  };
    /** */
    @EnumField(56)
    setTransform() { return new Transform(this.end.end, this.set(56));  };
    /** */
    @EnumField(57)
    setModSpellCritChance() { return new ModSpellCritChance(this.end.end, this.set(57));  };
    /** */
    @EnumField(58)
    setModIncreaseSwimSpeed() { return new ModIncreaseSwimSpeed(this.end.end, this.set(58));  };
    /** */
    @EnumField(59)
    setModDamageDoneCreature() { return new ModDamageDoneCreature(this.end.end, this.set(59));  };
    /** */
    @EnumField(60)
    setModPacifySilence() { return new ModPacifySilence(this.end.end, this.set(60));  };
    /** */
    @EnumField(61)
    setModScale() { return new ModScale(this.end.end, this.set(61));  };
    /** */
    @EnumField(62)
    setPeriodicHealthFunnel() { return new PeriodicHealthFunnel(this.end.end, this.set(62));  };
    /** */
    @EnumField(63)
    setSpellAura63() { return this.set(63);  };
    /** */
    @EnumField(64)
    setPeriodicManaLeech() { return new PeriodicManaLeech(this.end.end, this.set(64));  };
    /** */
    @EnumField(65)
    setModCastingSpeedNotStack() { return new ModCastingSpeedNotStack(this.end.end, this.set(65));  };
    /** */
    @EnumField(66)
    setFeignDeath() { return new FeignDeath(this.end.end, this.set(66));  };
    /** */
    @EnumField(67)
    setModDisarm() { return new ModDisarm(this.end.end, this.set(67));  };
    /** */
    @EnumField(68)
    setModStalked() { return new ModStalked(this.end.end, this.set(68));  };
    /** */
    @EnumField(69)
    setSchoolAbsorb() { return new SchoolAbsorb(this.end.end, this.set(69));  };
    /** */
    @EnumField(70)
    setExtraAttacks() { return this.set(70);  };
    /** */
    @EnumField(71)
    setModSpellCritChanceSchool() { return new ModSpellCritChanceSchool(this.end.end, this.set(71));  };
    /** */
    @EnumField(72)
    setModPowerCostSchoolPct() { return new ModPowerCostSchoolPct(this.end.end, this.set(72));  };
    /** */
    @EnumField(73)
    setModPowerCostSchool() { return new ModPowerCostSchool(this.end.end, this.set(73));  };
    /** */
    @EnumField(74)
    setReflectSpellsSchool() { return new ReflectSpellsSchool(this.end.end, this.set(74));  };
    /** */
    @EnumField(75)
    setModLanguage() { return new ModLanguage(this.end.end, this.set(75));  };
    /** */
    @EnumField(76)
    setFarSight() { return new FarSight(this.end.end, this.set(76));  };
    /** */
    @EnumField(77)
    setMechanicImmunity() { return new MechanicImmunity(this.end.end, this.set(77));  };
    /** */
    @EnumField(78)
    setMounted() { return new Mounted(this.end.end, this.set(78));  };
    /** */
    @EnumField(79)
    setModDamagePercentDone() { return new ModDamagePercentDone(this.end.end, this.set(79));  };
    /** */
    @EnumField(80)
    setModPercentStat() { return new ModPercentStat(this.end.end, this.set(80));  };
    /** */
    @EnumField(81)
    setSplitDamagePct() { return new SplitDamagePct(this.end.end, this.set(81));  };
    /** */
    @EnumField(82)
    setWaterBreathing() { return new WaterBreathing(this.end.end, this.set(82));  };
    /** */
    @EnumField(83)
    setModBaseResistance() { return new ModBaseResistance(this.end.end, this.set(83));  };
    /** */
    @EnumField(84)
    setModRegen() { return new ModRegen(this.end.end, this.set(84));  };
    /** */
    @EnumField(85)
    setModPowerRegen() { return new ModPowerRegen(this.end.end, this.set(85));  };
    /** */
    @EnumField(86)
    setChannelDeathItem() { return new ChannelDeathItem(this.end.end, this.set(86));  };
    /** */
    @EnumField(87)
    setModDamagePercentTaken() { return new ModDamagePercentTaken(this.end.end, this.set(87));  };
    /** */
    @EnumField(88)
    setModHealthRegenPercent() { return new ModHealthRegenPercent(this.end.end, this.set(88));  };
    /** */
    @EnumField(89)
    setPeriodicDamagePercent() { return new PeriodicDamagePercent(this.end.end, this.set(89));  };
    /** */
    @EnumField(90)
    setSpellAura90() { return this.set(90);  };
    /** */
    @EnumField(91)
    setModDetectRange() { return new ModDetectRange(this.end.end, this.set(91));  };
    /** */
    @EnumField(92)
    setPreventsFleeing() { return new PreventsFleeing(this.end.end, this.set(92));  };
    /** */
    @EnumField(93)
    setModUnattackable() { return new ModUnattackable(this.end.end, this.set(93));  };
    /** */
    @EnumField(94)
    setInterruptRegen() { return new InterruptRegen(this.end.end, this.set(94));  };
    /** */
    @EnumField(95)
    setGhost() { return new Ghost(this.end.end, this.set(95));  };
    /** */
    @EnumField(96)
    setSpellMagnet() { return new SpellMagnet(this.end.end, this.set(96));  };
    /** */
    @EnumField(97)
    setManaShield() { return new ManaShield(this.end.end, this.set(97));  };
    /** */
    @EnumField(98)
    setModSkillTalent() { return new ModSkillTalent(this.end.end, this.set(98));  };
    /** */
    @EnumField(99)
    setModAttackPower() { return new ModAttackPower(this.end.end, this.set(99));  };
    /** */
    @EnumField(100)
    setAurasVisible() { return new AurasVisible(this.end.end, this.set(100));  };
    /** */
    @EnumField(101)
    setModResistancePct() { return new ModResistancePct(this.end.end, this.set(101));  };
    /** */
    @EnumField(102)
    setModMeleeAttackPowerVersus() { return new ModMeleeAttackPowerVersus(this.end.end, this.set(102));  };
    /** */
    @EnumField(103)
    setModTotalThreat() { return new ModTotalThreat(this.end.end, this.set(103));  };
    /** */
    @EnumField(104)
    setWaterWalk() { return new WaterWalk(this.end.end, this.set(104));  };
    /** */
    @EnumField(105)
    setFeatherFall() { return new FeatherFall(this.end.end, this.set(105));  };
    /** */
    @EnumField(106)
    setHover() { return new Hover(this.end.end, this.set(106));  };
    /** */
    @EnumField(107)
    setAddFlatModifier() { return new AddFlatModifier(this.end.end, this.set(107));  };
    /** */
    @EnumField(108)
    setAddPctModifier() { return new AddPctModifier(this.end.end, this.set(108));  };
    /** */
    @EnumField(109)
    setAddTargetTrigger() { return new AddTargetTrigger(this.end.end, this.set(109));  };
    /** */
    @EnumField(110)
    setModPowerRegenPercent() { return new ModPowerRegenPercent(this.end.end, this.set(110));  };
    /** */
    @EnumField(111)
    setAddCasterHitTrigger() { return new AddCasterHitTrigger(this.end.end, this.set(111));  };
    /** */
    @EnumField(112)
    setOverrideClassScripts() { return this.set(112);  };
    /** */
    @EnumField(113)
    setModRangedDamageTaken() { return new ModRangedDamageTaken(this.end.end, this.set(113));  };
    /** */
    @EnumField(114)
    setModRangedDamageTakenPct() { return new ModRangedDamageTakenPct(this.end.end, this.set(114));  };
    /** */
    @EnumField(115)
    setModHealing() { return new ModHealing(this.end.end, this.set(115));  };
    /** */
    @EnumField(116)
    setModRegenDuringCombat() { return new ModRegenDuringCombat(this.end.end, this.set(116));  };
    /** */
    @EnumField(117)
    setModMechanicResistance() { return new ModMechanicResistance(this.end.end, this.set(117));  };
    /** */
    @EnumField(118)
    setModHealingPct() { return new ModHealingPct(this.end.end, this.set(118));  };
    /** */
    @EnumField(119)
    setSpellAura119() { return this.set(119);  };
    /** */
    @EnumField(120)
    setUntrackable() { return new Untrackable(this.end.end, this.set(120));  };
    /** */
    @EnumField(121)
    setEmpathy() { return new Empathy(this.end.end, this.set(121));  };
    /** */
    @EnumField(122)
    setModOffhandDamagePct() { return new ModOffhandDamagePct(this.end.end, this.set(122));  };
    /** */
    @EnumField(123)
    setModTargetResistance() { return new ModTargetResistance(this.end.end, this.set(123));  };
    /** */
    @EnumField(124)
    setModRangedAttackPower() { return new ModRangedAttackPower(this.end.end, this.set(124));  };
    /** */
    @EnumField(125)
    setModMeleeDamageTaken() { return new ModMeleeDamageTaken(this.end.end, this.set(125));  };
    /** */
    @EnumField(126)
    setModMeleeDamageTakenPct() { return new ModMeleeDamageTakenPct(this.end.end, this.set(126));  };
    /** */
    @EnumField(127)
    setRangedAttackPowerAttackerBonus() { return new RangedAttackPowerAttackerBonus(this.end.end, this.set(127));  };
    /** */
    @EnumField(128)
    setModPossessPet() { return new ModPossessPet(this.end.end, this.set(128));  };
    /** */
    @EnumField(129)
    setModSpeedAlways() { return new ModSpeedAlways(this.end.end, this.set(129));  };
    /** */
    @EnumField(130)
    setModMountedSpeedAlways() { return new ModMountedSpeedAlways(this.end.end, this.set(130));  };
    /** */
    @EnumField(131)
    setModRangedAttackPowerVersus() { return new ModRangedAttackPowerVersus(this.end.end, this.set(131));  };
    /** */
    @EnumField(132)
    setModIncreaseEnergyPercent() { return new ModIncreaseEnergyPercent(this.end.end, this.set(132));  };
    /** */
    @EnumField(133)
    setModIncreaseHealthPercent() { return new ModIncreaseHealthPercent(this.end.end, this.set(133));  };
    /** */
    @EnumField(134)
    setModManaRegenInterrupt() { return new ModManaRegenInterrupt(this.end.end, this.set(134));  };
    /** */
    @EnumField(135)
    setModHealingDone() { return new ModHealingDone(this.end.end, this.set(135));  };
    /** */
    @EnumField(136)
    setModHealingDonePercent() { return new ModHealingDonePercent(this.end.end, this.set(136));  };
    /** */
    @EnumField(137)
    setModTotalStatPercentage() { return new ModTotalStatPercentage(this.end.end, this.set(137));  };
    /** */
    @EnumField(138)
    setModMeleeHaste() { return new ModMeleeHaste(this.end.end, this.set(138));  };
    /** */
    @EnumField(139)
    setForceReaction() { return new ForceReaction(this.end.end, this.set(139));  };
    /** */
    @EnumField(140)
    setModRangedHaste() { return new ModRangedHaste(this.end.end, this.set(140));  };
    /** */
    @EnumField(141)
    setModRangedAmmoHaste() { return new ModRangedAmmoHaste(this.end.end, this.set(141));  };
    /** */
    @EnumField(142)
    setModBaseResistancePct() { return new ModBaseResistancePct(this.end.end, this.set(142));  };
    /** */
    @EnumField(143)
    setModResistanceExclusive() { return new ModResistanceExclusive(this.end.end, this.set(143));  };
    /** */
    @EnumField(144)
    setSafeFall() { return new SafeFall(this.end.end, this.set(144));  };
    /** */
    @EnumField(145)
    setModPetTalentPoints() { return new ModPetTalentPoints(this.end.end, this.set(145));  };
    /** */
    @EnumField(146)
    setAllowTamePetType() { return new AllowTamePetType(this.end.end, this.set(146));  };
    /** */
    @EnumField(147)
    setMechanicImmunityMask() { return new MechanicImmunityMask(this.end.end, this.set(147));  };
    /** */
    @EnumField(148)
    setRetainComboPoints() { return new RetainComboPoints(this.end.end, this.set(148));  };
    /** */
    @EnumField(149)
    setReducePushback() { return new ReducePushback(this.end.end, this.set(149));  };
    /** */
    @EnumField(150)
    setModShieldBlockvaluePct() { return new ModShieldBlockValuePct(this.end.end, this.set(150));  };
    /** */
    @EnumField(151)
    setTrackStealthed() { return new TrackStealthed(this.end.end, this.set(151));  };
    /** */
    @EnumField(152)
    setModDetectedRange() { return new ModDetectedRange(this.end.end, this.set(152));  };
    /** */
    @EnumField(153)
    setSplitDamageFlat() { return new SplitDamageFlat(this.end.end, this.set(153));  };
    /** */
    @EnumField(154)
    setModStealthLevel() { return new ModStealthLevel(this.end.end, this.set(154));  };
    /** */
    @EnumField(155)
    setModWaterBreathing() { return new ModWaterBreathing(this.end.end, this.set(155));  };
    /** */
    @EnumField(156)
    setModReputationGain() { return new ModReputationGain(this.end.end, this.set(156));  };
    /** */
    @EnumField(157)
    setPetDamageMulti() { return new PetDamageMulti(this.end.end, this.set(157));  };
    /** */
    @EnumField(158)
    setModShieldBlockvalue() { return new ModShieldBlockValue(this.end.end, this.set(158));  };
    /** */
    @EnumField(159)
    setNoPvpCredit() { return new NoPvPCredit(this.end.end, this.set(159));  };
    /** */
    @EnumField(160)
    setModAoeAvoidance() { return new ModAoEAvoidance(this.end.end, this.set(160));  };
    /** */
    @EnumField(161)
    setModHealthRegenInCombat() { return this.set(161);  };
    /** */
    @EnumField(162)
    setPowerBurn() { return new PowerBurn(this.end.end, this.set(162));  };
    /** */
    @EnumField(163)
    setModCritDamageBonus() { return new ModCritDamageBonus(this.end.end, this.set(163));  };
    /** */
    @EnumField(164)
    setSpellAura164() { return this.set(164);  };
    /** */
    @EnumField(165)
    setMeleeAttackPowerAttackerBonus() { return new MeleeAttackPowerAttackerBonus(this.end.end, this.set(165));  };
    /** */
    @EnumField(166)
    setModAttackPowerPct() { return new ModAttackPowerPct(this.end.end, this.set(166));  };
    /** */
    @EnumField(167)
    setModRangedAttackPowerPct() { return new ModRangedAttackPowerPct(this.end.end, this.set(167));  };
    /** */
    @EnumField(168)
    setModDamageDoneVersus() { return new ModDamageDoneVersus(this.end.end, this.set(168));  };
    /** */
    @EnumField(169)
    setModCritPercentVersus() { return new ModCritPercentVersus(this.end.end, this.set(169));  };
    /** */
    @EnumField(170)
    setDetectAmore() { return new DetectAmore(this.end.end, this.set(170));  };
    /** */
    @EnumField(171)
    setModSpeedNotStack() { return new ModSpeedNotStack(this.end.end, this.set(171));  };
    /** */
    @EnumField(172)
    setModMountedSpeedNotStack() { return new ModMountedSpeedNotStack(this.end.end, this.set(172));  };
    /** */
    @EnumField(173)
    setSpellAura173() { return this.set(173);  };
    /** */
    @EnumField(174)
    setModSpellDamageOfStatPercent() { return new ModSpellDamageOfStatPercent(this.end.end, this.set(174));  };
    /** */
    @EnumField(175)
    setModSpellHealingOfStatPercent() { return new ModSpellHealingOfStatPercent(this.end.end, this.set(175));  };
    /** */
    @EnumField(176)
    setSpiritOfRedemption() { return new SpiritOfRedemption(this.end.end, this.set(176));  };
    /** */
    @EnumField(177)
    setAoeCharm() { return new AoECharm(this.end.end, this.set(177));  };
    /** */
    @EnumField(178)
    setModDebuffResistance() { return new ModDebuffResistance(this.end.end, this.set(178));  };
    /** */
    @EnumField(179)
    setModAttackerSpellCritChance() { return new ModAttackerSpellCritChance(this.end.end, this.set(179));  };
    /** */
    @EnumField(180)
    setModFlatSpellDamageVersus() { return new ModFlatSpellDamageVersus(this.end.end, this.set(180));  };
    /** */
    @EnumField(181)
    setSpellAura181() { return this.set(181);  };
    /** */
    @EnumField(182)
    setModResistanceOfStatPercent() { return new ModResistanceOfStatPercent(this.end.end, this.set(182));  };
    /** */
    @EnumField(183)
    setModCriticalThreat() { return new ModCriticalThreat(this.end.end, this.set(183));  };
    /** */
    @EnumField(184)
    setModAttackerMeleeHitChance() { return new ModAttackerMeleeHitChance(this.end.end, this.set(184));  };
    /** */
    @EnumField(185)
    setModAttackerRangedHitChance() { return new ModAttackerRangedHitChance(this.end.end, this.set(185));  };
    /** */
    @EnumField(186)
    setModAttackerSpellHitChance() { return new ModAttackerSpellHitChance(this.end.end, this.set(186));  };
    /** */
    @EnumField(187)
    setModAttackerMeleeCritChance() { return new ModAttackerMeleeCritChance(this.end.end, this.set(187));  };
    /** */
    @EnumField(188)
    setModAttackerRangedCritChance() { return new ModAttackerRangedCritChance(this.end.end, this.set(188));  };
    /** */
    @EnumField(189)
    setModRating() { return new ModRating(this.end.end, this.set(189));  };
    /** */
    @EnumField(190)
    setModFactionReputationGain() { return new ModFactionReputationGain(this.end.end, this.set(190));  };
    /** */
    @EnumField(191)
    setUseNormalMovementSpeed() { return new UseNormalMovementSpeed(this.end.end, this.set(191));  };
    /** */
    @EnumField(192)
    setModMeleeRangedHaste() { return new ModMeleeRangedHaste(this.end.end, this.set(192));  };
    /** */
    @EnumField(193)
    setMeleeSlow() { return new MeleeSlow(this.end.end, this.set(193));  };
    /** */
    @EnumField(194)
    setModTargetAbsorbSchool() { return new ModTargetAbsorbSchool(this.end.end, this.set(194));  };
    /** */
    @EnumField(195)
    setModTargetAbilityAbsorbSchool() { return new ModTargetAbilityAbsorbSchool(this.end.end, this.set(195));  };
    /** */
    @EnumField(196)
    setModCooldown() { return new ModCooldown(this.end.end, this.set(196));  };
    /** */
    @EnumField(197)
    setModAttackerSpellAndWeaponCritChance() { return new ModAttackerSpellAndWeaponCritChance(this.end.end, this.set(197));  };
    /** */
    @EnumField(198)
    setSpellAura198() { return this.set(198);  };
    /** */
    @EnumField(199)
    setModIncreasesSpellPctToHit() { return new ModIncreasesSpellPctToHit(this.end.end, this.set(199));  };
    /** */
    @EnumField(200)
    setModXpPct() { return new ModXpPct(this.end.end, this.set(200));  };
    /** */
    @EnumField(201)
    setFly() { return new Fly(this.end.end, this.set(201));  };
    /** */
    @EnumField(202)
    setCannotBeDodged() { return new CannotBeDodged(this.end.end, this.set(202));  };
    /** */
    @EnumField(203)
    setModAttackerMeleeCritDamage() { return new ModAttackerMeleeCritDamage(this.end.end, this.set(203));  };
    /** */
    @EnumField(204)
    setModAttackerRangedCritDamage() { return new ModAttackerRangedCritDamage(this.end.end, this.set(204));  };
    /** */
    @EnumField(205)
    setModSchoolCritDmgTaken() { return new ModSchoolCritDmgTaken(this.end.end, this.set(205));  };
    /** */
    @EnumField(206)
    setModIncreaseVehicleFlightSpeed() { return new ModIncreaseVehicleFlightSpeed(this.end.end, this.set(206));  };
    /** */
    @EnumField(207)
    setModIncreaseMountedFlightSpeed() { return new ModIncreaseMountedFlightSpeed(this.end.end, this.set(207));  };
    /** */
    @EnumField(208)
    setModIncreaseFlightSpeed() { return new ModIncreaseFlightSpeed(this.end.end, this.set(208));  };
    /** */
    @EnumField(209)
    setModMountedFlightSpeedAlways() { return new ModMountedFlightSpeedAlways(this.end.end, this.set(209));  };
    /** */
    @EnumField(210)
    setModVehicleSpeedAlways() { return new ModVehicleSpeedAlways(this.end.end, this.set(210));  };
    /** */
    @EnumField(211)
    setModFlightSpeedNotStack() { return new ModFlightSpeedNotStack(this.end.end, this.set(211));  };
    /** */
    @EnumField(212)
    setModRangedAttackPowerOfStatPercent() { return new ModRangedAttackPowerOfStatPercent(this.end.end, this.set(212));  };
    /** */
    @EnumField(213)
    setModRageFromDamageDealt() { return new ModRageFromDamageDealt(this.end.end, this.set(213));  };
    /** */
    @EnumField(214)
    setTamed() { return new Tamed(this.end.end, this.set(214));  };
    /** */
    @EnumField(215)
    setArenaPreparation() { return new ArenaPreparation(this.end.end, this.set(215));  };
    /** */
    @EnumField(216)
    setHasteSpells() { return new HasteSpells(this.end.end, this.set(216));  };
    /** */
    @EnumField(217)
    setSpellAura217() { return this.set(217);  };
    /** */
    @EnumField(218)
    setHasteRanged() { return new HasteRanged(this.end.end, this.set(218));  };
    /** */
    @EnumField(219)
    setModManaRegenFromStat() { return new ModManaRegenFromStat(this.end.end, this.set(219));  };
    /** */
    @EnumField(220)
    setModRatingFromStat() { return new ModRatingFromStat(this.end.end, this.set(220));  };
    /** */
    @EnumField(221)
    setModDetaunt() { return new ModDetaunt(this.end.end, this.set(221));  };
    /** */
    @EnumField(222)
    setSpellAura222() { return this.set(222);  };
    /** */
    @EnumField(223)
    setRaidProcFromCharge() { return new RaidProcFromCharge(this.end.end, this.set(223));  };
    /** */
    @EnumField(224)
    setSpellAura224() { return this.set(224);  };
    /** */
    @EnumField(225)
    setRaidProcFromChargeWithValue() { return new RaidProcFromChargeWithValue(this.end.end, this.set(225));  };
    /** */
    @EnumField(226)
    setPeriodicDummy() { return this.set(226);  };
    /** */
    @EnumField(227)
    setPeriodicTriggerSpellWithValue() { return this.set(227);  };
    /** */
    @EnumField(228)
    setDetectStealth() { return new DetectStealth(this.end.end, this.set(228));  };
    /** */
    @EnumField(229)
    setModAoeDamageAvoidance() { return new ModAoEDamageAvoidance(this.end.end, this.set(229));  };
    /** */
    @EnumField(230)
    setModIncreaseHealth2() { return new ModIncreaseHealth2(this.end.end, this.set(230));  };
    /** */
    @EnumField(231)
    setProcTriggerSpellWithValue() { return this.set(231);  };
    /** */
    @EnumField(232)
    setMechanicDurationMod() { return new MechanicDurationMod(this.end.end, this.set(232));  };
    /** */
    @EnumField(233)
    setSpellAura233() { return this.set(233);  };
    /** */
    @EnumField(234)
    setMechanicDurationModNotStack() { return new MechanicDurationModNotStack(this.end.end, this.set(234));  };
    /** */
    @EnumField(235)
    setModDispelResist() { return new ModDispelResist(this.end.end, this.set(235));  };
    /** */
    @EnumField(236)
    setControlVehicle() { return new ControlVehicle(this.end.end, this.set(236));  };
    /** */
    @EnumField(237)
    setModSpellDamageOfAttackPower() { return new ModSpellDamageOfAttackPower(this.end.end, this.set(237));  };
    /** */
    @EnumField(238)
    setModSpellHealingOfAttackPower() { return new ModSpellHealingOfAttackPower(this.end.end, this.set(238));  };
    /** */
    @EnumField(239)
    setModScale2() { return new ModScale2(this.end.end, this.set(239));  };
    /** */
    @EnumField(240)
    setModExpertise() { return new ModExpertise(this.end.end, this.set(240));  };
    /** */
    @EnumField(241)
    setForceMoveForward() { return new ForceMoveForward(this.end.end, this.set(241));  };
    /** */
    @EnumField(242)
    setModSpellDamageFromHealing() { return new ModSpellDamageFromHealing(this.end.end, this.set(242));  };
    /** */
    @EnumField(243)
    setModFaction() { return new ModFaction(this.end.end, this.set(243));  };
    /** */
    @EnumField(244)
    setComprehendLanguage() { return new ComprehendLanguage(this.end.end, this.set(244));  };
    /** */
    @EnumField(245)
    setModAuraDurationByDispel() { return new ModAuraDurationByDispel(this.end.end, this.set(245));  };
    /** */
    @EnumField(246)
    setModAuraDurationByDispelNotStack() { return new ModAuraDurationByDispelNotStack(this.end.end, this.set(246));  };
    /** */
    @EnumField(247)
    setCloneCaster() { return new CloneCaster(this.end.end, this.set(247));  };
    /** */
    @EnumField(248)
    setModCombatResultChance() { return new ModCombatResultChance(this.end.end, this.set(248));  };
    /** */
    @EnumField(249)
    setConvertRune() { return new ConvertRune(this.end.end, this.set(249));  };
    /** */
    @EnumField(250)
    setModIncreaseHealth3() { return new ModIncreaseHealth3(this.end.end, this.set(250));  };
    /** */
    @EnumField(251)
    setModEnemyDodge() { return new ModEnemyDodge(this.end.end, this.set(251));  };
    /** */
    @EnumField(252)
    setSpellAura252() { return this.set(252);  };
    /** */
    @EnumField(253)
    setModBlockCritChance() { return new ModBlockCritChance(this.end.end, this.set(253));  };
    /** */
    @EnumField(254)
    setModDisarmOffhand() { return new ModDisarmOffhand(this.end.end, this.set(254));  };
    /** */
    @EnumField(255)
    setModMechanicDamageTakenPercent() { return new ModMechanicDamageTakenPercent(this.end.end, this.set(255));  };
    /** */
    @EnumField(256)
    setNoReagentUse() { return new NoReagentUse(this.end.end, this.set(256));  };
    /** */
    @EnumField(257)
    setModTargetResistBySpellClass() { return new ModTargetResistBySpellClass(this.end.end, this.set(257));  };
    /** */
    @EnumField(258)
    setModSpellVisual() { return this.set(258);  };
    /** */
    @EnumField(259)
    setModHotPct() { return new ModHotPct(this.end.end, this.set(259));  };
    /** */
    @EnumField(260)
    setScreenEffect() { return new ScreenEffect(this.end.end, this.set(260));  };
    /** */
    @EnumField(261)
    setPhase() { return new Phase(this.end.end, this.set(261));  };
    /** */
    @EnumField(262)
    setAbilityIgnoreAurastate() { return this.set(262);  };
    /** */
    @EnumField(263)
    setAllowOnlyAbility() { return new AllowOnlyAbility(this.end.end, this.set(263));  };
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
    setModImmuneAuraApplySchool() { return new ModImmuneAuraApplySchool(this.end.end, this.set(267));  };
    /** */
    @EnumField(268)
    setModAttackPowerOfStatPercent() { return new ModAttackPowerOfStatPercent(this.end.end, this.set(268));  };
    /** */
    @EnumField(269)
    setModIgnoreTargetResist() { return new ModIgnoreTargetResist(this.end.end, this.set(269));  };
    /** */
    @EnumField(270)
    setModAbilityIgnoreTargetResist() { return this.set(270);  };
    /** */
    @EnumField(271)
    setModDamageFromCaster() { return new ModDamageFromCaster(this.end.end, this.set(271));  };
    /** */
    @EnumField(272)
    setIgnoreMeleeReset() { return new IgnoreMeleeReset(this.end.end, this.set(272));  };
    /** */
    @EnumField(273)
    setSpellAura273() { return this.set(273);  };
    /** */
    @EnumField(274)
    setConsumeNoAmmo() { return new ConsumeNoAmmo(this.end.end, this.set(274));  };
    /** */
    @EnumField(275)
    setModIgnoreShapeshift() { return new ModIgnoreShapeshift(this.end.end, this.set(275));  };
    /** */
    @EnumField(276)
    setSpellAura276() { return this.set(276);  };
    /** */
    @EnumField(277)
    setModAbilityAffectedTargets() { return new ModAbilityAffectedTargets(this.end.end, this.set(277));  };
    /** */
    @EnumField(278)
    setModDisarmRanged() { return new ModDisarmRanged(this.end.end, this.set(278));  };
    /** */
    @EnumField(279)
    setInitializeImages() { return new InitializeImages(this.end.end, this.set(279));  };
    /** */
    @EnumField(280)
    setModTargetArmorPct() { return new ModTargetArmorPct(this.end.end, this.set(280));  };
    /** */
    @EnumField(281)
    setModHonorGainPct() { return new ModHonorGainPct(this.end.end, this.set(281));  };
    /** */
    @EnumField(282)
    setIncreaseBaseHealthPercent() { return new IncreaseBaseHealthPercent(this.end.end, this.set(282));  };
    /** */
    @EnumField(283)
    setModHealingReceived() { return new ModHealingReceived(this.end.end, this.set(283));  };
    /** */
    @EnumField(284)
    setLinked() { return this.set(284);  };
    /** */
    @EnumField(285)
    setModAttackPowerOfArmor() { return new ModAttackPowerOfArmor(this.end.end, this.set(285));  };
    /** */
    @EnumField(286)
    setAbilityPeriodicCrit() { return this.set(286);  };
    /** */
    @EnumField(287)
    setDeflectSpells() { return new DeflectSpells(this.end.end, this.set(287));  };
    /** */
    @EnumField(288)
    setIgnoreHitDirection() { return new IgnoreHitDirection(this.end.end, this.set(288));  };
    /** */
    @EnumField(289)
    setSpellAura289() { return this.set(289);  };
    /** */
    @EnumField(290)
    setModCritPct() { return new ModCritPct(this.end.end, this.set(290));  };
    /** */
    @EnumField(291)
    setModXpQuestPct() { return new ModXpQuestPct(this.end.end, this.set(291));  };
    /** */
    @EnumField(292)
    setOpenStable() { return this.set(292);  };
    /** */
    @EnumField(293)
    setSpellAura293() { return this.set(293);  };
    /** */
    @EnumField(294)
    setPreventRegeneratePower() { return new PreventRegeneratePower(this.end.end, this.set(294));  };
    /** */
    @EnumField(295)
    setSpellAura295() { return this.set(295);  };
    /** */
    @EnumField(296)
    setSetVehicleId() { return new SetVehicleId(this.end.end, this.set(296));  };
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
    setShareDamagePct() { return new ShareDamagePct(this.end.end, this.set(300));  };
    /** */
    @EnumField(301)
    setSchoolHealAbsorb() { return new SchoolHealAbsorb(this.end.end, this.set(301));  };
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
    setModMinimumSpeed() { return new ModMinimumSpeed(this.end.end, this.set(305));  };
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
    setModCreatureAoeDamageAvoidance() { return new ModCreatureAoEDamageAvoidance(this.end.end, this.set(310));  };
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
    setPreventResurrection() { return new PreventResurrection(this.end.end, this.set(314));  };
    /** */
    @EnumField(315)
    setUnderwaterWalking() { return new UnderwaterWalking(this.end.end, this.set(315));  };
    /** */
    @EnumField(316)
    setPeriodicHaste() { return this.set(316);  };
}
