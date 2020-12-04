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
import { MaskBase } from "wotlkdata/cell/systems/Mask";
import { Spell } from "./Spell";

export class SpellAttributes extends MaskBase<Spell> {
    protected cells() {
        return [
            this.owner.row.Attributes,
            this.owner.row.AttributesEx,
            this.owner.row.AttributesExB,
            this.owner.row.AttributesExC,
            this.owner.row.AttributesExD,
            this.owner.row.AttributesExE,
            this.owner.row.AttributesExF,
            this.owner.row.AttributesExG,
        ]
    }

    protected cell(no: number) {
        return this.cells()[Math.floor(no/32)]
    }

    protected bitno(no: number) { return no%32; }

    clearAll() {
        this.cells().forEach((x)=>x.set(0));
        return this.owner;
    }

    mark(no: number): Spell {
        const cell = this.cell(no);
        cell.set(cell.get()|1<<this.bitno(no));
        return this.owner;
    }

    toString() {
        return this.cells().reduce((p,c)=>p+c.get().toString(2),"");
    }

    clear(no: number): Spell {
        const cell = this.cell(no);
        cell.set(cell.get()&~1<<this.bitno(no));
        return this.owner;
    }

    check(no: number): boolean {
        const cell = this.cell(no);
        return (cell.get()&1<<this.bitno(no)) !== 0;
    }

    /**
     * No comment (yet!)
     */
    get unk1() { return this.bit(1) }

    /**
     * No comment (yet!)
     */
    get nextRanged() { return this.bit(1); }

    /**
     * No comment (yet!)
     */
    get nextSwing() { return this.bit(2); }

    /**
     * No comment (yet!)
     */
    get isReplenishment() { return this.bit(3); }

    /**
     * No comment (yet!)
     */
    get isAbility() { return this.bit(4); }

    /**
     * No comment (yet!)
     */
    get isTradeSpell() { return this.bit(5); }

    /**
     * No comment (yet!)
     */
    get isPassive() { return this.bit(6); }

    /**
     * No comment (yet!)
     */
    get isHiddenInSpellbook() { return this.bit(7); }

    /**
     * No comment (yet!)
     */
    get isHiddenFromLog() { return this.bit(8); }

    /**
     * No comment (yet!)
     */
    get targetsMainhand() { return this.bit(9); }

    /**
     * No comment (yet!)
     */
    get nextSwing2() { return this.bit(10); }

    /**
     * No comment (yet!)
     */
    get unk2() { return this.bit(11); }

    /**
     * No comment (yet!)
     */
    get daytimeOnly() { return this.bit(12); }

    /**
     * No comment (yet!)
     */
    get nightOnly() { return this.bit(13); }

    /**
     * No comment (yet!)
     */
    get indoorsOnly() { return this.bit(14); }

    /**
     * No comment (yet!)
     */
    get outdoorsOnly() { return this.bit(15); }

    /**
     * No comment (yet!)
     */
    get notShapeshifted() { return this.bit(16); }

    /**
     * No comment (yet!)
     */
    get requiresStealth() { return this.bit(17); }

    /**
     * No comment (yet!)
     */
    get sheatheUnchanged() { return this.bit(18); }

    /**
     * No comment (yet!)
     */
    get damageLevelCalculation() { return this.bit(19); }

    /**
     * No comment (yet!)
     */
    get stopAttacking() { return this.bit(20); }

    /**
     * No comment (yet!)
     */
    get impossibleToDodgeParryBlock() { return this.bit(21); }

    /**
     * No comment (yet!)
     */
    get castTrackTarget() { return this.bit(22); }

    /**
     * No comment (yet!)
     */
    get castableWhileDead() { return this.bit(23); }

    /**
     * No comment (yet!)
     */
    get castableWhileMounted() { return this.bit(24); }

    /**
     * No comment (yet!)
     */
    get disabledWhileActive() { return this.bit(25); }

    /**
     * No comment (yet!)
     */
    get isNegative() { return this.bit(26); }

    /**
     * No comment (yet!)
     */
    get castableWhileSitting() { return this.bit(27); }

    /**
     * No comment (yet!)
     */
    get cannotUseInCombat() { return this.bit(28); }

    /**
     * No comment (yet!)
     */
    get unaffectedByInvulnerability() { return this.bit(29); }

    /**
     * No comment (yet!)
     */
    get heartbeatResistCheck() { return this.bit(30); }

    /**
     * No comment (yet!)
     */
    get cantBeCanceled() { return this.bit(31); }

    /**
     * No comment (yet!)
     */
    get dismissPet() { return this.bit(32); }

    /**
     * No comment (yet!)
     */
    get drainAllPower() { return this.bit(33); }

    /**
     * No comment (yet!)
     */
    get channeled() { return this.bit(34); }

    /**
     * No comment (yet!)
     */
    get cantBeRedirected() { return this.bit(35); }

    /**
     * No comment (yet!)
     */
    get unk3() { return this.bit(36); }

    /**
     * No comment (yet!)
     */
    get notBreakStealth() { return this.bit(37); }

    /**
     * No comment (yet!)
     */
    get channeled2() { return this.bit(38); }

    /**
     * No comment (yet!)
     */
    get cantBeReflected() { return this.bit(39); }

    /**
     * No comment (yet!)
     */
    get cantTargetInCombat() { return this.bit(40); }

    /**
     * No comment (yet!)
     */
    get meleeCombatStart() { return this.bit(41); }

    /**
     * No comment (yet!)
     */
    get noThreat() { return this.bit(42); }

    /**
     * No comment (yet!)
     */
    get unk4() { return this.bit(43); }

    /**
     * No comment (yet!)
     */
    get isPickpocket() { return this.bit(44); }

    /**
     * No comment (yet!)
     */
    get isFarsight() { return this.bit(45); }

    /**
     * No comment (yet!)
     */
    get channelTrackTarget() { return this.bit(46); }

    /**
     * No comment (yet!)
     */
    get dispelAuraOnImmunity() { return this.bit(47); }

    /**
     * No comment (yet!)
     */
    get unaffectedBySchoolImmune() { return this.bit(48); }

    /**
     * No comment (yet!)
     */
    get unAutocastableByPet() { return this.bit(49); }

    /**
     * No comment (yet!)
     */
    get unk5() { return this.bit(50); }

    /**
     * No comment (yet!)
     */
    get cantTargetSelf() { return this.bit(51); }

    /**
     * No comment (yet!)
     */
    get reqComboPoints() { return this.bit(52); }

    /**
     * No comment (yet!)
     */
    get unk6() { return this.bit(53); }

    /**
     * No comment (yet!)
     */
    get reqComboPoints2() { return this.bit(54); }

    /**
     * No comment (yet!)
     */
    get unk7() { return this.bit(55); }

    /**
     * No comment (yet!)
     */
    get isFishingSpell() { return this.bit(56); }

    /**
     * No comment (yet!)
     */
    get unk8() { return this.bit(57); }

    /**
     * No comment (yet!)
     */
    get unk9() { return this.bit(58); }

    /**
     * No comment (yet!)
     */
    get unk10() { return this.bit(59); }

    /**
     * No comment (yet!)
     */
    get hideFromAuraBar() { return this.bit(60); }

    /**
     * No comment (yet!)
     */
    get channelDisplaySpellName() { return this.bit(61); }

    /**
     * No comment (yet!)
     */
    get enableAtDodge() { return this.bit(62); }

    /**
     * No comment (yet!)
     */
    get unk11() { return this.bit(63); }

    /**
     * No comment (yet!)
     */
    get canTargetDead() { return this.bit(64); }

    /**
     * No comment (yet!)
     */
    get unk12() { return this.bit(65); }

    /**
     * No comment (yet!)
     */
    get canTargetNotInLOS() { return this.bit(66); }

    /**
     * No comment (yet!)
     */
    get unk13() { return this.bit(67); }

    /**
     * No comment (yet!)
     */
    get displayInStanceBar() { return this.bit(68); }

    /**
     * No comment (yet!)
     */
    get isAutoRepeat() { return this.bit(69); }

    /**
     * No comment (yet!)
     */
    get cantTargetTapped() { return this.bit(70); }

    /**
     * No comment (yet!)
     */
    get unk14() { return this.bit(71); }

    /**
     * No comment (yet!)
     */
    get unk15() { return this.bit(72); }

    /**
     * No comment (yet!)
     */
    get unk16() { return this.bit(73); }

    /**
     * No comment (yet!)
     */
    get unk17() { return this.bit(74); }

    /**
     * No comment (yet!)
     */
    get healthFunnel() { return this.bit(75); }

    /**
     * No comment (yet!)
     */
    get unk18() { return this.bit(76); }

    /**
     * No comment (yet!)
     */
    get keepEnchantInArena() { return this.bit(77); }

    /**
     * No comment (yet!)
     */
    get unk19() { return this.bit(78); }

    /**
     * No comment (yet!)
     */
    get unk20() { return this.bit(79); }

    /**
     * No comment (yet!)
     */
    get tameBeast() { return this.bit(80); }

    /**
     * No comment (yet!)
     */
    get notResetAutoActions() { return this.bit(81); }

    /**
     * No comment (yet!)
     */
    get requireDeadPet() { return this.bit(82); }

    /**
     * No comment (yet!)
     */
    get notNeedShapeshift() { return this.bit(83); }

    /**
     * No comment (yet!)
     */
    get unk21() { return this.bit(84); }

    /**
     * No comment (yet!)
     */
    get damageReduceShield() { return this.bit(85); }

    /**
     * No comment (yet!)
     */
    get unk22() { return this.bit(86); }

    /**
     * No comment (yet!)
     */
    get isArcaneConcentration() { return this.bit(87); }

    /**
     * No comment (yet!)
     */
    get unk23() { return this.bit(88); }

    /**
     * No comment (yet!)
     */
    get unk24() { return this.bit(89); }

    /**
     * No comment (yet!)
     */
    get unaffectedBySchoolImmunity() { return this.bit(90); }

    /**
     * No comment (yet!)
     */
    get unk25() { return this.bit(91); }

    /**
     * No comment (yet!)
     */
    get ignoreItemCheck() { return this.bit(92); }

    /**
     * No comment (yet!)
     */
    get cantCrit() { return this.bit(93); }

    /**
     * No comment (yet!)
     */
    get triggerCanTriggerProc() { return this.bit(94); }

    /**
     * No comment (yet!)
     */
    get isFoodBuff() { return this.bit(95); }

    /**
     * No comment (yet!)
     */
    get unk26() { return this.bit(96); }

    /**
     * No comment (yet!)
     */
    get unk27() { return this.bit(97); }

    /**
     * No comment (yet!)
     */
    get unk28() { return this.bit(98); }

    /**
     * No comment (yet!)
     */
    get blockableSpell() { return this.bit(99); }

    /**
     * No comment (yet!)
     */
    get ignoreResurrectionTimer() { return this.bit(100); }

    /**
     * No comment (yet!)
     */
    get unk29() { return this.bit(101); }

    /**
     * No comment (yet!)
     */
    get unk30() { return this.bit(102); }

    /**
     * No comment (yet!)
     */
    get separateStackPerCaster() { return this.bit(103); }

    /**
     * No comment (yet!)
     */
    get onlyTargetPlayers() { return this.bit(104); }

    /**
     * No comment (yet!)
     */
    get triggeredFromEffect() { return this.bit(105); }

    /**
     * No comment (yet!)
     */
    get mainhandRequired() { return this.bit(106); }

    /**
     * No comment (yet!)
     */
    get battlegroundOnly() { return this.bit(107); }

    /**
     * No comment (yet!)
     */
    get onlyTargetGhosts() { return this.bit(108); }

    /**
     * No comment (yet!)
     */
    get hideChannelBar() { return this.bit(109); }

    /**
     * No comment (yet!)
     */
    get isHonorlessTarget() { return this.bit(110); }

    /**
     * No comment (yet!)
     */
    get isAutoShoot() { return this.bit(111); }

    /**
     * No comment (yet!)
     */
    get cantTriggerProc() { return this.bit(112); }

    /**
     * No comment (yet!)
     */
    get noInitialAggro() { return this.bit(113); }

    /**
     * No comment (yet!)
     */
    get ignoreHitResult() { return this.bit(114); }

    /**
     * No comment (yet!)
     */
    get disableProc() { return this.bit(115); }

    /**
     * No comment (yet!)
     */
    get persistsDeath() { return this.bit(116); }

    /**
     * No comment (yet!)
     */
    get unk31() { return this.bit(117); }

    /**
     * No comment (yet!)
     */
    get requiresWand() { return this.bit(118); }

    /**
     * No comment (yet!)
     */
    get unk32() { return this.bit(119); }

    /**
     * No comment (yet!)
     */
    get requiresOffhand() { return this.bit(120); }

    /**
     * No comment (yet!)
     */
    get treatAsPeriodic() { return this.bit(121); }

    /**
     * No comment (yet!)
     */
    get canProcWithTriggered() { return this.bit(122); }

    /**
     * No comment (yet!)
     */
    get isDrainSoul() { return this.bit(123); }

    /**
     * No comment (yet!)
     */
    get unk33() { return this.bit(124); }

    /**
     * No comment (yet!)
     */
    get ignoreBonuses() { return this.bit(125); }

    /**
     * No comment (yet!)
     */
    get dontDisplayRange() { return this.bit(126); }

    /**
     * No comment (yet!)
     */
    get unk34() { return this.bit(127); }

    /**
     * No comment (yet!)
     */
    get ignoreResistances() { return this.bit(128); }

    /**
     * No comment (yet!)
     */
    get procOnlyOnCaster() { return this.bit(129); }

    /**
     * No comment (yet!)
     */
    get unk35() { return this.bit(130); }

    /**
     * No comment (yet!)
     */
    get unk36() { return this.bit(131); }

    /**
     * No comment (yet!)
     */
    get unk37() { return this.bit(132); }

    /**
     * No comment (yet!)
     */
    get unk38() { return this.bit(133); }

    /**
     * No comment (yet!)
     */
    get notStealable() { return this.bit(134); }

    /**
     * No comment (yet!)
     */
    get canCastWhileCasting() { return this.bit(135); }

    /**
     * No comment (yet!)
     */
    get fixedDamage() { return this.bit(136); }

    /**
     * No comment (yet!)
     */
    get triggerActivate() { return this.bit(137); }

    /**
     * No comment (yet!)
     */
    get isShiv() { return this.bit(138); }

    /**
     * No comment (yet!)
     */
    get unk39() { return this.bit(139); }

    /**
     * No comment (yet!)
     */
    get unk40() { return this.bit(140); }

    /**
     * No comment (yet!)
     */
    get combatLogNoCaster() { return this.bit(141); }

    /**
     * No comment (yet!)
     */
    get damageDoesntBreakAuras() { return this.bit(142); }

    /**
     * No comment (yet!)
     */
    get unk41() { return this.bit(143); }

    /**
     * No comment (yet!)
     */
    get notUsableInArenaOrRatedBg() { return this.bit(144); }

    /**
     * No comment (yet!)
     */
    get usableInArena() { return this.bit(145); }

    /**
     * No comment (yet!)
     */
    get areaTargetChain() { return this.bit(146); }

    /**
     * No comment (yet!)
     */
    get unk42() { return this.bit(147); }

    /**
     * No comment (yet!)
     */
    get noCheckCastPower() { return this.bit(148); }

    /**
     * No comment (yet!)
     */
    get unk43() { return this.bit(149); }

    /**
     * No comment (yet!)
     */
    get unk44() { return this.bit(150); }

    /**
     * No comment (yet!)
     */
    get unk45() { return this.bit(151); }

    /**
     * No comment (yet!)
     */
    get unk46() { return this.bit(152); }

    /**
     * No comment (yet!)
     */
    get isPetScaling() { return this.bit(153); }

    /**
     * No comment (yet!)
     */
    get outlandUseOnly() { return this.bit(154); }

    /**
     * No comment (yet!)
     */
    get unk47() { return this.bit(155); }

    /**
     * No comment (yet!)
     */
    get unk48() { return this.bit(156); }

    /**
     * No comment (yet!)
     */
    get unk49() { return this.bit(157); }

    /**
     * No comment (yet!)
     */
    get unk50() { return this.bit(158); }

    /**
     * No comment (yet!)
     */
    get unk51() { return this.bit(159); }

    /**
     * No comment (yet!)
     */
    get canChannelWhenMoving() { return this.bit(160); }

    /**
     * No comment (yet!)
     */
    get noReagentWhilePrep() { return this.bit(161); }

    /**
     * No comment (yet!)
     */
    get unk52() { return this.bit(162); }

    /**
     * No comment (yet!)
     */
    get usableWhileStunned() { return this.bit(163); }

    /**
     * No comment (yet!)
     */
    get unk53() { return this.bit(164); }

    /**
     * No comment (yet!)
     */
    get singleTargetSpell() { return this.bit(165); }

    /**
     * No comment (yet!)
     */
    get unk54() { return this.bit(166); }

    /**
     * No comment (yet!)
     */
    get unk55() { return this.bit(167); }

    /**
     * No comment (yet!)
     */
    get unk56() { return this.bit(168); }

    /**
     * No comment (yet!)
     */
    get startPeriodicAtApply() { return this.bit(169); }

    /**
     * No comment (yet!)
     */
    get hideDuration() { return this.bit(170); }

    /**
     * No comment (yet!)
     */
    get allowTargetofTargetAsTarget() { return this.bit(171); }

    /**
     * No comment (yet!)
     */
    get unk57() { return this.bit(172); }

    /**
     * No comment (yet!)
     */
    get hasteAffectDuration() { return this.bit(173); }

    /**
     * No comment (yet!)
     */
    get unk58() { return this.bit(174); }

    /**
     * No comment (yet!)
     */
    get unk59() { return this.bit(175); }

    /**
     * No comment (yet!)
     */
    get unk60() { return this.bit(176); }

    /**
     * No comment (yet!)
     */
    get unk61() { return this.bit(177); }

    /**
     * No comment (yet!)
     */
    get usableWhileConfused() { return this.bit(178); }

    /**
     * No comment (yet!)
     */
    get dontTurnDuringCast() { return this.bit(179); }

    /**
     * No comment (yet!)
     */
    get unk62() { return this.bit(180); }

    /**
     * No comment (yet!)
     */
    get unk63() { return this.bit(181); }

    /**
     * No comment (yet!)
     */
    get unk64() { return this.bit(182); }

    /**
     * No comment (yet!)
     */
    get unk65() { return this.bit(183); }

    /**
     * No comment (yet!)
     */
    get unk66() { return this.bit(184); }

    /**
     * No comment (yet!)
     */
    get unk67() { return this.bit(185); }

    /**
     * No comment (yet!)
     */
    get unk68() { return this.bit(186); }

    /**
     * No comment (yet!)
     */
    get hideAuraIfSelfCast() { return this.bit(187); }

    /**
     * No comment (yet!)
     */
    get hideAuraIfNotSelfCast() { return this.bit(188); }

    /**
     * No comment (yet!)
     */
    get unk69() { return this.bit(189); }

    /**
     * No comment (yet!)
     */
    get unk70() { return this.bit(190); }

    /**
     * No comment (yet!)
     */
    get unk71() { return this.bit(191); }

    /**
     * No comment (yet!)
     */
    get dontDisplayCooldown() { return this.bit(192); }

    /**
     * No comment (yet!)
     */
    get arenaOnly() { return this.bit(193); }

    /**
     * No comment (yet!)
     */
    get ignoreCasterAuras() { return this.bit(194); }

    /**
     * No comment (yet!)
     */
    get ignoreImmuneFlags() { return this.bit(195); }

    /**
     * No comment (yet!)
     */
    get unk72() { return this.bit(196); }

    /**
     * No comment (yet!)
     */
    get unk73() { return this.bit(197); }

    /**
     * No comment (yet!)
     */
    get useSpellCastEvent() { return this.bit(198); }

    /**
     * No comment (yet!)
     */
    get unk74() { return this.bit(199); }

    /**
     * No comment (yet!)
     */
    get cantTargetCrowdControlled() { return this.bit(200); }

    /**
     * No comment (yet!)
     */
    get unk75() { return this.bit(201); }

    /**
     * No comment (yet!)
     */
    get canTargetPossessedFriends() { return this.bit(202); }

    /**
     * No comment (yet!)
     */
    get notInRaidInstance() { return this.bit(203); }

    /**
     * No comment (yet!)
     */
    get castableOnVehicle() { return this.bit(204); }

    /**
     * No comment (yet!)
     */
    get canTargetInvisible() { return this.bit(205); }

    /**
     * No comment (yet!)
     */
    get unk76() { return this.bit(206); }

    /**
     * No comment (yet!)
     */
    get unk77() { return this.bit(207); }

    /**
     * No comment (yet!)
     */
    get unk78() { return this.bit(208); }

    /**
     * No comment (yet!)
     */
    get unk79() { return this.bit(209); }

    /**
     * No comment (yet!)
     */
    get castByCharmer() { return this.bit(210); }

    /**
     * No comment (yet!)
     */
    get unk80() { return this.bit(211); }

    /**
     * No comment (yet!)
     */
    get auraVisibleToCasterOnly() { return this.bit(212); }

    /**
     * No comment (yet!)
     */
    get clientUiTargetEffects() { return this.bit(213); }

    /**
     * No comment (yet!)
     */
    get unk81() { return this.bit(214); }

    /**
     * No comment (yet!)
     */
    get unk82() { return this.bit(215); }

    /**
     * No comment (yet!)
     */
    get canTargetUntargetable() { return this.bit(216); }

    /**
     * No comment (yet!)
     */
    get notResetSwingIfInstant() { return this.bit(217); }

    /**
     * No comment (yet!)
     */
    get unk83() { return this.bit(218); }

    /**
     * No comment (yet!)
     */
    get unk84() { return this.bit(219); }

    /**
     * No comment (yet!)
     */
    get unk85() { return this.bit(220); }

    /**
     * No comment (yet!)
     */
    get noDonePctDamageMods() { return this.bit(221); }

    /**
     * No comment (yet!)
     */
    get unk86() { return this.bit(222); }

    /**
     * No comment (yet!)
     */
    get ignoreCategoryCooldownMods() { return this.bit(223); }

    /**
     * No comment (yet!)
     */
    get unk87() { return this.bit(224); }

    /**
     * No comment (yet!)
     */
    get durationUnaffectedByModifiers() { return this.bit(225); }

    /**
     * No comment (yet!)
     */
    get reactivateAtResurrect() { return this.bit(226); }

    /**
     * No comment (yet!)
     */
    get isCheatSpell() { return this.bit(227); }

    /**
     * No comment (yet!)
     */
    get unk88() { return this.bit(228); }

    /**
     * No comment (yet!)
     */
    get summonTotem() { return this.bit(229); }

    /**
     * No comment (yet!)
     */
    get noPushbackOnDamage() { return this.bit(230); }

    /**
     * No comment (yet!)
     */
    get unk89() { return this.bit(231); }

    /**
     * No comment (yet!)
     */
    get isHordeOnly() { return this.bit(232); }

    /**
     * No comment (yet!)
     */
    get isAllianceOnly() { return this.bit(233); }

    /**
     * No comment (yet!)
     */
    get dispelCharges() { return this.bit(234); }

    /**
     * No comment (yet!)
     */
    get interruptNonPlayerCasts() { return this.bit(235); }

    /**
     * No comment (yet!)
     */
    get silenceNonPlayers() { return this.bit(236); }

    /**
     * No comment (yet!)
     */
    get unk90() { return this.bit(237); }

    /**
     * No comment (yet!)
     */
    get unk91() { return this.bit(238); }

    /**
     * No comment (yet!)
     */
    get unk92() { return this.bit(239); }

    /**
     * No comment (yet!)
     */
    get canRestoreSecondaryPower() { return this.bit(240); }

    /**
     * No comment (yet!)
     */
    get unk93() { return this.bit(241); }

    /**
     * No comment (yet!)
     */
    get hasChargeEffect() { return this.bit(242); }

    /**
     * No comment (yet!)
     */
    get zoneTeleport() { return this.bit(243); }

    /**
     * No comment (yet!)
     */
    get unk94() { return this.bit(244); }

    /**
     * No comment (yet!)
     */
    get unk95() { return this.bit(245); }

    /**
     * No comment (yet!)
     */
    get unk96() { return this.bit(246); }

    /**
     * No comment (yet!)
     */
    get unk97() { return this.bit(247); }

    /**
     * No comment (yet!)
     */
    get unk98() { return this.bit(248); }

    /**
     * No comment (yet!)
     */
    get unk99() { return this.bit(249); }

    /**
     * No comment (yet!)
     */
    get unk100() { return this.bit(250); }

    /**
     * No comment (yet!)
     */
    get unk101() { return this.bit(251); }

    /**
     * No comment (yet!)
     */
    get consolidatedRaidBuff() { return this.bit(252); }

    /**
     * No comment (yet!)
     */
    get unk102() { return this.bit(253); }

    /**
     * No comment (yet!)
     */
    get unk103() { return this.bit(254); }

    /**
     * No comment (yet!)
     */
    get clientIndicator() { return this.bit(255); }
}