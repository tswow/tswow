import { Table } from "../../../data/table/Table";
import { CurrencyTypesQuery, CurrencyTypesRow } from "../../dbc/CurrencyTypes";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
export declare class Currency extends MainEntity<CurrencyTypesRow> {
    get BitIndex(): number;
    get ID(): number;
    get Item(): import("../Refs/Ref").RefStatic<this, import("../Item/ItemTemplate").ItemTemplate>;
    get Category(): import("../Refs/Ref").RefDynamic<this, import("./CurrencyCategory").CurrencyCategory>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ItemDisplay(): import("../Item/ItemDisplayInfo").ItemDisplayInfoRef<this>;
}
export declare class CurrencyRegistryClass extends RegistryStatic<Currency, CurrencyTypesRow, CurrencyTypesQuery> {
    protected Table(): Table<any, CurrencyTypesQuery, CurrencyTypesRow> & {
        add: (id: number) => CurrencyTypesRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Entity(r: CurrencyTypesRow): Currency;
    protected FindByID(id: number): CurrencyTypesRow;
    protected EmptyQuery(): CurrencyTypesQuery;
    ID(e: Currency): number;
    Clear(entity: Currency, mod: string, id: string): void;
    loadFromBitIndex(bitIndex: number): Currency;
}
export declare const CurrencyRegistry: CurrencyRegistryClass;
