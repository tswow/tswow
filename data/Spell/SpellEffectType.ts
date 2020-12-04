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
import { Enum } from "wotlkdata/cell/Systems/Enum";
import { Spell } from "./Spell";

export class SpellEffectType extends Enum<Spell> {
    constructor(owner: Spell, index: number) {
        super(owner, Cell.wrapIndex(owner.row.Effect, index));
    }

    /** */
    setNull() { return this.set(0);  };
    /** */
    setInstakill() { return this.set(1);  };
    /** */
    setSchoolDamage() { return this.set(2);  };
    /** */
    setDummy() { return this.set(3);  };
    /** */
    setPortalTeleport () { return this.set(4);  };
    /** */
    setTeleportUnits() { return this.set(5);  };
    /** */
    setApplyAura() { return this.set(6);  };
    /** */
    setEnvironmentalDamage() { return this.set(7);  };
    /** */
    setPowerDrain() { return this.set(8);  };
    /** */
    setHealthLeech() { return this.set(9);  };
    /** */
    setHeal() { return this.set(10);  };
    /** */
    setBind() { return this.set(11);  };
    /** */
    setPortal() { return this.set(12);  };
    /** */
    setRitualBase () { return this.set(13);  };
    /** */
    setRitualSpecialize () { return this.set(14);  };
    /** */
    setRitualActivatePortal () { return this.set(15);  };
    /** */
    setQuestComplete() { return this.set(16);  };
    /** */
    setWeaponDamageNoschool() { return this.set(17);  };
    /** */
    setResurrect() { return this.set(18);  };
    /** */
    setAddExtraAttacks() { return this.set(19);  };
    /** */
    setDodge () { return this.set(20);  };
    /** */
    setEvade () { return this.set(21);  };
    /** */
    setParry() { return this.set(22);  };
    /** */
    setBlock () { return this.set(23);  };
    /** */
    setCreateItem() { return this.set(24);  };
    /** */
    setWeapon() { return this.set(25);  };
    /** */
    setDefense () { return this.set(26);  };
    /** */
    setPersistentAreaAura() { return this.set(27);  };
    /** */
    setSummon() { return this.set(28);  };
    /** */
    setLeap() { return this.set(29);  };
    /** */
    setEnergize() { return this.set(30);  };
    /** */
    setWeaponPercentDamage() { return this.set(31);  };
    /** */
    setTriggerMissile() { return this.set(32);  };
    /** */
    setOpenLock() { return this.set(33);  };
    /** */
    setSummonChangeItem() { return this.set(34);  };
    /** */
    setApplyAreaAuraParty() { return this.set(35);  };
    /** */
    setLearnSpell() { return this.set(36);  };
    /** */
    setSpellDefense () { return this.set(37);  };
    /** */
    setDispel() { return this.set(38);  };
    /** */
    setLanguage() { return this.set(39);  };
    /** */
    setDualWield() { return this.set(40);  };
    /** */
    setJump() { return this.set(41);  };
    /** */
    setJumpDest() { return this.set(42);  };
    /** */
    setTeleportUnitsFaceCaster() { return this.set(43);  };
    /** */
    setSkillStep() { return this.set(44);  };
    /** */
    setAddHonor() { return this.set(45);  };
    /** */
    setSpawn () { return this.set(46);  };
    /** */
    setTradeSkill() { return this.set(47);  };
    /** */
    setStealth () { return this.set(48);  };
    /** */
    setDetect () { return this.set(49);  };
    /** */
    setTransDoor() { return this.set(50);  };
    /** */
    setForceCriticalHit () { return this.set(51);  };
    /** */
    setGuaranteeHit () { return this.set(52);  };
    /** */
    setEnchantItem() { return this.set(53);  };
    /** */
    setEnchantItemTemporary() { return this.set(54);  };
    /** */
    setTamecreature() { return this.set(55);  };
    /** */
    setSummonPet() { return this.set(56);  };
    /** */
    setLearnPetSpell() { return this.set(57);  };
    /** */
    setWeaponDamage() { return this.set(58);  };
    /** */
    setCreateRandomItem () { return this.set(59);  };
    /** */
    setProficiency() { return this.set(60);  };
    /** */
    setSendEvent() { return this.set(61);  };
    /** */
    setPowerBurn() { return this.set(62);  };
    /** */
    setThreat() { return this.set(63);  };
    /** */
    setTriggerSpell() { return this.set(64);  };
    /** */
    setApplyAreaAuraRaid() { return this.set(65);  };
    /** */
    setCreateManaGem () { return this.set(66);  };
    /** */
    setHealMaxHealth() { return this.set(67);  };
    /** */
    setInterruptCast() { return this.set(68);  };
    /** */
    setDistract() { return this.set(69);  };
    /** */
    setPull () { return this.set(70);  };
    /** */
    setPickpocket() { return this.set(71);  };
    /** */
    setAddFarsight() { return this.set(72);  };
    /** */
    setUntrainTalents() { return this.set(73);  };
    /** */
    setApplyGlyph() { return this.set(74);  };
    /** */
    setHealMechanical () { return this.set(75);  };
    /** */
    setSummonObjectWild() { return this.set(76);  };
    /** */
    setScriptEffect() { return this.set(77);  };
    /** */
    setAttack() { return this.set(78);  };
    /** */
    setSanctuary() { return this.set(79);  };
    /** */
    setAddComboPoints() { return this.set(80);  };
    /** */
    setCreateHouse () { return this.set(81);  };
    /** */
    setBindSight() { return this.set(82);  };
    /** */
    setDuel() { return this.set(83);  };
    /** */
    setStuck() { return this.set(84);  };
    /** */
    setSummonPlayer() { return this.set(85);  };
    /** */
    setActivateObject() { return this.set(86);  };
    /** */
    setGameobjectDamage() { return this.set(87);  };
    /** */
    setGameobjectRepair() { return this.set(88);  };
    /** */
    setGameobjectSetDestructionState() { return this.set(89);  };
    /** */
    setKillCredit () { return this.set(90);  };
    /** */
    setThreatAll () { return this.set(91);  };
    /** */
    setEnchantHeldItem() { return this.set(92);  };
    /** */
    setForceDeselect() { return this.set(93);  };
    /** */
    setSelfResurrect() { return this.set(94);  };
    /** */
    setSkinning() { return this.set(95);  };
    /** */
    setCharge() { return this.set(96);  };
    /** */
    setCastButton () { return this.set(97);  };
    /** */
    setKnockBack() { return this.set(98);  };
    /** */
    setDisenchant() { return this.set(99);  };
    /** */
    setInebriate() { return this.set(100);  };
    /** */
    setFeedPet() { return this.set(101);  };
    /** */
    setDismissPet() { return this.set(102);  };
    /** */
    setReputation() { return this.set(103);  };
    /** */
    setSummonObjectSlot1() { return this.set(104);  };
    /** */
    setSummonObjectSlot2() { return this.set(105);  };
    /** */
    setSummonObjectSlot3() { return this.set(106);  };
    /** */
    setSummonObjectSlot4() { return this.set(107);  };
    /** */
    setDispelMechanic() { return this.set(108);  };
    /** */
    setSummonDeadPet() { return this.set(109);  };
    /** */
    setDestroyAllTotems() { return this.set(110);  };
    /** */
    setDurabilityDamage() { return this.set(111);  };
    /** */
    setSpellEffect112() { return this.set(112);  };
    /** */
    setResurrectNew() { return this.set(113);  };
    /** */
    setAttackMe() { return this.set(114);  };
    /** */
    setDurabilityDamagePct() { return this.set(115);  };
    /** */
    setSkinPlayerCorpse () { return this.set(116);  };
    /** */
    setSpiritHeal () { return this.set(117);  };
    /** */
    setSkill () { return this.set(118);  };
    /** */
    setApplyAreaAuraPet() { return this.set(119);  };
    /** */
    setTeleportGraveyard () { return this.set(120);  };
    /** */
    setNormalizedWeaponDmg() { return this.set(121);  };
    /** */
    setSpellEffect122 () { return this.set(122);  };
    /** */
    setSendTaxi () { return this.set(123);  };
    /** */
    setPullTowards() { return this.set(124);  };
    /** */
    setModifyThreatPercent() { return this.set(125);  };
    /** */
    setStealBeneficialBuff () { return this.set(126);  };
    /** */
    setProspecting () { return this.set(127);  };
    /** */
    setApplyAreaAuraFriend() { return this.set(128);  };
    /** */
    setApplyAreaAuraEnemy() { return this.set(129);  };
    /** */
    setRedirectThreat() { return this.set(130);  };
    /** */
    setPlayerNotification () { return this.set(131);  };
    /** */
    setPlayMusic () { return this.set(132);  };
    /** */
    setUnlearnSpecialization () { return this.set(133);  };
    /** Duplicate of setKillCredit(?)*/
    setKillCredit2 () { return this.set(134);  };
    /** */
    setCallPet() { return this.set(135);  };
    /** */
    setHealPct() { return this.set(136);  };
    /** */
    setEnergizePct() { return this.set(137);  };
    /** */
    setLeapBack () { return this.set(138);  };
    /** */
    setClearQuest () { return this.set(139);  };
    /** */
    setForceCast() { return this.set(140);  };
    /** */
    setForceCastWithValue() { return this.set(141);  };
    /** */
    setTriggerSpellWithValue() { return this.set(142);  };
    /** */
    setApplyAreaAuraOwner() { return this.set(143);  };
    /** */
    setKnockBackDest() { return this.set(144);  };
    /** */
    setPullTowardsDest () { return this.set(145);  };
    /** */
    setActivateRune() { return this.set(146);  };
    /** */
    setQuestFail () { return this.set(147);  };
    /** */
    setTriggerMissileSpellWithValue() { return this.set(148);  };
    /** */
    setChargeDest() { return this.set(149);  };
    /** */
    setQuestStart() { return this.set(150);  };
    /** */
    setTriggerSpell2() { return this.set(151);  };
    /** */
    setSummonRafFriend () { return this.set(152);  };
    /** */
    setCreateTamedPet () { return this.set(153);  };
    /** */
    setDiscoverTaxi() { return this.set(154);  };
    /** */
    setTitanGrip () { return this.set(155);  };
    /** */
    setEnchantItemPrismatic() { return this.set(156);  };
    /** */
    setCreateItem2 () { return this.set(157);  };
    /** */
    setMilling() { return this.set(158);  };
    /** */
    setAllowRenamePet () { return this.set(159);  };
    /** */
    setSpellEffect160() { return this.set(160);  };
    /** */
    setTalentSpecCount () { return this.set(161);  };
    /** */
    setTalentSpecSelect() { return this.set(162);  };
    /** */
    setUnused() { return this.set(163);  };
    /** */
    setRemoveAura() { return this.set(164);  };
}
