import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemResistance extends CellSystem<ItemTemplate> {
    protected get row(): import("../../sql/item_template").item_templateRow;
    get Holy(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Fire(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Nature(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Frost(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Shadow(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Arcane(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    set(holy: number, fire: number, nature: number, frost: number, shadow: number, arcane: number): ItemTemplate;
    clearAll(): ItemTemplate;
}
