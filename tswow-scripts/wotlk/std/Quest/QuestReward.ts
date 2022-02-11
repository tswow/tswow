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
import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { ArrayEntry, ArraySystem } from "wotlkdata/wotlkdata/cell/systems/ArraySystem";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { quest_templateQuery, quest_templateRow } from "wotlkdata/wotlkdata/sql/types/quest_template";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { FactionRegistry } from "../Faction/Faction";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { ChildEntity, MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { Quest } from "./Quest";
import { QuestRewardMail } from "./QuestAddon";
import { QuestDifficultyIndex } from "./QuestDifficultyIndex";
import { QuestRegistry } from "./Quests";

function ChoiceItemIds(row: quest_templateRow) {
    return [
        row.RewardChoiceItemID1,
        row.RewardChoiceItemID2,
        row.RewardChoiceItemID3,
        row.RewardChoiceItemID4,
        row.RewardChoiceItemID5,
        row.RewardChoiceItemID6,
    ]
}

function ChoiceItemQuantities(row: quest_templateRow) {
    return [
        row.RewardChoiceItemQuantity1,
        row.RewardChoiceItemQuantity2,
        row.RewardChoiceItemQuantity3,
        row.RewardChoiceItemQuantity4,
        row.RewardChoiceItemQuantity5,
        row.RewardChoiceItemQuantity6,
    ]
}

export class ItemChoiceReward<T> extends ArrayEntry<T> {
    protected row: quest_templateRow;

    constructor(container: T, index: number, row: quest_templateRow) {
        super(container, index);
        this.row = row;
    }

    get Item() {
        return ItemTemplateRegistry.ref(
              this
            , this.wrap(ChoiceItemIds(this.row)[this.index])
        )
    }

    get Quantity() {
        return this.wrap(ChoiceItemQuantities(this.row)[this.index])
    }

    clear() {
        this.Item.set(0);
        this.Quantity.set(0);
        return this;
    }

    isClear(): boolean {
        return this.Item.get() === 0;
    }
}

export class ItemChoiceRewards<T> extends ArraySystem<ItemChoiceReward<T>,T> {
    protected row: quest_templateRow;

    constructor(owner: T, row: quest_templateRow) {
        super(owner);
        this.row = row;
    }

    get length(): number {
        return 6;
    }

    get(index: number): ItemChoiceReward<T> {
        return new ItemChoiceReward(this.owner, index, this.row);
    }

    add(item: number, quantity: number) {
        const free = this.addGet();
        free.Item.set(item);
        free.Quantity.set(quantity);
        return this.owner;
    }
}

function ItemIds(row: quest_templateRow) {
    return [
        row.RewardItem1,
        row.RewardItem2,
        row.RewardItem3,
        row.RewardItem4,
    ]
}

function ItemQuantities(row: quest_templateRow) {
    return [
        row.RewardAmount1,
        row.RewardAmount2,
        row.RewardAmount3,
        row.RewardAmount4,
    ]
}

export class ItemReward<T> extends ArrayEntry<T> {
    protected row: quest_templateRow;

    constructor(container: T, index: number, row: quest_templateRow) {
        super(container, index);
        this.row = row;
    }

    get Item() { return this.wrap(ItemIds(this.row)[this.index])}
    get Quantity() { return this.wrap(ItemQuantities(this.row)[this.index])}

    clear() {
        this.Item.set(0);
        this.Quantity.set(0);
        return this;
    }

    isClear(): boolean {
        return this.Item.get()==0;
    }
}

export class ItemRewards<T> extends ArraySystem<ItemReward<T>,T> {
    protected row: quest_templateRow;

    constructor(owner: T, row: quest_templateRow) {
        super(owner);
        this.row = row;
    }

    get length(): number {
        return 4;
    }

    get(index: number): ItemReward<T> {
        return new ItemReward(this.owner,index,this.row);
    }

    add(item: number, quantity: number) {
        this.addGet()
            .Item.set(item)
            .Quantity.set(quantity);
        return this.owner;
    }
}

function FactionIds(row: quest_templateRow) {
    return [
        row.RewardFactionID1,
        row.RewardFactionID2,
        row.RewardFactionID3,
        row.RewardFactionID4,
        row.RewardFactionID5,
    ]
}

function Reputation(row: quest_templateRow) {
    return [
        row.RewardFactionOverride1,
        row.RewardFactionOverride2,
        row.RewardFactionOverride3,
        row.RewardFactionOverride4,
        row.RewardFactionOverride5
    ].map(x=>new class extends Cell<number,quest_templateRow> {
        get(): number {
            return x.get()/100;
        }
        set(value: number) {
            x.set(value*100);
            return row;
        }
    }(row))
}

export class ReputationReward<T> extends ArrayEntry<T> {
    protected row: quest_templateRow;

    constructor(container: T, index: number, row: quest_templateRow) {
        super(container, index);
        this.row = row;
    }

    get Faction() {
        return FactionRegistry.ref(this,this.wrap(FactionIds(this.row)[this.index]))
    }
    get Reputation() { return this.wrap(Reputation(this.row)[this.index])}

    clear() {
        this.Faction.set(0);
        this.Reputation.set(0);
        return this;
    }

    isClear(): boolean {
        return this.Faction.get() === 0;
    }
}

export class ReputationRewards<T> extends ArraySystem<ReputationReward<T>,T> {
    protected row: quest_templateRow;

    constructor(owner: T, row: quest_templateRow) {
        super(owner);
        this.row = row;
    }

    get length(): number {
        return 5;
    }

    get(index: number): ReputationReward<T>{
        return new ReputationReward<T>(this.owner, index, this.row);
    }

    add(faction: number, reputation: number) {
        const free = this.addGet();
        free.Faction.set(faction);
        free.Reputation.set(reputation);
        return this.owner;
    }
}



export class QuestReward extends ChildEntity<quest_templateRow,Quest> {
    /** Reward player with items (no choice) */
    get Item() { return new ItemRewards(this.owner, this.owner.row); }
    /** Let player choose one of multiple items (Maximum 6) */
    get ChoiceItem() { return new ItemChoiceRewards(this.owner, this.owner.row); }
    /** Reward player with reputation to a faction */
    get Reputation() { return new ReputationRewards(this.owner, this.owner.row); }
    /** Money earned by completing this quest (becomes requirement if negative) */
    get Money() { return this.ownerWrap(this.row.RewardMoney) }
    /** Bonus money at level 80 */
    get MoneyBonus() { return this.ownerWrap(this.row.RewardBonusMoney) }
    /** Display a spell when the player completes the quest */
    get DisplaySpell() { return this.ownerWrap(this.row.RewardDisplaySpell) }
    /** Reward player with honor points */
    get Honor() { return this.ownerWrap(this.row.RewardHonor)}
    /** Reward player with talent points, as in the Death Knight starting area. */
    get Talents() { return this.ownerWrap(this.row.RewardTalents)}
    /** Reward player with a Title, such as <Grunt> */
    get Title() { return this.ownerWrap(this.row.RewardTitle )}
    /** Increased XP reward for difficult quests, a value between 0-8 */
    get Difficulty() { return new QuestDifficultyIndex(this.owner, this.row.RewardXPDifficulty); }
    /** Reward player with arena points */
    get ArenaPoints() { return this.ownerWrap(this.row.RewardArenaPoints)}
    /** The mail received upon */
    get Mail() {
        return new QuestRewardMail(this.owner
            , this.owner.AddonRow.get().RewardMailTemplateID
            , this.owner.AddonRow.get().RewardMailDelay)
    }
}


/**
 * Used for LFGDungeonRewards
 */
export class QuestRewardStandalone extends MainEntity<quest_templateRow> {
    get ID() { return this.row.ID.get(); }
    /** Reward player with items (no choice) */
    get Item() { return new ItemRewards(this, this.row); }
    /** Let player choose one of multiple items (Maximum 6) */
    get ChoiceItem() { return new ItemChoiceRewards(this, this.row); }
    /** Reward player with reputation to a faction */
    get Reputation() { return new ReputationRewards(this.owner, this.row); }
    /** Money earned by completing this quest (becomes requirement if negative) */
    get Money() { return this.ownerWrap(this.row.RewardMoney) }
    /** Bonus money at level 80 */
    get MoneyBonus() { return this.ownerWrap(this.row.RewardBonusMoney) }
    /** Display a spell when the player completes the quest */
    get DisplaySpell() { return this.ownerWrap(this.row.RewardDisplaySpell) }
    /** Reward player with honor points */
    get Honor() { return this.ownerWrap(this.row.RewardHonor)}
    /** Reward player with talent points, as in the Death Knight starting area. */
    get Talents() { return this.ownerWrap(this.row.RewardTalents)}
    /** Reward player with a Title, such as <Grunt> */
    get Title() { return this.ownerWrap(this.row.RewardTitle )}
    /** Increased XP reward for difficult quests, a value between 0-8 */
    get Difficulty() { return new QuestDifficultyIndex(this.owner, this.row.RewardXPDifficulty); }
    /** Reward player with arena points */
    get ArenaPoints() { return this.ownerWrap(this.row.RewardArenaPoints)}
}

export class QuestRewardRegistryClass
    extends RegistryStatic<QuestRewardStandalone,quest_templateRow,quest_templateQuery>
{
    protected Table(): Table<any, quest_templateQuery, quest_templateRow> & { add: (id: number) => quest_templateRow; } {
        return SQL.quest_template
    }
    protected IDs(): StaticIDGenerator {
        return Ids.quest_template
    }
    Clear(r: QuestRewardStandalone): void {
        return QuestRegistry.Clear(new Quest(r.row));
    }
    protected FindByID(id: number): quest_templateRow {
        return SQL.quest_template.query({ID:id});
    }
    protected EmptyQuery(): quest_templateQuery {
        return {}
    }
    ID(e: QuestRewardStandalone): number {
        return e.ID
    }
    protected Entity(r: quest_templateRow): QuestRewardStandalone {
        return new QuestRewardStandalone(r);
    }
}
export const QuestRewardRegistry = new QuestRewardRegistryClass();