import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { GemPropertiesQuery, GemPropertiesRow } from "../../dbc/GemProperties";
import { Enchantment } from "../Enchant/Enchantment";
import { EnchantmentEffects } from "../Enchant/EnchantmentEffect";
import { ItemTemplate } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { RegistryRowBase } from "../Refs/Registry";
import { GemType, GemTypeCell } from "./GemType";
export declare class Gem extends MainEntity<GemPropertiesRow> {
    clear(): this;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Effects(): EnchantmentEffects<this>;
    get DisplayInfo(): import("../Item/ItemDisplayInfo").ItemDisplayInfoRef<this>;
    get EffectDescription(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    /**
     * @warn do **not** modify SourceItem in the Enchantment
     */
    get Enchantment(): GemEnchantmentRef;
    get ID(): number;
    get Type(): GemTypeCell;
    /**
     * @note A Gem can only be connected to a **single** item to work properly.
     * @warn do **not** modify GemProperties in the item.
     */
    readonly Item: GemItem;
}
export declare class GemItem extends CellSystem<Gem> {
    private item?;
    static setCached(gem: GemItem, item: ItemTemplate): void;
    clearCache(): void;
    get(): ItemTemplate;
    mod(callback: (item: ItemTemplate) => void): Gem;
}
export declare class GemEnchantmentRef extends CellSystem<Gem> {
    getRef(): Enchantment;
    modRef(callback: (enchantment: Enchantment) => void): Gem;
    get(): number;
}
export declare class GemRegistryClass extends RegistryRowBase<Gem, GemPropertiesRow, GemPropertiesQuery> {
    protected Entity(r: GemPropertiesRow): Gem;
    protected FindByID(id: number): GemPropertiesRow;
    protected EmptyQuery(): GemPropertiesQuery;
    ID(e: Gem): number;
    protected Table(): Table<any, GemPropertiesQuery, GemPropertiesRow>;
    /**
     * @param mod
     * @param id
     * @param color
     * @param parentGem - the gem whose properties should be cloned
     * @param parentEnchantment - the enchantment whose properties should be cloned, uses the item in parentGem if set to 0.
     * @param parentItem - the item whose properties should be cloned, uses the item in parentEnchantment if set to 0.
     * @returns
     */
    create(mod: string, id: string, color?: EnumCon<keyof typeof GemType>, parentGem?: number, parentEnchantment?: number, parentItem?: number): Gem;
}
export declare const GemRegistry: GemRegistryClass;
