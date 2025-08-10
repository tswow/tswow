import { MaskCell } from "../../../data/cell/cells/MaskCell";
import { Spell } from "./Spell";
export declare class SpellAttributes<T> extends MaskCell<T> {
    protected spell: Spell;
    protected deserialize(value: any): void;
    constructor(owner: T, spell: Spell);
    protected cells(): import("../../../data/dbc/DBCCell").DBCUIntCell<import("../../dbc/Spell").SpellRow>[];
    protected cell(no: number): import("../../../data/dbc/DBCCell").DBCUIntCell<import("../../dbc/Spell").SpellRow>;
    protected bitno(no: number): number;
    clearAll(): T;
    setBit(no: number, value: boolean): T;
    toString(): string;
    getBit(no: number): boolean;
    set(keys: string[]): T;
    add(keys: string[]): T;
    /**
      * No comment (yet!)
      */
    get UNK1(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NEXT_RANGED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NEXT_SWING(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_REPLENISHMENT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_ABILITY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_TRADE_SPELL(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_PASSIVE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_HIDDEN_IN_SPELLBOOK(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_HIDDEN_FROM_LOG(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get TARGETS_MAINHAND(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NEXT_SWING2(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK2(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DAYTIME_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NIGHT_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get INDOORS_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get OUTDOORS_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NOT_SHAPESHIFTED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get REQUIRES_STEALTH(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get SHEATHE_UNCHANGED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DAMAGE_LEVEL_CALCULATION(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get STOP_ATTACKING(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IMPOSSIBLE_TO_DODGE_PARRY_BLOCK(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAST_TRACK_TARGET(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CASTABLE_WHILE_DEAD(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CASTABLE_WHILE_MOUNTED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DISABLED_WHILE_ACTIVE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_NEGATIVE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CASTABLE_WHILE_SITTING(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANNOT_USE_IN_COMBAT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNAFFECTED_BY_INVULNERABILITY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HEARTBEAT_RESIST_CHECK(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_BE_CANCELED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DISMISS_PET(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DRAIN_ALL_POWER(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CHANNELED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_BE_REDIRECTED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK3(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NOT_BREAK_STEALTH(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CHANNELED2(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_BE_REFLECTED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_TARGET_IN_COMBAT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get MELEE_COMBAT_START(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NO_THREAT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK4(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_PICKPOCKET(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_FARSIGHT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CHANNEL_TRACK_TARGET(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DISPEL_AURA_ON_IMMUNITY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNAFFECTED_BY_SCHOOL_IMMUNE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UN_AUTOCASTABLE_BY_PET(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK5(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_TARGET_SELF(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get REQ_COMBO_POINTS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK6(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get REQ_COMBO_POINTS2(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK7(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_FISHING_SPELL(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK8(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK9(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK10(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HIDE_FROM_AURA_BAR(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CHANNEL_DISPLAY_SPELL_NAME(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get ENABLE_AT_DODGE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK11(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_TARGET_DEAD(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK12(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_TARGET_NOT_IN_LOS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK13(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DISPLAY_IN_STANCE_BAR(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_AUTO_REPEAT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_TARGET_TAPPED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK14(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK15(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK16(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK17(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HEALTH_FUNNEL(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK18(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get KEEP_ENCHANT_IN_ARENA(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK19(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK20(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get TAME_BEAST(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NOT_RESET_AUTO_ACTIONS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get REQUIRE_DEAD_PET(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NOT_NEED_SHAPESHIFT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK21(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DAMAGE_REDUCE_SHIELD(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK22(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_ARCANE_CONCENTRATION(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK23(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK24(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNAFFECTED_BY_SCHOOL_IMMUNITY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK25(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IGNORE_ITEM_CHECK(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_CRIT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get TRIGGER_CAN_TRIGGER_PROC(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_FOOD_BUFF(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK26(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK27(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK28(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get BLOCKABLE_SPELL(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IGNORE_RESURRECTION_TIMER(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK29(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK30(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get SEPARATE_STACK_PER_CASTER(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get ONLY_TARGET_PLAYERS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get TRIGGERED_FROM_EFFECT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get MAINHAND_REQUIRED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get BATTLEGROUND_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get ONLY_TARGET_GHOSTS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HIDE_CHANNEL_BAR(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_HONORLESS_TARGET(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_AUTO_SHOOT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_TRIGGER_PROC(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NO_INITIAL_AGGRO(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IGNORE_HIT_RESULT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DISABLE_PROC(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get PERSISTS_DEATH(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK31(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get REQUIRES_WAND(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK32(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get REQUIRES_OFFHAND(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get TREAT_AS_PERIODIC(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_PROC_WITH_TRIGGERED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_DRAIN_SOUL(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK33(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IGNORE_BONUSES(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DONT_DISPLAY_RANGE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK34(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IGNORE_RESISTANCES(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get PROC_ONLY_ON_CASTER(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK35(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK36(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK37(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK38(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NOT_STEALABLE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_CAST_WHILE_CASTING(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get FIXED_DAMAGE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get TRIGGER_ACTIVATE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_SHIV(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK39(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK40(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get COMBAT_LOG_NO_CASTER(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DAMAGE_DOESNT_BREAK_AURAS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK41(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NOT_USABLE_IN_ARENA_OR_RATED_BG(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get USABLE_IN_ARENA(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get AREA_TARGET_CHAIN(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK42(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NO_CHECK_CAST_POWER(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK43(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK44(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK45(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK46(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_PET_SCALING(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get OUTLAND_USE_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK47(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK48(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK49(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK50(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK51(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_CHANNEL_WHEN_MOVING(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NO_REAGENT_WHILE_PREP(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK52(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get USABLE_WHILE_STUNNED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK53(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get SINGLE_TARGET_SPELL(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK54(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK55(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK56(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get START_PERIODIC_AT_APPLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HIDE_DURATION(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get ALLOW_TARGETOF_TARGET_AS_TARGET(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK57(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HASTE_AFFECT_DURATION(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK58(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK59(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK60(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK61(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get USABLE_WHILE_CONFUSED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DONT_TURN_DURING_CAST(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK62(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK63(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK64(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK65(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK66(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK67(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK68(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HIDE_AURA_IF_SELF_CAST(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HIDE_AURA_IF_NOT_SELF_CAST(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK69(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK70(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK71(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DONT_DISPLAY_COOLDOWN(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get ARENA_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IGNORE_CASTER_AURAS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IGNORE_IMMUNE_FLAGS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK72(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK73(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get USE_SPELL_CAST_EVENT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK74(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CANT_TARGET_CROWD_CONTROLLED(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK75(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_TARGET_POSSESSED_FRIENDS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NOT_IN_RAID_INSTANCE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CASTABLE_ON_VEHICLE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_TARGET_INVISIBLE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK76(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK77(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK78(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK79(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAST_BY_CHARMER(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK80(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get AURA_VISIBLE_TO_CASTER_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CLIENT_UI_TARGET_EFFECTS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK81(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK82(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_TARGET_UNTARGETABLE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NOT_RESET_SWING_IF_INSTANT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK83(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK84(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK85(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NO_DONE_PCT_DAMAGE_MODS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK86(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IGNORE_CATEGORY_COOLDOWN_MODS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK87(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DURATION_UNAFFECTED_BY_MODIFIERS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get REACTIVATE_AT_RESURRECT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_CHEAT_SPELL(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK88(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get SUMMON_TOTEM(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get NO_PUSHBACK_ON_DAMAGE(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK89(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_HORDE_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get IS_ALLIANCE_ONLY(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get DISPEL_CHARGES(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get INTERRUPT_NON_PLAYER_CASTS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get SILENCE_NON_PLAYERS(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK90(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK91(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK92(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CAN_RESTORE_SECONDARY_POWER(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK93(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get HAS_CHARGE_EFFECT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get ZONE_TELEPORT(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK94(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK95(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK96(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK97(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK98(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK99(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK100(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK101(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CONSOLIDATED_RAID_BUFF(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK102(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get UNK103(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
    /**
     * No comment (yet!)
     */
    get CLIENT_INDICATOR(): import("../../../data/cell/cells/MaskCell").MaskBit<T, this>;
}
