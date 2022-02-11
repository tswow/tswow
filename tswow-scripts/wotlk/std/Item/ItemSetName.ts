/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { Cell } from "../../../data/cell/cells/Cell";
import { Language } from "../../../data/dbc/Localization";
import { SQL } from "../../SQLFiles";
import { item_set_namesRow } from "../../sql/item_set_names";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { ItemTemplate } from "./ItemTemplate";

export class ItemSetNameRow extends MaybeSQLEntity<ItemTemplate,item_set_namesRow> {
    protected createSQL(): item_set_namesRow {
        return SQL.item_set_names.add(this.owner.ID)
            .VerifiedBuild.set(17688)
            .InventoryType.set(this.owner.InventoryType.get())
            .name.set(this.owner.Name.enGB.get())
    }
    protected findSQL(): item_set_namesRow {
        return SQL.item_set_names.query({entry:this.owner.ID})
    }
    protected isValidSQL(sql: item_set_namesRow): boolean {
        return sql.entry.get() === this.owner.ID
    }

    get Name() {
        return this.wrapSQL(this.owner.Name.enGB.get(),x=>x.name);
    }
    get InventoryType() {
        return this.wrapSQL(this.owner.row.InventoryType.get(),x=>x.InventoryType)
    }
}

export class ItemSetName extends SQLLocSystem<ItemTemplate> {
    protected getMain(): Cell<string, any> {
        return ItemTemplate.ItemSetNameRow(this.owner).Name;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        let row = SQL.item_set_names_locale.query({ID:this.owner.ID})
        if(row) return row.Name;
        return SQL.item_set_names_locale
            .add(this.owner.ID,loc)
            .Name.set(this.owner.Name.objectify()[loc])
            .Name

    }
}