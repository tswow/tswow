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
import { SpellEffect } from "./SpellEffect";

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
    setSchoolDamage() { return this.set(2);  };

    /** */
    @EnumField(3)
    setDummy() { return this.set(3);  };

    /** */
    @EnumField(4)
    setPortalTeleport () { return this.set(4);  };

    /** */
    @EnumField(5)
    setTeleportUnits() { return this.set(5);  };

    /** */
    @EnumField(6)
    setApplyAura() { return this.set(6);  };

    /** */
    @EnumField(7)
    setEnvironmentalDamage() { return this.set(7);  };

    /** */
    @EnumField(8)
    setPowerDrain() { return this.set(8);  };

    /** */
    @EnumField(9)
    setHealthLeech() { return this.set(9);  };

    /** */
    @EnumField(10)
    setHeal() { return this.set(10);  };

    /** */
    @EnumField(11)
    setBind() { return this.set(11);  };

    /** */
    @EnumField(12)
    setControlTotemCreature() { return this.set(12);  };

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
    setQuestComplete() { return this.set(16);  };

    /** */
    @EnumField(17)
    setWeaponDamageNoschool() { return this.set(17);  };

    /** */
    @EnumField(18)
    setResurrect() { return this.set(18);  };

    /** */
    @EnumField(19)
    setAddExtraAttacks() { return this.set(19);  };

    /** */
    @EnumField(20)
    setDodge () { return this.set(20);  };

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
    setCreateItem() { return this.set(24);  };

    /** */
    @EnumField(25)
    setWeapon() { return this.set(25);  };

    /** */
    @EnumField(26)
    setDefense () { return this.set(26);  };

    /** */
    @EnumField(27)
    setPersistentAreaAura() { return this.set(27);  };

    /** */
    @EnumField(28)
    setSummon() { return this.set(28);  };

    /** */
    @EnumField(29)
    setLeap() { return this.set(29);  };

    /** */
    @EnumField(30)
    setEnergize() { return this.set(30);  };

    /** */
    @EnumField(31)
    setWeaponPercentDamage() { return this.set(31);  };

    /** */
    @EnumField(32)
    setTriggerMissile() { return this.set(32);  };

    /** */
    @EnumField(33)
    setOpenLock() { return this.set(33);  };

    /** */
    @EnumField(34)
    setSummonChangeItem() { return this.set(34);  };

    /** */
    @EnumField(35)
    setApplyAreaAuraParty() { return this.set(35);  };

    /** */
    @EnumField(36)
    setLearnSpell() { return this.set(36);  };

    /** */
    @EnumField(37)
    setSpellDefense () { return this.set(37);  };

    /** */
    @EnumField(38)
    setDispel() { return this.set(38);  };

    /** */
    @EnumField(39)
    setLanguage() { return this.set(39);  };

    /** */
    @EnumField(40)
    setDualWield() { return this.set(40);  };

    /** */
    @EnumField(41)
    setJump() { return this.set(41);  };

    /** */
    @EnumField(42)
    setJumpDest() { return this.set(42);  };

    /** */
    @EnumField(43)
    setTeleportUnitsFaceCaster() { return this.set(43);  };

    /** */
    @EnumField(44)
    setSkillStep() { return this.set(44);  };

    /** */
    @EnumField(45)
    setAddHonor() { return this.set(45);  };

    /** */
    @EnumField(46)
    setSpawn () { return this.set(46);  };

    /** */
    @EnumField(47)
    setTradeSkill() { return this.set(47);  };

    /** */
    @EnumField(48)
    setStealth () { return this.set(48);  };

    /** */
    @EnumField(49)
    setDetect () { return this.set(49);  };

    /** */
    @EnumField(50)
    setTransDoor() { return this.set(50);  };

    /** */
    @EnumField(51)
    setForceCriticalHit () { return this.set(51);  };

    /** */
    @EnumField(52)
    setGuaranteeHit () { return this.set(52);  };

    /** */
    @EnumField(53)
    setEnchantItem() { return this.set(53);  };

    /** */
    @EnumField(54)
    setEnchantItemTemporary() { return this.set(54);  };

    /** */
    @EnumField(55)
    setTamecreature() { return this.set(55);  };

    /** */
    @EnumField(56)
    setSummonPet() { return this.set(56);  };

    /** */
    @EnumField(57)
    setLearnPetSpell() { return this.set(57);  };

    /** */
    @EnumField(58)
    setWeaponDamage() { return this.set(58);  };

    /** */
    @EnumField(59)
    setCreateRandomItem () { return this.set(59);  };

    /** */
    @EnumField(60)
    setProficiency() { return this.set(60);  };

    /** */
    @EnumField(61)
    setSendEvent() { return this.set(61);  };

    /** */
    @EnumField(62)
    setPowerBurn() { return this.set(62);  };

    /** */
    @EnumField(63)
    setThreat() { return this.set(63);  };

    /** */
    @EnumField(64)
    setTriggerSpell() { return this.set(64);  };

    /** */
    @EnumField(65)
    setApplyAreaAuraRaid() { return this.set(65);  };

    /** */
    @EnumField(66)
    setCreateManaGem () { return this.set(66);  };

    /** */
    @EnumField(67)
    setHealMaxHealth() { return this.set(67);  };

    /** */
    @EnumField(68)
    setInterruptCast() { return this.set(68);  };

    /** */
    @EnumField(69)
    setDistract() { return this.set(69);  };

    /** */
    @EnumField(70)
    setPull () { return this.set(70);  };

    /** */
    @EnumField(71)
    setPickpocket() { return this.set(71);  };

    /** */
    @EnumField(72)
    setAddFarsight() { return this.set(72);  };

    /** */
    @EnumField(73)
    setUntrainTalents() { return this.set(73);  };

    /** */
    @EnumField(74)
    setApplyGlyph() { return this.set(74);  };

    /** */
    @EnumField(75)
    setHealMechanical () { return this.set(75);  };

    /** */
    @EnumField(76)
    setSummonObjectWild() { return this.set(76);  };

    /** */
    @EnumField(77)
    setScriptEffect() { return this.set(77);  };

    /** */
    @EnumField(78)
    setAttack() { return this.set(78);  };

    /** */
    @EnumField(79)
    setSanctuary() { return this.set(79);  };

    /** */
    @EnumField(80)
    setAddComboPoints() { return this.set(80);  };

    /** */
    @EnumField(81)
    setCreateHouse () { return this.set(81);  };

    /** */
    @EnumField(82)
    setBindSight() { return this.set(82);  };

    /** */
    @EnumField(83)
    setDuel() { return this.set(83);  };

    /** */
    @EnumField(84)
    setStuck() { return this.set(84);  };

    /** */
    @EnumField(85)
    setSummonPlayer() { return this.set(85);  };

    /** */
    @EnumField(86)
    setActivateObject() { return this.set(86);  };

    /** */
    @EnumField(87)
    setGameobjectDamage() { return this.set(87);  };

    /** */
    @EnumField(88)
    setGameobjectRepair() { return this.set(88);  };

    /** */
    @EnumField(89)
    setGameobjectSetDestructionState() { return this.set(89);  };

    /** */
    @EnumField(90)
    setKillCredit () { return this.set(90);  };

    /** */
    @EnumField(91)
    setThreatAll () { return this.set(91);  };

    /** */
    @EnumField(92)
    setEnchantHeldItem() { return this.set(92);  };

    /** */
    @EnumField(93)
    setForceDeselect() { return this.set(93);  };

    /** */
    @EnumField(94)
    setSelfResurrect() { return this.set(94);  };

    /** */
    @EnumField(95)
    setSkinning() { return this.set(95);  };

    /** */
    @EnumField(96)
    setCharge() { return this.set(96);  };

    /** */
    @EnumField(97)
    setCastButton () { return this.set(97);  };

    /** */
    @EnumField(98)
    setKnockBack() { return this.set(98);  };

    /** */
    @EnumField(99)
    setDisenchant() { return this.set(99);  };

    /** */
    @EnumField(100)
    setInebriate() { return this.set(100);  };

    /** */
    @EnumField(101)
    setFeedPet() { return this.set(101);  };

    /** */
    @EnumField(102)
    setDismissPet() { return this.set(102);  };

    /** */
    @EnumField(103)
    setReputation() { return this.set(103);  };

    /** */
    @EnumField(104)
    setSummonObjectSlot1() { return this.set(104);  };

    /** */
    @EnumField(105)
    setSummonObjectSlot2() { return this.set(105);  };

    /** */
    @EnumField(106)
    setSummonObjectSlot3() { return this.set(106);  };

    /** */
    @EnumField(107)
    setSummonObjectSlot4() { return this.set(107);  };

    /** */
    @EnumField(108)
    setDispelMechanic() { return this.set(108);  };

    /** */
    @EnumField(109)
    setSummonDeadPet() { return this.set(109);  };

    /** */
    @EnumField(110)
    setDestroyAllTotems() { return this.set(110);  };

    /** */
    @EnumField(111)
    setDurabilityDamage() { return this.set(111);  };

    /** */
    @EnumField(112)
    setSpellEffect112() { return this.set(112);  };

    /** */
    @EnumField(113)
    setResurrectNew() { return this.set(113);  };

    /** */
    @EnumField(114)
    setAttackMe() { return this.set(114);  };

    /** */
    @EnumField(115)
    setDurabilityDamagePct() { return this.set(115);  };

    /** */
    @EnumField(116)
    setSkinPlayerCorpse () { return this.set(116);  };

    /** */
    @EnumField(117)
    setSpiritHeal () { return this.set(117);  };

    /** */
    @EnumField(118)
    setSkill () { return this.set(118);  };

    /** */
    @EnumField(119)
    setApplyAreaAuraPet() { return this.set(119);  };

    /** */
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
    setSendTaxi () { return this.set(123);  };

    /** */
    @EnumField(124)
    setPullTowards() { return this.set(124);  };

    /** */
    @EnumField(125)
    setModifyThreatPercent() { return this.set(125);  };

    /** */
    @EnumField(126)
    setStealBeneficialBuff () { return this.set(126);  };

    /** */
    @EnumField(127)
    setProspecting () { return this.set(127);  };

    /** */
    @EnumField(128)
    setApplyAreaAuraFriend() { return this.set(128);  };

    /** */
    @EnumField(129)
    setApplyAreaAuraEnemy() { return this.set(129);  };

    /** */
    @EnumField(130)
    setRedirectThreat() { return this.set(130);  };

    /** */
    @EnumField(131)
    setPlayerNotification () { return this.set(131);  };

    /** */
    @EnumField(132)
    setPlayMusic () { return this.set(132);  };

    /** */
    @EnumField(133)
    setUnlearnSpecialization () { return this.set(133);  };

    /** Duplicate of setKillCredit(?)*/
    @EnumField(134)
    setKillCredit2 () { return this.set(134);  };

    /** */
    @EnumField(135)
    setCallPet() { return this.set(135);  };

    /** */
    @EnumField(136)
    setHealPct() { return this.set(136);  };

    /** */
    @EnumField(137)
    setEnergizePct() { return this.set(137);  };

    /** */
    @EnumField(138)
    setLeapBack () { return this.set(138);  };

    /** */
    @EnumField(139)
    setClearQuest () { return this.set(139);  };

    /** */
    @EnumField(140)
    setForceCast() { return this.set(140);  };

    /** */
    @EnumField(141)
    setForceCastWithValue() { return this.set(141);  };

    /** */
    @EnumField(142)
    setTriggerSpellWithValue() { return this.set(142);  };

    /** */
    @EnumField(143)
    setApplyAreaAuraOwner() { return this.set(143);  };

    /** */
    @EnumField(144)
    setKnockBackDest() { return this.set(144);  };

    /** */
    @EnumField(145)
    setPullTowardsDest () { return this.set(145);  };

    /** */
    @EnumField(146)
    setActivateRune() { return this.set(146);  };

    /** */
    @EnumField(147)
    setQuestFail () { return this.set(147);  };

    /** */
    @EnumField(148)
    setTriggerMissileSpellWithValue() { return this.set(148);  };

    /** */
    @EnumField(149)
    setChargeDest() { return this.set(149);  };

    /** */
    @EnumField(150)
    setQuestStart() { return this.set(150);  };

    /** */
    @EnumField(151)
    setTriggerSpell2() { return this.set(151);  };

    /** */
    @EnumField(152)
    setSummonRafFriend () { return this.set(152);  };

    /** */
    @EnumField(153)
    setCreateTamedPet () { return this.set(153);  };

    /** */
    @EnumField(154)
    setDiscoverTaxi() { return this.set(154);  };

    /** */
    @EnumField(155)
    setTitanGrip () { return this.set(155);  };

    /** */
    @EnumField(156)
    setEnchantItemPrismatic() { return this.set(156);  };

    /** */
    @EnumField(157)
    setCreateItem2 () { return this.set(157);  };

    /** */
    @EnumField(158)
    setMilling() { return this.set(158);  };

    /** */
    @EnumField(159)
    setAllowRenamePet () { return this.set(159);  };

    /** */
    @EnumField(160)
    setSpellEffect160() { return this.set(160);  };

    /** */
    @EnumField(161)
    setTalentSpecCount () { return this.set(161);  };

    /** */
    @EnumField(162)
    setTalentSpecSelect() { return this.set(162);  };

    /** */
    @EnumField(163)
    setUnused() { return this.set(163);  };

    /** */
    @EnumField(164)
    setRemoveAura() { return this.set(164);  };
}
