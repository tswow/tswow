import { Transient } from "wotlkdata/cell/serialization/Transient";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { lfg_dungeon_rewardsRow } from "wotlkdata/sql/types/lfg_dungeon_rewards";
import { MainEntity } from "../Misc/Entity";
import { QuestRewardRef } from "../Quest/QuestReward";
import { LFGDungeon, LFGDungeonRefReadOnly } from "./LFGDungeon";

export class LFGDungeonReward extends MainEntity<lfg_dungeon_rewardsRow> {
    @Transient
    get Dungeon() { return new LFGDungeonRefReadOnly(this, this.row.dungeonId); }

    get MaxLevel() { return this.row.maxLevel.get(); }

    /** Reward the first time this lfg dungeon is completed in a day */
    get FirstReward() { return new QuestRewardRef(this, this.row.firstQuestId); }

    /** Reward other times the lfg dungeon is completed */
    get OtherReward() { return new QuestRewardRef(this, this.row.otherQuestId); }
}

export class LFGDungeonRewards extends MultiRowSystem<LFGDungeonReward,LFGDungeon> {
    protected getAllRows(): LFGDungeonReward[] {
        return SQL.lfg_dungeon_rewards
            .filter({dungeonId:this.owner.ID})
            .map(x=> new LFGDungeonReward(x))
    }

    protected isDeleted(value: LFGDungeonReward): boolean {
        return value.row.isDeleted();
    }

    getLevel(maxLevel: number) {
        return new LFGDungeonReward(
               SQL.lfg_dungeon_rewards.find({dungeonId:this.owner.ID,maxLevel})
            || SQL.lfg_dungeon_rewards.add(this.owner.ID,maxLevel)
        )
    }

    modLevel(maxLevel: number, callback: (reward: LFGDungeonReward)=>void = ()=>{}) {
        callback(this.getLevel(maxLevel));
        return this.owner;
    }
}