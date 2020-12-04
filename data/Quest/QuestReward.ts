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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Quest } from "./Quest";

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
    get ItemId() { return ChoiceItemIds(this.owner)[this.index]}
    get Quantity() { return ChoiceItemQuantities(this.owner)[this.index]}

    clear(): Quest {
        this.ItemId.set(0);
        this.Quantity.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.ItemId.get() === 0;
    }
}

export class ItemChoiceRewards extends SystemArray<ItemChoiceReward,Quest> {
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
        owner.row.RewardFactionValue1,
        owner.row.RewardFactionValue2,
        owner.row.RewardFactionValue3,
        owner.row.RewardFactionValue4,
        owner.row.RewardFactionValue5
    ]
}

export class ReputationReward extends ArrayEntry<Quest> {
    get FactionId() { return FactionIds(this.owner)[this.index]}
    get Reputation() { return Reputation(this.owner)[this.index]}

    clear(): Quest {
        this.FactionId.set(0);
        this.Reputation.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.FactionId.get() === 0;
    }
}

export class ReputationRewards extends SystemArray<ReputationReward,Quest> {
    get length(): number {
        return 6;
    }

    get(index: number): ReputationReward{
        return new ReputationReward(this.owner, index);
    }

    add(faction: number, reputation: number) {
        const free = this.getFree();
        free.FactionId.set(faction);
        free.Reputation.set(reputation);
    }
}



export class QuestReward extends Subsystem<Quest> {
    /** Let player choose one of multiple items (Maximum 6) */
    get choiceItem() { return new ItemChoiceRewards(this.owner); }
    /** Reward player with reputation to a faction */
    get reputation() { return new ReputationRewards(this.owner); }
    /** Money earned by completing this quest (becomes requirement if negative) */
    get money() { return this.wrap(this.owner.row.RewardMoney) }
    /** Bonus money at level 80 */
    get moneyBonus() { return this.wrap(this.owner.row.RewardBonusMoney) }
    /** Display a spell when the player completes the quest */
    get displaySpell() { return this.wrap(this.owner.row.RewardDisplaySpell) }
    /** Reward player with honor points */
    get honor() { return this.wrap(this.owner.row.RewardHonor)}
    /** Reward player with talent points, as in the Death Knight starting area. */
    get talents() { return this.wrap(this.owner.row.RewardTalents)}
    /** Reward player with a Title, such as <Grunt> */
    get title() { return this.wrap(this.owner.row.RewardTitle )}
    /** Increased XP reward for difficult quests, a value between 0-8 */
    get difficulty() { return this.wrap(this.owner.row.RewardXPDifficulty)}
    /** Reward player with arena points */
    get arenaPoints() { return this.wrap(this.owner.row.RewardArenaPoints)}
}