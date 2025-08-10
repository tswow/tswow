import { Bit, MaskCell } from "../../../data/cell/cells/MaskCell";
import { spell_custom_attrRow } from "../../sql/spell_custom_attr";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Spell } from "./Spell";
export declare class SpellCustomAttrSQL extends MaybeSQLEntity<Spell, spell_custom_attrRow> {
    protected createSQL(): spell_custom_attrRow;
    protected findSQL(): spell_custom_attrRow;
    protected isValidSQL(sql: spell_custom_attrRow): boolean;
    get Attribute(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Spell, number, spell_custom_attrRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Spell, spell_custom_attrRow>>;
}
export declare class SpellCustomAttr extends MaskCell<Spell> {
    private sql;
    private mask;
    constructor(owner: Spell);
    get(): number;
    getBit(bit: number): boolean;
    setBit(bit: number, value: Bit): Spell;
    clearAll(): Spell;
    toString(): string;
    protected deserialize(value: any): void;
    set(values: number | string[]): Spell;
    add(values: string[]): Spell;
    exists(): boolean;
    sqlRow(): spell_custom_attrRow;
    get ENCHANT_PROC(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get CONE_BACK(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get CONE_LINE(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get SHARE_DAMAGE(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get NO_INITIAL_THREAT(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get AURA_CC(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get DONT_BREAK_STEALTH(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get CAN_CRIT(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get DIRECT_DAMAGE(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get CHARGE(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get PICKPOCKET(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get ROLLING_PERIODIC(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get NEGATIVE_EFFECT_0(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get NEGATIVE_EFFECT_1(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get NEGATIVE_EFFECT_2(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get IGNORE_ARMOR(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get REQUIRE_TARGET_FACE_CASTER(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get REQUIRE_CASTER_BEHIND_TARGET(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get ALLOW_IN_FLIGHT_TARGET(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get NEEDS_AMMO_DATA(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get BINARY_SPELL(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get SCHOOL_MASK_NORMAL_WITH_MAGIC(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
    get LIQUID_AURA(): import("../../../data/cell/cells/MaskCell").MaskBit<Spell, this>;
}
