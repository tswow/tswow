import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemSkillRequirement extends CellSystem<ItemTemplate> {
    get Skill(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Rank(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    set(skill: number, rank: number): ItemTemplate;
}
