import { DBC } from "../../DBCFiles";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { ItemExtendedCostQuery, ItemExtendedCostRow } from "../../dbc/ItemExtendedCost";
import { Table } from "../../../data/table/Table";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class ExtendedCostItem extends ArrayEntry<ExtendedCost> {

    get Item() {
        return ItemTemplateRegistry
            .ref(this, this.wrapIndex(this.container.row.ItemID,this.index))
    }

    get Count() {
        return this.wrapIndex(this.container.row.ItemCount, this.index);
    }

    clear(): this {
        return this
            .Item.set(0)
            .Count.set(0)
    }
    isClear(): boolean {
        return !this.Item.exists()
    }
}

export class ExtendedCostItems extends ArraySystem<ExtendedCostItem,ExtendedCost> {
    get length(): number {
        return 5
    }
    get(index: number): ExtendedCostItem {
        return new ExtendedCostItem(this.owner, index);
    }

    add(item: number, count: number) {
        this.addGet()
            .Item.set(item)
            .Count.set(count)
        return this.owner;
    }
}

export class ExtendedCost extends MainEntity<ItemExtendedCostRow> {
    get ID() { return this.row.ID.get(); }
    get Items() { return new ExtendedCostItems(this); }
    get HonorPoints() { return this.wrap(this.row.HonorPoints); }
    get ArenaPoints() { return this.wrap(this.row.ArenaPoints); }
    get ArenaBracket() { return this.wrap(this.row.ArenaBracket); }
    get ArenaRating() { return this.wrap(this.row.RequiredArenaRating); }
    get ItemPurchaseGroup() { return this.wrap(this.row.ItemPurchaseGroup); }
}

export class ExtendedCostRegistryClass
    extends RegistryDynamic<ExtendedCost,ItemExtendedCostRow,ItemExtendedCostQuery>
{
    protected Table(): Table<any, ItemExtendedCostQuery, ItemExtendedCostRow> & { add: (id: number) => ItemExtendedCostRow; } {
        return DBC.ItemExtendedCost
    }
    protected ids(): DynamicIDGenerator {
        return Ids.ItemExtendedCost
    }
    Clear(entity: ExtendedCost): void {
        entity.ArenaBracket.set(0)
              .ArenaPoints.set(0)
              .ArenaRating.set(0)
              .HonorPoints.set(0)
              .ItemPurchaseGroup.set(0)
              .Items.clearAll()
    }
    protected FindByID(id: number): ItemExtendedCostRow {
        return DBC.ItemExtendedCost.findById(id);
    }
    protected EmptyQuery(): ItemExtendedCostQuery {
        return {}
    }
    ID(e: ExtendedCost): number {
        return e.ID
    }
    protected Entity(r: ItemExtendedCostRow): ExtendedCost {
        return new ExtendedCost(r);
    }
}

export const ExtendedCostRegistry = new ExtendedCostRegistryClass();