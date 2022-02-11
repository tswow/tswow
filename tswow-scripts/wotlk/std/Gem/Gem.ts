import { DBC } from "wotlkdata"
import { EnumCon } from "wotlkdata/wotlkdata/cell/cells/EnumCell"
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem"
import { GemPropertiesQuery, GemPropertiesRow } from "wotlkdata/wotlkdata/dbc/types/GemProperties"
import { Table } from "wotlkdata/wotlkdata/table/Table"
import { Enchantment, EnchantmentRegistry } from "../Enchant/Enchantment"
import { EnchantmentEffects } from "../Enchant/EnchantmentEffect"
import { ItemDisplayinfoRegistry } from "../Item/ItemDisplayInfo"
import { ItemTemplate, ItemTemplateRegistry } from "../Item/ItemTemplate"
import { MainEntity } from "../Misc/Entity"
import { Ids } from "../Misc/Ids"
import { RegistryRowBase } from "../Refs/Registry"
import { GemType, GemTypeCell } from "./GemType"

export class Gem extends MainEntity<GemPropertiesRow> {
    clear() {
        this.row.Enchant_Id.set(0)
            .Maxcount_Inv.set(0)
            .Maxcount_Item.set(0)
            .Type.set(0)
        return this;
    }

    get Name() { return this.wrapLoc(this.Item.get().Name); }
    get Description() { return this.wrapLoc(this.Item.get().Description); }
    get Effects() {
        return new EnchantmentEffects(this, this.Enchantment.getRef().row)
    }
    get DisplayInfo() {
        return ItemDisplayinfoRegistry.ref(this, this.Item.get().DisplayInfo)
    }
    get EffectDescription() { return this.wrapLoc(this.Enchantment.getRef().Name) }

    /**
     * @warn do **not** modify SourceItem in the Enchantment
     */
    get Enchantment() { return new GemEnchantmentRef(this); }
    get ID() { return this.row.ID.get(); }
    get Type() { return new GemTypeCell(this, this.row.Type); }

    /**
     * @note A Gem can only be connected to a **single** item to work properly.
     * @warn do **not** modify GemProperties in the item.
     */
    readonly Item = new GemItem(this);
}

export class GemItem extends CellSystem<Gem> {
    private item?: ItemTemplate = undefined

    static setCached(gem: GemItem, item: ItemTemplate) {
        gem.item = item;
    }

    clearCache() {
        this.item = undefined;
    }

    get() {
        if(this.item !== undefined && this.item.GemProperties.get() === this.owner.ID) {
            return this.item;
        }

        // It's not possible for a gem to have multiple items,
        // because the enchantment on the gem must reference
        // the item id
        let items = ItemTemplateRegistry.queryAll({GemProperties:this.owner.ID});
        if(items.length === 0) {
            throw new Error(`No gem item for ${this.owner.ID}`);
        }

        if(items.length > 1) {
            throw new Error(`Multiple gem items for ${this.owner.ID}`)
        }

        return this.item = items[0];
    }

    mod(callback: (item: ItemTemplate) => void) {
        callback(this.get());
        return this.owner;
    }
}

export class GemEnchantmentRef extends CellSystem<Gem> {
    getRef() {
        return EnchantmentRegistry.load(this.owner.row.Enchant_Id.get());
    }

    modRef(callback: (enchantment: Enchantment)=>void) {
        callback(this.getRef());
        return this.owner;
    }

    get() {
        return this.owner.row.Enchant_Id.get();
    }
}

export class GemRegistryClass
    extends RegistryRowBase<Gem,GemPropertiesRow,GemPropertiesQuery>
{
    protected Entity(r: GemPropertiesRow): Gem {
        return new Gem(r);
    }
    protected FindByID(id: number): GemPropertiesRow {
        return DBC.GemProperties.findById(id);
    }
    protected EmptyQuery(): GemPropertiesQuery {
        return {}
    }
    ID(e: Gem): number {
        return e.ID
    }
    protected Table(): Table<any, GemPropertiesQuery, GemPropertiesRow> {
        return DBC.GemProperties;
    }

    /**
     * @param mod
     * @param id
     * @param color
     * @param parentGem - the gem whose properties should be cloned
     * @param parentEnchantment - the enchantment whose properties should be cloned, uses the item in parentGem if set to 0.
     * @param parentItem - the item whose properties should be cloned, uses the item in parentEnchantment if set to 0.
     * @returns
     */
    create(mod: string, id: string, color?: EnumCon<keyof typeof GemType>, parentGem = 0, parentEnchantment = 0, parentItem = 0) {
        // Load parent
        let parent = parentGem > 0
            ? DBC.GemProperties.findById(parentGem)
            : undefined;
        let gemid = Ids.GemProperties.id()

        // Build enchantment
        if(parent && parentEnchantment === 0) {
            parentEnchantment = parent?.Enchant_Id.get()
        }
        let enchantment = EnchantmentRegistry.create(
              mod
            , `${id}-enchantment`
            , parentEnchantment
            )

        // Build item
        if(parentItem === 0) {
            parentItem = enchantment.row.Src_ItemID.get()
        }
        let item = ItemTemplateRegistry.create(mod,`${id}-item`,parentItem)
            .BagFamily.set(512)
            .ClassMask.set(-1)
            .RaceMask.set(-1)
            .Material.LIQUID.set()
            .DisplayInfo.set(60325)
            .Quality.GREEN.set()

        // Build gem
        let gem = (
                parentGem === 0 ?
                    new Gem(DBC.GemProperties.add(gemid)).clear()
                    : new Gem(DBC.GemProperties.findById(parentGem)
                        .clone(gemid))
                )
        if(color) {
            gem.Type.set(color);
        }

        // Connect everything
        item.row.GemProperties.set(gemid)        // item -> gem
        gem.row.Enchant_Id.set(enchantment.ID);  // gem  -> ench
        enchantment.row.Src_ItemID.set(item.ID); // ench -> item
        GemItem.setCached(gem.Item,item);

        return gem;
    }
}

export const GemRegistry = new GemRegistryClass();