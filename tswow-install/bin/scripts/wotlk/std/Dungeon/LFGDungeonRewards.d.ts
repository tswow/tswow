import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { lfg_dungeon_rewardsRow } from "../../sql/lfg_dungeon_rewards";
import { MainEntity } from "../Misc/Entity";
import { LFGDungeon } from "./LFGDungeon";
export declare class LFGDungeonReward extends MainEntity<lfg_dungeon_rewardsRow> {
    get Dungeon(): import("../Refs/Ref").RefReadOnly<this, LFGDungeon>;
    get MaxLevel(): number;
    /** Reward the first time this lfg dungeon is completed in a day */
    get FirstReward(): import("../Refs/Ref").RefStatic<this, import("../Quest/QuestReward").QuestRewardStandalone>;
    /** Reward other times the lfg dungeon is completed */
    get OtherReward(): import("../Refs/Ref").RefStatic<this, import("../Quest/QuestReward").QuestRewardStandalone>;
}
export declare class LFGDungeonRewards extends MultiRowSystem<LFGDungeonReward, LFGDungeon> {
    protected getAllRows(): LFGDungeonReward[];
    protected isDeleted(value: LFGDungeonReward): boolean;
    getLevel(maxLevel: number): LFGDungeonReward;
    modLevel(maxLevel: number, callback?: (reward: LFGDungeonReward) => void): LFGDungeon;
}
