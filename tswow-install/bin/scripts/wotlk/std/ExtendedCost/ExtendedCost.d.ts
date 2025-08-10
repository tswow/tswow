import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Table } from "../../../data/table/Table";
import { ItemExtendedCostQuery, ItemExtendedCostRow } from "../../dbc/ItemExtendedCost";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class ExtendedCostItem extends ArrayEntry<ExtendedCost> {
    get Item(): import("../Refs/Ref").RefStatic<this, import("../Item/ItemTemplate").ItemTemplate>;
    get Count(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class ExtendedCostItems extends ArraySystem<ExtendedCostItem, ExtendedCost> {
    get length(): number;
    get(index: number): ExtendedCostItem;
    add(item: number, count: number): ExtendedCost;
}
export declare class ExtendedCost extends MainEntity<ItemExtendedCostRow> {
    get ID(): number;
    get Items(): ExtendedCostItems;
    get HonorPoints(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ArenaPoints(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ArenaBracket(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ArenaRating(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ItemPurchaseGroup(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ExtendedCostRegistryClass extends RegistryDynamic<ExtendedCost, ItemExtendedCostRow, ItemExtendedCostQuery> {
    protected Table(): Table<any, ItemExtendedCostQuery, ItemExtendedCostRow> & {
        add: (id: number) => ItemExtendedCostRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: ExtendedCost): void;
    protected FindByID(id: number): ItemExtendedCostRow;
    protected EmptyQuery(): ItemExtendedCostQuery;
    ID(e: ExtendedCost): number;
    protected Entity(r: ItemExtendedCostRow): ExtendedCost;
}
export declare const ExtendedCostRegistry: ExtendedCostRegistryClass;
