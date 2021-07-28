/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { Cell } from "wotlkdata/cell/cells/Cell";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Quest } from "./Quest";
import { QuestRewardMail } from "./QuestAddon";
import { QuestDifficultyIndex } from "./QuestDifficultyIndex";

function ChoiceItemIds(owner: Quest) {
    return [
        owner.row.RewardChoiceItemID1,
        owner.row.RewardChoiceItemID2,
        owner.row.RewardChoiceItemID3,
        owner.row.RewardChoiceItemID4,
        owner.row.RewardChoiceItemID5,
        owner.row.RewardChoiceItemID6,
    ]
}

function ChoiceItemQuantities(owner: Quest) {
    return [
        owner.row.RewardChoiceItemQuantity1,
        owner.row.RewardChoiceItemQuantity2,
        owner.row.RewardChoiceItemQuantity3,
        owner.row.RewardChoiceItemQuantity4,
        owner.row.RewardChoiceItemQuantity5,
        owner.row.RewardChoiceItemQuantity6,
    ]
}

export class ItemChoiceReward extends ArrayEntry<Quest> {
    get ItemId() { return this.wrap(ChoiceItemIds(this.owner)[this.index])}
    get Quantity() { return this.wrap(ChoiceItemQuantities(this.owner)[this.index])}

    clear(): Quest {
        this.ItemId.set(0);
        this.Quantity.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.ItemId.get() === 0;
    }
}

export class ItemChoiceRewards extends ArraySystem<ItemChoiceReward,Quest> {
    get length(): number {
        return 6;
    }

    get(index: number): ItemChoiceReward {
        return new ItemChoiceReward(this.owner, index);
    }

    add(item: number, quantity: number) {
        const free = this.getFree();
        free.ItemId.set(item);
        free.Quantity.set(quantity);
        return this.owner;
    }
}

function ItemIds(owner: Quest) {
    return [
        owner.row.RewardItem1,
        owner.row.RewardItem2,
        owner.row.RewardItem3,
        owner.row.RewardItem4,
    ]
}

function ItemQuantities(owner: Quest) {
    return [
        owner.row.RewardAmount1,
        owner.row.RewardAmount2,
        owner.row.RewardAmount3,
        owner.row.RewardAmount4,
    ]
}

export class ItemReward extends ArrayEntry<Quest> {
    get Item() { return this.wrap(ItemIds(this.owner)[this.index])}
    get Quantity() { return this.wrap(ItemQuantities(this.owner)[this.index])}

    clear(): Quest {
        this.Item.set(0);
        this.Quantity.set(0);
        return this.owner;
    }

    isClear(): boolean {
        return this.Item.get()==0;
    }
}

export class ItemRewards extends ArraySystem<ItemReward,Quest> {
    get length(): number {
        return 4;
    }

    get(index: number): ItemReward {
        return new ItemReward(this.owner,index);
    }

    add(item: number, quantity: number) {
        return this.getFree()
            .Item.set(item)
            .Quantity.set(quantity);
    }
}

function FactionIds(owner: Quest) {
    return [
        owner.row.RewardFactionID1,
        owner.row.RewardFactionID2,
        owner.row.RewardFactionID3,
        owner.row.RewardFactionID4,
        owner.row.RewardFactionID5,
    ]
}

function Reputation(owner: Quest) {
    return [
        owner.row.RewardFactionOverride1,
        owner.row.RewardFactionOverride2,
        owner.row.RewardFactionOverride3,
        owner.row.RewardFactionOverride4,
        owner.row.RewardFactionOverride5
    ].map(x=>new class extends Cell<number,Quest> {
        get(): number {
            return x.get()/100;
        }
        set(value: number): Quest {
            x.set(value*100);
            return owner;
        }
    }(owner))
}

export class ReputationReward extends ArrayEntry<Quest> {
    get FactionId() { return this.wrap(FactionIds(this.owner)[this.index])}
    get Reputation() { return this.wrap(Reputation(this.owner)[this.index])}

    clear(): Quest {
        this.FactionId.set(0);
        this.Reputation.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.FactionId.get() === 0;
    }
}

export class ReputationRewards extends ArraySystem<ReputationReward,Quest> {
    get length(): number {
        return 5;
    }

    get(index: number): ReputationReward{
        return new ReputationReward(this.owner, index);
    }

    add(faction: number, reputation: number) {
        const free = this.getFree();
        free.FactionId.set(faction);
        free.Reputation.set(reputation);
        return this.owner;
    }
}



export class QuestReward extends CellSystem<Quest> {
    /** Reward player with items (no choice) */
    get Item() { return new ItemRewards(this.owner); }
    /** Let player choose one of multiple items (Maximum 6) */
    get ChoiceItem() { return new ItemChoiceRewards(this.owner); }
    /** Reward player with reputation to a faction */
    get Reputation() { return new ReputationRewards(this.owner); }
    /** Money earned by completing this quest (becomes requirement if negative) */
    get Money() { return this.ownerWrap(this.owner.row.RewardMoney) }
    /** Bonus money at level 80 */
    get MoneyBonus() { return this.ownerWrap(this.owner.row.RewardBonusMoney) }
    /** Display a spell when the player completes the quest */
    get DisplaySpell() { return this.ownerWrap(this.owner.row.RewardDisplaySpell) }
    /** Reward player with honor points */
    get Honor() { return this.ownerWrap(this.owner.row.RewardHonor)}
    /** Reward player with talent points, as in the Death Knight starting area. */
    get Talents() { return this.ownerWrap(this.owner.row.RewardTalents)}
    /** Reward player with a Title, such as <Grunt> */
    get Title() { return this.ownerWrap(this.owner.row.RewardTitle )}
    /** Increased XP reward for difficult quests, a value between 0-8 */
    get Difficulty() { return new QuestDifficultyIndex(this.owner, this.owner.row.RewardXPDifficulty); }
    /** Reward player with arena points */
    get ArenaPoints() { return this.ownerWrap(this.owner.row.RewardArenaPoints)}
    /** The mail received upon */
    get Mail() {
        return new QuestRewardMail(this.owner
            , this.owner.addonRow.RewardMailTemplateID
            , this.owner.addonRow.RewardMailDelay)
    }
}