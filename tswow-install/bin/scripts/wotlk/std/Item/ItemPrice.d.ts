import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { CoinType, MoneyCell } from "../Misc/MoneyCell";
import { ItemTemplate } from "./ItemTemplate";
/**
 * The getters in this class are intentional, we DO NOT want people to get confused with
 * what price they're actually setting, so we should always
 */
export declare class ItemPrice extends CellSystem<ItemTemplate> {
    get BuyCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get PlayerBuyPrice(): MoneyCell<ItemTemplate>;
    get PlayerSellPrice(): MoneyCell<ItemTemplate>;
    set(sellPrice: number, buyPrice: number, buyCount?: number, currency?: CoinType): ItemTemplate;
    setAsCopper(sellPrice: number, buyPrice: number, buyCount?: number): ItemTemplate;
    setAsSilver(sellPrice: number, buyPrice: number, buyCount?: number): ItemTemplate;
    setAsGold(sellPrice: number, buyPrice: number, buyCount?: number): ItemTemplate;
    setUnsafe(sellPrice: number, buyPrice: number, buyCount?: number, currency?: CoinType): ItemTemplate;
}
