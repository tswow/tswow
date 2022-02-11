import { DBC } from "../../DBCFiles";
import { CurrencyTypesQuery, CurrencyTypesRow } from "../../dbc/CurrencyTypes";
import { Table } from "../../../data/table/Table";
import { ItemDisplayinfoRegistry } from "../Item/ItemDisplayInfo";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { CurrencyCategoryRegistry } from "./CurrencyCategory";

export class Currency extends MainEntity<CurrencyTypesRow> {
    get BitIndex() { return this.row.BitIndex.get(); }
    get ID() { return this.row.ID.get(); }
    get Item() { return ItemTemplateRegistry.ref(this, this.row.ItemID); }
    get Category() { return CurrencyCategoryRegistry.ref(this, this.row.CategoryID); }
    get Name() { return this.wrapLoc(this.Item.getRef().Name); }
    get Description() { return this.wrapLoc(this.Item.getRef().Description); }
    get ItemDisplay() {
        return ItemDisplayinfoRegistry.ref(this, this.Item.getRef().row.displayid);
    }
}

export class CurrencyRegistryClass extends RegistryStatic<Currency,CurrencyTypesRow,CurrencyTypesQuery> {
    protected Table(): Table<any, CurrencyTypesQuery, CurrencyTypesRow> & { add: (id: number) => CurrencyTypesRow; } {
        return DBC.CurrencyTypes
    }
    protected IDs(): StaticIDGenerator {
        return Ids.CurrencyTypes
    }
    protected Entity(r: CurrencyTypesRow): Currency {
        return new Currency(r);
    }
    protected FindByID(id: number): CurrencyTypesRow {
        return this.Table().query({ID:id});
    }
    protected EmptyQuery(): CurrencyTypesQuery {
        return {}
    }
    ID(e: Currency): number {
        return e.ID
    }
    Clear(entity: Currency, mod: string, id: string) {
        entity.Category.set(0)
         .Item.set(0)
        let item = ItemTemplateRegistry.create(mod,id)
            .Name.enGB.set('Currency')
            .BagFamily.set(8192)
            .Quality.WHITE.set()
            .MaxStack.set(2147483647)
            .Class.set(10,0)
            .Material.LIQUID.set()
            .DisplayInfo.set(32278)
       entity.row
           .BitIndex.set(Ids.CurrencyTypesBitIndex.id(mod,id))
           .ItemID.set(item.ID)
    }

    loadFromBitIndex(bitIndex: number) {
        let v = DBC.CurrencyTypes.query({BitIndex:bitIndex});
        return (v ? new Currency(v) : undefined) as Currency;
    }
}

export const CurrencyRegistry = new CurrencyRegistryClass();