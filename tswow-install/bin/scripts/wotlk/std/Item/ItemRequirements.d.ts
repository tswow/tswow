import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare class ReputationRequirement extends CellSystem<ItemTemplate> {
    get Faction(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    get Rank(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/item_template").item_templateRow>;
    constructor(owner: ItemTemplate);
    clear(): void;
}
export declare class SkillRequirement<T> extends CellSystem<T> {
    private _skill;
    private _rank;
    get Skill(): Cell<number, any>;
    get Rank(): Cell<number, any>;
    constructor(owner: T, skill: Cell<number, any>, rank: Cell<number, any>);
    set(skill: number, rank: number): T;
    clear(): T;
}
export declare class ItemRequirements extends CellSystem<ItemTemplate> {
    protected row(): import("../../sql/item_template").item_templateRow;
    get Level(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Spell(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get HonorRank(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get CityRank(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Reputation(): ReputationRequirement;
    get Skill(): SkillRequirement<ItemTemplate>;
    clearAll(): ItemTemplate;
}
