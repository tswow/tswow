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
import { DBC, SQL } from "wotlkdata";
import { Cell } from "wotlkdata/cell/Cell";
import { ItemRow } from "wotlkdata/dbc/types/Item";
import { ItemDisplayInfoRow } from "wotlkdata/dbc/types/ItemDisplayInfo";
import { item_templateRow } from "wotlkdata/sql/types/item_template";
import { Ids } from "../Base/Ids";
import { MainEntity } from "../Base/MainEntity";
import { ItemBonding } from "./ItemBonding";
import { ItemDamages } from "./ItemDamage";
import { ItemMaterial } from "./ItemMaterial";
import { ItemQuality } from "./ItemQuality";
import { ItemRequirements } from "./ItemRequirements";
import { ItemResistance } from "./ItemResistances";
import { ItemSockets } from "./ItemSocket";
import { ItemSpells } from "./ItemSpells";
import { ItemStats } from "./ItemStats";
import { ItemDescription, ItemName } from "./ItemText";


export class ItemBase extends MainEntity<item_templateRow> {
    sqlRow : item_templateRow;
    dbcRow : ItemRow;
    displayRow : ItemDisplayInfoRow;

    get Name() { return new ItemName(this); }
    get Socket() { return new ItemSockets(this); }
    get Resistances() { return new ItemResistance(this); }
    get Stats() { return new ItemStats(this); }
    get Description() { return new ItemDescription(this); }
    get Quality() { return new ItemQuality(this); }
    get Durability() { return this.wrap(this.sqlRow.MaxDurability); }
    get DisenchantId() { return this.wrap(this.sqlRow.DisenchantID); }
    get RequiredLevel() { return this.wrap(this.sqlRow.RequiredLevel); }
    get ItemLevel() { return this.wrap(this.sqlRow.ItemLevel); }
    get RequiredSpell() { return this.wrap(this.sqlRow.requiredspell); }
    get ClassMask() { return this.wrap(this.sqlRow.AllowableClass); }
    get RaceMask() { return this.wrap(this.sqlRow.AllowableRace); }
    get MaxCount() { return this.wrap(this.sqlRow.maxcount); }
    get MaxStack() { return this.wrap(this.sqlRow.stackable); }
    get Bonding() { return new ItemBonding(this); }
    get Damage() { return new ItemDamages(this); }
    get Requirements() { return new ItemRequirements(this); }
    get Spells() { return new ItemSpells(this); }
    get Icon() {
        return Cell.make(this,
            ()=>this.displayRow.InventoryIcon.getIndex(0), 
            (value)=>this.displayRow.InventoryIcon.setIndex(0,value)
        )
    }
    get Material() { return new ItemMaterial(this); }

    constructor(srow : item_templateRow, crow : ItemRow, display : ItemDisplayInfoRow) {
        super(srow);
        this.sqlRow = srow;
        this.dbcRow = crow;
        this.displayRow = display;
    }

    get ID() {
        return this.sqlRow.entry.get();
    }
}

function getRows(id: number) : [item_templateRow, ItemRow, ItemDisplayInfoRow] {
    const sqlParent = SQL.item_template.find({entry:id});
    const dbcParent = DBC.Item.find({ID:id});
    const disParent = DBC.ItemDisplayInfo.find({ID:sqlParent.displayid.get()});
    return [sqlParent,dbcParent,disParent];
}

export const Items = {
    create(mod: string, id: string, parent: number) {
        const numid = Ids.Item.id(mod,id);
        const [sqlParent,dbcParent,disParent] = getRows(parent);
        const sqlRow = sqlParent.clone(numid)
        const dbcRow = dbcParent.clone(numid);
        const disRow = disParent.clone(numid);
        return new ItemBase(sqlRow, dbcRow, disRow);
    },

    load(item: number) {
        const [sql,dbc,dis] = getRows(item);
        return new ItemBase(sql, dbc, dis);
    },
}