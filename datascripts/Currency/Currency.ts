import { DBC } from "wotlkdata";
import { CurrencyTypesQuery, CurrencyTypesRow } from "wotlkdata/dbc/types/CurrencyTypes";
import { Items, ItemTemplateRef } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { CurrencyCategoryRef } from "./CurrencyCategory";

export class Currency extends MainEntity<CurrencyTypesRow> {
    get BitIndex() { return this.row.BitIndex.get(); }
    get ID() { return this.row.ID.get(); }
    get Item() { return new ItemTemplateRef(this, this.row.ItemID); }
    get Category() { return new CurrencyCategoryRef(this, this.row.CategoryID); }
}

export const CurrencyRegistry = {
    create(mod: string, id: string) {
        let item = Items.create(mod,id)
            .Name.enGB.set('Currency')
            .BagFamily.set(8192)
            .Quality.White.set()
            .MaxStack.set(2147483647)
            .Class.set(10,0)
            .Material.Liquid.set()
            .DisplayInfo.set(32278)
        let id1 = Ids.CurrencyTypes.id(mod,id);
        let bitId = Ids.CurrencyTypesBitIndex.id(mod,id);
        return new Currency (
            DBC.CurrencyTypes.add(id1)
                .ItemID.set(item.ID)
                .CategoryID.set(1)
                .BitIndex.set(bitId)
        )
    },

    load(id: number) {
        return new Currency(DBC.CurrencyTypes.find({ID:id}));
    },

    loadFromBitIndex(bitIndex: number) {
        return new Currency(DBC.CurrencyTypes.find({BitIndex:bitIndex}))
    },

    filter(query: CurrencyTypesQuery) {
        return DBC.CurrencyTypes.filter(query)
            .map(x=>new Currency(x));
    },

    find(query: CurrencyTypesQuery) {
        return new Currency(DBC.CurrencyTypes.find(query));
    }
}