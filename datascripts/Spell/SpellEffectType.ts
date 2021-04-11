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
import { SchoolDamage, TeleportUnits, EnvironmentalDamage, PowerDrain, HealthLeech, Heal, BindHome, TotemCreatureCommand, CommandTotemCreature, CompleteQuest, WeaponDamageNoSchool, Resurrect, ExtraAttacks, CreateItem, Weapon, Summon, Leap, Energize, WeaponPercentDamage, TriggerMissile, OpenLock, LearnSpell, Dispel, Language, Jump, JumpDest, TeleportUnitFaceCaster, SkillStep, AddHonor, TradeSkill, TransDoor, EnchantItem, EnchantItemTemp, SummonPet, LearnPetSpell, WeaponDamage, CreateRandomItem, SendEvent, PowerBurn, Threat, TriggerSpell, CreateManaGem, HealMaxHealth, InterruptCast, Pickpocket, AddFarsight, ApplyGlyph, HealMechanical, SummonObjectWild, ScriptEffect, Sanctuary, AddComboPoints, ActivateObject, GameObjectDamage, GameObjectRepair, SetGameObjectDestructibleState, KillCredit, EnchantHeldItem, ResurrectSelf, Charge, CastButtons, Knockback, MakeDrunk, Reputation, SummonObjectSlot1, SummonObjectSlot2, SummonObjectSlot3, SummonObjectSlot4, DispelMechanic, DestroyAllTotems, DurabilityDamage, DurabilityDamagePercent, Skill, SendTaxi, PullTowards, ModifyThreatPercent, StealBeneficialBuff, RedirectThreat, PlaySound, PlayMusic, HealPercent, EnergizePercent, LeapBack, ClearQuest, ForceCast, ForceCastWithValue, TriggerSpellWithValue, KnockbackDest, PullTowardsDest, ActivateRune, FailQuest, TriggerMissileWithValue, ChargeDest, StartQuest, CanTitanGrip, EnchantPrismaticItem, RemoveAura } from "./EffectTemplates/EffectTemplates";
import { AuraType } from "./AuraType";

export class SpellEffectType extends Enum<SpellEffect> {
    constructor(owner: SpellEffect, index: number) {
        super(owner, Cell.wrapIndex(SpellEffect.owner(owner).row.Effect, index));
    }

    /** */
    @EnumField(0)
    setNull() { return this.set(0);  };

    /** */
    @EnumField(1)
    setInstakill() { return this.set(1);  };

    /** */
    @EnumField(2)
    setSchoolDamage() { 
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
    setTeleportUnits() { return new TeleportUnits(this.end.end, this.set(5));  };

    /** */
    @EnumField(6)
    setApplyAura() { return new AuraType(this.set(6),this.owner.index);  };

    /** */
    @EnumField(7)
    setEnvironmentalDamage() { return new EnvironmentalDamage(this.end.end,this.set(7));  };

    /** */
    @EnumField(8)
    setPowerDrain() { return new PowerDrain(this.end.end,this.set(8));  };

    /** */
    @EnumField(9)
    setHealthLeech() { return new HealthLeech(this.end.end,this.set(9));  };

    /** */
    @EnumField(10)
    setHeal() { return new Heal(this.end.end,this.set(10));  };

    /** */
    @EnumField(11)
    setBind() { return new BindHome(this.end.end,this.set(11));  };

    /** */
    @EnumField(12)
    setControlTotemCreature() { return new CommandTotemCreature(this.end.end,this.set(12)); };

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
    setQuestComplete() { return new CompleteQuest(this.end.end, this.set(16));  };

    /** */
    @EnumField(17)
    setWeaponDamageNoschool() { return new WeaponDamageNoSchool(this.end.end,this.set(17));  };

    /** */
    @EnumField(18)
    setResurrect() { return new Resurrect(this.end.end,this.set(18));  };

    /** */
    @EnumField(19)
    setAddExtraAttacks() { return this.set(19);  };

    /** */
    @EnumField(20)
    setDodge () { return new ExtraAttacks(this.end.end,this.set(20));  };

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
    setCreateItem() { return new CreateItem(this.end.end,this.set(24));  };

    /** */
    @EnumField(25)
    setWeapon() { return new Weapon(this.end.end,this.set(25));  };

    /** */
    @EnumField(26)
    setDefense () { return this.set(26);  };

    /** */
    @EnumField(27)
    setPersistentAreaAura() { return new AuraType(this.set(27), this.owner.index);  };

    /** */
    @EnumField(28)
    setSummon() { return new Summon(this.end.end, this.set(28));  };

    /** */
    @EnumField(29)
    setLeap() { return new Leap(this.end.end,this.set(29));  };

    /** */
    @EnumField(30)
    setEnergize() { return new Energize(this.end.end,this.set(30));  };

    /** */
    @EnumField(31)
    setWeaponPercentDamage() { return new WeaponPercentDamage(this.end.end,this.set(31));  };

    /** */
    @EnumField(32)
    setTriggerMissile() { return new TriggerMissile(this.end.end,this.set(32));  };

    /** */
    @EnumField(33)
    setOpenLock() { return new OpenLock(this.end.end,this.set(33));  };

    /** */
    @EnumField(34)
    setSummonChangeItem() { return this.set(34);  };

    /** */
    @EnumField(35)
    setApplyAreaAuraParty() { return new AuraType(this.set(35), this.owner.index);  };

    /** */
    @EnumField(36)
    setLearnSpell() { return new LearnSpell(this.end.end, this.set(36));  };

    /** */
    @EnumField(37)
    setSpellDefense () { return this.set(37);  };

    /** */
    @EnumField(38)
    setDispel() { return new Dispel(this.end.end, this.set(38));  };

    /** */
    @EnumField(39)
    setLanguage() { return new Language(this.end.end,this.set(39));  };

    /** */
    @EnumField(40)
    setDualWield() { return this.set(40);  };

    /** */
    @EnumField(41)
    setJump() { return new Jump(this.end.end,this.set(41));  };

    /** */
    @EnumField(42)
    setJumpDest() { return new JumpDest(this.end.end,this.set(42));  };

    /** */
    @EnumField(43)
    setTeleportUnitsFaceCaster() { return new TeleportUnitFaceCaster(this.end.end,this.set(43));  };

    /** */
    @EnumField(44)
    setSkillStep() { return new SkillStep(this.end.end,this.set(44));  };

    /** 
     * Comment test
     */
    @EnumField(45)
    setAddHonor() { return new AddHonor(this.end.end,this.set(45));  };

    /** */
    @EnumField(46)
    setSpawn () { return this.set(46);  };

    /** */
    @EnumField(47)
    setTradeSkill() { return new TradeSkill(this.end.end,this.set(47));  };

    /** Singleton */
    @EnumField(48)
    setStealth () { return this.set(48);  };

    /** Singleton */
    @EnumField(49)
    setDetect () { return this.set(49);  };

    /** */
    @EnumField(50)
    setTransDoor() { return new TransDoor(this.end.end,this.set(50));  };

    /** Unused */
    @EnumField(51)
    setForceCriticalHit () { return this.set(51);  };

    /** Unused */
    @EnumField(52)
    setGuaranteeHit () { return this.set(52);  };

    /** */
    @EnumField(53)
    setEnchantItem() { return new EnchantItem(this.end.end,this.set(53));  };

    /** */
    @EnumField(54)
    setEnchantItemTemporary() { return new EnchantItemTemp(this.end.end,this.set(54));  };

    /** Singleton */
    @EnumField(55)
    setTamecreature() { return this.set(55);  };

    /** */
    @EnumField(56)
    setSummonPet() { return new SummonPet(this.end.end,this.set(56)) };

    /** */
    @EnumField(57)
    setLearnPetSpell() { return new LearnPetSpell(this.end.end,this.set(57));  };

    /** */
    @EnumField(58)
    setWeaponDamage() { return new WeaponDamage(this.end.end,this.set(58));  };

    /** */
    @EnumField(59)
    setCreateRandomItem () { return new CreateRandomItem(this.end.end,this.set(59));  };

    /** Weapon skills, no arguments */
    @EnumField(60)
    setProficiency() { return this.set(60);  };

    /** */
    @EnumField(61)
    setSendEvent() { return new SendEvent(this.end.end,this.set(61));  };

    /** */
    @EnumField(62)
    setPowerBurn() { return new PowerBurn(this.end.end,this.set(62));  };

    /** */
    @EnumField(63)
    setThreat() { return new Threat(this.end.end,this.set(63));  };

    /** */
    @EnumField(64)
    setTriggerSpell() { return new TriggerSpell(this.end.end,this.set(64));  };

    /** */
    @EnumField(65)
    setApplyAreaAuraRaid() { return new AuraType(this.set(65), this.owner.index);  };

    /** */
    @EnumField(66)
    setCreateManaGem () { return new CreateManaGem(this.end.end, this.set(66));  };

    /** */
    @EnumField(67)
    setHealMaxHealth() { return new HealMaxHealth(this.end.end,this.set(67));  };

    /** Has no arguments, see spells SchoolMask instead */
    @EnumField(68)
    setInterruptCast() { return new InterruptCast(this.end.end,this.set(68));  };

    /** */
    @EnumField(69)
    setDistract() { return this.set(69);  };

    /** singleton */
    @EnumField(70)
    setPull () { return this.set(70);  };

    /** */
    @EnumField(71)
    setPickpocket() { return new Pickpocket(this.end.end,this.set(71));  };

    /** */
    @EnumField(72)
    setAddFarsight() { return new AddFarsight(this.end.end,this.set(72));  };

    /** Singleton */
    @EnumField(73)
    setUntrainTalents() { return this.set(73);  };

    /** */
    @EnumField(74)
    setApplyGlyph() { return new ApplyGlyph(this.end.end,this.set(74));  };

    /** */
    @EnumField(75)
    setHealMechanical () { return new HealMechanical(this.end.end,this.set(75));  };

    /** */
    @EnumField(76)
    setSummonObjectWild() { return new SummonObjectWild(this.end.end,this.set(76));  };

    /** */
    @EnumField(77)
    setScriptEffect() { return new ScriptEffect(this.end.end,this.set(77));  };

    /** Singleton */
    @EnumField(78)
    setAttack() { return this.set(78);  };

    /** */
    @EnumField(79)
    setSanctuary() { return new Sanctuary(this.end.end,this.set(79));  };

    /** */
    @EnumField(80)
    setAddComboPoints() { return new AddComboPoints(this.end.end,this.set(80));  };

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
    setActivateObject() { return new ActivateObject(this.end.end,this.set(86));  };

    /** */
    @EnumField(87)
    setGameobjectDamage() { return new GameObjectDamage(this.end.end,this.set(87));  };

    /** */
    @EnumField(88)
    setGameobjectRepair() { return new GameObjectRepair(this.end.end,this.set(88));  };

    /** */
    @EnumField(89)
    setGameobjectSetDestructionState() { return new SetGameObjectDestructibleState(this.end.end,this.set(89));  };

    /** */
    @EnumField(90)
    setKillCredit () { return new KillCredit(this.end.end,this.set(90));  };

    /** Unused */
    @EnumField(91)
    setThreatAll () { return this.set(91);  };

    /** */
    @EnumField(92)
    setEnchantHeldItem() { return new EnchantHeldItem(this.end.end,this.set(92));  };

    /** no parameters, target is always null or caster */
    @EnumField(93)
    setForceDeselect() { return this.set(93);  };

    /** */
    @EnumField(94)
    setSelfResurrect() { return new ResurrectSelf(this.end.end,this.set(94));  };

    /** ? */
    @EnumField(95)
    setSkinning() { return this.set(95);  };

    /** */
    @EnumField(96)
    setCharge() { return new Charge(this.end.end,this.set(96));  };

    /** */
    @EnumField(97)
    setCastButton () { return new CastButtons(this.end.end,this.set(97));  };

    /** */
    @EnumField(98)
    setKnockBack() { return new Knockback(this.end.end,this.set(98));  };

    /** singleton */
    @EnumField(99)
    setDisenchant() { return this.set(99);  };

    /** */
    @EnumField(100)
    setInebriate() { return new MakeDrunk(this.end.end,this.set(100));  };

    /** singleton */
    @EnumField(101)
    setFeedPet() { return this.set(101);  };

    /** singleton */
    @EnumField(102)
    setDismissPet() { return this.set(102);  };

    /** */
    @EnumField(103)
    setReputation() { return new Reputation(this.end.end,this.set(103));  };

    /** */
    @EnumField(104)
    setSummonObjectSlot1() { return new SummonObjectSlot1(this.end.end,this.set(104));  };

    /** */
    @EnumField(105)
    setSummonObjectSlot2() { return new SummonObjectSlot2(this.end.end,this.set(105));  };

    /** */
    @EnumField(106)
    setSummonObjectSlot3() { return new SummonObjectSlot3(this.end.end, this.set(106));  };

    /** */
    @EnumField(107)
    setSummonObjectSlot4() { return new SummonObjectSlot4(this.end.end, this.set(107));  };

    /** */
    @EnumField(108)
    setDispelMechanic() { return new DispelMechanic(this.end.end,this.set(108));  };

    /** singleton */
    @EnumField(109)
    setSummonDeadPet() { return this.set(109);  };

    /** */
    @EnumField(110)
    setDestroyAllTotems() { return new DestroyAllTotems(this.end.end,this.set(110));  };

    /** */
    @EnumField(111)
    setDurabilityDamage() { return new DurabilityDamage(this.end.end,this.set(111));  };

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
    setDurabilityDamagePct() { return new DurabilityDamagePercent(this.end.end,this.set(115));  };

    /** singleton */
    @EnumField(116)
    setSkinPlayerCorpse () { return this.set(116);  };

    /** singleton */
    @EnumField(117)
    setSpiritHeal () { return this.set(117);  };

    /** */
    @EnumField(118)
    setSkill () { return new Skill(this.end.end,this.set(118));  };

    /** */
    @EnumField(119)
    setApplyAreaAuraPet() { return new AuraType(this.set(119), this.owner.index);  };

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
    setSendTaxi () { return new SendTaxi(this.end.end,this.set(123));  };

    /** */
    @EnumField(124)
    setPullTowards() { return new PullTowards(this.end.end,this.set(124));  };

    /** */
    @EnumField(125)
    setModifyThreatPercent() { return new ModifyThreatPercent(this.end.end,this.set(125));  };

    /** */
    @EnumField(126)
    setStealBeneficialBuff () { return new StealBeneficialBuff(this.end.end,this.set(126));  };

    /** singleton */
    @EnumField(127)
    setProspecting () { return this.set(127);  };

    /** */
    @EnumField(128)
    setApplyAreaAuraFriend() { return new AuraType(this.set(128), this.owner.index) ;  };

    /** */
    @EnumField(129)
    setApplyAreaAuraEnemy() { return new AuraType(this.set(129), this.owner.index);  };

    /** */
    @EnumField(130)
    setRedirectThreat() { return new RedirectThreat(this.end.end,this.set(130));  };

    /** */
    @EnumField(131)
    setPlayerNotification () { return new PlaySound(this.end.end,this.set(131));  };

    /** */
    @EnumField(132)
    setPlayMusic () { return new PlayMusic(this.end.end,this.set(132));  };

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
    setHealPct() { return new HealPercent(this.end.end,this.set(136));  };

    /** */
    @EnumField(137)
    setEnergizePct() { return new EnergizePercent(this.end.end,this.set(137));  };

    /** */
    @EnumField(138)
    setLeapBack () { return new LeapBack(this.end.end,this.set(138));  };

    /** */
    @EnumField(139)
    setClearQuest () { return new ClearQuest(this.end.end,this.set(139));  };

    /** */
    @EnumField(140)
    setForceCast() { return new ForceCast(this.end.end,this.set(140));  };

    /** */
    @EnumField(141)
    setForceCastWithValue() { return new ForceCastWithValue(this.end.end,this.set(141));  };

    /** */
    @EnumField(142)
    setTriggerSpellWithValue() { return new TriggerSpellWithValue(this.end.end,this.set(142));  };

    /** */
    @EnumField(143)
    setApplyAreaAuraOwner() { return new AuraType(this.set(143), this.owner.index);  };

    /** */
    @EnumField(144)
    setKnockBackDest() { return new KnockbackDest(this.end.end,this.set(144));  };

    /** */
    @EnumField(145)
    setPullTowardsDest () { return new PullTowardsDest(this.end.end,this.set(145));  };

    /** */
    @EnumField(146)
    setActivateRune() { return new ActivateRune(this.end.end,this.set(146));  };

    /** */
    @EnumField(147)
    setQuestFail () { return new FailQuest(this.end.end,this.set(147));  };

    /** */
    @EnumField(148)
    setTriggerMissileSpellWithValue() { return new TriggerMissileWithValue(this.end.end,this.set(148));  };

    /** */
    @EnumField(149)
    setChargeDest() { return new ChargeDest(this.end.end,this.set(149));  };

    /** */
    @EnumField(150)
    setQuestStart() { return new StartQuest(this.end.end,this.set(150));  };

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
    setTitanGrip () { return new CanTitanGrip(this.end.end,this.set(155));  };

    /** */
    @EnumField(156)
    setEnchantItemPrismatic() { return new EnchantPrismaticItem(this.end.end,this.set(156));  };

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
    setRemoveAura() { return new RemoveAura(this.end.end,this.set(164));  };
}