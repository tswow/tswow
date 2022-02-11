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
import { Cell, CellWrapper } from "../../../data/cell/cells/Cell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { SQLCell, SQLCellReadOnly } from "../../../data/sql/SQLCell";
import { SQL } from "../../SQLFiles";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { convertPercent, PercentUnit } from "../Misc/PercentCell";

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
    queryAll(search: {Entry: number}): LootRowBase[];
    add(id: number, item: number) : LootRowBase;
}

function convChanceTuple(tuple: [number,PercentUnit]) {
    return convertPercent(tuple[0],tuple[1],'[0-100]')
}

export class LootSet extends CellSystemTop {
    protected table: LootTable;
    protected id: number;

    get ID() { return this.id; }
    get rows() { return this.table.queryAll({Entry:this.id})}

    addItem(item: number, chance: number|[number,PercentUnit], minCount: number, maxCount: number, quest: boolean = false, groupId: number = 0, lootMode: number = 1) {
        this.table.add(this.id,item)
            .Chance.set(Array.isArray(chance)
                ? convChanceTuple(chance): chance)
            .MinCount.set(minCount)
            .MaxCount.set(maxCount)
            .QuestRequired.set(quest ? 1 : 0)
            .GroupId.set(groupId)
            .Comment.set("tswow")
            .Reference.set(0)
            .LootMode.set(lootMode)
        return this;
    }

    addReference(table: number, chance: number|[number,PercentUnit], lootMode: number = 1) {
        this.table.add(this.id,table)
            .Chance.set(Array.isArray(chance)
                ? convChanceTuple(chance): chance)
            .Reference.set(table)
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

export class LootSetPointer<T> extends CellWrapper<number,T>{
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

    getRef() {
        if(!this.exists()) {
            this.cell.set(this.gen.id());
        }
        return new LootSet(this.cell.get(),this.table);
    }

    modRef(callback: (table: LootSet)=>void) {
        callback(this.getRef());
        return this.owner;
    }

    getRefCopy() {
        let old = this.cell.get();
        let nu = this.gen.id();
        this.cell.set(nu);
        this.table.queryAll({Entry:old}).forEach(x=>{
            x.clone(nu,x.Item.get())
                .Comment.set('tswow')
        })
        return this.getRef();
    }

    modRefCopy(callback: (table: LootSet)=>void) {
        callback(this.getRefCopy());
        return this.owner;
    }
}

export const Loot = {
    Fishing: {
        create(area: number) {
            return new LootSet(area,SQL.fishing_loot_template);
        },

        load(id: number) {
            return new LootSet(id, SQL.fishing_loot_template);
        }
    },

    Creature: {
        ref<T>(owner: T, cell: Cell<number,any>) {
            return new LootSetPointer(
                  owner
                , cell
                , SQL.creature_loot_template
                , Ids.creature_loot_template
            )
        },

        create() {
            return new LootSet(Ids.creature_loot_template.id(),SQL.creature_loot_template);
        },

        load(id: number) {
            return new LootSet(id, SQL.creature_loot_template)
        }
    },

    GameObject: {
        ref<T>(owner: T, cell: Cell<number,any>) {
            return new LootSetPointer(
                  owner
                , cell
                , SQL.gameobject_loot_template
                , Ids.gameobject_loot_template
            )
        },

        create() {
            return new LootSet(Ids.gameobject_loot_template.id(),SQL.gameobject_loot_template);
        },

        load(id: number) {
            return new LootSet(id, SQL.gameobject_loot_template)
        }
    },

    Disenchant: {
        ref<T>(owner: T, cell: Cell<number,any>) {
            return new LootSetPointer(
                  owner
                , cell
                , SQL.disenchant_loot_template
                , Ids.disenchant_loot_template
            )
        },

        create() {
            return new LootSet(Ids.disenchant_loot_template.id(),SQL.disenchant_loot_template);
        },

        load(id: number) {
            return new LootSet(id, SQL.disenchant_loot_template)
        }
    },

    Pickpocket: {
        ref<T>(owner: T, cell: Cell<number,any>) {
            return new LootSetPointer(
                  owner
                , cell
                , SQL.pickpocketing_loot_template
                , Ids.pickpocketing_loot_template
            )
        },

        create() {
            return new LootSet(Ids.pickpocketing_loot_template.id(),SQL.pickpocketing_loot_template);
        },

        load(id: number) {
            return new LootSet(id, SQL.pickpocketing_loot_template)
        }
    },

    Skinning: {
        ref<T>(owner: T, cell: Cell<number,any>) {
            return new LootSetPointer(
                  owner
                , cell
                , SQL.skinning_loot_template
                , Ids.skinning_loot_template
            )
        },

        create() {
            return new LootSet(Ids.skinning_loot_template.id(),SQL.skinning_loot_template);
        },

        load(id: number) {
            return new LootSet(id, SQL.skinning_loot_template)
        }
    },

    Reference: {
        ref<T>(owner: T, cell: Cell<number,any>) {
            return new LootSetPointer(
                  owner
                , cell
                , SQL.reference_loot_template
                , Ids.reference_loot_template
            )
        },

        create() {
            return new LootSet(Ids.reference_loot_template.id(),SQL.reference_loot_template);
        },

        load(id: number) {
            return new LootSet(id, SQL.reference_loot_template)
        }
    },
}