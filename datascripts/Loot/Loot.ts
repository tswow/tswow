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
import { Cell } from "wotlkdata/cell/Cell";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SQLCell, SQLCellReadOnly } from "wotlkdata/sql/SQLCell";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { AutoIdGenerator, Ids } from "../Base/Ids";

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

export abstract class LootSetBase<T> extends Subsystem<T> {
    protected table: LootTable;
    get rows() { return this.table.filter({Entry:this.ID})}
    
    abstract get ID() : number
    
    protected _addItem(item: number, chance: number, minCount: number, maxCount: number, quest: boolean = false, groupId: number = 0, lootMode: number = 1) {
        this.table.add(this.ID,item)
        .Chance.set(chance)
        .MinCount.set(minCount)
        .MaxCount.set(maxCount)
        .QuestRequired.set(quest ? 1 : 0)
        .GroupId.set(groupId)
        .LootMode.set(lootMode)
        return this;
    }
    
    protected _addReference(table: number, chance: number, lootMode: number = 1) {
        this.table.add(this.ID,table)
        .Chance.set(chance)
        .MinCount.set(1)
        .MaxCount.set(1)
        .QuestRequired.set(0)
        .GroupId.set(0)
        .Comment.set('tswow')
        .LootMode.set(lootMode)
        return this;
    }
    
    constructor(owner: T, table: LootTable) {
        super(owner);
        this.table = table;
    }
}

export class LootSet<T> extends LootSetBase<T> {
    protected _id: number;
    get ID(): number {
        return this._id;
    }
    
    constructor(owner: T, id: number, table: LootTable) {
        super(owner, table);
        this._id = id;
    }

    addItem(item: number, chance: number, minCount: number, maxCount: number, quest: boolean = false, groupId: number = 0, lootMode: number = 1) {
        this._addItem(item,chance,minCount,maxCount,quest,groupId,lootMode);
        return this;
    }

    addReference(table: number, chance: number, lootMode: number = 1) {
        this._addReference(table,chance,lootMode);
        return this;
    }
}

export class AttachedLootSet<T> extends LootSetBase<T> {
    get ID(): number {
        return this._cell.get();
    }

    static cell(set: AttachedLootSet<any>) {
        return set._cell;
    }

    static idgen(set: AttachedLootSet<any>) {
        return set._idgen;
    }
    
    protected _cell: Cell<number,any>;
    protected _idgen: AutoIdGenerator;
    constructor(owner: T, cell: Cell<number,any>, idGen: AutoIdGenerator, table: LootTable) {
        super(owner,table);
        this._cell = cell;
        this._idgen = idGen;
    }
    
    makeUnique(keepRows: boolean = false) {
        let oldid = this._cell.get();
        let nuid = this._idgen.id();
        this._cell.set(nuid);
        if(keepRows) {
            this.copyFrom(oldid);
        }
        return this.owner;
    }

    copyFrom(id: number) {
        this.table.filter({Entry: id}).forEach(x=>x.clone(this._cell.get(), x.Item.get()));
    }

    addItem(item: number, chance: number, minCount: number, maxCount: number, quest: boolean = false, groupId: number = 0, lootMode: number = 1) {
        this._addItem(item,chance,minCount,maxCount,quest,groupId,lootMode);
        return this.owner;
    }

    addReference(table: number, chance: number, lootMode: number = 1) {
        this._addReference(table,chance,lootMode);
        return this.owner;
    }
}

export const Loot = {
    Fishing: {
        create() {
            return new LootSet(undefined, Ids.CreatureLoot.id(),SQL.fishing_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.fishing_loot_template)
        }
    },
    
    Creature: {
        create() {
            return new LootSet(undefined, Ids.CreatureLoot.id(),SQL.creature_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.creature_loot_template)
        }
    },
    
    GameObject: {
        create() {
            return new LootSet(undefined, Ids.GameObjectLoot.id(),SQL.gameobject_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.gameobject_loot_template)
        } 
    },
    
    Item: {
        create() {
            return new LootSet(undefined, Ids.ItemLoot.id(),SQL.item_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.item_loot_template)
        } 
    },
    
    Disenchant: {
        create() {
            return new LootSet(undefined, Ids.DisenchantLoot.id(),SQL.disenchant_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.disenchant_loot_template)
        } 
    },
    
    Prospecting: {
        create() {
            return new LootSet(undefined, Ids.ProspectingLoot.id(),SQL.prospecting_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.prospecting_loot_template)
        } 
    },
    
    Milling: {
        create() {
            return new LootSet(undefined, Ids.MillingLoot.id(),SQL.milling_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.milling_loot_template)
        } 
    },
    
    Pickpocket: {
        create() {
            return new LootSet(undefined, Ids.PickPocketLoot.id(),SQL.pickpocketing_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.pickpocketing_loot_template)
        } 
    },
    
    Skinning: {
        create() {
            return new LootSet(undefined, Ids.SkinningLoot.id(),SQL.skinning_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.skinning_loot_template)
        } 
    },
    
    Mail: {
        create() {
            return new LootSet(undefined, Ids.MailLoot.id(),SQL.mail_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.mail_loot_template)
        } 
    },
    
    Reference: {
        create() {
            return new LootSet(undefined, Ids.ReferenceLoot.id(),SQL.reference_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.reference_loot_template)
        } 
    },
    
    Spell: {
        create() {
            return new LootSet(undefined, Ids.SpellLoot.id(),SQL.spell_loot_template);
        },
        
        load(id: number) {
            return new LootSet(undefined, id, SQL.spell_loot_template)
        },
    },
}
