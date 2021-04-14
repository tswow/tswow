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
    setModPossess(): ModPossess<T> { return new ModPossess(this.end.end, this.set(2));  };
    /** */
    @EnumField(3)
    setPeriodicDamage(): PeriodicDamage<T> { return new PeriodicDamage(this.end.end, this.set(3));  };
    /** */
    @EnumField(4)
    setDummy() { return this.set(4);  };
    /** */
    @EnumField(5)
    setModConfuse(): ModConfuse<T> { return new ModConfuse(this.end.end, this.set(5));  };
    /** */
    @EnumField(6)
    setModCharm(): ModCharm<T> { return new ModCharm(this.end.end, this.set(6));  };
    /** */
    @EnumField(7)
    setModFear(): ModFear<T> { return new ModFear(this.end.end, this.set(7));  };
    /** */
    @EnumField(8)
    setPeriodicHeal(): PeriodicHeal<T> { return new PeriodicHeal(this.end.end, this.set(8));  };
    /** */
    @EnumField(9)
    setModAttackspeed(): ModAttackSpeed<T> { return new ModAttackSpeed(this.end.end, this.set(9));  };
    /** */
    @EnumField(10)
    setModThreat(): ModThreat<T> { return new ModThreat(this.end.end, this.set(10));  };
    /** */
    @EnumField(11)
    setModTaunt(): ModTaunt<T> { return new ModTaunt(this.end.end, this.set(11));  };
    /** */
    @EnumField(12)
    setModStun(): ModStun<T> { return new ModStun(this.end.end, this.set(12));  };
    /** */
    @EnumField(13)
    setModDamageDone(): ModDamageDone<T> { return new ModDamageDone(this.end.end, this.set(13));  };
    /** */
    @EnumField(14)
    setModDamageTaken(): ModDamageTaken<T> { return new ModDamageTaken(this.end.end, this.set(14));  };
    /** */
    @EnumField(15)
    setDamageShield(): DamageShield<T> { return new DamageShield(this.end.end, this.set(15));  };
    /** */
    @EnumField(16)
    setModStealth(): ModStealth<T> { return new ModStealth(this.end.end, this.set(16));  };
    /** */
    @EnumField(17)
    setModDetect(): ModDetect<T> { return new ModDetect(this.end.end, this.set(17));  };
    /** */
    @EnumField(18)
    setModInvisibility(): ModInvisibility<T> { return new ModInvisibility(this.end.end, this.set(18));  };
    /** */
    @EnumField(19)
    setModInvisibilityDetection(): ModInvisibilityDetection<T> { return new ModInvisibilityDetection(this.end.end, this.set(19));  };
    /** */
    @EnumField(20)
    setObsModHealth(): ObsModHealth<T> { return new ObsModHealth(this.end.end, this.set(20));  };
    /** */
    @EnumField(21)
    setObsModPower(): ObsModPower<T> { return new ObsModPower(this.end.end, this.set(21));  };
    /** */
    @EnumField(22)
    setModResistance(): ModResistance<T> { return new ModResistance(this.end.end, this.set(22));  };
    /** */
    @EnumField(23)
    setPeriodicTriggerSpell() { return this.set(23);  };
    /** */
    @EnumField(24)
    setPeriodicEnergize(): PeriodicEnergize<T> { return new PeriodicEnergize(this.end.end, this.set(24));  };
    /** */
    @EnumField(25)
    setModPacify(): ModPacify<T> { return new ModPacify(this.end.end, this.set(25));  };
    /** */
    @EnumField(26)
    setModRoot(): ModRoot<T> { return new ModRoot(this.end.end, this.set(26));  };
    /** */
    @EnumField(27)
    setModSilence(): ModSilence<T> { return new ModSilence(this.end.end, this.set(27));  };
    /** */
    @EnumField(28)
    setReflectSpells(): ReflectSpells<T> { return new ReflectSpells(this.end.end, this.set(28));  };
    /** */
    @EnumField(29)
    setModStat(): ModStat<T> { return new ModStat(this.end.end, this.set(29));  };
    /** */
    @EnumField(30)
    setModSkill(): ModSkill<T> { return new ModSkill(this.end.end, this.set(30));  };
    /** */
    @EnumField(31)
    setModIncreaseSpeed(): ModIncreaseSpeed<T> { return new ModIncreaseSpeed(this.end.end, this.set(31));  };
    /** */
    @EnumField(32)
    setModIncreaseMountedSpeed(): ModIncreaseMountSpeed<T> { return new ModIncreaseMountSpeed(this.end.end, this.set(32));  };
    /** */
    @EnumField(33)
    setModDecreaseSpeed(): ModDecreaseSpeed<T> { return new ModDecreaseSpeed(this.end.end, this.set(33));  };
    /** */
    @EnumField(34)
    setModIncreaseHealth(): ModIncreaseHealth<T> { return new ModIncreaseHealth(this.end.end, this.set(34));  };
    /** */
    @EnumField(35)
    setModIncreaseEnergy(): ModIncreaseEnergy<T> { return new ModIncreaseEnergy(this.end.end, this.set(35));  };
    /** */
    @EnumField(36)
    setModShapeshift(): ModShapeshift<T> { return new ModShapeshift(this.end.end, this.set(36));  };
    /** */
    @EnumField(37)
    setEffectImmunity(): EffectImmunity<T> { return new EffectImmunity(this.end.end, this.set(37));  };
    /** */
    @EnumField(38)
    setStateImmunity(): StateImmunity<T> { return new StateImmunity(this.end.end, this.set(38));  };
    /** */
    @EnumField(39)
    setSchoolImmunity(): SchoolImmunity<T> { return new SchoolImmunity(this.end.end, this.set(39));  };
    /** */
    @EnumField(40)
    setDamageImmunity(): DamageImmunity<T> { return new DamageImmunity(this.end.end, this.set(40));  };
    /** */
    @EnumField(41)
    setDispelImmunity(): DispelImmunity<T> { return new DispelImmunity(this.end.end, this.set(41));  };
    /** */
    @EnumField(42)
    setProcTriggerSpell(): ProcTriggerSpell<T> { return new ProcTriggerSpell(this.end.end, this.set(42));  };
    /** */
    @EnumField(43)
    setProcTriggerDamage(): ProcTriggerDamage<T> { return new ProcTriggerDamage(this.end.end, this.set(43));  };
    /** */
    @EnumField(44)
    setTrackCreatures(): TrackCreatures<T> { return new TrackCreatures(this.end.end, this.set(44));  };
    /** */
    @EnumField(45)
    setTrackResources(): TrackResources<T> { return new TrackResources(this.end.end, this.set(45));  };
    /** */
    @EnumField(46)
    setSpellAura46() { return this.set(46);  };
    /** */
    @EnumField(47)
    setModParryPercent(): ModParryPercent<T> { return new ModParryPercent(this.end.end, this.set(47));  };
    /** */
    @EnumField(48)
    setSpellAura48() { return this.set(48);  };
    /** */
    @EnumField(49)
    setModDodgePercent(): ModDodgePercent<T> { return new ModDodgePercent(this.end.end, this.set(49));  };
    /** */
    @EnumField(50)
    setModCriticalHealingAmount(): ModCriticalHealAmount<T> { return new ModCriticalHealAmount(this.end.end, this.set(50));  };
    /** */
    @EnumField(51)
    setModBlockPercent(): ModBlockPercent<T> { return new ModBlockPercent(this.end.end, this.set(51));  };
    /** */
    @EnumField(52)
    setModWeaponCritPercent(): ModWeaponCritPercent<T> { return new ModWeaponCritPercent(this.end.end, this.set(52));  };
    /** */
    @EnumField(53)
    setPeriodicLeech(): PeriodicLeech<T> { return new PeriodicLeech(this.end.end, this.set(53));  };
    /** */
    @EnumField(54)
    setModHitChance(): ModHitChance<T> { return new ModHitChance(this.end.end, this.set(54));  };
    /** */
    @EnumField(55)
    setModSpellHitChance(): ModSpellHitChance<T> { return new ModSpellHitChance(this.end.end, this.set(55));  };
    /** */
    @EnumField(56)
    setTransform(): Transform<T> { return new Transform(this.end.end, this.set(56));  };
    /** */
    @EnumField(57)
    setModSpellCritChance(): ModSpellCritChance<T> { return new ModSpellCritChance(this.end.end, this.set(57));  };
    /** */
    @EnumField(58)
    setModIncreaseSwimSpeed(): ModIncreaseSwimSpeed<T> { return new ModIncreaseSwimSpeed(this.end.end, this.set(58));  };
    /** */
    @EnumField(59)
    setModDamageDoneCreature(): ModDamageDoneCreature<T> { return new ModDamageDoneCreature(this.end.end, this.set(59));  };
    /** */
    @EnumField(60)
    setModPacifySilence(): ModPacifySilence<T> { return new ModPacifySilence(this.end.end, this.set(60));  };
    /** */
    @EnumField(61)
    setModScale(): ModScale<T> { return new ModScale(this.end.end, this.set(61));  };
    /** */
    @EnumField(62)
    setPeriodicHealthFunnel(): PeriodicHealthFunnel<T> { return new PeriodicHealthFunnel(this.end.end, this.set(62));  };
    /** */
    @EnumField(63)
    setSpellAura63() { return this.set(63);  };
    /** */
    @EnumField(64)
    setPeriodicManaLeech(): PeriodicManaLeech<T> { return new PeriodicManaLeech(this.end.end, this.set(64));  };
    /** */
    @EnumField(65)
    setModCastingSpeedNotStack(): ModCastingSpeedNotStack<T> { return new ModCastingSpeedNotStack(this.end.end, this.set(65));  };
    /** */
    @EnumField(66)
    setFeignDeath(): FeignDeath<T> { return new FeignDeath(this.end.end, this.set(66));  };
    /** */
    @EnumField(67)
    setModDisarm(): ModDisarm<T> { return new ModDisarm(this.end.end, this.set(67));  };
    /** */
    @EnumField(68)
    setModStalked(): ModStalked<T> { return new ModStalked(this.end.end, this.set(68));  };
    /** */
    @EnumField(69)
    setSchoolAbsorb(): SchoolAbsorb<T> { return new SchoolAbsorb(this.end.end, this.set(69));  };
    /** */
    @EnumField(70)
    setExtraAttacks() { return this.set(70);  };
    /** */
    @EnumField(71)
    setModSpellCritChanceSchool(): ModSpellCritChanceSchool<T> { return new ModSpellCritChanceSchool(this.end.end, this.set(71));  };
    /** */
    @EnumField(72)
    setModPowerCostSchoolPct(): ModPowerCostSchoolPct<T> { return new ModPowerCostSchoolPct(this.end.end, this.set(72));  };
    /** */
    @EnumField(73)
    setModPowerCostSchool(): ModPowerCostSchool<T> { return new ModPowerCostSchool(this.end.end, this.set(73));  };
    /** */
    @EnumField(74)
    setReflectSpellsSchool(): ReflectSpellsSchool<T> { return new ReflectSpellsSchool(this.end.end, this.set(74));  };
    /** */
    @EnumField(75)
    setModLanguage(): ModLanguage<T> { return new ModLanguage(this.end.end, this.set(75));  };
    /** */
    @EnumField(76)
    setFarSight(): FarSight<T> { return new FarSight(this.end.end, this.set(76));  };
    /** */
    @EnumField(77)
    setMechanicImmunity(): MechanicImmunity<T> { return new MechanicImmunity(this.end.end, this.set(77));  };
    /** */
    @EnumField(78)
    setMounted(): Mounted<T> { return new Mounted(this.end.end, this.set(78));  };
    /** */
    @EnumField(79)
    setModDamagePercentDone(): ModDamagePercentDone<T> { return new ModDamagePercentDone(this.end.end, this.set(79));  };
    /** */
    @EnumField(80)
    setModPercentStat(): ModPercentStat<T> { return new ModPercentStat(this.end.end, this.set(80));  };
    /** */
    @EnumField(81)
    setSplitDamagePct(): SplitDamagePct<T> { return new SplitDamagePct(this.end.end, this.set(81));  };
    /** */
    @EnumField(82)
    setWaterBreathing(): WaterBreathing<T> { return new WaterBreathing(this.end.end, this.set(82));  };
    /** */
    @EnumField(83)
    setModBaseResistance(): ModBaseResistance<T> { return new ModBaseResistance(this.end.end, this.set(83));  };
    /** */
    @EnumField(84)
    setModRegen(): ModRegen<T> { return new ModRegen(this.end.end, this.set(84));  };
    /** */
    @EnumField(85)
    setModPowerRegen(): ModPowerRegen<T> { return new ModPowerRegen(this.end.end, this.set(85));  };
    /** */
    @EnumField(86)
    setChannelDeathItem(): ChannelDeathItem<T> { return new ChannelDeathItem(this.end.end, this.set(86));  };
    /** */
    @EnumField(87)
    setModDamagePercentTaken(): ModDamagePercentTaken<T> { return new ModDamagePercentTaken(this.end.end, this.set(87));  };
    /** */
    @EnumField(88)
    setModHealthRegenPercent(): ModHealthRegenPercent<T> { return new ModHealthRegenPercent(this.end.end, this.set(88));  };
    /** */
    @EnumField(89)
    setPeriodicDamagePercent(): PeriodicDamagePercent<T> { return new PeriodicDamagePercent(this.end.end, this.set(89));  };
    /** */
    @EnumField(90)
    setSpellAura90() { return this.set(90);  };
    /** */
    @EnumField(91)
    setModDetectRange(): ModDetectRange<T> { return new ModDetectRange(this.end.end, this.set(91));  };
    /** */
    @EnumField(92)
    setPreventsFleeing(): PreventsFleeing<T> { return new PreventsFleeing(this.end.end, this.set(92));  };
    /** */
    @EnumField(93)
    setModUnattackable(): ModUnattackable<T> { return new ModUnattackable(this.end.end, this.set(93));  };
    /** */
    @EnumField(94)
    setInterruptRegen(): InterruptRegen<T> { return new InterruptRegen(this.end.end, this.set(94));  };
    /** */
    @EnumField(95)
    setGhost(): Ghost<T> { return new Ghost(this.end.end, this.set(95));  };
    /** */
    @EnumField(96)
    setSpellMagnet(): SpellMagnet<T> { return new SpellMagnet(this.end.end, this.set(96));  };
    /** */
    @EnumField(97)
    setManaShield(): ManaShield<T> { return new ManaShield(this.end.end, this.set(97));  };
    /** */
    @EnumField(98)
    setModSkillTalent(): ModSkillTalent<T> { return new ModSkillTalent(this.end.end, this.set(98));  };
    /** */
    @EnumField(99)
    setModAttackPower(): ModAttackPower<T> { return new ModAttackPower(this.end.end, this.set(99));  };
    /** */
    @EnumField(100)
    setAurasVisible(): AurasVisible<T> { return new AurasVisible(this.end.end, this.set(100));  };
    /** */
    @EnumField(101)
    setModResistancePct(): ModResistancePct<T> { return new ModResistancePct(this.end.end, this.set(101));  };
    /** */
    @EnumField(102)
    setModMeleeAttackPowerVersus(): ModMeleeAttackPowerVersus<T> { return new ModMeleeAttackPowerVersus(this.end.end, this.set(102));  };
    /** */
    @EnumField(103)
    setModTotalThreat(): ModTotalThreat<T> { return new ModTotalThreat(this.end.end, this.set(103));  };
    /** */
    @EnumField(104)
    setWaterWalk(): WaterWalk<T> { return new WaterWalk(this.end.end, this.set(104));  };
    /** */
    @EnumField(105)
    setFeatherFall(): FeatherFall<T> { return new FeatherFall(this.end.end, this.set(105));  };
    /** */
    @EnumField(106)
    setHover(): Hover<T> { return new Hover(this.end.end, this.set(106));  };
    /** */
    @EnumField(107)
    setAddFlatModifier(): AddFlatModifier<T> { return new AddFlatModifier(this.end.end, this.set(107));  };
    /** */
    @EnumField(108)
    setAddPctModifier(): AddPctModifier<T> { return new AddPctModifier(this.end.end, this.set(108));  };
    /** */
    @EnumField(109)
    setAddTargetTrigger(): AddTargetTrigger<T> { return new AddTargetTrigger(this.end.end, this.set(109));  };
    /** */
    @EnumField(110)
    setModPowerRegenPercent(): ModPowerRegenPercent<T> { return new ModPowerRegenPercent(this.end.end, this.set(110));  };
    /** */
    @EnumField(111)
    setAddCasterHitTrigger(): AddCasterHitTrigger<T> { return new AddCasterHitTrigger(this.end.end, this.set(111));  };
    /** */
    @EnumField(112)
    setOverrideClassScripts() { return this.set(112);  };
    /** */
    @EnumField(113)
    setModRangedDamageTaken(): ModRangedDamageTaken<T> { return new ModRangedDamageTaken(this.end.end, this.set(113));  };
    /** */
    @EnumField(114)
    setModRangedDamageTakenPct(): ModRangedDamageTakenPct<T> { return new ModRangedDamageTakenPct(this.end.end, this.set(114));  };
    /** */
    @EnumField(115)
    setModHealing(): ModHealing<T> { return new ModHealing(this.end.end, this.set(115));  };
    /** */
    @EnumField(116)
    setModRegenDuringCombat(): ModRegenDuringCombat<T> { return new ModRegenDuringCombat(this.end.end, this.set(116));  };
    /** */
    @EnumField(117)
    setModMechanicResistance(): ModMechanicResistance<T> { return new ModMechanicResistance(this.end.end, this.set(117));  };
    /** */
    @EnumField(118)
    setModHealingPct(): ModHealingPct<T> { return new ModHealingPct(this.end.end, this.set(118));  };
    /** */
    @EnumField(119)
    setSpellAura119() { return this.set(119);  };
    /** */
    @EnumField(120)
    setUntrackable(): Untrackable<T> { return new Untrackable(this.end.end, this.set(120));  };
    /** */
    @EnumField(121)
    setEmpathy(): Empathy<T> { return new Empathy(this.end.end, this.set(121));  };
    /** */
    @EnumField(122)
    setModOffhandDamagePct(): ModOffhandDamagePct<T> { return new ModOffhandDamagePct(this.end.end, this.set(122));  };
    /** */
    @EnumField(123)
    setModTargetResistance(): ModTargetResistance<T> { return new ModTargetResistance(this.end.end, this.set(123));  };
    /** */
    @EnumField(124)
    setModRangedAttackPower(): ModRangedAttackPower<T> { return new ModRangedAttackPower(this.end.end, this.set(124));  };
    /** */
    @EnumField(125)
    setModMeleeDamageTaken(): ModMeleeDamageTaken<T> { return new ModMeleeDamageTaken(this.end.end, this.set(125));  };
    /** */
    @EnumField(126)
    setModMeleeDamageTakenPct(): ModMeleeDamageTakenPct<T> { return new ModMeleeDamageTakenPct(this.end.end, this.set(126));  };
    /** */
    @EnumField(127)
    setRangedAttackPowerAttackerBonus(): RangedAttackPowerAttackerBonus<T> { return new RangedAttackPowerAttackerBonus(this.end.end, this.set(127));  };
    /** */
    @EnumField(128)
    setModPossessPet(): ModPossessPet<T> { return new ModPossessPet(this.end.end, this.set(128));  };
    /** */
    @EnumField(129)
    setModSpeedAlways(): ModSpeedAlways<T> { return new ModSpeedAlways(this.end.end, this.set(129));  };
    /** */
    @EnumField(130)
    setModMountedSpeedAlways(): ModMountedSpeedAlways<T> { return new ModMountedSpeedAlways(this.end.end, this.set(130));  };
    /** */
    @EnumField(131)
    setModRangedAttackPowerVersus(): ModRangedAttackPowerVersus<T> { return new ModRangedAttackPowerVersus(this.end.end, this.set(131));  };
    /** */
    @EnumField(132)
    setModIncreaseEnergyPercent(): ModIncreaseEnergyPercent<T> { return new ModIncreaseEnergyPercent(this.end.end, this.set(132));  };
    /** */
    @EnumField(133)
    setModIncreaseHealthPercent(): ModIncreaseHealthPercent<T> { return new ModIncreaseHealthPercent(this.end.end, this.set(133));  };
    /** */
    @EnumField(134)
    setModManaRegenInterrupt(): ModManaRegenInterrupt<T> { return new ModManaRegenInterrupt(this.end.end, this.set(134));  };
    /** */
    @EnumField(135)
    setModHealingDone(): ModHealingDone<T> { return new ModHealingDone(this.end.end, this.set(135));  };
    /** */
    @EnumField(136)
    setModHealingDonePercent(): ModHealingDonePercent<T> { return new ModHealingDonePercent(this.end.end, this.set(136));  };
    /** */
    @EnumField(137)
    setModTotalStatPercentage(): ModTotalStatPercentage<T> { return new ModTotalStatPercentage(this.end.end, this.set(137));  };
    /** */
    @EnumField(138)
    setModMeleeHaste(): ModMeleeHaste<T> { return new ModMeleeHaste(this.end.end, this.set(138));  };
    /** */
    @EnumField(139)
    setForceReaction(): ForceReaction<T> { return new ForceReaction(this.end.end, this.set(139));  };
    /** */
    @EnumField(140)
    setModRangedHaste(): ModRangedHaste<T> { return new ModRangedHaste(this.end.end, this.set(140));  };
    /** */
    @EnumField(141)
    setModRangedAmmoHaste(): ModRangedAmmoHaste<T> { return new ModRangedAmmoHaste(this.end.end, this.set(141));  };
    /** */
    @EnumField(142)
    setModBaseResistancePct(): ModBaseResistancePct<T> { return new ModBaseResistancePct(this.end.end, this.set(142));  };
    /** */
    @EnumField(143)
    setModResistanceExclusive(): ModResistanceExclusive<T> { return new ModResistanceExclusive(this.end.end, this.set(143));  };
    /** */
    @EnumField(144)
    setSafeFall(): SafeFall<T> { return new SafeFall(this.end.end, this.set(144));  };
    /** */
    @EnumField(145)
    setModPetTalentPoints(): ModPetTalentPoints<T> { return new ModPetTalentPoints(this.end.end, this.set(145));  };
    /** */
    @EnumField(146)
    setAllowTamePetType(): AllowTamePetType<T> { return new AllowTamePetType(this.end.end, this.set(146));  };
    /** */
    @EnumField(147)
    setMechanicImmunityMask(): MechanicImmunityMask<T> { return new MechanicImmunityMask(this.end.end, this.set(147));  };
    /** */
    @EnumField(148)
    setRetainComboPoints(): RetainComboPoints<T> { return new RetainComboPoints(this.end.end, this.set(148));  };
    /** */
    @EnumField(149)
    setReducePushback(): ReducePushback<T> { return new ReducePushback(this.end.end, this.set(149));  };
    /** */
    @EnumField(150)
    setModShieldBlockvaluePct(): ModShieldBlockValuePct<T> { return new ModShieldBlockValuePct(this.end.end, this.set(150));  };
    /** */
    @EnumField(151)
    setTrackStealthed(): TrackStealthed<T> { return new TrackStealthed(this.end.end, this.set(151));  };
    /** */
    @EnumField(152)
    setModDetectedRange(): ModDetectedRange<T> { return new ModDetectedRange(this.end.end, this.set(152));  };
    /** */
    @EnumField(153)
    setSplitDamageFlat(): SplitDamageFlat<T> { return new SplitDamageFlat(this.end.end, this.set(153));  };
    /** */
    @EnumField(154)
    setModStealthLevel(): ModStealthLevel<T> { return new ModStealthLevel(this.end.end, this.set(154));  };
    /** */
    @EnumField(155)
    setModWaterBreathing(): ModWaterBreathing<T> { return new ModWaterBreathing(this.end.end, this.set(155));  };
    /** */
    @EnumField(156)
    setModReputationGain(): ModReputationGain<T> { return new ModReputationGain(this.end.end, this.set(156));  };
    /** */
    @EnumField(157)
    setPetDamageMulti(): PetDamageMulti<T> { return new PetDamageMulti(this.end.end, this.set(157));  };
    /** */
    @EnumField(158)
    setModShieldBlockvalue(): ModShieldBlockValue<T> { return new ModShieldBlockValue(this.end.end, this.set(158));  };
    /** */
    @EnumField(159)
    setNoPvpCredit(): NoPvPCredit<T> { return new NoPvPCredit(this.end.end, this.set(159));  };
    /** */
    @EnumField(160)
    setModAoeAvoidance(): ModAoEAvoidance<T> { return new ModAoEAvoidance(this.end.end, this.set(160));  };
    /** */
    @EnumField(161)
    setModHealthRegenInCombat() { return this.set(161);  };
    /** */
    @EnumField(162)
    setPowerBurn(): PowerBurn<T> { return new PowerBurn(this.end.end, this.set(162));  };
    /** */
    @EnumField(163)
    setModCritDamageBonus(): ModCritDamageBonus<T> { return new ModCritDamageBonus(this.end.end, this.set(163));  };
    /** */
    @EnumField(164)
    setSpellAura164() { return this.set(164);  };
    /** */
    @EnumField(165)
    setMeleeAttackPowerAttackerBonus(): MeleeAttackPowerAttackerBonus<T> { return new MeleeAttackPowerAttackerBonus(this.end.end, this.set(165));  };
    /** */
    @EnumField(166)
    setModAttackPowerPct(): ModAttackPowerPct<T> { return new ModAttackPowerPct(this.end.end, this.set(166));  };
    /** */
    @EnumField(167)
    setModRangedAttackPowerPct(): ModRangedAttackPowerPct<T> { return new ModRangedAttackPowerPct(this.end.end, this.set(167));  };
    /** */
    @EnumField(168)
    setModDamageDoneVersus(): ModDamageDoneVersus<T> { return new ModDamageDoneVersus(this.end.end, this.set(168));  };
    /** */
    @EnumField(169)
    setModCritPercentVersus(): ModCritPercentVersus<T> { return new ModCritPercentVersus(this.end.end, this.set(169));  };
    /** */
    @EnumField(170)
    setDetectAmore(): DetectAmore<T> { return new DetectAmore(this.end.end, this.set(170));  };
    /** */
    @EnumField(171)
    setModSpeedNotStack(): ModSpeedNotStack<T> { return new ModSpeedNotStack(this.end.end, this.set(171));  };
    /** */
    @EnumField(172)
    setModMountedSpeedNotStack(): ModMountedSpeedNotStack<T> { return new ModMountedSpeedNotStack(this.end.end, this.set(172));  };
    /** */
    @EnumField(173)
    setSpellAura173() { return this.set(173);  };
    /** */
    @EnumField(174)
    setModSpellDamageOfStatPercent(): ModSpellDamageOfStatPercent<T> { return new ModSpellDamageOfStatPercent(this.end.end, this.set(174));  };
    /** */
    @EnumField(175)
    setModSpellHealingOfStatPercent(): ModSpellHealingOfStatPercent<T> { return new ModSpellHealingOfStatPercent(this.end.end, this.set(175));  };
    /** */
    @EnumField(176)
    setSpiritOfRedemption(): SpiritOfRedemption<T> { return new SpiritOfRedemption(this.end.end, this.set(176));  };
    /** */
    @EnumField(177)
    setAoeCharm(): AoECharm<T> { return new AoECharm(this.end.end, this.set(177));  };
    /** */
    @EnumField(178)
    setModDebuffResistance(): ModDebuffResistance<T> { return new ModDebuffResistance(this.end.end, this.set(178));  };
    /** */
    @EnumField(179)
    setModAttackerSpellCritChance(): ModAttackerSpellCritChance<T> { return new ModAttackerSpellCritChance(this.end.end, this.set(179));  };
    /** */
    @EnumField(180)
    setModFlatSpellDamageVersus(): ModFlatSpellDamageVersus<T> { return new ModFlatSpellDamageVersus(this.end.end, this.set(180));  };
    /** */
    @EnumField(181)
    setSpellAura181() { return this.set(181);  };
    /** */
    @EnumField(182)
    setModResistanceOfStatPercent(): ModResistanceOfStatPercent<T> { return new ModResistanceOfStatPercent(this.end.end, this.set(182));  };
    /** */
    @EnumField(183)
    setModCriticalThreat(): ModCriticalThreat<T> { return new ModCriticalThreat(this.end.end, this.set(183));  };
    /** */
    @EnumField(184)
    setModAttackerMeleeHitChance(): ModAttackerMeleeHitChance<T> { return new ModAttackerMeleeHitChance(this.end.end, this.set(184));  };
    /** */
    @EnumField(185)
    setModAttackerRangedHitChance(): ModAttackerRangedHitChance<T> { return new ModAttackerRangedHitChance(this.end.end, this.set(185));  };
    /** */
    @EnumField(186)
    setModAttackerSpellHitChance(): ModAttackerSpellHitChance<T> { return new ModAttackerSpellHitChance(this.end.end, this.set(186));  };
    /** */
    @EnumField(187)
    setModAttackerMeleeCritChance(): ModAttackerMeleeCritChance<T> { return new ModAttackerMeleeCritChance(this.end.end, this.set(187));  };
    /** */
    @EnumField(188)
    setModAttackerRangedCritChance(): ModAttackerRangedCritChance<T> { return new ModAttackerRangedCritChance(this.end.end, this.set(188));  };
    /** */
    @EnumField(189)
    setModRating(): ModRating<T> { return new ModRating(this.end.end, this.set(189));  };
    /** */
    @EnumField(190)
    setModFactionReputationGain(): ModFactionReputationGain<T> { return new ModFactionReputationGain(this.end.end, this.set(190));  };
    /** */
    @EnumField(191)
    setUseNormalMovementSpeed(): UseNormalMovementSpeed<T> { return new UseNormalMovementSpeed(this.end.end, this.set(191));  };
    /** */
    @EnumField(192)
    setModMeleeRangedHaste(): ModMeleeRangedHaste<T> { return new ModMeleeRangedHaste(this.end.end, this.set(192));  };
    /** */
    @EnumField(193)
    setMeleeSlow(): MeleeSlow<T> { return new MeleeSlow(this.end.end, this.set(193));  };
    /** */
    @EnumField(194)
    setModTargetAbsorbSchool(): ModTargetAbsorbSchool<T> { return new ModTargetAbsorbSchool(this.end.end, this.set(194));  };
    /** */
    @EnumField(195)
    setModTargetAbilityAbsorbSchool(): ModTargetAbilityAbsorbSchool<T> { return new ModTargetAbilityAbsorbSchool(this.end.end, this.set(195));  };
    /** */
    @EnumField(196)
    setModCooldown(): ModCooldown<T> { return new ModCooldown(this.end.end, this.set(196));  };
    /** */
    @EnumField(197)
    setModAttackerSpellAndWeaponCritChance(): ModAttackerSpellAndWeaponCritChance<T> { return new ModAttackerSpellAndWeaponCritChance(this.end.end, this.set(197));  };
    /** */
    @EnumField(198)
    setSpellAura198() { return this.set(198);  };
    /** */
    @EnumField(199)
    setModIncreasesSpellPctToHit(): ModIncreasesSpellPctToHit<T> { return new ModIncreasesSpellPctToHit(this.end.end, this.set(199));  };
    /** */
    @EnumField(200)
    setModXpPct(): ModXpPct<T> { return new ModXpPct(this.end.end, this.set(200));  };
    /** */
    @EnumField(201)
    setFly(): Fly<T> { return new Fly(this.end.end, this.set(201));  };
    /** */
    @EnumField(202)
    setCannotBeDodged(): CannotBeDodged<T> { return new CannotBeDodged(this.end.end, this.set(202));  };
    /** */
    @EnumField(203)
    setModAttackerMeleeCritDamage(): ModAttackerMeleeCritDamage<T> { return new ModAttackerMeleeCritDamage(this.end.end, this.set(203));  };
    /** */
    @EnumField(204)
    setModAttackerRangedCritDamage(): ModAttackerRangedCritDamage<T> { return new ModAttackerRangedCritDamage(this.end.end, this.set(204));  };
    /** */
    @EnumField(205)
    setModSchoolCritDmgTaken(): ModSchoolCritDmgTaken<T> { return new ModSchoolCritDmgTaken(this.end.end, this.set(205));  };
    /** */
    @EnumField(206)
    setModIncreaseVehicleFlightSpeed(): ModIncreaseVehicleFlightSpeed<T> { return new ModIncreaseVehicleFlightSpeed(this.end.end, this.set(206));  };
    /** */
    @EnumField(207)
    setModIncreaseMountedFlightSpeed(): ModIncreaseMountedFlightSpeed<T> { return new ModIncreaseMountedFlightSpeed(this.end.end, this.set(207));  };
    /** */
    @EnumField(208)
    setModIncreaseFlightSpeed(): ModIncreaseFlightSpeed<T> { return new ModIncreaseFlightSpeed(this.end.end, this.set(208));  };
    /** */
    @EnumField(209)
    setModMountedFlightSpeedAlways(): ModMountedFlightSpeedAlways<T> { return new ModMountedFlightSpeedAlways(this.end.end, this.set(209));  };
    /** */
    @EnumField(210)
    setModVehicleSpeedAlways(): ModVehicleSpeedAlways<T> { return new ModVehicleSpeedAlways(this.end.end, this.set(210));  };
    /** */
    @EnumField(211)
    setModFlightSpeedNotStack(): ModFlightSpeedNotStack<T> { return new ModFlightSpeedNotStack(this.end.end, this.set(211));  };
    /** */
    @EnumField(212)
    setModRangedAttackPowerOfStatPercent(): ModRangedAttackPowerOfStatPercent<T> { return new ModRangedAttackPowerOfStatPercent(this.end.end, this.set(212));  };
    /** */
    @EnumField(213)
    setModRageFromDamageDealt(): ModRageFromDamageDealt<T> { return new ModRageFromDamageDealt(this.end.end, this.set(213));  };
    /** */
    @EnumField(214)
    setTamed(): Tamed<T> { return new Tamed(this.end.end, this.set(214));  };
    /** */
    @EnumField(215)
    setArenaPreparation(): ArenaPreparation<T> { return new ArenaPreparation(this.end.end, this.set(215));  };
    /** */
    @EnumField(216)
    setHasteSpells(): HasteSpells<T> { return new HasteSpells(this.end.end, this.set(216));  };
    /** */
    @EnumField(217)
    setSpellAura217() { return this.set(217);  };
    /** */
    @EnumField(218)
    setHasteRanged(): HasteRanged<T> { return new HasteRanged(this.end.end, this.set(218));  };
    /** */
    @EnumField(219)
    setModManaRegenFromStat(): ModManaRegenFromStat<T> { return new ModManaRegenFromStat(this.end.end, this.set(219));  };
    /** */
    @EnumField(220)
    setModRatingFromStat(): ModRatingFromStat<T> { return new ModRatingFromStat(this.end.end, this.set(220));  };
    /** */
    @EnumField(221)
    setModDetaunt(): ModDetaunt<T> { return new ModDetaunt(this.end.end, this.set(221));  };
    /** */
    @EnumField(222)
    setSpellAura222() { return this.set(222);  };
    /** */
    @EnumField(223)
    setRaidProcFromCharge(): RaidProcFromCharge<T> { return new RaidProcFromCharge(this.end.end, this.set(223));  };
    /** */
    @EnumField(224)
    setSpellAura224() { return this.set(224);  };
    /** */
    @EnumField(225)
    setRaidProcFromChargeWithValue(): RaidProcFromChargeWithValue<T> { return new RaidProcFromChargeWithValue(this.end.end, this.set(225));  };
    /** */
    @EnumField(226)
    setPeriodicDummy() { return this.set(226);  };
    /** */
    @EnumField(227)
    setPeriodicTriggerSpellWithValue() { return this.set(227);  };
    /** */
    @EnumField(228)
    setDetectStealth(): DetectStealth<T> { return new DetectStealth(this.end.end, this.set(228));  };
    /** */
    @EnumField(229)
    setModAoeDamageAvoidance(): ModAoEDamageAvoidance<T> { return new ModAoEDamageAvoidance(this.end.end, this.set(229));  };
    /** */
    @EnumField(230)
    setModIncreaseHealth2(): ModIncreaseHealth2<T> { return new ModIncreaseHealth2(this.end.end, this.set(230));  };
    /** */
    @EnumField(231)
    setProcTriggerSpellWithValue() { return this.set(231);  };
    /** */
    @EnumField(232)
    setMechanicDurationMod(): MechanicDurationMod<T> { return new MechanicDurationMod(this.end.end, this.set(232));  };
    /** */
    @EnumField(233)
    setSpellAura233() { return this.set(233);  };
    /** */
    @EnumField(234)
    setMechanicDurationModNotStack(): MechanicDurationModNotStack<T> { return new MechanicDurationModNotStack(this.end.end, this.set(234));  };
    /** */
    @EnumField(235)
    setModDispelResist(): ModDispelResist<T> { return new ModDispelResist(this.end.end, this.set(235));  };
    /** */
    @EnumField(236)
    setControlVehicle(): ControlVehicle<T> { return new ControlVehicle(this.end.end, this.set(236));  };
    /** */
    @EnumField(237)
    setModSpellDamageOfAttackPower(): ModSpellDamageOfAttackPower<T> { return new ModSpellDamageOfAttackPower(this.end.end, this.set(237));  };
    /** */
    @EnumField(238)
    setModSpellHealingOfAttackPower(): ModSpellHealingOfAttackPower<T> { return new ModSpellHealingOfAttackPower(this.end.end, this.set(238));  };
    /** */
    @EnumField(239)
    setModScale2(): ModScale2<T> { return new ModScale2(this.end.end, this.set(239));  };
    /** */
    @EnumField(240)
    setModExpertise(): ModExpertise<T> { return new ModExpertise(this.end.end, this.set(240));  };
    /** */
    @EnumField(241)
    setForceMoveForward(): ForceMoveForward<T> { return new ForceMoveForward(this.end.end, this.set(241));  };
    /** */
    @EnumField(242)
    setModSpellDamageFromHealing(): ModSpellDamageFromHealing<T> { return new ModSpellDamageFromHealing(this.end.end, this.set(242));  };
    /** */
    @EnumField(243)
    setModFaction(): ModFaction<T> { return new ModFaction(this.end.end, this.set(243));  };
    /** */
    @EnumField(244)
    setComprehendLanguage(): ComprehendLanguage<T> { return new ComprehendLanguage(this.end.end, this.set(244));  };
    /** */
    @EnumField(245)
    setModAuraDurationByDispel(): ModAuraDurationByDispel<T> { return new ModAuraDurationByDispel(this.end.end, this.set(245));  };
    /** */
    @EnumField(246)
    setModAuraDurationByDispelNotStack(): ModAuraDurationByDispelNotStack<T> { return new ModAuraDurationByDispelNotStack(this.end.end, this.set(246));  };
    /** */
    @EnumField(247)
    setCloneCaster(): CloneCaster<T> { return new CloneCaster(this.end.end, this.set(247));  };
    /** */
    @EnumField(248)
    setModCombatResultChance(): ModCombatResultChance<T> { return new ModCombatResultChance(this.end.end, this.set(248));  };
    /** */
    @EnumField(249)
    setConvertRune(): ConvertRune<T> { return new ConvertRune(this.end.end, this.set(249));  };
    /** */
    @EnumField(250)
    setModIncreaseHealth3(): ModIncreaseHealth3<T> { return new ModIncreaseHealth3(this.end.end, this.set(250));  };
    /** */
    @EnumField(251)
    setModEnemyDodge(): ModEnemyDodge<T> { return new ModEnemyDodge(this.end.end, this.set(251));  };
    /** */
    @EnumField(252)
    setSpellAura252() { return this.set(252);  };
    /** */
    @EnumField(253)
    setModBlockCritChance(): ModBlockCritChance<T> { return new ModBlockCritChance(this.end.end, this.set(253));  };
    /** */
    @EnumField(254)
    setModDisarmOffhand(): ModDisarmOffhand<T> { return new ModDisarmOffhand(this.end.end, this.set(254));  };
    /** */
    @EnumField(255)
    setModMechanicDamageTakenPercent(): ModMechanicDamageTakenPercent<T> { return new ModMechanicDamageTakenPercent(this.end.end, this.set(255));  };
    /** */
    @EnumField(256)
    setNoReagentUse(): NoReagentUse<T> { return new NoReagentUse(this.end.end, this.set(256));  };
    /** */
    @EnumField(257)
    setModTargetResistBySpellClass(): ModTargetResistBySpellClass<T> { return new ModTargetResistBySpellClass(this.end.end, this.set(257));  };
    /** */
    @EnumField(258)
    setModSpellVisual() { return this.set(258);  };
    /** */
    @EnumField(259)
    setModHotPct(): ModHotPct<T> { return new ModHotPct(this.end.end, this.set(259));  };
    /** */
    @EnumField(260)
    setScreenEffect(): ScreenEffect<T> { return new ScreenEffect(this.end.end, this.set(260));  };
    /** */
    @EnumField(261)
    setPhase(): Phase<T> { return new Phase(this.end.end, this.set(261));  };
    /** */
    @EnumField(262)
    setAbilityIgnoreAurastate() { return this.set(262);  };
    /** */
    @EnumField(263)
    setAllowOnlyAbility(): AllowOnlyAbility<T> { return new AllowOnlyAbility(this.end.end, this.set(263));  };
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
    setModImmuneAuraApplySchool(): ModImmuneAuraApplySchool<T> { return new ModImmuneAuraApplySchool(this.end.end, this.set(267));  };
    /** */
    @EnumField(268)
    setModAttackPowerOfStatPercent(): ModAttackPowerOfStatPercent<T> { return new ModAttackPowerOfStatPercent(this.end.end, this.set(268));  };
    /** */
    @EnumField(269)
    setModIgnoreTargetResist(): ModIgnoreTargetResist<T> { return new ModIgnoreTargetResist(this.end.end, this.set(269));  };
    /** */
    @EnumField(270)
    setModAbilityIgnoreTargetResist() { return this.set(270);  };
    /** */
    @EnumField(271)
    setModDamageFromCaster(): ModDamageFromCaster<T> { return new ModDamageFromCaster(this.end.end, this.set(271));  };
    /** */
    @EnumField(272)
    setIgnoreMeleeReset(): IgnoreMeleeReset<T> { return new IgnoreMeleeReset(this.end.end, this.set(272));  };
    /** */
    @EnumField(273)
    setSpellAura273() { return this.set(273);  };
    /** */
    @EnumField(274)
    setConsumeNoAmmo(): ConsumeNoAmmo<T> { return new ConsumeNoAmmo(this.end.end, this.set(274));  };
    /** */
    @EnumField(275)
    setModIgnoreShapeshift(): ModIgnoreShapeshift<T> { return new ModIgnoreShapeshift(this.end.end, this.set(275));  };
    /** */
    @EnumField(276)
    setSpellAura276() { return this.set(276);  };
    /** */
    @EnumField(277)
    setModAbilityAffectedTargets(): ModAbilityAffectedTargets<T> { return new ModAbilityAffectedTargets(this.end.end, this.set(277));  };
    /** */
    @EnumField(278)
    setModDisarmRanged(): ModDisarmRanged<T> { return new ModDisarmRanged(this.end.end, this.set(278));  };
    /** */
    @EnumField(279)
    setInitializeImages(): InitializeImages<T> { return new InitializeImages(this.end.end, this.set(279));  };
    /** */
    @EnumField(280)
    setModTargetArmorPct(): ModTargetArmorPct<T> { return new ModTargetArmorPct(this.end.end, this.set(280));  };
    /** */
    @EnumField(281)
    setModHonorGainPct(): ModHonorGainPct<T> { return new ModHonorGainPct(this.end.end, this.set(281));  };
    /** */
    @EnumField(282)
    setIncreaseBaseHealthPercent(): IncreaseBaseHealthPercent<T> { return new IncreaseBaseHealthPercent(this.end.end, this.set(282));  };
    /** */
    @EnumField(283)
    setModHealingReceived(): ModHealingReceived<T> { return new ModHealingReceived(this.end.end, this.set(283));  };
    /** */
    @EnumField(284)
    setLinked() { return this.set(284);  };
    /** */
    @EnumField(285)
    setModAttackPowerOfArmor(): ModAttackPowerOfArmor<T> { return new ModAttackPowerOfArmor(this.end.end, this.set(285));  };
    /** */
    @EnumField(286)
    setAbilityPeriodicCrit() { return this.set(286);  };
    /** */
    @EnumField(287)
    setDeflectSpells(): DeflectSpells<T> { return new DeflectSpells(this.end.end, this.set(287));  };
    /** */
    @EnumField(288)
    setIgnoreHitDirection(): IgnoreHitDirection<T> { return new IgnoreHitDirection(this.end.end, this.set(288));  };
    /** */
    @EnumField(289)
    setSpellAura289() { return this.set(289);  };
    /** */
    @EnumField(290)
    setModCritPct(): ModCritPct<T> { return new ModCritPct(this.end.end, this.set(290));  };
    /** */
    @EnumField(291)
    setModXpQuestPct(): ModXpQuestPct<T> { return new ModXpQuestPct(this.end.end, this.set(291));  };
    /** */
    @EnumField(292)
    setOpenStable() { return this.set(292);  };
    /** */
    @EnumField(293)
    setSpellAura293() { return this.set(293);  };
    /** */
    @EnumField(294)
    setPreventRegeneratePower(): PreventRegeneratePower<T> { return new PreventRegeneratePower(this.end.end, this.set(294));  };
    /** */
    @EnumField(295)
    setSpellAura295() { return this.set(295);  };
    /** */
    @EnumField(296)
    setSetVehicleId(): SetVehicleId<T> { return new SetVehicleId(this.end.end, this.set(296));  };
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
    setShareDamagePct(): ShareDamagePct<T> { return new ShareDamagePct(this.end.end, this.set(300));  };
    /** */
    @EnumField(301)
    setSchoolHealAbsorb(): SchoolHealAbsorb<T> { return new SchoolHealAbsorb(this.end.end, this.set(301));  };
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
    setModMinimumSpeed(): ModMinimumSpeed<T> { return new ModMinimumSpeed(this.end.end, this.set(305));  };
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
    setModCreatureAoeDamageAvoidance(): ModCreatureAoEDamageAvoidance<T> { return new ModCreatureAoEDamageAvoidance(this.end.end, this.set(310));  };
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
    setPreventResurrection(): PreventResurrection<T> { return new PreventResurrection(this.end.end, this.set(314));  };
    /** */
    @EnumField(315)
    setUnderwaterWalking(): UnderwaterWalking<T> { return new UnderwaterWalking(this.end.end, this.set(315));  };
    /** */
    @EnumField(316)
    setPeriodicHaste() { return this.set(316);  };
}
