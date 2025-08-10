import { Cell } from "../../../data/cell/cells/Cell";
import { MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { spell_procRow } from "../../sql/spell_proc";
import { PercentCell } from "../Misc/PercentCell";
import { SchoolMask } from "../Misc/School";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";
export declare enum DisableEffectsMask {
    EFFECT0 = 1,
    EFFECT1 = 2,
    EFFECT2 = 4
}
export declare enum SpellAttributesMas {
    /** Requires target to give exp or honor */
    REQUIRE_EXP_OR_HONOR = 1,
    /** Can proc even if this spell is triggered by another spell */
    CAN_PROC_ON_TRIGGERED = 2,
    /** Requires the triggering spell to cost mana */
    REQUIRE_MANA_COST = 4,
    /** Requires triggering spell to be affected by aura of this spell */
    REQUIRE_SPELL_MOD = 8,
    /** Aura has reduced chance to proc if actor is > level 60 */
    REDUCE_PROC60 = 128,
    /** Does not allow proc if proc is caused by spell cast by item */
    CANT_PROC_FROM_ITEM_CAST = 256
}
export declare enum SpellAttributesMask {
    REQUIRE_EXP_OR_HONOR = 1,
    CAN_PROC_ON_TRIGGERED = 2,
    REQUIRE_MANA_COST = 4,
    REQUIRE_SPELL_MOD = 8,
    REDUCE_PROC60 = 128,
    CANT_PROC_FROM_ITEM_CAST = 256
}
export declare enum SpellHitMask {
    NORMAL = 1,
    CRITICAL = 2,
    MISS = 4,
    FULL_RESIST = 8,
    DODGE = 16,
    PARRY = 32,
    BLOCK = 64,
    EVADE = 128,
    IMMUNE = 256,
    DEFLECT = 512,
    ABSORB = 1024,
    REFLECT = 2048,
    INTERRUPT = 4096,
    FULL_BLOCK = 8192
}
export declare enum SpellPhaseMask {
    CAST = 1,
    HIT = 2,
    FINISH = 4
}
export declare enum SpellTypeMask {
    DAMAGE = 1,
    HEAL = 2,
    OTHER = 4
}
export declare enum SpellFamilyName {
    GENERIC = 0,
    MAGE = 3,
    WARRIOR = 4,
    WARLOCK = 5,
    PRIEST = 6,
    DRUID = 7,
    ROGUE = 8,
    HUNTER = 9,
    PALADIN = 10,
    SHAMAN = 11,
    POTION = 13,
    DEATH_KNIGHT = 15
}
export declare enum SpellProcFlags {
    KILLED = 1,
    KILL = 2,
    DONE_MELEE_AUTO_ATTACK = 4,
    TAKEN_MELEE_AUTO_ATTACK = 8,
    DONE_SPELL_MELEE_DMG_CLASS = 16,
    TAKEN_SPELL_MELEE_DMG_CLASS = 32,
    DONE_RANGED_AUTO_ATTACK = 64,
    TAKEN_RANGED_AUTO_ATTACK = 128,
    SPELL_RANGED_DAMAGE_CLASS = 256,
    TAKEN_SPELL_RANGED_DAMAGE_CLASS = 512,
    DONE_SPELL_NONE_DAMAGE_CLASS_POSITIVE = 1024,
    TAKEN_SPELL_NONE_DAMAGE_CLASS_POSITIVE = 2048,
    DONE_SPELL_NONE_DAMAGE_CLASS_NEGATIVE = 4096,
    TAKEN_SPELL_NONE_DAMAGE_CLASS_NEGATIVE = 8192,
    DONE_SPELL_MAGIC_DAMAGE_CLASS_POSITIVE = 16384,
    DONE_SPELL_MAGIC_DAMAGE_CLASS_NEGATIVE = 32768,
    DONE_PERIODIC = 65536,
    TAKEN_PERIODIC = 131072,
    TAKEN_DAMAGE = 262144,
    DONE_TRAP_ACTIVATION = 524288,
    DONE_MAINHAND_ATTACK = 1048576,
    DONE_OFFHAND_ATTACK = 2097152,
    DEATH = 4194304
}
export declare class SimpleClassMask<T> extends CellSystem<T> {
    protected a: Cell<number, any>;
    protected b: Cell<number, any>;
    protected c: Cell<number, any>;
    constructor(owner: T, a: Cell<number, any>, b: Cell<number, any>, c: Cell<number, any>);
    get A(): MaskCell32<T>;
    get B(): MaskCell32<T>;
    get C(): MaskCell32<T>;
}
export declare class SQLMaybeWriteCell<T> extends Cell<number, T> {
    private proc;
    protected dbcCell: Cell<number, any>;
    protected sqlCell: (sql: spell_procRow) => Cell<number, any>;
    constructor(owner: T, proc: SpellProc<T>, dbcCell: Cell<number, any>, sqlGetter: (sql: spell_procRow) => Cell<number, any>);
    get(): number;
    set(value: number): T;
}
export declare class SpellProc<T> extends MaybeSQLEntity<T, spell_procRow> {
    private realOwner;
    constructor(owner: T, realOwner: Spell);
    protected createSQL(): spell_procRow;
    HasSQL(): boolean;
    protected findSQL(): spell_procRow;
    protected isValidSQL(sql: spell_procRow): boolean;
    get TriggerMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellProcFlags>;
    get Chance(): PercentCell<T>;
    get Charges(): SQLMaybeWriteCell<T>;
    get SchoolMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof SchoolMask>;
    get SpellFamily(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<T, typeof SpellFamilyName>;
    get ClassMask(): SimpleClassMask<T>;
    get TypeMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof SpellTypeMask>;
    get PhaseMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof SpellPhaseMask>;
    /**
     * - if 0 and TAKEN: will trigger on **normal** + **critical**
     * - if 0 and DONE:  will trigger on **normal** + **critical** + **absorb**
     */
    get HitMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof SpellHitMask>;
    get AttributesMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof SpellAttributesMask>;
    get DisableEffectsMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof DisableEffectsMask>;
    get ProcsPerMinute(): import("../Misc/SQLDBCEntity").MaybeSQLCell<T, number, spell_procRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<T, spell_procRow>>;
    mod(callback: (proc: SpellProcCB) => void): T;
}
export declare class SpellProcCB extends SpellProc<SpellProcCB> {
    constructor(spell: Spell);
}
