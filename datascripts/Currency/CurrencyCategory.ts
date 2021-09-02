import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { CurrencyCategoryQuery, CurrencyCategoryRow } from "wotlkdata/dbc/types/CurrencyCategory";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export class CurrencyCategoryFlags<T> extends MaskCell32<T> {
    get SortLast() { return this.bit(0); }
    get PlayerItemAssignment() { return this.bit(1); }
}

export class CurrencyCategory extends MainEntity<CurrencyCategoryRow> {
    get Flags() { return new CurrencyCategoryFlags(this, this.row.Flags); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get ID() { return this.row.ID.get(); }

    clear() {
        this.Flags.set(0)
        this.Name.clear();
        return this;
    }
}

export const CurrencyCategoryRegistry = {
    create(parent = 0) {
        return parent === 0 ?
            new CurrencyCategory(DBC.CurrencyCategory.add(Ids.CurrencyCategory.id()))
                .clear()
            : new CurrencyCategory(DBC.CurrencyCategory.find({ID:parent}))
    },

    load(id: number) {
        return new CurrencyCategory(DBC.CurrencyCategory.find({ID:id}));
    },

    filter(query: CurrencyCategoryQuery) {
        return DBC.CurrencyCategory.filter(query)
            .map(x=>new CurrencyCategory(x));
    },

    find(query: CurrencyCategoryQuery) {
        return new CurrencyCategory(DBC.CurrencyCategory.find(query));
    }
}

export class CurrencyCategoryRef<T> extends Ref<T,CurrencyCategory> {
    protected create(parent?: number): CurrencyCategory {
        return CurrencyCategoryRegistry.create(parent);
    }
    protected clone(): CurrencyCategory {
        return CurrencyCategoryRegistry.create(this.cell.get());
    }
    protected exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: CurrencyCategory): number {
        return v.ID;
    }
    protected resolve(): CurrencyCategory {
        return CurrencyCategoryRegistry.load(this.cell.get());
    }
}