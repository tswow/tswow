import { EnumCellTransform, TransformedClass } from "../../../data/cell/cells/EnumCell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { ArraySystemBase } from "../../../data/cell/systems/ArraySystem";
import { SpellItemEnchantmentRow } from "../../dbc/SpellItemEnchantment";
import { StatType } from "../Misc/StatTypes";
export declare function EnchantmentTypeID(id: number): (target: any) => void;
export declare class EnchantmentType extends EnumCellTransform<EnchantmentEffectBase> {
    get MISC(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, EnchantmentEffectBase>;
    get PROC(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, Proc>;
    get DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, Damage>;
    get BUFF_EQUIPPED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, Buff>;
    get ADD_ARMOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, Armor>;
    get STAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, Stat>;
    get TOTEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, Totem>;
    get USE_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, UseSpell>;
    get PRISMATIC_SOCKET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<EnchantmentEffectBase, PrismaticSocket>;
    private r;
}
export declare class EnchantmentEffectBase extends TransformedClass<EnchantmentEffectPlain> {
    readonly index: number;
    protected row: SpellItemEnchantmentRow;
    static row(ench: EnchantmentEffectBase): SpellItemEnchantmentRow;
    constructor(row: SpellItemEnchantmentRow, index: number);
    protected transformer(): EnumCellTransform<any>;
    protected default(): EnchantmentEffectPlain;
    get Type(): EnchantmentType;
    clear(): EnchantmentEffectPlain;
    isClear(): boolean;
    static container(base: EnchantmentEffectBase): SpellItemEnchantmentRow;
    objectifyPlain(options?: ObjectifyOptions): any;
}
export declare class EnchantmentEffectPlain extends EnchantmentEffectBase {
    get MinAmount(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    /** @deprecated Not used in TrinityCore, use "MinAmount" as basevalue */
    get MaxAmount(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Arg(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    objectify(options?: ObjectifyOptions): any;
}
export declare class Proc extends EnchantmentEffectBase {
    get Spell(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
}
export declare class Damage extends EnchantmentEffectBase {
    get MinDamage(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    /** @deprecated Not used in TrinityCore, use "MinDamage" as base */
    get MaxDamage(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
}
export declare class Buff extends EnchantmentEffectBase {
}
export declare class Armor extends EnchantmentEffectBase {
    get MinArmor(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    /** @deprecated Not used in TrinityCore, use "MinArmor" as base value */
    get MaxArmor(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
}
export declare class Stat extends EnchantmentEffectBase {
    get MinStat(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    /** @deprecated Not used in TrinityCore, use "MinStat" as base value */
    get MaxStat(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Stat(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof StatType>;
}
export declare class Totem extends EnchantmentEffectBase {
}
export declare class UseSpell extends EnchantmentEffectBase {
    get Spell(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
}
export declare class PrismaticSocket extends EnchantmentEffectBase {
}
export declare class EnchantmentEffects<T> extends ArraySystemBase<EnchantmentEffectPlain, T> {
    protected row: SpellItemEnchantmentRow;
    constructor(owner: T, row: SpellItemEnchantmentRow);
    protected isClearValue(a: EnchantmentEffectPlain): boolean;
    protected clearValue(a: EnchantmentEffectPlain): void;
    get length(): number;
    get(index: number): EnchantmentEffectPlain;
}
