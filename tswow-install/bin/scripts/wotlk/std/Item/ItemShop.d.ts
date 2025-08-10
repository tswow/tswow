import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemShop extends CellSystem<ItemTemplate> {
    private row;
    set(buycount: number, buyprice: number, sellprice: number): ItemTemplate;
    get BuyCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get BuyPrice(): import("../../../data/cell/cells/Cell").CellWrapper<bigint, ItemTemplate>;
    get SellPrice(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
}
