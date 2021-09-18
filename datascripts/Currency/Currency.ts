import { DBC } from "wotlkdata";
import { CurrencyTypesQuery, CurrencyTypesRow } from "wotlkdata/dbc/types/CurrencyTypes";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { CurrencyCategoryRef } from "./CurrencyCategory";

export class Currency extends MainEntity<CurrencyTypesRow> {
    get BitIndex() { return this.row.BitIndex.get(); }
    get ID() { return this.row.ID.get(); }
    get Item() { return ItemTemplateRegistry.ref(this, this.row.ItemID); }
    get Category() { return new CurrencyCategoryRef(this, this.row.CategoryID); }
}

export class CurrencyRegistryClass extends RegistryStatic<Currency,CurrencyTypesRow,CurrencyTypesQuery> {
    protected IDs           = Ids.CurrencyTypes
    protected Table         = DBC.CurrencyTypes
    protected EmptyQuery    = {}
    protected Entity        = (r: CurrencyTypesRow)=>new Currency(r)
    protected FindByID      = (id: number)=>DBC.CurrencyTypes.find({ID:id})
    protected ID            = (e: Currency)=>e.ID;
    protected Clear         = (r: Currency)=> {
        r.Category.set(0)
         .Item.set(0)
    }
    protected OnCreate      = (mod: string, id: string, self: Currency, owner?: Currency)=> {
        if(parent !== undefined) {
            throw new Error(`Currencies cannot be cloned at the moment`);
        }
        let item = ItemTemplateRegistry.create(mod,id)
            .Name.enGB.set('Currency')
            .BagFamily.set(8192)
            .Quality.White.set()
            .MaxStack.set(2147483647)
            .Class.set(10,0)
            .Material.Liquid.set()
            .DisplayInfo.set(32278)
       self.row
           .BitIndex.set(Ids.CurrencyTypesBitIndex.id(mod,id))
           .ItemID.set(item.ID)
    }

    loadFromBitIndex(bitIndex: number) {
        let v = DBC.CurrencyTypes.find({BitIndex:bitIndex});
        return (v ? new Currency(v) : undefined) as Currency;
    }
}

export const CurrencyRegistry = new CurrencyRegistryClass();