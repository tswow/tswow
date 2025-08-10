import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemMoneyLoot extends CellSystem<ItemTemplate> {
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    set(min: number, max: number): ItemTemplate;
}
