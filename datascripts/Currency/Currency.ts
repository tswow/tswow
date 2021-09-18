import { DBC } from "wotlkdata";
import { CurrencyTypesQuery, CurrencyTypesRow } from "wotlkdata/dbc/types/CurrencyTypes";
import { Table } from "wotlkdata/table/Table";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { CurrencyCategoryRef } from "./CurrencyCategory";

export class Currency extends MainEntity<CurrencyTypesRow> {
    get BitIndex() { return this.row.BitIndex.get(); }
    get ID() { return this.row.ID.get(); }
    get Item() { return ItemTemplateRegistry.ref(this, this.row.ItemID); }
    get Category() { return new CurrencyCategoryRef(this, this.row.CategoryID); }
}

export class CurrencyRegistryClass extends RegistryStatic<Currency,CurrencyTypesRow,CurrencyTypesQuery> {
    protected Table(): Table<any, CurrencyTypesQuery, CurrencyTypesRow> & { add: (id: number) => CurrencyTypesRow; } {
        return DBC.CurrencyTypes
    }
    protected IDs(): StaticIDGenerator {
        return Ids.CurrencyTypes
    }
    protected Clone(mod: string, name: string, r: Currency, parent: Currency): void {
        throw new Error("Method not implemented.");
    }
    protected Entity(r: CurrencyTypesRow): Currency {
        return new Currency(r);
    }
    protected FindByID(id: number): CurrencyTypesRow {
        return this.Table().find({ID:id});
    }
    protected EmptyQuery(): CurrencyTypesQuery {
        return {}
    }
    protected ID(e: Currency): number {
        return e.ID
    }
    protected Clear(entity: Currency, mod: string, id: string) {
        entity.Category.set(0)
         .Item.set(0)
        let item = ItemTemplateRegistry.create(mod,id)
            .Name.enGB.set('Currency')
            .BagFamily.set(8192)
            .Quality.White.set()
            .MaxStack.set(2147483647)
            .Class.set(10,0)
            .Material.Liquid.set()
            .DisplayInfo.set(32278)
       entity.row
           .BitIndex.set(Ids.CurrencyTypesBitIndex.id(mod,id))
           .ItemID.set(item.ID)
    }

    loadFromBitIndex(bitIndex: number) {
        let v = DBC.CurrencyTypes.find({BitIndex:bitIndex});
        return (v ? new Currency(v) : undefined) as Currency;
    }
}

export const CurrencyRegistry = new CurrencyRegistryClass();