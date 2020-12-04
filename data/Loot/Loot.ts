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
import { SQLCell, SQLCellReadOnly } from "wotlkdata/sql/SQLCell";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Ids } from "../Base/Ids";

export interface LootRowBase {
    readonly Entry: SQLCellReadOnly<number,any>;
    readonly Item: SQLCellReadOnly<number,any>;
    Reference: SQLCell<number,any>;
    Chance: SQLCell<number,any>;
    QuestRequired: SQLCell<number,any>;
    LootMode: SQLCell<number,any>;
    GroupId: SQLCell<number,any>;
    MinCount: SQLCell<number,any>;
    MaxCount: SQLCell<number,any>;
} 

export interface LootTable {
    filter(search: {Entry: number}): LootRowBase[];
    add(id: number, item: number) : LootRowBase;
}

export class LootSet {
    private table: LootTable;
    private id: number

    get rows() { return this.table.filter({Entry:this.id})}

    addItem(item: number, chance: number, minCount: number, maxCount: number, quest: boolean = false, groupId: number = 0, lootMode: number = 1) {
        this.table.add(this.id,item)
            .Chance.set(chance)
            .MinCount.set(minCount)
            .MaxCount.set(maxCount)
            .QuestRequired.set(quest ? 1 : 0)
            .GroupId.set(groupId)
            .LootMode.set(lootMode)
        return this;
    }

    addReference(table: number, chance: number, lootMode: number = 1) {
        this.table.add(this.id,table)
            .Chance.set(chance)
            .MinCount.set(1)
            .MaxCount.set(1)
            .QuestRequired.set(0)
            .GroupId.set(0)
            .LootMode.set(lootMode)
        return this;
    }

    constructor(id: number, table: LootTable) {
        this.id = id;
        this.table = table;
    }
}

export const Loot = {
    addFish() { 
        return new LootSet(Ids.FishingLoot.id(),
        SQL.fishing_loot_template)
    },

    addCreature() { 
        return new LootSet(Ids.CreatureLoot.id(),
        SQL.creature_loot_template)
    },

    addGameObject() { 
        return new LootSet(Ids.GameObjectLoot.id(),
        SQL.gameobject_loot_template)
    },

    addItem() { 
        return new LootSet(Ids.ItemLoot.id(),
        SQL.item_loot_template)
    },

    addDisenchant() { 
        return new LootSet(Ids.DisenchantLoot.id(),
        SQL.disenchant_loot_template)
    },

    addProspecting() { 
        return new LootSet(Ids.ProspectingLoot.id(),
        SQL.prospecting_loot_template)
    },

    addMilling() { 
        return new LootSet(Ids.MillingLoot.id(),
        SQL.milling_loot_template)
    },

    addPickpocket() { 
        return new LootSet(Ids.PickPocketLoot.id(),
        SQL.pickpocketing_loot_template)
    },

    addSkinning() { 
        return new LootSet(Ids.SkinningLoot.id(),
        SQL.skinning_loot_template)
    },

    addMail() { 
        return new LootSet(Ids.MailLoot.id(),
        SQL.mail_loot_template)
    },

    addReference() { 
        return new LootSet(Ids.ReferenceLoot.id(),
        SQL.reference_loot_template)
    },

    addSpell() { 
        return new LootSet(Ids.SpellLoot.id(),
        SQL.spell_loot_template)
    },
}
