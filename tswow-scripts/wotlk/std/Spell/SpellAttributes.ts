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
import { MaskCell } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient";
import { Spell } from "./Spell";

export class SpellAttributes<T> extends MaskCell<T> {
    @Transient
    protected spell: Spell;

    protected deserialize(value: any) {
        throw new Error(`Deserialize not implemented for SpellAttributes`);
    }

    constructor(owner: T, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    protected cells() {
        return [
            this.spell.row.Attributes,
            this.spell.row.AttributesEx,
            this.spell.row.AttributesExB,
            this.spell.row.AttributesExC,
            this.spell.row.AttributesExD,
            this.spell.row.AttributesExE,
            this.spell.row.AttributesExF,
            this.spell.row.AttributesExG,
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

    setBit(no: number, value: boolean)  {
        if(value) {
            const cell = this.cell(no);
            cell.set((cell.get()|1<<this.bitno(no))>>>0);
        } else {
            const cell = this.cell(no);
            cell.set((cell.get()&~1<<this.bitno(no))>>>0);
        }
        return this.owner;
    }

    toString() {
        return this.cells().reduce((p,c)=>p+c.get().toString(2),"");
    }

    getBit(no: number): boolean {
        const cell = this.cell(no);
        return ((cell.get()&1<<this.bitno(no))>>>0) !== 0;
    }

   /**
     * No comment (yet!)
     */
    get UNK1() { return this.bit(0) }

    /**
     * No comment (yet!)
     */
    get NEXT_RANGED() { return this.bit(1); }

    /**
     * No comment (yet!)
     */
    get NEXT_SWING() { return this.bit(2); }

    /**
     * No comment (yet!)
     */
    get IS_REPLENISHMENT() { return this.bit(3); }

    /**
     * No comment (yet!)
     */
    get IS_ABILITY() { return this.bit(4); }

    /**
     * No comment (yet!)
     */
    get IS_TRADE_SPELL() { return this.bit(5); }

    /**
     * No comment (yet!)
     */
    get IS_PASSIVE() { return this.bit(6); }

    /**
     * No comment (yet!)
     */
    get IS_HIDDEN_IN_SPELLBOOK() { return this.bit(7); }

    /**
     * No comment (yet!)
     */
    get IS_HIDDEN_FROM_LOG() { return this.bit(8); }

    /**
     * No comment (yet!)
     */
    get TARGETS_MAINHAND() { return this.bit(9); }

    /**
     * No comment (yet!)
     */
    get NEXT_SWING2() { return this.bit(10); }

    /**
     * No comment (yet!)
     */
    get UNK2() { return this.bit(11); }

    /**
     * No comment (yet!)
     */
    get DAYTIME_ONLY() { return this.bit(12); }

    /**
     * No comment (yet!)
     */
    get NIGHT_ONLY() { return this.bit(13); }

    /**
     * No comment (yet!)
     */
    get INDOORS_ONLY() { return this.bit(14); }

    /**
     * No comment (yet!)
     */
    get OUTDOORS_ONLY() { return this.bit(15); }

    /**
     * No comment (yet!)
     */
    get NOT_SHAPESHIFTED() { return this.bit(16); }

    /**
     * No comment (yet!)
     */
    get REQUIRES_STEALTH() { return this.bit(17); }

    /**
     * No comment (yet!)
     */
    get SHEATHE_UNCHANGED() { return this.bit(18); }

    /**
     * No comment (yet!)
     */
    get DAMAGE_LEVEL_CALCULATION() { return this.bit(19); }

    /**
     * No comment (yet!)
     */
    get STOP_ATTACKING() { return this.bit(20); }

    /**
     * No comment (yet!)
     */
    get IMPOSSIBLE_TO_DODGE_PARRY_BLOCK() { return this.bit(21); }

    /**
     * No comment (yet!)
     */
    get CAST_TRACK_TARGET() { return this.bit(22); }

    /**
     * No comment (yet!)
     */
    get CASTABLE_WHILE_DEAD() { return this.bit(23); }

    /**
     * No comment (yet!)
     */
    get CASTABLE_WHILE_MOUNTED() { return this.bit(24); }

    /**
     * No comment (yet!)
     */
    get DISABLED_WHILE_ACTIVE() { return this.bit(25); }

    /**
     * No comment (yet!)
     */
    get IS_NEGATIVE() { return this.bit(26); }

    /**
     * No comment (yet!)
     */
    get CASTABLE_WHILE_SITTING() { return this.bit(27); }

    /**
     * No comment (yet!)
     */
    get CANNOT_USE_IN_COMBAT() { return this.bit(28); }

    /**
     * No comment (yet!)
     */
    get UNAFFECTED_BY_INVULNERABILITY() { return this.bit(29); }

    /**
     * No comment (yet!)
     */
    get HEARTBEAT_RESIST_CHECK() { return this.bit(30); }

    /**
     * No comment (yet!)
     */
    get CANT_BE_CANCELED() { return this.bit(31); }

    /**
     * No comment (yet!)
     */
    get DISMISS_PET() { return this.bit(32); }

    /**
     * No comment (yet!)
     */
    get DRAIN_ALL_POWER() { return this.bit(33); }

    /**
     * No comment (yet!)
     */
    get CHANNELED() { return this.bit(34); }

    /**
     * No comment (yet!)
     */
    get CANT_BE_REDIRECTED() { return this.bit(35); }

    /**
     * No comment (yet!)
     */
    get UNK3() { return this.bit(36); }

    /**
     * No comment (yet!)
     */
    get NOT_BREAK_STEALTH() { return this.bit(37); }

    /**
     * No comment (yet!)
     */
    get CHANNELED2() { return this.bit(38); }

    /**
     * No comment (yet!)
     */
    get CANT_BE_REFLECTED() { return this.bit(39); }

    /**
     * No comment (yet!)
     */
    get CANT_TARGET_IN_COMBAT() { return this.bit(40); }

    /**
     * No comment (yet!)
     */
    get MELEE_COMBAT_START() { return this.bit(41); }

    /**
     * No comment (yet!)
     */
    get NO_THREAT() { return this.bit(42); }

    /**
     * No comment (yet!)
     */
    get UNK4() { return this.bit(43); }

    /**
     * No comment (yet!)
     */
    get IS_PICKPOCKET() { return this.bit(44); }

    /**
     * No comment (yet!)
     */
    get IS_FARSIGHT() { return this.bit(45); }

    /**
     * No comment (yet!)
     */
    get CHANNEL_TRACK_TARGET() { return this.bit(46); }

    /**
     * No comment (yet!)
     */
    get DISPEL_AURA_ON_IMMUNITY() { return this.bit(47); }

    /**
     * No comment (yet!)
     */
    get UNAFFECTED_BY_SCHOOL_IMMUNE() { return this.bit(48); }

    /**
     * No comment (yet!)
     */
    get UN_AUTOCASTABLE_BY_PET() { return this.bit(49); }

    /**
     * No comment (yet!)
     */
    get UNK5() { return this.bit(50); }

    /**
     * No comment (yet!)
     */
    get CANT_TARGET_SELF() { return this.bit(51); }

    /**
     * No comment (yet!)
     */
    get REQ_COMBO_POINTS() { return this.bit(52); }

    /**
     * No comment (yet!)
     */
    get UNK6() { return this.bit(53); }

    /**
     * No comment (yet!)
     */
    get REQ_COMBO_POINTS2() { return this.bit(54); }

    /**
     * No comment (yet!)
     */
    get UNK7() { return this.bit(55); }

    /**
     * No comment (yet!)
     */
    get IS_FISHING_SPELL() { return this.bit(56); }

    /**
     * No comment (yet!)
     */
    get UNK8() { return this.bit(57); }

    /**
     * No comment (yet!)
     */
    get UNK9() { return this.bit(58); }

    /**
     * No comment (yet!)
     */
    get UNK10() { return this.bit(59); }

    /**
     * No comment (yet!)
     */
    get HIDE_FROM_AURA_BAR() { return this.bit(60); }

    /**
     * No comment (yet!)
     */
    get CHANNEL_DISPLAY_SPELL_NAME() { return this.bit(61); }

    /**
     * No comment (yet!)
     */
    get ENABLE_AT_DODGE() { return this.bit(62); }

    /**
     * No comment (yet!)
     */
    get UNK11() { return this.bit(63); }

    /**
     * No comment (yet!)
     */
    get CAN_TARGET_DEAD() { return this.bit(64); }

    /**
     * No comment (yet!)
     */
    get UNK12() { return this.bit(65); }

    /**
     * No comment (yet!)
     */
    get CAN_TARGET_NOT_IN_LOS() { return this.bit(66); }

    /**
     * No comment (yet!)
     */
    get UNK13() { return this.bit(67); }

    /**
     * No comment (yet!)
     */
    get DISPLAY_IN_STANCE_BAR() { return this.bit(68); }

    /**
     * No comment (yet!)
     */
    get IS_AUTO_REPEAT() { return this.bit(69); }

    /**
     * No comment (yet!)
     */
    get CANT_TARGET_TAPPED() { return this.bit(70); }

    /**
     * No comment (yet!)
     */
    get UNK14() { return this.bit(71); }

    /**
     * No comment (yet!)
     */
    get UNK15() { return this.bit(72); }

    /**
     * No comment (yet!)
     */
    get UNK16() { return this.bit(73); }

    /**
     * No comment (yet!)
     */
    get UNK17() { return this.bit(74); }

    /**
     * No comment (yet!)
     */
    get HEALTH_FUNNEL() { return this.bit(75); }

    /**
     * No comment (yet!)
     */
    get UNK18() { return this.bit(76); }

    /**
     * No comment (yet!)
     */
    get KEEP_ENCHANT_IN_ARENA() { return this.bit(77); }

    /**
     * No comment (yet!)
     */
    get UNK19() { return this.bit(78); }

    /**
     * No comment (yet!)
     */
    get UNK20() { return this.bit(79); }

    /**
     * No comment (yet!)
     */
    get TAME_BEAST() { return this.bit(80); }

    /**
     * No comment (yet!)
     */
    get NOT_RESET_AUTO_ACTIONS() { return this.bit(81); }

    /**
     * No comment (yet!)
     */
    get REQUIRE_DEAD_PET() { return this.bit(82); }

    /**
     * No comment (yet!)
     */
    get NOT_NEED_SHAPESHIFT() { return this.bit(83); }

    /**
     * No comment (yet!)
     */
    get UNK21() { return this.bit(84); }

    /**
     * No comment (yet!)
     */
    get DAMAGE_REDUCE_SHIELD() { return this.bit(85); }

    /**
     * No comment (yet!)
     */
    get UNK22() { return this.bit(86); }

    /**
     * No comment (yet!)
     */
    get IS_ARCANE_CONCENTRATION() { return this.bit(87); }

    /**
     * No comment (yet!)
     */
    get UNK23() { return this.bit(88); }

    /**
     * No comment (yet!)
     */
    get UNK24() { return this.bit(89); }

    /**
     * No comment (yet!)
     */
    get UNAFFECTED_BY_SCHOOL_IMMUNITY() { return this.bit(90); }

    /**
     * No comment (yet!)
     */
    get UNK25() { return this.bit(91); }

    /**
     * No comment (yet!)
     */
    get IGNORE_ITEM_CHECK() { return this.bit(92); }

    /**
     * No comment (yet!)
     */
    get CANT_CRIT() { return this.bit(93); }

    /**
     * No comment (yet!)
     */
    get TRIGGER_CAN_TRIGGER_PROC() { return this.bit(94); }

    /**
     * No comment (yet!)
     */
    get IS_FOOD_BUFF() { return this.bit(95); }

    /**
     * No comment (yet!)
     */
    get UNK26() { return this.bit(96); }

    /**
     * No comment (yet!)
     */
    get UNK27() { return this.bit(97); }

    /**
     * No comment (yet!)
     */
    get UNK28() { return this.bit(98); }

    /**
     * No comment (yet!)
     */
    get BLOCKABLE_SPELL() { return this.bit(99); }

    /**
     * No comment (yet!)
     */
    get IGNORE_RESURRECTION_TIMER() { return this.bit(100); }

    /**
     * No comment (yet!)
     */
    get UNK29() { return this.bit(101); }

    /**
     * No comment (yet!)
     */
    get UNK30() { return this.bit(102); }

    /**
     * No comment (yet!)
     */
    get SEPARATE_STACK_PER_CASTER() { return this.bit(103); }

    /**
     * No comment (yet!)
     */
    get ONLY_TARGET_PLAYERS() { return this.bit(104); }

    /**
     * No comment (yet!)
     */
    get TRIGGERED_FROM_EFFECT() { return this.bit(105); }

    /**
     * No comment (yet!)
     */
    get MAINHAND_REQUIRED() { return this.bit(106); }

    /**
     * No comment (yet!)
     */
    get BATTLEGROUND_ONLY() { return this.bit(107); }

    /**
     * No comment (yet!)
     */
    get ONLY_TARGET_GHOSTS() { return this.bit(108); }

    /**
     * No comment (yet!)
     */
    get HIDE_CHANNEL_BAR() { return this.bit(109); }

    /**
     * No comment (yet!)
     */
    get IS_HONORLESS_TARGET() { return this.bit(110); }

    /**
     * No comment (yet!)
     */
    get IS_AUTO_SHOOT() { return this.bit(111); }

    /**
     * No comment (yet!)
     */
    get CANT_TRIGGER_PROC() { return this.bit(112); }

    /**
     * No comment (yet!)
     */
    get NO_INITIAL_AGGRO() { return this.bit(113); }

    /**
     * No comment (yet!)
     */
    get IGNORE_HIT_RESULT() { return this.bit(114); }

    /**
     * No comment (yet!)
     */
    get DISABLE_PROC() { return this.bit(115); }

    /**
     * No comment (yet!)
     */
    get PERSISTS_DEATH() { return this.bit(116); }

    /**
     * No comment (yet!)
     */
    get UNK31() { return this.bit(117); }

    /**
     * No comment (yet!)
     */
    get REQUIRES_WAND() { return this.bit(118); }

    /**
     * No comment (yet!)
     */
    get UNK32() { return this.bit(119); }

    /**
     * No comment (yet!)
     */
    get REQUIRES_OFFHAND() { return this.bit(120); }

    /**
     * No comment (yet!)
     */
    get TREAT_AS_PERIODIC() { return this.bit(121); }

    /**
     * No comment (yet!)
     */
    get CAN_PROC_WITH_TRIGGERED() { return this.bit(122); }

    /**
     * No comment (yet!)
     */
    get IS_DRAIN_SOUL() { return this.bit(123); }

    /**
     * No comment (yet!)
     */
    get UNK33() { return this.bit(124); }

    /**
     * No comment (yet!)
     */
    get IGNORE_BONUSES() { return this.bit(125); }

    /**
     * No comment (yet!)
     */
    get DONT_DISPLAY_RANGE() { return this.bit(126); }

    /**
     * No comment (yet!)
     */
    get UNK34() { return this.bit(127); }

    /**
     * No comment (yet!)
     */
    get IGNORE_RESISTANCES() { return this.bit(128); }

    /**
     * No comment (yet!)
     */
    get PROC_ONLY_ON_CASTER() { return this.bit(129); }

    /**
     * No comment (yet!)
     */
    get UNK35() { return this.bit(130); }

    /**
     * No comment (yet!)
     */
    get UNK36() { return this.bit(131); }

    /**
     * No comment (yet!)
     */
    get UNK37() { return this.bit(132); }

    /**
     * No comment (yet!)
     */
    get UNK38() { return this.bit(133); }

    /**
     * No comment (yet!)
     */
    get NOT_STEALABLE() { return this.bit(134); }

    /**
     * No comment (yet!)
     */
    get CAN_CAST_WHILE_CASTING() { return this.bit(135); }

    /**
     * No comment (yet!)
     */
    get FIXED_DAMAGE() { return this.bit(136); }

    /**
     * No comment (yet!)
     */
    get TRIGGER_ACTIVATE() { return this.bit(137); }

    /**
     * No comment (yet!)
     */
    get IS_SHIV() { return this.bit(138); }

    /**
     * No comment (yet!)
     */
    get UNK39() { return this.bit(139); }

    /**
     * No comment (yet!)
     */
    get UNK40() { return this.bit(140); }

    /**
     * No comment (yet!)
     */
    get COMBAT_LOG_NO_CASTER() { return this.bit(141); }

    /**
     * No comment (yet!)
     */
    get DAMAGE_DOESNT_BREAK_AURAS() { return this.bit(142); }

    /**
     * No comment (yet!)
     */
    get UNK41() { return this.bit(143); }

    /**
     * No comment (yet!)
     */
    get NOT_USABLE_IN_ARENA_OR_RATED_BG() { return this.bit(144); }

    /**
     * No comment (yet!)
     */
    get USABLE_IN_ARENA() { return this.bit(145); }

    /**
     * No comment (yet!)
     */
    get AREA_TARGET_CHAIN() { return this.bit(146); }

    /**
     * No comment (yet!)
     */
    get UNK42() { return this.bit(147); }

    /**
     * No comment (yet!)
     */
    get NO_CHECK_CAST_POWER() { return this.bit(148); }

    /**
     * No comment (yet!)
     */
    get UNK43() { return this.bit(149); }

    /**
     * No comment (yet!)
     */
    get UNK44() { return this.bit(150); }

    /**
     * No comment (yet!)
     */
    get UNK45() { return this.bit(151); }

    /**
     * No comment (yet!)
     */
    get UNK46() { return this.bit(152); }

    /**
     * No comment (yet!)
     */
    get IS_PET_SCALING() { return this.bit(153); }

    /**
     * No comment (yet!)
     */
    get OUTLAND_USE_ONLY() { return this.bit(154); }

    /**
     * No comment (yet!)
     */
    get UNK47() { return this.bit(155); }

    /**
     * No comment (yet!)
     */
    get UNK48() { return this.bit(156); }

    /**
     * No comment (yet!)
     */
    get UNK49() { return this.bit(157); }

    /**
     * No comment (yet!)
     */
    get UNK50() { return this.bit(158); }

    /**
     * No comment (yet!)
     */
    get UNK51() { return this.bit(159); }

    /**
     * No comment (yet!)
     */
    get CAN_CHANNEL_WHEN_MOVING() { return this.bit(160); }

    /**
     * No comment (yet!)
     */
    get NO_REAGENT_WHILE_PREP() { return this.bit(161); }

    /**
     * No comment (yet!)
     */
    get UNK52() { return this.bit(162); }

    /**
     * No comment (yet!)
     */
    get USABLE_WHILE_STUNNED() { return this.bit(163); }

    /**
     * No comment (yet!)
     */
    get UNK53() { return this.bit(164); }

    /**
     * No comment (yet!)
     */
    get SINGLE_TARGET_SPELL() { return this.bit(165); }

    /**
     * No comment (yet!)
     */
    get UNK54() { return this.bit(166); }

    /**
     * No comment (yet!)
     */
    get UNK55() { return this.bit(167); }

    /**
     * No comment (yet!)
     */
    get UNK56() { return this.bit(168); }

    /**
     * No comment (yet!)
     */
    get START_PERIODIC_AT_APPLY() { return this.bit(169); }

    /**
     * No comment (yet!)
     */
    get HIDE_DURATION() { return this.bit(170); }

    /**
     * No comment (yet!)
     */
    get ALLOW_TARGETOF_TARGET_AS_TARGET() { return this.bit(171); }

    /**
     * No comment (yet!)
     */
    get UNK57() { return this.bit(172); }

    /**
     * No comment (yet!)
     */
    get HASTE_AFFECT_DURATION() { return this.bit(173); }

    /**
     * No comment (yet!)
     */
    get UNK58() { return this.bit(174); }

    /**
     * No comment (yet!)
     */
    get UNK59() { return this.bit(175); }

    /**
     * No comment (yet!)
     */
    get UNK60() { return this.bit(176); }

    /**
     * No comment (yet!)
     */
    get UNK61() { return this.bit(177); }

    /**
     * No comment (yet!)
     */
    get USABLE_WHILE_CONFUSED() { return this.bit(178); }

    /**
     * No comment (yet!)
     */
    get DONT_TURN_DURING_CAST() { return this.bit(179); }

    /**
     * No comment (yet!)
     */
    get UNK62() { return this.bit(180); }

    /**
     * No comment (yet!)
     */
    get UNK63() { return this.bit(181); }

    /**
     * No comment (yet!)
     */
    get UNK64() { return this.bit(182); }

    /**
     * No comment (yet!)
     */
    get UNK65() { return this.bit(183); }

    /**
     * No comment (yet!)
     */
    get UNK66() { return this.bit(184); }

    /**
     * No comment (yet!)
     */
    get UNK67() { return this.bit(185); }

    /**
     * No comment (yet!)
     */
    get UNK68() { return this.bit(186); }

    /**
     * No comment (yet!)
     */
    get HIDE_AURA_IF_SELF_CAST() { return this.bit(187); }

    /**
     * No comment (yet!)
     */
    get HIDE_AURA_IF_NOT_SELF_CAST() { return this.bit(188); }

    /**
     * No comment (yet!)
     */
    get UNK69() { return this.bit(189); }

    /**
     * No comment (yet!)
     */
    get UNK70() { return this.bit(190); }

    /**
     * No comment (yet!)
     */
    get UNK71() { return this.bit(191); }

    /**
     * No comment (yet!)
     */
    get DONT_DISPLAY_COOLDOWN() { return this.bit(192); }

    /**
     * No comment (yet!)
     */
    get ARENA_ONLY() { return this.bit(193); }

    /**
     * No comment (yet!)
     */
    get IGNORE_CASTER_AURAS() { return this.bit(194); }

    /**
     * No comment (yet!)
     */
    get IGNORE_IMMUNE_FLAGS() { return this.bit(195); }

    /**
     * No comment (yet!)
     */
    get UNK72() { return this.bit(196); }

    /**
     * No comment (yet!)
     */
    get UNK73() { return this.bit(197); }

    /**
     * No comment (yet!)
     */
    get USE_SPELL_CAST_EVENT() { return this.bit(198); }

    /**
     * No comment (yet!)
     */
    get UNK74() { return this.bit(199); }

    /**
     * No comment (yet!)
     */
    get CANT_TARGET_CROWD_CONTROLLED() { return this.bit(200); }

    /**
     * No comment (yet!)
     */
    get UNK75() { return this.bit(201); }

    /**
     * No comment (yet!)
     */
    get CAN_TARGET_POSSESSED_FRIENDS() { return this.bit(202); }

    /**
     * No comment (yet!)
     */
    get NOT_IN_RAID_INSTANCE() { return this.bit(203); }

    /**
     * No comment (yet!)
     */
    get CASTABLE_ON_VEHICLE() { return this.bit(204); }

    /**
     * No comment (yet!)
     */
    get CAN_TARGET_INVISIBLE() { return this.bit(205); }

    /**
     * No comment (yet!)
     */
    get UNK76() { return this.bit(206); }

    /**
     * No comment (yet!)
     */
    get UNK77() { return this.bit(207); }

    /**
     * No comment (yet!)
     */
    get UNK78() { return this.bit(208); }

    /**
     * No comment (yet!)
     */
    get UNK79() { return this.bit(209); }

    /**
     * No comment (yet!)
     */
    get CAST_BY_CHARMER() { return this.bit(210); }

    /**
     * No comment (yet!)
     */
    get UNK80() { return this.bit(211); }

    /**
     * No comment (yet!)
     */
    get AURA_VISIBLE_TO_CASTER_ONLY() { return this.bit(212); }

    /**
     * No comment (yet!)
     */
    get CLIENT_UI_TARGET_EFFECTS() { return this.bit(213); }

    /**
     * No comment (yet!)
     */
    get UNK81() { return this.bit(214); }

    /**
     * No comment (yet!)
     */
    get UNK82() { return this.bit(215); }

    /**
     * No comment (yet!)
     */
    get CAN_TARGET_UNTARGETABLE() { return this.bit(216); }

    /**
     * No comment (yet!)
     */
    get NOT_RESET_SWING_IF_INSTANT() { return this.bit(217); }

    /**
     * No comment (yet!)
     */
    get UNK83() { return this.bit(218); }

    /**
     * No comment (yet!)
     */
    get UNK84() { return this.bit(219); }

    /**
     * No comment (yet!)
     */
    get UNK85() { return this.bit(220); }

    /**
     * No comment (yet!)
     */
    get NO_DONE_PCT_DAMAGE_MODS() { return this.bit(221); }

    /**
     * No comment (yet!)
     */
    get UNK86() { return this.bit(222); }

    /**
     * No comment (yet!)
     */
    get IGNORE_CATEGORY_COOLDOWN_MODS() { return this.bit(223); }

    /**
     * No comment (yet!)
     */
    get UNK87() { return this.bit(224); }

    /**
     * No comment (yet!)
     */
    get DURATION_UNAFFECTED_BY_MODIFIERS() { return this.bit(225); }

    /**
     * No comment (yet!)
     */
    get REACTIVATE_AT_RESURRECT() { return this.bit(226); }

    /**
     * No comment (yet!)
     */
    get IS_CHEAT_SPELL() { return this.bit(227); }

    /**
     * No comment (yet!)
     */
    get UNK88() { return this.bit(228); }

    /**
     * No comment (yet!)
     */
    get SUMMON_TOTEM() { return this.bit(229); }

    /**
     * No comment (yet!)
     */
    get NO_PUSHBACK_ON_DAMAGE() { return this.bit(230); }

    /**
     * No comment (yet!)
     */
    get UNK89() { return this.bit(231); }

    /**
     * No comment (yet!)
     */
    get IS_HORDE_ONLY() { return this.bit(232); }

    /**
     * No comment (yet!)
     */
    get IS_ALLIANCE_ONLY() { return this.bit(233); }

    /**
     * No comment (yet!)
     */
    get DISPEL_CHARGES() { return this.bit(234); }

    /**
     * No comment (yet!)
     */
    get INTERRUPT_NON_PLAYER_CASTS() { return this.bit(235); }

    /**
     * No comment (yet!)
     */
    get SILENCE_NON_PLAYERS() { return this.bit(236); }

    /**
     * No comment (yet!)
     */
    get UNK90() { return this.bit(237); }

    /**
     * No comment (yet!)
     */
    get UNK91() { return this.bit(238); }

    /**
     * No comment (yet!)
     */
    get UNK92() { return this.bit(239); }

    /**
     * No comment (yet!)
     */
    get CAN_RESTORE_SECONDARY_POWER() { return this.bit(240); }

    /**
     * No comment (yet!)
     */
    get UNK93() { return this.bit(241); }

    /**
     * No comment (yet!)
     */
    get HAS_CHARGE_EFFECT() { return this.bit(242); }

    /**
     * No comment (yet!)
     */
    get ZONE_TELEPORT() { return this.bit(243); }

    /**
     * No comment (yet!)
     */
    get UNK94() { return this.bit(244); }

    /**
     * No comment (yet!)
     */
    get UNK95() { return this.bit(245); }

    /**
     * No comment (yet!)
     */
    get UNK96() { return this.bit(246); }

    /**
     * No comment (yet!)
     */
    get UNK97() { return this.bit(247); }

    /**
     * No comment (yet!)
     */
    get UNK98() { return this.bit(248); }

    /**
     * No comment (yet!)
     */
    get UNK99() { return this.bit(249); }

    /**
     * No comment (yet!)
     */
    get UNK100() { return this.bit(250); }

    /**
     * No comment (yet!)
     */
    get UNK101() { return this.bit(251); }

    /**
     * No comment (yet!)
     */
    get CONSOLIDATED_RAID_BUFF() { return this.bit(252); }

    /**
     * No comment (yet!)
     */
    get UNK102() { return this.bit(253); }

    /**
     * No comment (yet!)
     */
    get UNK103() { return this.bit(254); }

    /**
     * No comment (yet!)
     */
    get CLIENT_INDICATOR() { return this.bit(255); }
}