import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { CurrencyCategoryQuery, CurrencyCategoryRow } from "wotlkdata/dbc/types/CurrencyCategory";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

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

export class CurrencyCategoryRegistryClass
    extends RegistryDynamic<
          CurrencyCategory
        , CurrencyCategoryRow
        , CurrencyCategoryQuery
    >
{
    protected Table(): Table<any, CurrencyCategoryQuery, CurrencyCategoryRow> & { add: (id: number) => CurrencyCategoryRow; } {
        return DBC.CurrencyCategory
    }
    protected ids(): DynamicIDGenerator {
        return Ids.CurrencyCategory
    }
    Clear(entity: CurrencyCategory): void {
        entity.Flags.set(0)
              .Name.clear()
    }
    protected Entity(r: CurrencyCategoryRow): CurrencyCategory {
        return new CurrencyCategory(r);
    }
    protected FindByID(id: number): CurrencyCategoryRow {
        return DBC.CurrencyCategory.find({ID:id});
    }
    protected EmptyQuery(): CurrencyCategoryQuery {
        return {}
    }
    ID(e: CurrencyCategory): number {
        return e.ID;
    }
}

export const CurrencyCategoryRegistry = new CurrencyCategoryRegistryClass();