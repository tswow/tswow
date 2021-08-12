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

export class SpellEffectType extends EnumCellWrapper<SpellEffect> {
    constructor(owner: SpellEffect, index: number) {
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
    setSchoolDamage(): SchoolDamage { 
        return new SchoolDamage(this.set(2))
    };

    /** */
    @EnumField(3)
    setDummy() { return this.set(3);  };

    /** */
    @EnumField(4)
    setPortalTeleport () { return this.set(4);  };

    /** */
    @EnumField(5)
    setTeleportUnits(): TeleportUnits { return new TeleportUnits(this.set(5));  };

    /** */
    @EnumField(6)
    setApplyAura(): AuraType { return new AuraType(this.set(6),this.owner.index);  };

    /** */
    @EnumField(7)
    setEnvironmentalDamage(): EnvironmentalDamage { return new EnvironmentalDamage(this.set(7));  };

    /** */
    @EnumField(8)
    setPowerDrain(): PowerDrain { return new PowerDrain(this.set(8));  };

    /** */
    @EnumField(9)
    setHealthLeech(): HealthLeech { return new HealthLeech(this.set(9));  };

    /** */
    @EnumField(10)
    setHeal(): Heal { return new Heal(this.set(10));  };

    /** */
    @EnumField(11)
    setBind(): BindHome { return new BindHome(this.set(11));  };

    /** */
    @EnumField(12)
    setControlTotemCreature(): CommandTotemCreature { return new CommandTotemCreature(this.set(12)); };

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
    setQuestComplete(): CompleteQuest { return new CompleteQuest(this.set(16));  };

    /** */
    @EnumField(17)
    setWeaponDamageNoschool(): WeaponDamageNoSchool { return new WeaponDamageNoSchool(this.set(17));  };

    /** */
    @EnumField(18)
    setResurrect(): Resurrect { return new Resurrect(this.set(18));  };

    /** */
    @EnumField(19)
    setAddExtraAttacks() { return this.set(19);  };

    /** */
    @EnumField(20)
    setDodge (): ExtraAttacks { return new ExtraAttacks(this.set(20));  };

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
    setCreateItem(): CreateItem { return new CreateItem(this.set(24));  };

    /** */
    @EnumField(25)
    setWeapon(): Weapon { return new Weapon(this.set(25));  };

    /** */
    @EnumField(26)
    setDefense () { return this.set(26);  };

    /** */
    @EnumField(27)
    setPersistentAreaAura(): AuraType { return new AuraType(this.set(27), this.owner.index);  };

    /** */
    @EnumField(28)
    setSummon(): Summon { return new Summon(this.set(28));  };

    /** */
    @EnumField(29)
    setLeap(): Leap { return new Leap(this.set(29));  };

    /** */
    @EnumField(30)
    setEnergize(): Energize { return new Energize(this.set(30));  };

    /** */
    @EnumField(31)
    setWeaponPercentDamage(): WeaponPercentDamage { return new WeaponPercentDamage(this.set(31));  };

    /** */
    @EnumField(32)
    setTriggerMissile(): TriggerMissile { return new TriggerMissile(this.set(32));  };

    /** */
    @EnumField(33)
    setOpenLock(): OpenLock { return new OpenLock(this.set(33));  };

    /** */
    @EnumField(34)
    setSummonChangeItem() { return this.set(34);  };

    /** */
    @EnumField(35)
    setApplyAreaAuraParty(): AuraType { return new AuraType(this.set(35), this.owner.index);  };

    /** */
    @EnumField(36)
    setLearnSpell(): LearnSpell { return new LearnSpell(this.set(36));  };

    /** */
    @EnumField(37)
    setSpellDefense () { return this.set(37);  };

    /** */
    @EnumField(38)
    setDispel(): Dispel { return new Dispel(this.set(38));  };

    /** */
    @EnumField(39)
    setLanguage(): Language { return new Language(this.set(39));  };

    /** */
    @EnumField(40)
    setDualWield() { return this.set(40);  };

    /** */
    @EnumField(41)
    setJump(): Jump { return new Jump(this.set(41));  };

    /** */
    @EnumField(42)
    setJumpDest(): JumpDest { return new JumpDest(this.set(42));  };

    /** */
    @EnumField(43)
    setTeleportUnitsFaceCaster(): TeleportUnitFaceCaster { return new TeleportUnitFaceCaster(this.set(43));  };

    /** */
    @EnumField(44)
    setSkillStep(): SkillStep { return new SkillStep(this.set(44));  };

    /** 
     * Comment test
     */
    @EnumField(45)
    setAddHonor(): AddHonor { return new AddHonor(this.set(45));  };

    /** */
    @EnumField(46)
    setSpawn () { return this.set(46);  };

    /** */
    @EnumField(47)
    setTradeSkill(): TradeSkill { return new TradeSkill(this.set(47));  };

    /** Singleton */
    @EnumField(48)
    setStealth () { return this.set(48);  };

    /** Singleton */
    @EnumField(49)
    setDetect () { return this.set(49);  };

    /** */
    @EnumField(50)
    setTransDoor(): TransDoor { return new TransDoor(this.set(50));  };

    /** Unused */
    @EnumField(51)
    setForceCriticalHit () { return this.set(51);  };

    /** Unused */
    @EnumField(52)
    setGuaranteeHit () { return this.set(52);  };

    /** */
    @EnumField(53)
    setEnchantItem(): EnchantItem { return new EnchantItem(this.set(53));  };

    /** */
    @EnumField(54)
    setEnchantItemTemporary(): EnchantItemTemp { return new EnchantItemTemp(this.set(54));  };

    /** Singleton */
    @EnumField(55)
    setTamecreature() { return this.set(55);  };

    /** */
    @EnumField(56)
    setSummonPet(): SummonPet { return new SummonPet(this.set(56)) };

    /** */
    @EnumField(57)
    setLearnPetSpell(): LearnPetSpell { return new LearnPetSpell(this.set(57));  };

    /** */
    @EnumField(58)
    setWeaponDamage(): WeaponDamage { return new WeaponDamage(this.set(58));  };

    /** */
    @EnumField(59)
    setCreateRandomItem (): CreateRandomItem { return new CreateRandomItem(this.set(59));  };

    /** Weapon skills, no arguments */
    @EnumField(60)
    setProficiency() { return this.set(60);  };

    /** */
    @EnumField(61)
    setSendEvent(): SendEvent { return new SendEvent(this.set(61));  };

    /** */
    @EnumField(62)
    setPowerBurn(): PowerBurn { return new PowerBurn(this.set(62));  };

    /** */
    @EnumField(63)
    setThreat(): Threat { return new Threat(this.set(63));  };

    /** */
    @EnumField(64)
    setTriggerSpell(): TriggerSpell { return new TriggerSpell(this.set(64));  };

    /** */
    @EnumField(65)
    setApplyAreaAuraRaid(): AuraType { return new AuraType(this.set(65), this.owner.index);  };

    /** */
    @EnumField(66)
    setCreateManaGem (): CreateManaGem { return new CreateManaGem(this.set(66));  };

    /** */
    @EnumField(67)
    setHealMaxHealth(): HealMaxHealth { return new HealMaxHealth(this.set(67));  };

    /** Has no arguments, see spells SchoolMask instead */
    @EnumField(68)
    setInterruptCast(): InterruptCast { return new InterruptCast(this.set(68));  };

    /** */
    @EnumField(69)
    setDistract() { return this.set(69);  };

    /** singleton */
    @EnumField(70)
    setPull () { return this.set(70);  };

    /** */
    @EnumField(71)
    setPickpocket(): Pickpocket { return new Pickpocket(this.set(71));  };

    /** */
    @EnumField(72)
    setAddFarsight(): AddFarsight { return new AddFarsight(this.set(72));  };

    /** Singleton */
    @EnumField(73)
    setUntrainTalents() { return this.set(73);  };

    /** */
    @EnumField(74)
    setApplyGlyph(): ApplyGlyph { return new ApplyGlyph(this.set(74));  };

    /** */
    @EnumField(75)
    setHealMechanical (): HealMechanical { return new HealMechanical(this.set(75));  };

    /** */
    @EnumField(76)
    setSummonObjectWild(): SummonObjectWild { return new SummonObjectWild(this.set(76));  };

    /** */
    @EnumField(77)
    setScriptEffect(): ScriptEffect { return new ScriptEffect(this.set(77));  };

    /** Singleton */
    @EnumField(78)
    setAttack() { return this.set(78);  };

    /** */
    @EnumField(79)
    setSanctuary(): Sanctuary { return new Sanctuary(this.set(79));  };

    /** */
    @EnumField(80)
    setAddComboPoints(): AddComboPoints { return new AddComboPoints(this.set(80));  };

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
    setActivateObject(): ActivateObject { return new ActivateObject(this.set(86));  };

    /** */
    @EnumField(87)
    setGameobjectDamage(): GameObjectDamage { return new GameObjectDamage(this.set(87));  };

    /** */
    @EnumField(88)
    setGameobjectRepair(): GameObjectRepair { return new GameObjectRepair(this.set(88));  };

    /** */
    @EnumField(89)
    setGameobjectSetDestructionState(): SetGameObjectDestructibleState { return new SetGameObjectDestructibleState(this.set(89));  };

    /** */
    @EnumField(90)
    setKillCredit (): KillCredit { return new KillCredit(this.set(90));  };

    /** Unused */
    @EnumField(91)
    setThreatAll () { return this.set(91);  };

    /** */
    @EnumField(92)
    setEnchantHeldItem(): EnchantHeldItem { return new EnchantHeldItem(this.set(92));  };

    /** no parameters, target is always null or caster */
    @EnumField(93)
    setForceDeselect() { return this.set(93);  };

    /** */
    @EnumField(94)
    setSelfResurrect(): ResurrectSelf { return new ResurrectSelf(this.set(94));  };

    /** ? */
    @EnumField(95)
    setSkinning() { return this.set(95);  };

    /** */
    @EnumField(96)
    setCharge(): Charge { return new Charge(this.set(96));  };

    /** */
    @EnumField(97)
    setCastButton (): CastButtons { return new CastButtons(this.set(97));  };

    /** */
    @EnumField(98)
    setKnockBack(): Knockback { return new Knockback(this.set(98));  };

    /** singleton */
    @EnumField(99)
    setDisenchant() { return this.set(99);  };

    /** */
    @EnumField(100)
    setInebriate(): MakeDrunk { return new MakeDrunk(this.set(100));  };

    /** singleton */
    @EnumField(101)
    setFeedPet() { return this.set(101);  };

    /** singleton */
    @EnumField(102)
    setDismissPet() { return this.set(102);  };

    /** */
    @EnumField(103)
    setReputation(): Reputation { return new Reputation(this.set(103));  };

    /** */
    @EnumField(104)
    setSummonObjectSlot1(): SummonObjectSlot1 { return new SummonObjectSlot1(this.set(104));  };

    /** */
    @EnumField(105)
    setSummonObjectSlot2(): SummonObjectSlot2 { return new SummonObjectSlot2(this.set(105));  };

    /** */
    @EnumField(106)
    setSummonObjectSlot3(): SummonObjectSlot3 { return new SummonObjectSlot3(this.set(106));  };

    /** */
    @EnumField(107)
    setSummonObjectSlot4(): SummonObjectSlot4 { return new SummonObjectSlot4(this.set(107));  };

    /** */
    @EnumField(108)
    setDispelMechanic(): DispelMechanic { return new DispelMechanic(this.set(108));  };

    /** singleton */
    @EnumField(109)
    setSummonDeadPet() { return this.set(109);  };

    /** */
    @EnumField(110)
    setDestroyAllTotems(): DestroyAllTotems { return new DestroyAllTotems(this.set(110));  };

    /** */
    @EnumField(111)
    setDurabilityDamage(): DurabilityDamage { return new DurabilityDamage(this.set(111));  };

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
    setDurabilityDamagePct(): DurabilityDamagePercent { return new DurabilityDamagePercent(this.set(115));  };

    /** singleton */
    @EnumField(116)
    setSkinPlayerCorpse () { return this.set(116);  };

    /** singleton */
    @EnumField(117)
    setSpiritHeal () { return this.set(117);  };

    /** */
    @EnumField(118)
    setSkill (): Skill { return new Skill(this.set(118));  };

    /** */
    @EnumField(119)
    setApplyAreaAuraPet(): AuraType { return new AuraType(this.set(119), this.owner.index);  };

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
    setSendTaxi (): SendTaxi { return new SendTaxi(this.set(123));  };

    /** */
    @EnumField(124)
    setPullTowards(): PullTowards { return new PullTowards(this.set(124));  };

    /** */
    @EnumField(125)
    setModifyThreatPercent(): ModifyThreatPercent { return new ModifyThreatPercent(this.set(125));  };

    /** */
    @EnumField(126)
    setStealBeneficialBuff (): StealBeneficialBuff { return new StealBeneficialBuff(this.set(126));  };

    /** singleton */
    @EnumField(127)
    setProspecting () { return this.set(127);  };

    /** */
    @EnumField(128)
    setApplyAreaAuraFriend(): AuraType { return new AuraType(this.set(128), this.owner.index) ;  };

    /** */
    @EnumField(129)
    setApplyAreaAuraEnemy(): AuraType { return new AuraType(this.set(129), this.owner.index);  };

    /** */
    @EnumField(130)
    setRedirectThreat(): RedirectThreat { return new RedirectThreat(this.set(130));  };

    /** */
    @EnumField(131)
    setPlayerNotification (): PlaySound { return new PlaySound(this.set(131));  };

    /** */
    @EnumField(132)
    setPlayMusic (): PlayMusic { return new PlayMusic(this.set(132));  };

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
    setHealPct(): HealPercent { return new HealPercent(this.set(136));  };

    /** */
    @EnumField(137)
    setEnergizePct(): EnergizePercent { return new EnergizePercent(this.set(137));  };

    /** */
    @EnumField(138)
    setLeapBack (): LeapBack { return new LeapBack(this.set(138));  };

    /** */
    @EnumField(139)
    setClearQuest (): ClearQuest { return new ClearQuest(this.set(139));  };

    /** */
    @EnumField(140)
    setForceCast(): ForceCast { return new ForceCast(this.set(140));  };

    /** */
    @EnumField(141)
    setForceCastWithValue(): ForceCastWithValue { return new ForceCastWithValue(this.set(141));  };

    /** */
    @EnumField(142)
    setTriggerSpellWithValue(): TriggerSpellWithValue { return new TriggerSpellWithValue(this.set(142));  };

    /** */
    @EnumField(143)
    setApplyAreaAuraOwner(): AuraType { return new AuraType(this.set(143), this.owner.index);  };

    /** */
    @EnumField(144)
    setKnockBackDest(): KnockbackDest { return new KnockbackDest(this.set(144));  };

    /** */
    @EnumField(145)
    setPullTowardsDest (): PullTowardsDest { return new PullTowardsDest(this.set(145));  };

    /** */
    @EnumField(146)
    setActivateRune(): ActivateRune { return new ActivateRune(this.set(146));  };

    /** */
    @EnumField(147)
    setQuestFail (): FailQuest { return new FailQuest(this.set(147));  };

    /** */
    @EnumField(148)
    setTriggerMissileSpellWithValue(): TriggerMissileWithValue { return new TriggerMissileWithValue(this.set(148));  };

    /** */
    @EnumField(149)
    setChargeDest(): ChargeDest { return new ChargeDest(this.set(149));  };

    /** */
    @EnumField(150)
    setQuestStart(): StartQuest { return new StartQuest(this.set(150));  };

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
    setTitanGrip (): CanTitanGrip { return new CanTitanGrip(this.set(155));  };

    /** */
    @EnumField(156)
    setEnchantItemPrismatic(): EnchantPrismaticItem { return new EnchantPrismaticItem(this.set(156));  };

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
    setRemoveAura(): RemoveAura { return new RemoveAura(this.set(164));  };
}