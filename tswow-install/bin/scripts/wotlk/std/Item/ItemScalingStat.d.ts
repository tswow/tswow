import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemScalingStat extends CellSystem<ItemTemplate> {
    get Distribution(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    get Value(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    set(distribution: number, value: number): ItemTemplate;
}
