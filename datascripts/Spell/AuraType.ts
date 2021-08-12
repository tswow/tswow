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
import { SpellEffect } from "./SpellEffect";
import { PeriodicDamage, BindSight, ModPossess, ModConfuse, ModCharm, ModFear, PeriodicHeal, ModAttackSpeed, ModThreat, ModTaunt, ModStun, ModDamageDone, ModDamageTaken, DamageShield, ModStealth, ModDetect, ModInvisibility, ModInvisibilityDetection, ObsModHealth, ObsModPower, ModResistance, PeriodicEnergize, ModPacify, ModRoot, ModSilence, ReflectSpells, ModStat, ModSkill, ModIncreaseSpeed, ModIncreaseMountSpeed, ModDecreaseSpeed, ModIncreaseHealth, ModIncreaseEnergy, ModShapeshift, EffectImmunity, StateImmunity, SchoolImmunity, DamageImmunity, DispelImmunity, ProcTriggerSpell, ProcTriggerDamage, TrackCreatures, TrackResources, ModParryPercent, ModDodgePercent, ModCriticalHealAmount, ModBlockPercent, ModWeaponCritPercent, PeriodicLeech, ModHitChance, ModSpellHitChance, Transform, ModSpellCritChance, ModIncreaseSwimSpeed, ModDamageDoneCreature, ModPacifySilence, ModScale, PeriodicHealthFunnel, PeriodicManaLeech, ModCastingSpeedNotStack, FeignDeath, ModDisarm, ModStalked, SchoolAbsorb, ModSpellCritChanceSchool, ModPowerCostSchoolPct, ModPowerCostSchool, ReflectSpellsSchool, ModLanguage, FarSight, MechanicImmunity, Mounted, ModDamagePercentDone, ModPercentStat, SplitDamagePct, WaterBreathing, ModBaseResistance, ModRegen, ModPowerRegen, ChannelDeathItem, ModDamagePercentTaken, ModHealthRegenPercent, PeriodicDamagePercent, ModDetectRange, PreventsFleeing, ModUnattackable, InterruptRegen, Ghost, SpellMagnet, ManaShield, ModSkillTalent, ModAttackPower, AurasVisible, ModResistancePct, ModMeleeAttackPowerVersus, ModTotalThreat, WaterWalk, FeatherFall, Hover, AddFlatModifier, AddPctModifier, AddTargetTrigger, ModPowerRegenPercent, AddCasterHitTrigger, ModRangedDamageTaken, ModRangedDamageTakenPct, ModHealing, ModRegenDuringCombat, ModMechanicResistance, ModHealingPct, Untrackable, Empathy, ModOffhandDamagePct, ModTargetResistance, ModRangedAttackPower, ModMeleeDamageTaken, ModMeleeDamageTakenPct, RangedAttackPowerAttackerBonus, ModPossessPet, ModSpeedAlways, ModMountedSpeedAlways, ModRangedAttackPowerVersus, ModIncreaseEnergyPercent, ModIncreaseHealthPercent, ModManaRegenInterrupt, ModHealingDone, ModHealingDonePercent, ModTotalStatPercentage, ModMeleeHaste, ForceReaction, ModRangedHaste, ModRangedAmmoHaste, ModBaseResistancePct, ModResistanceExclusive, SafeFall, ModPetTalentPoints, AllowTamePetType, MechanicImmunityMask, RetainComboPoints, ReducePushback, ModShieldBlockValuePct, TrackStealthed, ModDetectedRange, SplitDamageFlat, ModStealthLevel, ModWaterBreathing, ModReputationGain, PetDamageMulti, ModShieldBlockValue, NoPvPCredit, ModAoEAvoidance, PowerBurn, ModCritDamageBonus, MeleeAttackPowerAttackerBonus, ModAttackPowerPct, ModRangedAttackPowerPct, ModDamageDoneVersus, ModCritPercentVersus, DetectAmore, ModSpeedNotStack, ModMountedSpeedNotStack, ModSpellDamageOfStatPercent, ModSpellHealingOfStatPercent, SpiritOfRedemption, AoECharm, ModDebuffResistance, ModAttackerSpellCritChance, ModFlatSpellDamageVersus, ModResistanceOfStatPercent, ModCriticalThreat, ModAttackerMeleeHitChance, ModAttackerRangedHitChance, ModAttackerSpellHitChance, ModAttackerMeleeCritChance, ModAttackerRangedCritChance, ModRating, ModFactionReputationGain, UseNormalMovementSpeed, ModMeleeRangedHaste, MeleeSlow, ModTargetAbsorbSchool, ModTargetAbilityAbsorbSchool, ModCooldown, ModAttackerSpellAndWeaponCritChance, ModIncreasesSpellPctToHit, ModXpPct, Fly, CannotBeDodged, ModAttackerMeleeCritDamage, ModAttackerRangedCritDamage, ModSchoolCritDmgTaken, ModIncreaseVehicleFlightSpeed, ModIncreaseMountedFlightSpeed, ModIncreaseFlightSpeed, ModMountedFlightSpeedAlways, ModVehicleSpeedAlways, ModFlightSpeedNotStack, ModRangedAttackPowerOfStatPercent, ModRageFromDamageDealt, Tamed, ArenaPreparation, HasteSpells, HasteRanged, ModManaRegenFromStat, ModRatingFromStat, ModDetaunt, RaidProcFromCharge, RaidProcFromChargeWithValue, DetectStealth, ModAoEDamageAvoidance, ModIncreaseHealth2, MechanicDurationMod, MechanicDurationModNotStack, ModDispelResist, ControlVehicle, ModSpellDamageOfAttackPower, ModSpellHealingOfAttackPower, ModScale2, ModExpertise, ForceMoveForward, ModSpellDamageFromHealing, ModFaction, ComprehendLanguage, ModAuraDurationByDispel, ModAuraDurationByDispelNotStack, CloneCaster, ModCombatResultChance, ConvertRune, ModIncreaseHealth3, ModEnemyDodge, ModBlockCritChance, ModDisarmOffhand, ModMechanicDamageTakenPercent, NoReagentUse, ModTargetResistBySpellClass, ModHotPct, ScreenEffect, Phase, AllowOnlyAbility, ModImmuneAuraApplySchool, ModAttackPowerOfStatPercent, ModIgnoreTargetResist, ModDamageFromCaster, IgnoreMeleeReset, ConsumeNoAmmo, ModIgnoreShapeshift, ModAbilityAffectedTargets, ModDisarmRanged, InitializeImages, ModTargetArmorPct, ModHonorGainPct, IncreaseBaseHealthPercent, ModHealingReceived, ModAttackPowerOfArmor, DeflectSpells, IgnoreHitDirection, ModCritPct, ModXpQuestPct, PreventRegeneratePower, SetVehicleId, ShareDamagePct, SchoolHealAbsorb, ModMinimumSpeed, ModCreatureAoEDamageAvoidance, PreventResurrection, UnderwaterWalking } from "./EffectTemplates/AuraTemplates";
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { CellIndexWrapper } from "wotlkdata/cell/cells/CellArray";

export class AuraType extends EnumCellWrapper<SpellEffect> {
    constructor(owner: SpellEffect, effectIndex: number) {
        super(owner, new CellIndexWrapper(undefined, owner.row.EffectAura,effectIndex));
    }

    /** */
    @EnumField(0)
    setNone() { return this.set(0);  };
    /** */
    @EnumField(1)
    setBindSight(): BindSight { return new BindSight(this.set(1));  };
    /** */
    @EnumField(2)
    setModPossess(): ModPossess { return new ModPossess(this.set(2));  };
    /** */
    @EnumField(3)
    setPeriodicDamage(): PeriodicDamage { return new PeriodicDamage(this.set(3));  };
    /** */
    @EnumField(4)
    setDummy() { return this.set(4);  };
    /** */
    @EnumField(5)
    setModConfuse(): ModConfuse { return new ModConfuse(this.set(5));  };
    /** */
    @EnumField(6)
    setModCharm(): ModCharm { return new ModCharm(this.set(6));  };
    /** */
    @EnumField(7)
    setModFear(): ModFear { return new ModFear(this.set(7));  };
    /** */
    @EnumField(8)
    setPeriodicHeal(): PeriodicHeal { return new PeriodicHeal(this.set(8));  };
    /** */
    @EnumField(9)
    setModAttackspeed(): ModAttackSpeed { return new ModAttackSpeed(this.set(9));  };
    /** */
    @EnumField(10)
    setModThreat(): ModThreat { return new ModThreat(this.set(10));  };
    /** */
    @EnumField(11)
    setModTaunt(): ModTaunt { return new ModTaunt(this.set(11));  };
    /** */
    @EnumField(12)
    setModStun(): ModStun { return new ModStun(this.set(12));  };
    /** */
    @EnumField(13)
    setModDamageDone(): ModDamageDone { return new ModDamageDone(this.set(13));  };
    /** */
    @EnumField(14)
    setModDamageTaken(): ModDamageTaken { return new ModDamageTaken(this.set(14));  };
    /** */
    @EnumField(15)
    setDamageShield(): DamageShield { return new DamageShield(this.set(15));  };
    /** */
    @EnumField(16)
    setModStealth(): ModStealth { return new ModStealth(this.set(16));  };
    /** */
    @EnumField(17)
    setModDetect(): ModDetect { return new ModDetect(this.set(17));  };
    /** */
    @EnumField(18)
    setModInvisibility(): ModInvisibility { return new ModInvisibility(this.set(18));  };
    /** */
    @EnumField(19)
    setModInvisibilityDetection(): ModInvisibilityDetection { return new ModInvisibilityDetection(this.set(19));  };
    /** */
    @EnumField(20)
    setObsModHealth(): ObsModHealth { return new ObsModHealth(this.set(20));  };
    /** */
    @EnumField(21)
    setObsModPower(): ObsModPower { return new ObsModPower(this.set(21));  };
    /** */
    @EnumField(22)
    setModResistance(): ModResistance { return new ModResistance(this.set(22));  };
    /** */
    @EnumField(23)
    setPeriodicTriggerSpell() { return this.set(23);  };
    /** */
    @EnumField(24)
    setPeriodicEnergize(): PeriodicEnergize { return new PeriodicEnergize(this.set(24));  };
    /** */
    @EnumField(25)
    setModPacify(): ModPacify { return new ModPacify(this.set(25));  };
    /** */
    @EnumField(26)
    setModRoot(): ModRoot { return new ModRoot(this.set(26));  };
    /** */
    @EnumField(27)
    setModSilence(): ModSilence { return new ModSilence(this.set(27));  };
    /** */
    @EnumField(28)
    setReflectSpells(): ReflectSpells { return new ReflectSpells(this.set(28));  };
    /** */
    @EnumField(29)
    setModStat(): ModStat { return new ModStat(this.set(29));  };
    /** */
    @EnumField(30)
    setModSkill(): ModSkill { return new ModSkill(this.set(30));  };
    /** */
    @EnumField(31)
    setModIncreaseSpeed(): ModIncreaseSpeed { return new ModIncreaseSpeed(this.set(31));  };
    /** */
    @EnumField(32)
    setModIncreaseMountedSpeed(): ModIncreaseMountSpeed { return new ModIncreaseMountSpeed(this.set(32));  };
    /** */
    @EnumField(33)
    setModDecreaseSpeed(): ModDecreaseSpeed { return new ModDecreaseSpeed(this.set(33));  };
    /** */
    @EnumField(34)
    setModIncreaseHealth(): ModIncreaseHealth { return new ModIncreaseHealth(this.set(34));  };
    /** */
    @EnumField(35)
    setModIncreaseEnergy(): ModIncreaseEnergy { return new ModIncreaseEnergy(this.set(35));  };
    /** */
    @EnumField(36)
    setModShapeshift(): ModShapeshift { return new ModShapeshift(this.set(36));  };
    /** */
    @EnumField(37)
    setEffectImmunity(): EffectImmunity { return new EffectImmunity(this.set(37));  };
    /** */
    @EnumField(38)
    setStateImmunity(): StateImmunity { return new StateImmunity(this.set(38));  };
    /** */
    @EnumField(39)
    setSchoolImmunity(): SchoolImmunity { return new SchoolImmunity(this.set(39));  };
    /** */
    @EnumField(40)
    setDamageImmunity(): DamageImmunity { return new DamageImmunity(this.set(40));  };
    /** */
    @EnumField(41)
    setDispelImmunity(): DispelImmunity { return new DispelImmunity(this.set(41));  };
    /** */
    @EnumField(42)
    setProcTriggerSpell(): ProcTriggerSpell { return new ProcTriggerSpell(this.set(42));  };
    /** */
    @EnumField(43)
    setProcTriggerDamage(): ProcTriggerDamage { return new ProcTriggerDamage(this.set(43));  };
    /** */
    @EnumField(44)
    setTrackCreatures(): TrackCreatures { return new TrackCreatures(this.set(44));  };
    /** */
    @EnumField(45)
    setTrackResources(): TrackResources { return new TrackResources(this.set(45));  };
    /** */
    @EnumField(46)
    setSpellAura46() { return this.set(46);  };
    /** */
    @EnumField(47)
    setModParryPercent(): ModParryPercent { return new ModParryPercent(this.set(47));  };
    /** */
    @EnumField(48)
    setSpellAura48() { return this.set(48);  };
    /** */
    @EnumField(49)
    setModDodgePercent(): ModDodgePercent { return new ModDodgePercent(this.set(49));  };
    /** */
    @EnumField(50)
    setModCriticalHealingAmount(): ModCriticalHealAmount { return new ModCriticalHealAmount(this.set(50));  };
    /** */
    @EnumField(51)
    setModBlockPercent(): ModBlockPercent { return new ModBlockPercent(this.set(51));  };
    /** */
    @EnumField(52)
    setModWeaponCritPercent(): ModWeaponCritPercent { return new ModWeaponCritPercent(this.set(52));  };
    /** */
    @EnumField(53)
    setPeriodicLeech(): PeriodicLeech { return new PeriodicLeech(this.set(53));  };
    /** */
    @EnumField(54)
    setModHitChance(): ModHitChance { return new ModHitChance(this.set(54));  };
    /** */
    @EnumField(55)
    setModSpellHitChance(): ModSpellHitChance { return new ModSpellHitChance(this.set(55));  };
    /** */
    @EnumField(56)
    setTransform(): Transform { return new Transform(this.set(56));  };
    /** */
    @EnumField(57)
    setModSpellCritChance(): ModSpellCritChance { return new ModSpellCritChance(this.set(57));  };
    /** */
    @EnumField(58)
    setModIncreaseSwimSpeed(): ModIncreaseSwimSpeed { return new ModIncreaseSwimSpeed(this.set(58));  };
    /** */
    @EnumField(59)
    setModDamageDoneCreature(): ModDamageDoneCreature { return new ModDamageDoneCreature(this.set(59));  };
    /** */
    @EnumField(60)
    setModPacifySilence(): ModPacifySilence { return new ModPacifySilence(this.set(60));  };
    /** */
    @EnumField(61)
    setModScale(): ModScale { return new ModScale(this.set(61));  };
    /** */
    @EnumField(62)
    setPeriodicHealthFunnel(): PeriodicHealthFunnel { return new PeriodicHealthFunnel(this.set(62));  };
    /** */
    @EnumField(63)
    setSpellAura63() { return this.set(63);  };
    /** */
    @EnumField(64)
    setPeriodicManaLeech(): PeriodicManaLeech { return new PeriodicManaLeech(this.set(64));  };
    /** */
    @EnumField(65)
    setModCastingSpeedNotStack(): ModCastingSpeedNotStack { return new ModCastingSpeedNotStack(this.set(65));  };
    /** */
    @EnumField(66)
    setFeignDeath(): FeignDeath { return new FeignDeath(this.set(66));  };
    /** */
    @EnumField(67)
    setModDisarm(): ModDisarm { return new ModDisarm(this.set(67));  };
    /** */
    @EnumField(68)
    setModStalked(): ModStalked { return new ModStalked(this.set(68));  };
    /** */
    @EnumField(69)
    setSchoolAbsorb(): SchoolAbsorb { return new SchoolAbsorb(this.set(69));  };
    /** */
    @EnumField(70)
    setExtraAttacks() { return this.set(70);  };
    /** */
    @EnumField(71)
    setModSpellCritChanceSchool(): ModSpellCritChanceSchool { return new ModSpellCritChanceSchool(this.set(71));  };
    /** */
    @EnumField(72)
    setModPowerCostSchoolPct(): ModPowerCostSchoolPct { return new ModPowerCostSchoolPct(this.set(72));  };
    /** */
    @EnumField(73)
    setModPowerCostSchool(): ModPowerCostSchool { return new ModPowerCostSchool(this.set(73));  };
    /** */
    @EnumField(74)
    setReflectSpellsSchool(): ReflectSpellsSchool { return new ReflectSpellsSchool(this.set(74));  };
    /** */
    @EnumField(75)
    setModLanguage(): ModLanguage { return new ModLanguage(this.set(75));  };
    /** */
    @EnumField(76)
    setFarSight(): FarSight { return new FarSight(this.set(76));  };
    /** */
    @EnumField(77)
    setMechanicImmunity(): MechanicImmunity { return new MechanicImmunity(this.set(77));  };
    /** */
    @EnumField(78)
    setMounted(): Mounted { return new Mounted(this.set(78));  };
    /** */
    @EnumField(79)
    setModDamagePercentDone(): ModDamagePercentDone { return new ModDamagePercentDone(this.set(79));  };
    /** */
    @EnumField(80)
    setModPercentStat(): ModPercentStat { return new ModPercentStat(this.set(80));  };
    /** */
    @EnumField(81)
    setSplitDamagePct(): SplitDamagePct { return new SplitDamagePct(this.set(81));  };
    /** */
    @EnumField(82)
    setWaterBreathing(): WaterBreathing { return new WaterBreathing(this.set(82));  };
    /** */
    @EnumField(83)
    setModBaseResistance(): ModBaseResistance { return new ModBaseResistance(this.set(83));  };
    /** */
    @EnumField(84)
    setModRegen(): ModRegen { return new ModRegen(this.set(84));  };
    /** */
    @EnumField(85)
    setModPowerRegen(): ModPowerRegen { return new ModPowerRegen(this.set(85));  };
    /** */
    @EnumField(86)
    setChannelDeathItem(): ChannelDeathItem { return new ChannelDeathItem(this.set(86));  };
    /** */
    @EnumField(87)
    setModDamagePercentTaken(): ModDamagePercentTaken { return new ModDamagePercentTaken(this.set(87));  };
    /** */
    @EnumField(88)
    setModHealthRegenPercent(): ModHealthRegenPercent { return new ModHealthRegenPercent(this.set(88));  };
    /** */
    @EnumField(89)
    setPeriodicDamagePercent(): PeriodicDamagePercent { return new PeriodicDamagePercent(this.set(89));  };
    /** */
    @EnumField(90)
    setSpellAura90() { return this.set(90);  };
    /** */
    @EnumField(91)
    setModDetectRange(): ModDetectRange { return new ModDetectRange(this.set(91));  };
    /** */
    @EnumField(92)
    setPreventsFleeing(): PreventsFleeing { return new PreventsFleeing(this.set(92));  };
    /** */
    @EnumField(93)
    setModUnattackable(): ModUnattackable { return new ModUnattackable(this.set(93));  };
    /** */
    @EnumField(94)
    setInterruptRegen(): InterruptRegen { return new InterruptRegen(this.set(94));  };
    /** */
    @EnumField(95)
    setGhost(): Ghost { return new Ghost(this.set(95));  };
    /** */
    @EnumField(96)
    setSpellMagnet(): SpellMagnet { return new SpellMagnet(this.set(96));  };
    /** */
    @EnumField(97)
    setManaShield(): ManaShield { return new ManaShield(this.set(97));  };
    /** */
    @EnumField(98)
    setModSkillTalent(): ModSkillTalent { return new ModSkillTalent(this.set(98));  };
    /** */
    @EnumField(99)
    setModAttackPower(): ModAttackPower { return new ModAttackPower(this.set(99));  };
    /** */
    @EnumField(100)
    setAurasVisible(): AurasVisible { return new AurasVisible(this.set(100));  };
    /** */
    @EnumField(101)
    setModResistancePct(): ModResistancePct { return new ModResistancePct(this.set(101));  };
    /** */
    @EnumField(102)
    setModMeleeAttackPowerVersus(): ModMeleeAttackPowerVersus { return new ModMeleeAttackPowerVersus(this.set(102));  };
    /** */
    @EnumField(103)
    setModTotalThreat(): ModTotalThreat { return new ModTotalThreat(this.set(103));  };
    /** */
    @EnumField(104)
    setWaterWalk(): WaterWalk { return new WaterWalk(this.set(104));  };
    /** */
    @EnumField(105)
    setFeatherFall(): FeatherFall { return new FeatherFall(this.set(105));  };
    /** */
    @EnumField(106)
    setHover(): Hover { return new Hover(this.set(106));  };
    /** */
    @EnumField(107)
    setAddFlatModifier(): AddFlatModifier { return new AddFlatModifier(this.set(107));  };
    /** */
    @EnumField(108)
    setAddPctModifier(): AddPctModifier { return new AddPctModifier(this.set(108));  };
    /** */
    @EnumField(109)
    setAddTargetTrigger(): AddTargetTrigger { return new AddTargetTrigger(this.set(109));  };
    /** */
    @EnumField(110)
    setModPowerRegenPercent(): ModPowerRegenPercent { return new ModPowerRegenPercent(this.set(110));  };
    /** */
    @EnumField(111)
    setAddCasterHitTrigger(): AddCasterHitTrigger { return new AddCasterHitTrigger(this.set(111));  };
    /** */
    @EnumField(112)
    setOverrideClassScripts() { return this.set(112);  };
    /** */
    @EnumField(113)
    setModRangedDamageTaken(): ModRangedDamageTaken { return new ModRangedDamageTaken(this.set(113));  };
    /** */
    @EnumField(114)
    setModRangedDamageTakenPct(): ModRangedDamageTakenPct { return new ModRangedDamageTakenPct(this.set(114));  };
    /** */
    @EnumField(115)
    setModHealing(): ModHealing { return new ModHealing(this.set(115));  };
    /** */
    @EnumField(116)
    setModRegenDuringCombat(): ModRegenDuringCombat { return new ModRegenDuringCombat(this.set(116));  };
    /** */
    @EnumField(117)
    setModMechanicResistance(): ModMechanicResistance { return new ModMechanicResistance(this.set(117));  };
    /** */
    @EnumField(118)
    setModHealingPct(): ModHealingPct { return new ModHealingPct(this.set(118));  };
    /** */
    @EnumField(119)
    setSpellAura119() { return this.set(119);  };
    /** */
    @EnumField(120)
    setUntrackable(): Untrackable { return new Untrackable(this.set(120));  };
    /** */
    @EnumField(121)
    setEmpathy(): Empathy { return new Empathy(this.set(121));  };
    /** */
    @EnumField(122)
    setModOffhandDamagePct(): ModOffhandDamagePct { return new ModOffhandDamagePct(this.set(122));  };
    /** */
    @EnumField(123)
    setModTargetResistance(): ModTargetResistance { return new ModTargetResistance(this.set(123));  };
    /** */
    @EnumField(124)
    setModRangedAttackPower(): ModRangedAttackPower { return new ModRangedAttackPower(this.set(124));  };
    /** */
    @EnumField(125)
    setModMeleeDamageTaken(): ModMeleeDamageTaken { return new ModMeleeDamageTaken(this.set(125));  };
    /** */
    @EnumField(126)
    setModMeleeDamageTakenPct(): ModMeleeDamageTakenPct { return new ModMeleeDamageTakenPct(this.set(126));  };
    /** */
    @EnumField(127)
    setRangedAttackPowerAttackerBonus(): RangedAttackPowerAttackerBonus { return new RangedAttackPowerAttackerBonus(this.set(127));  };
    /** */
    @EnumField(128)
    setModPossessPet(): ModPossessPet { return new ModPossessPet(this.set(128));  };
    /** */
    @EnumField(129)
    setModSpeedAlways(): ModSpeedAlways { return new ModSpeedAlways(this.set(129));  };
    /** */
    @EnumField(130)
    setModMountedSpeedAlways(): ModMountedSpeedAlways { return new ModMountedSpeedAlways(this.set(130));  };
    /** */
    @EnumField(131)
    setModRangedAttackPowerVersus(): ModRangedAttackPowerVersus { return new ModRangedAttackPowerVersus(this.set(131));  };
    /** */
    @EnumField(132)
    setModIncreaseEnergyPercent(): ModIncreaseEnergyPercent { return new ModIncreaseEnergyPercent(this.set(132));  };
    /** */
    @EnumField(133)
    setModIncreaseHealthPercent(): ModIncreaseHealthPercent { return new ModIncreaseHealthPercent(this.set(133));  };
    /** */
    @EnumField(134)
    setModManaRegenInterrupt(): ModManaRegenInterrupt { return new ModManaRegenInterrupt(this.set(134));  };
    /** */
    @EnumField(135)
    setModHealingDone(): ModHealingDone { return new ModHealingDone(this.set(135));  };
    /** */
    @EnumField(136)
    setModHealingDonePercent(): ModHealingDonePercent { return new ModHealingDonePercent(this.set(136));  };
    /** */
    @EnumField(137)
    setModTotalStatPercentage(): ModTotalStatPercentage { return new ModTotalStatPercentage(this.set(137));  };
    /** */
    @EnumField(138)
    setModMeleeHaste(): ModMeleeHaste { return new ModMeleeHaste(this.set(138));  };
    /** */
    @EnumField(139)
    setForceReaction(): ForceReaction { return new ForceReaction(this.set(139));  };
    /** */
    @EnumField(140)
    setModRangedHaste(): ModRangedHaste { return new ModRangedHaste(this.set(140));  };
    /** */
    @EnumField(141)
    setModRangedAmmoHaste(): ModRangedAmmoHaste { return new ModRangedAmmoHaste(this.set(141));  };
    /** */
    @EnumField(142)
    setModBaseResistancePct(): ModBaseResistancePct { return new ModBaseResistancePct(this.set(142));  };
    /** */
    @EnumField(143)
    setModResistanceExclusive(): ModResistanceExclusive { return new ModResistanceExclusive(this.set(143));  };
    /** */
    @EnumField(144)
    setSafeFall(): SafeFall { return new SafeFall(this.set(144));  };
    /** */
    @EnumField(145)
    setModPetTalentPoints(): ModPetTalentPoints { return new ModPetTalentPoints(this.set(145));  };
    /** */
    @EnumField(146)
    setAllowTamePetType(): AllowTamePetType { return new AllowTamePetType(this.set(146));  };
    /** */
    @EnumField(147)
    setMechanicImmunityMask(): MechanicImmunityMask { return new MechanicImmunityMask(this.set(147));  };
    /** */
    @EnumField(148)
    setRetainComboPoints(): RetainComboPoints { return new RetainComboPoints(this.set(148));  };
    /** */
    @EnumField(149)
    setReducePushback(): ReducePushback { return new ReducePushback(this.set(149));  };
    /** */
    @EnumField(150)
    setModShieldBlockvaluePct(): ModShieldBlockValuePct { return new ModShieldBlockValuePct(this.set(150));  };
    /** */
    @EnumField(151)
    setTrackStealthed(): TrackStealthed { return new TrackStealthed(this.set(151));  };
    /** */
    @EnumField(152)
    setModDetectedRange(): ModDetectedRange { return new ModDetectedRange(this.set(152));  };
    /** */
    @EnumField(153)
    setSplitDamageFlat(): SplitDamageFlat { return new SplitDamageFlat(this.set(153));  };
    /** */
    @EnumField(154)
    setModStealthLevel(): ModStealthLevel { return new ModStealthLevel(this.set(154));  };
    /** */
    @EnumField(155)
    setModWaterBreathing(): ModWaterBreathing { return new ModWaterBreathing(this.set(155));  };
    /** */
    @EnumField(156)
    setModReputationGain(): ModReputationGain { return new ModReputationGain(this.set(156));  };
    /** */
    @EnumField(157)
    setPetDamageMulti(): PetDamageMulti { return new PetDamageMulti(this.set(157));  };
    /** */
    @EnumField(158)
    setModShieldBlockvalue(): ModShieldBlockValue { return new ModShieldBlockValue(this.set(158));  };
    /** */
    @EnumField(159)
    setNoPvpCredit(): NoPvPCredit { return new NoPvPCredit(this.set(159));  };
    /** */
    @EnumField(160)
    setModAoeAvoidance(): ModAoEAvoidance { return new ModAoEAvoidance(this.set(160));  };
    /** */
    @EnumField(161)
    setModHealthRegenInCombat() { return this.set(161);  };
    /** */
    @EnumField(162)
    setPowerBurn(): PowerBurn { return new PowerBurn(this.set(162));  };
    /** */
    @EnumField(163)
    setModCritDamageBonus(): ModCritDamageBonus { return new ModCritDamageBonus(this.set(163));  };
    /** */
    @EnumField(164)
    setSpellAura164() { return this.set(164);  };
    /** */
    @EnumField(165)
    setMeleeAttackPowerAttackerBonus(): MeleeAttackPowerAttackerBonus { return new MeleeAttackPowerAttackerBonus(this.set(165));  };
    /** */
    @EnumField(166)
    setModAttackPowerPct(): ModAttackPowerPct { return new ModAttackPowerPct(this.set(166));  };
    /** */
    @EnumField(167)
    setModRangedAttackPowerPct(): ModRangedAttackPowerPct { return new ModRangedAttackPowerPct(this.set(167));  };
    /** */
    @EnumField(168)
    setModDamageDoneVersus(): ModDamageDoneVersus { return new ModDamageDoneVersus(this.set(168));  };
    /** */
    @EnumField(169)
    setModCritPercentVersus(): ModCritPercentVersus { return new ModCritPercentVersus(this.set(169));  };
    /** */
    @EnumField(170)
    setDetectAmore(): DetectAmore { return new DetectAmore(this.set(170));  };
    /** */
    @EnumField(171)
    setModSpeedNotStack(): ModSpeedNotStack { return new ModSpeedNotStack(this.set(171));  };
    /** */
    @EnumField(172)
    setModMountedSpeedNotStack(): ModMountedSpeedNotStack { return new ModMountedSpeedNotStack(this.set(172));  };
    /** */
    @EnumField(173)
    setSpellAura173() { return this.set(173);  };
    /** */
    @EnumField(174)
    setModSpellDamageOfStatPercent(): ModSpellDamageOfStatPercent { return new ModSpellDamageOfStatPercent(this.set(174));  };
    /** */
    @EnumField(175)
    setModSpellHealingOfStatPercent(): ModSpellHealingOfStatPercent { return new ModSpellHealingOfStatPercent(this.set(175));  };
    /** */
    @EnumField(176)
    setSpiritOfRedemption(): SpiritOfRedemption { return new SpiritOfRedemption(this.set(176));  };
    /** */
    @EnumField(177)
    setAoeCharm(): AoECharm { return new AoECharm(this.set(177));  };
    /** */
    @EnumField(178)
    setModDebuffResistance(): ModDebuffResistance { return new ModDebuffResistance(this.set(178));  };
    /** */
    @EnumField(179)
    setModAttackerSpellCritChance(): ModAttackerSpellCritChance { return new ModAttackerSpellCritChance(this.set(179));  };
    /** */
    @EnumField(180)
    setModFlatSpellDamageVersus(): ModFlatSpellDamageVersus { return new ModFlatSpellDamageVersus(this.set(180));  };
    /** */
    @EnumField(181)
    setSpellAura181() { return this.set(181);  };
    /** */
    @EnumField(182)
    setModResistanceOfStatPercent(): ModResistanceOfStatPercent { return new ModResistanceOfStatPercent(this.set(182));  };
    /** */
    @EnumField(183)
    setModCriticalThreat(): ModCriticalThreat { return new ModCriticalThreat(this.set(183));  };
    /** */
    @EnumField(184)
    setModAttackerMeleeHitChance(): ModAttackerMeleeHitChance { return new ModAttackerMeleeHitChance(this.set(184));  };
    /** */
    @EnumField(185)
    setModAttackerRangedHitChance(): ModAttackerRangedHitChance { return new ModAttackerRangedHitChance(this.set(185));  };
    /** */
    @EnumField(186)
    setModAttackerSpellHitChance(): ModAttackerSpellHitChance { return new ModAttackerSpellHitChance(this.set(186));  };
    /** */
    @EnumField(187)
    setModAttackerMeleeCritChance(): ModAttackerMeleeCritChance { return new ModAttackerMeleeCritChance(this.set(187));  };
    /** */
    @EnumField(188)
    setModAttackerRangedCritChance(): ModAttackerRangedCritChance { return new ModAttackerRangedCritChance(this.set(188));  };
    /** */
    @EnumField(189)
    setModRating(): ModRating { return new ModRating(this.set(189));  };
    /** */
    @EnumField(190)
    setModFactionReputationGain(): ModFactionReputationGain { return new ModFactionReputationGain(this.set(190));  };
    /** */
    @EnumField(191)
    setUseNormalMovementSpeed(): UseNormalMovementSpeed { return new UseNormalMovementSpeed(this.set(191));  };
    /** */
    @EnumField(192)
    setModMeleeRangedHaste(): ModMeleeRangedHaste { return new ModMeleeRangedHaste(this.set(192));  };
    /** */
    @EnumField(193)
    setMeleeSlow(): MeleeSlow { return new MeleeSlow(this.set(193));  };
    /** */
    @EnumField(194)
    setModTargetAbsorbSchool(): ModTargetAbsorbSchool { return new ModTargetAbsorbSchool(this.set(194));  };
    /** */
    @EnumField(195)
    setModTargetAbilityAbsorbSchool(): ModTargetAbilityAbsorbSchool { return new ModTargetAbilityAbsorbSchool(this.set(195));  };
    /** */
    @EnumField(196)
    setModCooldown(): ModCooldown { return new ModCooldown(this.set(196));  };
    /** */
    @EnumField(197)
    setModAttackerSpellAndWeaponCritChance(): ModAttackerSpellAndWeaponCritChance { return new ModAttackerSpellAndWeaponCritChance(this.set(197));  };
    /** */
    @EnumField(198)
    setSpellAura198() { return this.set(198);  };
    /** */
    @EnumField(199)
    setModIncreasesSpellPctToHit(): ModIncreasesSpellPctToHit { return new ModIncreasesSpellPctToHit(this.set(199));  };
    /** */
    @EnumField(200)
    setModXpPct(): ModXpPct { return new ModXpPct(this.set(200));  };
    /** */
    @EnumField(201)
    setFly(): Fly { return new Fly(this.set(201));  };
    /** */
    @EnumField(202)
    setCannotBeDodged(): CannotBeDodged { return new CannotBeDodged(this.set(202));  };
    /** */
    @EnumField(203)
    setModAttackerMeleeCritDamage(): ModAttackerMeleeCritDamage { return new ModAttackerMeleeCritDamage(this.set(203));  };
    /** */
    @EnumField(204)
    setModAttackerRangedCritDamage(): ModAttackerRangedCritDamage { return new ModAttackerRangedCritDamage(this.set(204));  };
    /** */
    @EnumField(205)
    setModSchoolCritDmgTaken(): ModSchoolCritDmgTaken { return new ModSchoolCritDmgTaken(this.set(205));  };
    /** */
    @EnumField(206)
    setModIncreaseVehicleFlightSpeed(): ModIncreaseVehicleFlightSpeed { return new ModIncreaseVehicleFlightSpeed(this.set(206));  };
    /** */
    @EnumField(207)
    setModIncreaseMountedFlightSpeed(): ModIncreaseMountedFlightSpeed { return new ModIncreaseMountedFlightSpeed(this.set(207));  };
    /** */
    @EnumField(208)
    setModIncreaseFlightSpeed(): ModIncreaseFlightSpeed { return new ModIncreaseFlightSpeed(this.set(208));  };
    /** */
    @EnumField(209)
    setModMountedFlightSpeedAlways(): ModMountedFlightSpeedAlways { return new ModMountedFlightSpeedAlways(this.set(209));  };
    /** */
    @EnumField(210)
    setModVehicleSpeedAlways(): ModVehicleSpeedAlways { return new ModVehicleSpeedAlways(this.set(210));  };
    /** */
    @EnumField(211)
    setModFlightSpeedNotStack(): ModFlightSpeedNotStack { return new ModFlightSpeedNotStack(this.set(211));  };
    /** */
    @EnumField(212)
    setModRangedAttackPowerOfStatPercent(): ModRangedAttackPowerOfStatPercent { return new ModRangedAttackPowerOfStatPercent(this.set(212));  };
    /** */
    @EnumField(213)
    setModRageFromDamageDealt(): ModRageFromDamageDealt { return new ModRageFromDamageDealt(this.set(213));  };
    /** */
    @EnumField(214)
    setTamed(): Tamed { return new Tamed(this.set(214));  };
    /** */
    @EnumField(215)
    setArenaPreparation(): ArenaPreparation { return new ArenaPreparation(this.set(215));  };
    /** */
    @EnumField(216)
    setHasteSpells(): HasteSpells { return new HasteSpells(this.set(216));  };
    /** */
    @EnumField(217)
    setSpellAura217() { return this.set(217);  };
    /** */
    @EnumField(218)
    setHasteRanged(): HasteRanged { return new HasteRanged(this.set(218));  };
    /** */
    @EnumField(219)
    setModManaRegenFromStat(): ModManaRegenFromStat { return new ModManaRegenFromStat(this.set(219));  };
    /** */
    @EnumField(220)
    setModRatingFromStat(): ModRatingFromStat { return new ModRatingFromStat(this.set(220));  };
    /** */
    @EnumField(221)
    setModDetaunt(): ModDetaunt { return new ModDetaunt(this.set(221));  };
    /** */
    @EnumField(222)
    setSpellAura222() { return this.set(222);  };
    /** */
    @EnumField(223)
    setRaidProcFromCharge(): RaidProcFromCharge { return new RaidProcFromCharge(this.set(223));  };
    /** */
    @EnumField(224)
    setSpellAura224() { return this.set(224);  };
    /** */
    @EnumField(225)
    setRaidProcFromChargeWithValue(): RaidProcFromChargeWithValue { return new RaidProcFromChargeWithValue(this.set(225));  };
    /** */
    @EnumField(226)
    setPeriodicDummy() { return this.set(226);  };
    /** */
    @EnumField(227)
    setPeriodicTriggerSpellWithValue() { return this.set(227);  };
    /** */
    @EnumField(228)
    setDetectStealth(): DetectStealth { return new DetectStealth(this.set(228));  };
    /** */
    @EnumField(229)
    setModAoeDamageAvoidance(): ModAoEDamageAvoidance { return new ModAoEDamageAvoidance(this.set(229));  };
    /** */
    @EnumField(230)
    setModIncreaseHealth2(): ModIncreaseHealth2 { return new ModIncreaseHealth2(this.set(230));  };
    /** */
    @EnumField(231)
    setProcTriggerSpellWithValue() { return this.set(231);  };
    /** */
    @EnumField(232)
    setMechanicDurationMod(): MechanicDurationMod { return new MechanicDurationMod(this.set(232));  };
    /** */
    @EnumField(233)
    setSpellAura233() { return this.set(233);  };
    /** */
    @EnumField(234)
    setMechanicDurationModNotStack(): MechanicDurationModNotStack { return new MechanicDurationModNotStack(this.set(234));  };
    /** */
    @EnumField(235)
    setModDispelResist(): ModDispelResist { return new ModDispelResist(this.set(235));  };
    /** */
    @EnumField(236)
    setControlVehicle(): ControlVehicle { return new ControlVehicle(this.set(236));  };
    /** */
    @EnumField(237)
    setModSpellDamageOfAttackPower(): ModSpellDamageOfAttackPower { return new ModSpellDamageOfAttackPower(this.set(237));  };
    /** */
    @EnumField(238)
    setModSpellHealingOfAttackPower(): ModSpellHealingOfAttackPower { return new ModSpellHealingOfAttackPower(this.set(238));  };
    /** */
    @EnumField(239)
    setModScale2(): ModScale2 { return new ModScale2(this.set(239));  };
    /** */
    @EnumField(240)
    setModExpertise(): ModExpertise { return new ModExpertise(this.set(240));  };
    /** */
    @EnumField(241)
    setForceMoveForward(): ForceMoveForward { return new ForceMoveForward(this.set(241));  };
    /** */
    @EnumField(242)
    setModSpellDamageFromHealing(): ModSpellDamageFromHealing { return new ModSpellDamageFromHealing(this.set(242));  };
    /** */
    @EnumField(243)
    setModFaction(): ModFaction { return new ModFaction(this.set(243));  };
    /** */
    @EnumField(244)
    setComprehendLanguage(): ComprehendLanguage { return new ComprehendLanguage(this.set(244));  };
    /** */
    @EnumField(245)
    setModAuraDurationByDispel(): ModAuraDurationByDispel { return new ModAuraDurationByDispel(this.set(245));  };
    /** */
    @EnumField(246)
    setModAuraDurationByDispelNotStack(): ModAuraDurationByDispelNotStack { return new ModAuraDurationByDispelNotStack(this.set(246));  };
    /** */
    @EnumField(247)
    setCloneCaster(): CloneCaster { return new CloneCaster(this.set(247));  };
    /** */
    @EnumField(248)
    setModCombatResultChance(): ModCombatResultChance { return new ModCombatResultChance(this.set(248));  };
    /** */
    @EnumField(249)
    setConvertRune(): ConvertRune { return new ConvertRune(this.set(249));  };
    /** */
    @EnumField(250)
    setModIncreaseHealth3(): ModIncreaseHealth3 { return new ModIncreaseHealth3(this.set(250));  };
    /** */
    @EnumField(251)
    setModEnemyDodge(): ModEnemyDodge { return new ModEnemyDodge(this.set(251));  };
    /** */
    @EnumField(252)
    setSpellAura252() { return this.set(252);  };
    /** */
    @EnumField(253)
    setModBlockCritChance(): ModBlockCritChance { return new ModBlockCritChance(this.set(253));  };
    /** */
    @EnumField(254)
    setModDisarmOffhand(): ModDisarmOffhand { return new ModDisarmOffhand(this.set(254));  };
    /** */
    @EnumField(255)
    setModMechanicDamageTakenPercent(): ModMechanicDamageTakenPercent { return new ModMechanicDamageTakenPercent(this.set(255));  };
    /** */
    @EnumField(256)
    setNoReagentUse(): NoReagentUse { return new NoReagentUse(this.set(256));  };
    /** */
    @EnumField(257)
    setModTargetResistBySpellClass(): ModTargetResistBySpellClass { return new ModTargetResistBySpellClass(this.set(257));  };
    /** */
    @EnumField(258)
    setModSpellVisual() { return this.set(258);  };
    /** */
    @EnumField(259)
    setModHotPct(): ModHotPct { return new ModHotPct(this.set(259));  };
    /** */
    @EnumField(260)
    setScreenEffect(): ScreenEffect { return new ScreenEffect(this.set(260));  };
    /** */
    @EnumField(261)
    setPhase(): Phase { return new Phase(this.set(261));  };
    /** */
    @EnumField(262)
    setAbilityIgnoreAurastate() { return this.set(262);  };
    /** */
    @EnumField(263)
    setAllowOnlyAbility(): AllowOnlyAbility { return new AllowOnlyAbility(this.set(263));  };
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
    setModImmuneAuraApplySchool(): ModImmuneAuraApplySchool { return new ModImmuneAuraApplySchool(this.set(267));  };
    /** */
    @EnumField(268)
    setModAttackPowerOfStatPercent(): ModAttackPowerOfStatPercent { return new ModAttackPowerOfStatPercent(this.set(268));  };
    /** */
    @EnumField(269)
    setModIgnoreTargetResist(): ModIgnoreTargetResist { return new ModIgnoreTargetResist(this.set(269));  };
    /** */
    @EnumField(270)
    setModAbilityIgnoreTargetResist() { return this.set(270);  };
    /** */
    @EnumField(271)
    setModDamageFromCaster(): ModDamageFromCaster { return new ModDamageFromCaster(this.set(271));  };
    /** */
    @EnumField(272)
    setIgnoreMeleeReset(): IgnoreMeleeReset { return new IgnoreMeleeReset(this.set(272));  };
    /** */
    @EnumField(273)
    setSpellAura273() { return this.set(273);  };
    /** */
    @EnumField(274)
    setConsumeNoAmmo(): ConsumeNoAmmo { return new ConsumeNoAmmo(this.set(274));  };
    /** */
    @EnumField(275)
    setModIgnoreShapeshift(): ModIgnoreShapeshift { return new ModIgnoreShapeshift(this.set(275));  };
    /** */
    @EnumField(276)
    setSpellAura276() { return this.set(276);  };
    /** */
    @EnumField(277)
    setModAbilityAffectedTargets(): ModAbilityAffectedTargets { return new ModAbilityAffectedTargets(this.set(277));  };
    /** */
    @EnumField(278)
    setModDisarmRanged(): ModDisarmRanged { return new ModDisarmRanged(this.set(278));  };
    /** */
    @EnumField(279)
    setInitializeImages(): InitializeImages { return new InitializeImages(this.set(279));  };
    /** */
    @EnumField(280)
    setModTargetArmorPct(): ModTargetArmorPct { return new ModTargetArmorPct(this.set(280));  };
    /** */
    @EnumField(281)
    setModHonorGainPct(): ModHonorGainPct { return new ModHonorGainPct(this.set(281));  };
    /** */
    @EnumField(282)
    setIncreaseBaseHealthPercent(): IncreaseBaseHealthPercent { return new IncreaseBaseHealthPercent(this.set(282));  };
    /** */
    @EnumField(283)
    setModHealingReceived(): ModHealingReceived { return new ModHealingReceived(this.set(283));  };
    /** */
    @EnumField(284)
    setLinked() { return this.set(284);  };
    /** */
    @EnumField(285)
    setModAttackPowerOfArmor(): ModAttackPowerOfArmor { return new ModAttackPowerOfArmor(this.set(285));  };
    /** */
    @EnumField(286)
    setAbilityPeriodicCrit() { return this.set(286);  };
    /** */
    @EnumField(287)
    setDeflectSpells(): DeflectSpells { return new DeflectSpells(this.set(287));  };
    /** */
    @EnumField(288)
    setIgnoreHitDirection(): IgnoreHitDirection { return new IgnoreHitDirection(this.set(288));  };
    /** */
    @EnumField(289)
    setSpellAura289() { return this.set(289);  };
    /** */
    @EnumField(290)
    setModCritPct(): ModCritPct { return new ModCritPct(this.set(290));  };
    /** */
    @EnumField(291)
    setModXpQuestPct(): ModXpQuestPct { return new ModXpQuestPct(this.set(291));  };
    /** */
    @EnumField(292)
    setOpenStable() { return this.set(292);  };
    /** */
    @EnumField(293)
    setSpellAura293() { return this.set(293);  };
    /** */
    @EnumField(294)
    setPreventRegeneratePower(): PreventRegeneratePower { return new PreventRegeneratePower(this.set(294));  };
    /** */
    @EnumField(295)
    setSpellAura295() { return this.set(295);  };
    /** */
    @EnumField(296)
    setSetVehicleId(): SetVehicleId { return new SetVehicleId(this.set(296));  };
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
    setShareDamagePct(): ShareDamagePct { return new ShareDamagePct(this.set(300));  };
    /** */
    @EnumField(301)
    setSchoolHealAbsorb(): SchoolHealAbsorb { return new SchoolHealAbsorb(this.set(301));  };
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
    setModMinimumSpeed(): ModMinimumSpeed { return new ModMinimumSpeed(this.set(305));  };
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
    setModCreatureAoeDamageAvoidance(): ModCreatureAoEDamageAvoidance { return new ModCreatureAoEDamageAvoidance(this.set(310));  };
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
    setPreventResurrection(): PreventResurrection { return new PreventResurrection(this.set(314));  };
    /** */
    @EnumField(315)
    setUnderwaterWalking(): UnderwaterWalking { return new UnderwaterWalking(this.set(315));  };
    /** */
    @EnumField(316)
    setPeriodicHaste() { return this.set(316);  };
}
