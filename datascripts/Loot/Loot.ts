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
import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { SQLCell, SQLCellReadOnly } from "wotlkdata/sql/SQLCell";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

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
    clone(id: number, item: number): any;
} 

export interface LootTable {
    filter(search: {Entry: number}): LootRowBase[];
    add(id: number, item: number) : LootRowBase;
}

export class LootSet extends CellSystemTop {
    protected table: LootTable;
    protected id: number;

    get ID() { return this.id; }
    get rows() { return this.table.filter({Entry:this.id})}
    
    addItem(item: number, chance: number, minCount: number, maxCount: number, quest: boolean = false, groupId: number = 0, lootMode: number = 1) {
        this.table.add(this.id,item)
            .Chance.set(chance)
            .MinCount.set(minCount)
            .MaxCount.set(maxCount)
            .QuestRequired.set(quest ? 1 : 0)
            .GroupId.set(groupId)
            .Comment.set("tswow")
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
            .Comment.set('tswow')
            .LootMode.set(lootMode)
        return this;
    }
    
    constructor(id: number, table: LootTable) {
        super();
        this.id = id;
        this.table = table;
    }
}

export class LootSetPointer<T> extends Ref<T,LootSet>{
    protected table: LootTable;
    protected gen: DynamicIDGenerator;
    constructor(owner: T, cell: Cell<number,any>, table: LootTable, gen: DynamicIDGenerator) {
        super(owner, cell);
        this.table = table;
        this.gen = gen;
    }

    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): LootSet {
        return new LootSet(this.gen.id(), this.table);
    }
    protected clone(): LootSet {
        let newId = this.gen.id();
        this.resolve().rows.forEach(x=>x.clone(newId,x.Item.get()))
        return new LootSet(newId, this.table);
    }
    protected id(v: LootSet): number {
        return v.ID;
    }
    protected resolve(): LootSet {
        return new LootSet(this.cell.get(), this.table);
    }
}

export const Loot = {
    Fishing: {
        create() {
            return new LootSet(Ids.fishing_loot_template.id(),SQL.fishing_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.fishing_loot_template);
        }
    },
    
    Creature: {
        create() {
            return new LootSet(Ids.creature_loot_template.id(),SQL.creature_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.creature_loot_template)
        }
    },
    
    GameObject: {
        create() {
            return new LootSet(Ids.gameobject_loot_template.id(),SQL.gameobject_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.gameobject_loot_template)
        } 
    },
    
    Item: {
        create() {
            return new LootSet(Ids.item_loot_template.id(),SQL.item_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.item_loot_template)
        } 
    },
    
    Disenchant: {
        create() {
            return new LootSet(Ids.disenchant_loot_template.id(),SQL.disenchant_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.disenchant_loot_template)
        } 
    },
    
    Prospecting: {
        create() {
            return new LootSet(Ids.prospecting_loot_template.id(),SQL.prospecting_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.prospecting_loot_template)
        } 
    },
    
    Milling: {
        create() {
            return new LootSet(Ids.milling_loot_template.id(),SQL.milling_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.milling_loot_template)
        } 
    },
    
    Pickpocket: {
        create() {
            return new LootSet(Ids.pickpocketing_loot_template.id(),SQL.pickpocketing_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.pickpocketing_loot_template)
        } 
    },
    
    Skinning: {
        create() {
            return new LootSet(Ids.skinning_loot_template.id(),SQL.skinning_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.skinning_loot_template)
        } 
    },
    
    Mail: {
        load(id: number) {
            return new LootSet(id, SQL.mail_loot_template)
        } 
    },
    
    Reference: {
        create() {
            return new LootSet(Ids.reference_loot_template.id(),SQL.reference_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.reference_loot_template)
        } 
    },
    
    Spell: {
        create() {
            return new LootSet(Ids.spell_loot_template.id(),SQL.spell_loot_template);
        },
        
        load(id: number) {
            return new LootSet(id, SQL.spell_loot_template)
        },
    },
}