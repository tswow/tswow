import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
export type CoinType = 'COPPER' | 'SILVER' | 'GOLD';
export declare function convertCoin(value: number, from: CoinType, to: CoinType): number;
export declare class MoneyCell<T> extends CellSystem<T> {
    protected cell: Cell<number, any>;
    protected stored: CoinType;
    constructor(owner: T, stored: CoinType, cell: Cell<number, any>);
    get(currency?: CoinType): number;
    set(value: number, currency?: CoinType): T;
    add(value: number, currency: CoinType): T;
    getAsCopper(): number;
    getAsSilver(): number;
    getAsGold(): number;
    addCopper(value: number): T;
    addSilver(value: number): T;
    addGold(value: number): T;
    getCopperOnly(): number;
    getSilverOnly(): number;
    getGoldOnly(): number;
}
