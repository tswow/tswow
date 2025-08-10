import { Table } from "../../../data/table/Table";
import { CurrencyCategoryQuery, CurrencyCategoryRow } from "../../dbc/CurrencyCategory";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare enum CurrencyCategoryFlags {
    SortedLast = 1,
    PlayerItemAssignment = 2
}
export declare class CurrencyCategory extends MainEntity<CurrencyCategoryRow> {
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CurrencyCategoryFlags>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ID(): number;
    clear(): this;
}
export declare class CurrencyCategoryRegistryClass extends RegistryDynamic<CurrencyCategory, CurrencyCategoryRow, CurrencyCategoryQuery> {
    protected Table(): Table<any, CurrencyCategoryQuery, CurrencyCategoryRow> & {
        add: (id: number) => CurrencyCategoryRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: CurrencyCategory): void;
    protected Entity(r: CurrencyCategoryRow): CurrencyCategory;
    protected FindByID(id: number): CurrencyCategoryRow;
    protected EmptyQuery(): CurrencyCategoryQuery;
    ID(e: CurrencyCategory): number;
}
export declare const CurrencyCategoryRegistry: CurrencyCategoryRegistryClass;
