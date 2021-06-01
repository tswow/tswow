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
import { SchoolDamage, TeleportUnits, EnvironmentalDamage, PowerDrain, HealthLeech, Heal, BindHome, CommandTotemCreature, CompleteQuest, WeaponDamageNoSchool, Resurrect, ExtraAttacks, CreateItem, Weapon, Summon, Leap, Energize, WeaponPercentDamage, TriggerMissile, OpenLock, LearnSpell, Dispel, Language, Jump, JumpDest, TeleportUnitFaceCaster, SkillStep, AddHonor, TradeSkill, TransDoor, EnchantItem, EnchantItemTemp, SummonPet, LearnPetSpell, WeaponDamage, CreateRandomItem, SendEvent, PowerBurn, Threat, TriggerSpell, CreateManaGem, HealMaxHealth, InterruptCast, Pickpocket, AddFarsight, ApplyGlyph, HealMechanical, SummonObjectWild, ScriptEffect, Sanctuary, AddComboPoints, ActivateObject, GameObjectDamage, GameObjectRepair, SetGameObjectDestructibleState, KillCredit, EnchantHeldItem, ResurrectSelf, Charge, CastButtons, Knockback, MakeDrunk, Reputation, SummonObjectSlot1, SummonObjectSlot2, SummonObjectSlot3, SummonObjectSlot4, DispelMechanic, DestroyAllTotems, DurabilityDamage, DurabilityDamagePercent, Skill, SendTaxi, PullTowards, ModifyThreatPercent, StealBeneficialBuff, RedirectThreat, PlaySound, PlayMusic, HealPercent, EnergizePercent, LeapBack, ClearQuest, ForceCast, ForceCastWithValue, TriggerSpellWithValue, KnockbackDest, PullTowardsDest, ActivateRune, FailQuest, TriggerMissileWithValue, ChargeDest, StartQuest, CanTitanGrip, EnchantPrismaticItem, RemoveAura } from "./EffectTemplates/EffectTemplates";
import { AuraType } from "./AuraType";
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { CellIndexWrapper } from "wotlkdata/cell/cells/CellArray";

export class SpellEffectType<T> extends EnumCellWrapper<SpellEffect<T>> {
    constructor(owner: SpellEffect<T>, index: number) {
        super(owner, new CellIndexWrapper(undefined, owner.row.Effect, index));
    }

    /** */
    @EnumField(0)
    setNull() { return this.set(0);  };

    /** */
    @EnumField(1)
    setInstakill() { return this.set(1);  };

    /** */
    @EnumField(2)
    setSchoolDamage(): SchoolDamage<T> { 
        return new SchoolDamage(this.end.end, this.set(2))
    };

    /** */
    @EnumField(3)
    setDummy() { return this.set(3);  };

    /** */
    @EnumField(4)
    setPortalTeleport () { return this.set(4);  };

    /** */
    @EnumField(5)
    setTeleportUnits(): TeleportUnits<T> { return new TeleportUnits(this.end.end, this.set(5));  };

    /** */
    @EnumField(6)
    setApplyAura(): AuraType<T> { return new AuraType(this.set(6),this.owner.index);  };

    /** */
    @EnumField(7)
    setEnvironmentalDamage(): EnvironmentalDamage<T> { return new EnvironmentalDamage(this.end.end,this.set(7));  };

    /** */
    @EnumField(8)
    setPowerDrain(): PowerDrain<T> { return new PowerDrain(this.end.end,this.set(8));  };

    /** */
    @EnumField(9)
    setHealthLeech(): HealthLeech<T> { return new HealthLeech(this.end.end,this.set(9));  };

    /** */
    @EnumField(10)
    setHeal(): Heal<T> { return new Heal(this.end.end,this.set(10));  };

    /** */
    @EnumField(11)
    setBind(): BindHome<T> { return new BindHome(this.end.end,this.set(11));  };

    /** */
    @EnumField(12)
    setControlTotemCreature(): CommandTotemCreature<T> { return new CommandTotemCreature(this.end.end,this.set(12)); };

    /** */
    @EnumField(13)
    setRitualBase () { return this.set(13);  };

    /** */
    @EnumField(14)
    setRitualSpecialize () { return this.set(14);  };

    /** */
    @EnumField(15)
    setRitualActivatePortal () { return this.set(15);  };

    /** */
    @EnumField(16)
    setQuestComplete(): CompleteQuest<T> { return new CompleteQuest(this.end.end, this.set(16));  };

    /** */
    @EnumField(17)
    setWeaponDamageNoschool(): WeaponDamageNoSchool<T> { return new WeaponDamageNoSchool(this.end.end,this.set(17));  };

    /** */
    @EnumField(18)
    setResurrect(): Resurrect<T> { return new Resurrect(this.end.end,this.set(18));  };

    /** */
    @EnumField(19)
    setAddExtraAttacks() { return this.set(19);  };

    /** */
    @EnumField(20)
    setDodge (): ExtraAttacks<T> { return new ExtraAttacks(this.end.end,this.set(20));  };

    /** */
    @EnumField(21)
    setEvade () { return this.set(21);  };

    /** */
    @EnumField(22)
    setParry() { return this.set(22);  };

    /** */
    @EnumField(23)
    setBlock () { return this.set(23);  };

    /** */
    @EnumField(24)
    setCreateItem(): CreateItem<T> { return new CreateItem(this.end.end,this.set(24));  };

    /** */
    @EnumField(25)
    setWeapon(): Weapon<T> { return new Weapon(this.end.end,this.set(25));  };

    /** */
    @EnumField(26)
    setDefense () { return this.set(26);  };

    /** */
    @EnumField(27)
    setPersistentAreaAura(): AuraType<T> { return new AuraType(this.set(27), this.owner.index);  };

    /** */
    @EnumField(28)
    setSummon(): Summon<T> { return new Summon(this.end.end, this.set(28));  };

    /** */
    @EnumField(29)
    setLeap(): Leap<T> { return new Leap(this.end.end,this.set(29));  };

    /** */
    @EnumField(30)
    setEnergize(): Energize<T> { return new Energize(this.end.end,this.set(30));  };

    /** */
    @EnumField(31)
    setWeaponPercentDamage(): WeaponPercentDamage<T> { return new WeaponPercentDamage(this.end.end,this.set(31));  };

    /** */
    @EnumField(32)
    setTriggerMissile(): TriggerMissile<T> { return new TriggerMissile(this.end.end,this.set(32));  };

    /** */
    @EnumField(33)
    setOpenLock(): OpenLock<T> { return new OpenLock(this.end.end,this.set(33));  };

    /** */
    @EnumField(34)
    setSummonChangeItem() { return this.set(34);  };

    /** */
    @EnumField(35)
    setApplyAreaAuraParty(): AuraType<T> { return new AuraType(this.set(35), this.owner.index);  };

    /** */
    @EnumField(36)
    setLearnSpell(): LearnSpell<T> { return new LearnSpell(this.end.end, this.set(36));  };

    /** */
    @EnumField(37)
    setSpellDefense () { return this.set(37);  };

    /** */
    @EnumField(38)
    setDispel(): Dispel<T> { return new Dispel(this.end.end, this.set(38));  };

    /** */
    @EnumField(39)
    setLanguage(): Language<T> { return new Language(this.end.end,this.set(39));  };

    /** */
    @EnumField(40)
    setDualWield() { return this.set(40);  };

    /** */
    @EnumField(41)
    setJump(): Jump<T> { return new Jump(this.end.end,this.set(41));  };

    /** */
    @EnumField(42)
    setJumpDest(): JumpDest<T> { return new JumpDest(this.end.end,this.set(42));  };

    /** */
    @EnumField(43)
    setTeleportUnitsFaceCaster(): TeleportUnitFaceCaster<T> { return new TeleportUnitFaceCaster(this.end.end,this.set(43));  };

    /** */
    @EnumField(44)
    setSkillStep(): SkillStep<T> { return new SkillStep(this.end.end,this.set(44));  };

    /** 
     * Comment test
     */
    @EnumField(45)
    setAddHonor(): AddHonor<T> { return new AddHonor(this.end.end,this.set(45));  };

    /** */
    @EnumField(46)
    setSpawn () { return this.set(46);  };

    /** */
    @EnumField(47)
    setTradeSkill(): TradeSkill<T> { return new TradeSkill(this.end.end,this.set(47));  };

    /** Singleton */
    @EnumField(48)
    setStealth () { return this.set(48);  };

    /** Singleton */
    @EnumField(49)
    setDetect () { return this.set(49);  };

    /** */
    @EnumField(50)
    setTransDoor(): TransDoor<T> { return new TransDoor(this.end.end,this.set(50));  };

    /** Unused */
    @EnumField(51)
    setForceCriticalHit () { return this.set(51);  };

    /** Unused */
    @EnumField(52)
    setGuaranteeHit () { return this.set(52);  };

    /** */
    @EnumField(53)
    setEnchantItem(): EnchantItem<T> { return new EnchantItem(this.end.end,this.set(53));  };

    /** */
    @EnumField(54)
    setEnchantItemTemporary(): EnchantItemTemp<T> { return new EnchantItemTemp(this.end.end,this.set(54));  };

    /** Singleton */
    @EnumField(55)
    setTamecreature() { return this.set(55);  };

    /** */
    @EnumField(56)
    setSummonPet(): SummonPet<T> { return new SummonPet(this.end.end,this.set(56)) };

    /** */
    @EnumField(57)
    setLearnPetSpell(): LearnPetSpell<T> { return new LearnPetSpell(this.end.end,this.set(57));  };

    /** */
    @EnumField(58)
    setWeaponDamage(): WeaponDamage<T> { return new WeaponDamage(this.end.end,this.set(58));  };

    /** */
    @EnumField(59)
    setCreateRandomItem (): CreateRandomItem<T> { return new CreateRandomItem(this.end.end,this.set(59));  };

    /** Weapon skills, no arguments */
    @EnumField(60)
    setProficiency() { return this.set(60);  };

    /** */
    @EnumField(61)
    setSendEvent(): SendEvent<T> { return new SendEvent(this.end.end,this.set(61));  };

    /** */
    @EnumField(62)
    setPowerBurn(): PowerBurn<T> { return new PowerBurn(this.end.end,this.set(62));  };

    /** */
    @EnumField(63)
    setThreat(): Threat<T> { return new Threat(this.end.end,this.set(63));  };

    /** */
    @EnumField(64)
    setTriggerSpell(): TriggerSpell<T> { return new TriggerSpell(this.end.end,this.set(64));  };

    /** */
    @EnumField(65)
    setApplyAreaAuraRaid(): AuraType<T> { return new AuraType(this.set(65), this.owner.index);  };

    /** */
    @EnumField(66)
    setCreateManaGem (): CreateManaGem<T> { return new CreateManaGem(this.end.end, this.set(66));  };

    /** */
    @EnumField(67)
    setHealMaxHealth(): HealMaxHealth<T> { return new HealMaxHealth(this.end.end,this.set(67));  };

    /** Has no arguments, see spells SchoolMask instead */
    @EnumField(68)
    setInterruptCast(): InterruptCast<T> { return new InterruptCast(this.end.end,this.set(68));  };

    /** */
    @EnumField(69)
    setDistract() { return this.set(69);  };

    /** singleton */
    @EnumField(70)
    setPull () { return this.set(70);  };

    /** */
    @EnumField(71)
    setPickpocket(): Pickpocket<T> { return new Pickpocket(this.end.end,this.set(71));  };

    /** */
    @EnumField(72)
    setAddFarsight(): AddFarsight<T> { return new AddFarsight(this.end.end,this.set(72));  };

    /** Singleton */
    @EnumField(73)
    setUntrainTalents() { return this.set(73);  };

    /** */
    @EnumField(74)
    setApplyGlyph(): ApplyGlyph<T> { return new ApplyGlyph(this.end.end,this.set(74));  };

    /** */
    @EnumField(75)
    setHealMechanical (): HealMechanical<T> { return new HealMechanical(this.end.end,this.set(75));  };

    /** */
    @EnumField(76)
    setSummonObjectWild(): SummonObjectWild<T> { return new SummonObjectWild(this.end.end,this.set(76));  };

    /** */
    @EnumField(77)
    setScriptEffect(): ScriptEffect<T> { return new ScriptEffect(this.end.end,this.set(77));  };

    /** Singleton */
    @EnumField(78)
    setAttack() { return this.set(78);  };

    /** */
    @EnumField(79)
    setSanctuary(): Sanctuary<T> { return new Sanctuary(this.end.end,this.set(79));  };

    /** */
    @EnumField(80)
    setAddComboPoints(): AddComboPoints<T> { return new AddComboPoints(this.end.end,this.set(80));  };

    /** Singleton */
    @EnumField(81)
    setCreateHouse () { return this.set(81);  };

    /** Unused? */
    @EnumField(82)
    setBindSight() { return this.set(82);  };

    /** Scripted */
    @EnumField(83)
    setDuel() { return this.set(83);  };

    /** Singleton */
    @EnumField(84)
    setStuck() { return this.set(84);  };

    /** Scripted */
    @EnumField(85)
    setSummonPlayer() { return this.set(85);  };

    /** */
    @EnumField(86)
    setActivateObject(): ActivateObject<T> { return new ActivateObject(this.end.end,this.set(86));  };

    /** */
    @EnumField(87)
    setGameobjectDamage(): GameObjectDamage<T> { return new GameObjectDamage(this.end.end,this.set(87));  };

    /** */
    @EnumField(88)
    setGameobjectRepair(): GameObjectRepair<T> { return new GameObjectRepair(this.end.end,this.set(88));  };

    /** */
    @EnumField(89)
    setGameobjectSetDestructionState(): SetGameObjectDestructibleState<T> { return new SetGameObjectDestructibleState(this.end.end,this.set(89));  };

    /** */
    @EnumField(90)
    setKillCredit (): KillCredit<T> { return new KillCredit(this.end.end,this.set(90));  };

    /** Unused */
    @EnumField(91)
    setThreatAll () { return this.set(91);  };

    /** */
    @EnumField(92)
    setEnchantHeldItem(): EnchantHeldItem<T> { return new EnchantHeldItem(this.end.end,this.set(92));  };

    /** no parameters, target is always null or caster */
    @EnumField(93)
    setForceDeselect() { return this.set(93);  };

    /** */
    @EnumField(94)
    setSelfResurrect(): ResurrectSelf<T> { return new ResurrectSelf(this.end.end,this.set(94));  };

    /** ? */
    @EnumField(95)
    setSkinning() { return this.set(95);  };

    /** */
    @EnumField(96)
    setCharge(): Charge<T> { return new Charge(this.end.end,this.set(96));  };

    /** */
    @EnumField(97)
    setCastButton (): CastButtons<T> { return new CastButtons(this.end.end,this.set(97));  };

    /** */
    @EnumField(98)
    setKnockBack(): Knockback<T> { return new Knockback(this.end.end,this.set(98));  };

    /** singleton */
    @EnumField(99)
    setDisenchant() { return this.set(99);  };

    /** */
    @EnumField(100)
    setInebriate(): MakeDrunk<T> { return new MakeDrunk(this.end.end,this.set(100));  };

    /** singleton */
    @EnumField(101)
    setFeedPet() { return this.set(101);  };

    /** singleton */
    @EnumField(102)
    setDismissPet() { return this.set(102);  };

    /** */
    @EnumField(103)
    setReputation(): Reputation<T> { return new Reputation(this.end.end,this.set(103));  };

    /** */
    @EnumField(104)
    setSummonObjectSlot1(): SummonObjectSlot1<T> { return new SummonObjectSlot1(this.end.end,this.set(104));  };

    /** */
    @EnumField(105)
    setSummonObjectSlot2(): SummonObjectSlot2<T> { return new SummonObjectSlot2(this.end.end,this.set(105));  };

    /** */
    @EnumField(106)
    setSummonObjectSlot3(): SummonObjectSlot3<T> { return new SummonObjectSlot3(this.end.end, this.set(106));  };

    /** */
    @EnumField(107)
    setSummonObjectSlot4(): SummonObjectSlot4<T> { return new SummonObjectSlot4(this.end.end, this.set(107));  };

    /** */
    @EnumField(108)
    setDispelMechanic(): DispelMechanic<T> { return new DispelMechanic(this.end.end,this.set(108));  };

    /** singleton */
    @EnumField(109)
    setSummonDeadPet() { return this.set(109);  };

    /** */
    @EnumField(110)
    setDestroyAllTotems(): DestroyAllTotems<T> { return new DestroyAllTotems(this.end.end,this.set(110));  };

    /** */
    @EnumField(111)
    setDurabilityDamage(): DurabilityDamage<T> { return new DurabilityDamage(this.end.end,this.set(111));  };

    /** */
    @EnumField(112)
    setSpellEffect112() { return this.set(112);  };

    /** */
    @EnumField(113)
    setResurrectNew() { return this.set(113);  };

    /** no parameters */
    @EnumField(114)
    setAttackMe() { return this.set(114);  };

    /** */
    @EnumField(115)
    setDurabilityDamagePct(): DurabilityDamagePercent<T> { return new DurabilityDamagePercent(this.end.end,this.set(115));  };

    /** singleton */
    @EnumField(116)
    setSkinPlayerCorpse () { return this.set(116);  };

    /** singleton */
    @EnumField(117)
    setSpiritHeal () { return this.set(117);  };

    /** */
    @EnumField(118)
    setSkill (): Skill<T> { return new Skill(this.end.end,this.set(118));  };

    /** */
    @EnumField(119)
    setApplyAreaAuraPet(): AuraType<T> { return new AuraType(this.set(119), this.owner.index);  };

    /** singleton */
    @EnumField(120)
    setTeleportGraveyard () { return this.set(120);  };

    /** */
    @EnumField(121)
    setNormalizedWeaponDmg() { return this.set(121);  };

    /** */
    @EnumField(122)
    setSpellEffect122 () { return this.set(122);  };

    /** */
    @EnumField(123)
    setSendTaxi (): SendTaxi<T> { return new SendTaxi(this.end.end,this.set(123));  };

    /** */
    @EnumField(124)
    setPullTowards(): PullTowards<T> { return new PullTowards(this.end.end,this.set(124));  };

    /** */
    @EnumField(125)
    setModifyThreatPercent(): ModifyThreatPercent<T> { return new ModifyThreatPercent(this.end.end,this.set(125));  };

    /** */
    @EnumField(126)
    setStealBeneficialBuff (): StealBeneficialBuff<T> { return new StealBeneficialBuff(this.end.end,this.set(126));  };

    /** singleton */
    @EnumField(127)
    setProspecting () { return this.set(127);  };

    /** */
    @EnumField(128)
    setApplyAreaAuraFriend(): AuraType<T> { return new AuraType(this.set(128), this.owner.index) ;  };

    /** */
    @EnumField(129)
    setApplyAreaAuraEnemy(): AuraType<T> { return new AuraType(this.set(129), this.owner.index);  };

    /** */
    @EnumField(130)
    setRedirectThreat(): RedirectThreat<T> { return new RedirectThreat(this.end.end,this.set(130));  };

    /** */
    @EnumField(131)
    setPlayerNotification (): PlaySound<T> { return new PlaySound(this.end.end,this.set(131));  };

    /** */
    @EnumField(132)
    setPlayMusic (): PlayMusic<T> { return new PlayMusic(this.end.end,this.set(132));  };

    /** don't use this */
    @EnumField(133)
    setUnlearnSpecialization () { return this.set(133);  };

    /** Duplicate of setKillCredit(?)*/
    @EnumField(134)
    setKillCredit2 () { return this.set(134);  };

    /** singleton */
    @EnumField(135)
    setCallPet() { return this.set(135);  };

    /** */
    @EnumField(136)
    setHealPct(): HealPercent<T> { return new HealPercent(this.end.end,this.set(136));  };

    /** */
    @EnumField(137)
    setEnergizePct(): EnergizePercent<T> { return new EnergizePercent(this.end.end,this.set(137));  };

    /** */
    @EnumField(138)
    setLeapBack (): LeapBack<T> { return new LeapBack(this.end.end,this.set(138));  };

    /** */
    @EnumField(139)
    setClearQuest (): ClearQuest<T> { return new ClearQuest(this.end.end,this.set(139));  };

    /** */
    @EnumField(140)
    setForceCast(): ForceCast<T> { return new ForceCast(this.end.end,this.set(140));  };

    /** */
    @EnumField(141)
    setForceCastWithValue(): ForceCastWithValue<T> { return new ForceCastWithValue(this.end.end,this.set(141));  };

    /** */
    @EnumField(142)
    setTriggerSpellWithValue(): TriggerSpellWithValue<T> { return new TriggerSpellWithValue(this.end.end,this.set(142));  };

    /** */
    @EnumField(143)
    setApplyAreaAuraOwner(): AuraType<T> { return new AuraType(this.set(143), this.owner.index);  };

    /** */
    @EnumField(144)
    setKnockBackDest(): KnockbackDest<T> { return new KnockbackDest(this.end.end,this.set(144));  };

    /** */
    @EnumField(145)
    setPullTowardsDest (): PullTowardsDest<T> { return new PullTowardsDest(this.end.end,this.set(145));  };

    /** */
    @EnumField(146)
    setActivateRune(): ActivateRune<T> { return new ActivateRune(this.end.end,this.set(146));  };

    /** */
    @EnumField(147)
    setQuestFail (): FailQuest<T> { return new FailQuest(this.end.end,this.set(147));  };

    /** */
    @EnumField(148)
    setTriggerMissileSpellWithValue(): TriggerMissileWithValue<T> { return new TriggerMissileWithValue(this.end.end,this.set(148));  };

    /** */
    @EnumField(149)
    setChargeDest(): ChargeDest<T> { return new ChargeDest(this.end.end,this.set(149));  };

    /** */
    @EnumField(150)
    setQuestStart(): StartQuest<T> { return new StartQuest(this.end.end,this.set(150));  };

    /** */
    @EnumField(151)
    setTriggerSpell2() { return this.set(151);  };

    /** don't use */
    @EnumField(152)
    setSummonRafFriend () { return this.set(152);  };

    /** TODO: should this be used? */
    @EnumField(153)
    setCreateTamedPet () { return this.set(153);  };

    /** singleton */
    @EnumField(154)
    setDiscoverTaxi() { return this.set(154);  };

    /** */
    @EnumField(155)
    setTitanGrip (): CanTitanGrip<T> { return new CanTitanGrip(this.end.end,this.set(155));  };

    /** */
    @EnumField(156)
    setEnchantItemPrismatic(): EnchantPrismaticItem<T> { return new EnchantPrismaticItem(this.end.end,this.set(156));  };

    /** duplicate */
    @EnumField(157)
    setCreateItem2 () { return this.set(157);  };

    /** singleton */
    @EnumField(158)
    setMilling() { return this.set(158);  };

    /** singleton */
    @EnumField(159)
    setAllowRenamePet () { return this.set(159);  };

    /** */
    @EnumField(160)
    setSpellEffect160() { return this.set(160);  };

    /** singleton */
    @EnumField(161)
    setTalentSpecCount () { return this.set(161);  };

    /** singleton */
    @EnumField(162)
    setTalentSpecSelect() { return this.set(162);  };

    /** */
    @EnumField(163)
    setUnused() { return this.set(163);  };

    /** */
    @EnumField(164)
    setRemoveAura(): RemoveAura<T> { return new RemoveAura(this.end.end,this.set(164));  };
}