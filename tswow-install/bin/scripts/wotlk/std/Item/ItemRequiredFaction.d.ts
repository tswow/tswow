import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { ReputationRank } from "../Misc/ReputationRank";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemRequiredFaction extends CellSystem<ItemTemplate> {
    get Faction(): import("../../../data/cell/cells/Cell").CellWrapper<number, ItemTemplate>;
    get Rank(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof ReputationRank>;
    set(faction: number, rank: EnumCon<keyof typeof ReputationRank>): ItemTemplate;
    setHated(faction: number): ItemTemplate;
    setHostile(faction: number): ItemTemplate;
    setUnfriendly(faction: number): ItemTemplate;
    setNeutral(faction: number): ItemTemplate;
    setFriendly(faction: number): ItemTemplate;
    setHonored(faction: number): ItemTemplate;
    setRevered(faction: number): ItemTemplate;
    setExalted(faction: number): ItemTemplate;
}
