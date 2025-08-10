import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { SchoolTypes } from "../Misc/School";
import { ItemTemplate } from "./ItemTemplate";
export declare enum DamageSchool {
    PHYSICAL = 0,
    HOLY = 1,
    NATURE = 3,
    FROST = 4,
    SHADOW = 5,
    ARCANE = 6
}
export declare class ItemDamage extends ArrayEntry<ItemTemplate> {
    /** @deprecated use School */
    get school(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    /** @deprecated use Min */
    get min(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    /** @deprecated use Max */
    get max(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    get Min(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    get Max(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    get School(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SchoolTypes>;
    set(school: EnumCon<keyof typeof SchoolTypes>, min: number, max: number): void;
    clear(): this;
    isClear(): boolean;
}
export declare class ItemDamages extends ArraySystem<ItemDamage, ItemTemplate> {
    get length(): number;
    get(index: number): ItemDamage;
    private _add;
    add(school: EnumCon<keyof typeof SchoolTypes>, min: number, max: number): ItemTemplate;
    addPhysical(min: number, max: number): ItemTemplate;
    addHoly(min: number, max: number): ItemTemplate;
    addFire(min: number, max: number): ItemTemplate;
    addNature(min: number, max: number): ItemTemplate;
    addFrost(min: number, max: number): ItemTemplate;
    addShadow(min: number, max: number): ItemTemplate;
    addArcane(min: number, max: number): ItemTemplate;
}
