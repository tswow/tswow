import { DBC } from "wotlkdata"
import { CellSystem } from "wotlkdata/cell/systems/CellSystem"
import { GemPropertiesQuery, GemPropertiesRow } from "wotlkdata/dbc/types/GemProperties"
import { Enchantment, EnchantmentRegistry } from "../Enchant/Enchantment"
import { Items, ItemTemplate } from "../Item/ItemTemplate"
import { MainEntity } from "../Misc/Entity"
import { Ids } from "../Misc/Ids"
import { RefStatic } from "../Refs/RefOld"
import { std } from "../tswow-stdlib-data"
import { colToId, GemColorType, GemType } from "./GemType"

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
    /**
     * @warn do **not** modify SourceItem in the Enchantment
     */
    get Enchantment() { return new GemEnchantmentRef(this); }
    get ID() { return this.row.ID.get(); }
    get Type() { return new GemType(this, this.row.Type); }

    /**
     * @note A Gem can only be connected to a **single** item to work properly.
     * @warn do **not** modify GemProperties in the item.
     */
    get Item() { return new GemItem(this); }
}

export class GemItem extends CellSystem<Gem> {
    get() {
        // It's not possible for a gem to have multiple items,
        // because the enchantment on the gem must reference
        // the item id
        let items = std.Items.filter({GemProperties:this.owner.ID});
        if(items.length === 0) {
            throw new Error(`No gem item for ${this.owner.ID}`);
        }

        if(items.length > 1) {
            throw new Error(`Multiple gem items for ${this.owner.ID}`)
        }

        return items[0];
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

    setCopy(mod: string, id: string, source: number) {
        let enchantment = EnchantmentRegistry.create(mod,id,source)
        enchantment.row.Src_ItemID.set(this.owner.Item.get().ID);
        this.owner.row.Enchant_Id.set(enchantment.ID);
        return this.owner;
    }

    modRef(callback: (enchantment: Enchantment)=>void) {
        callback(this.getRef());
        return this.owner;
    }

    get() {
        return this.owner.row.Enchant_Id.get();
    }
}

export const GemRegistry = {
    create(
          mod: string
        , id: string
        , color?: GemColorType
        , parentId = 0
        , enchantmentId = 0
    ) {
        let gemId = Ids.GemProperties.id()
        let item = Items.create(mod,id)
            .BagFamily.set(512)
            .ClassMask.set(-1)
            .RaceMask.set(-1)
            .Material.Liquid.set()
            .DisplayInfo.set(60325)
            .GemProperties.set(gemId)
            .Quality.Green.set()

        let parent = parentId > 0 ? DBC.GemProperties.findById(parentId) : undefined;
        let enchantment = EnchantmentRegistry.create(
              mod
            , `${id}-enchantment`
            , enchantmentId > 0
                ? enchantmentId
                : parent
                ? parent.Enchant_Id.get()
                : 0
            )
        enchantment.row.Src_ItemID.set(item.ID);
        let gem = (
                parentId === 0 ?
                      new Gem(DBC.GemProperties.add(gemId)).clear()
                    : new Gem(DBC.GemProperties.findById(parentId)
                        .clone(gemId))
                )
        gem.row.Enchant_Id.set(enchantment.ID);
        if(color) {
            gem.Type.set(colToId(color));
        }
        return gem;
    },

    load(id: number) {
        return new Gem(DBC.GemProperties.findById(id));
    },

    filter(query: GemPropertiesQuery) {
        return DBC.GemProperties.filter(query)
            .map(x=>new Gem(x))
    },

    find(query: GemPropertiesQuery) {
        return new Gem(DBC.GemProperties.find(query))
    }
}

export class GemRef<T> extends RefStatic<T,Gem>{
    protected create(mod: string, id: string): Gem {
        return GemRegistry.create(mod,id);
    }
    protected clone(mod: string, id: string): Gem {
        return GemRegistry.create(mod,id,undefined,this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: Gem): number {
        return v.ID;
    }
    protected resolve(): Gem {
        return GemRegistry.load(this.cell.get());
    }
}