/*
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

/* tslint:disable */
import { mediumint, tinyint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class playercreateinfo_itemRow extends SqlRow<playercreateinfo_itemCreator,playercreateinfo_itemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get race() {return new SQLCellReadOnly<tinyint, this>(this, 'race')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get class() {return new SQLCellReadOnly<tinyint, this>(this, 'class')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get itemid() {return new SQLCellReadOnly<mediumint, this>(this, 'itemid')}

    /**
     * No comment (yet!)
     */
    get amount() {return new SQLCell<tinyint, this>(this, 'amount')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(race : tinyint,cls : tinyint,itemid : mediumint, c? : playercreateinfo_itemCreator) : this {
        return this.cloneInternal([race,cls,itemid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfo_itemCreator = {
    race? : tinyint,
    class? : tinyint,
    itemid? : mediumint,
    amount? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfo_itemQuery = {
    race? : Relation<tinyint>,
    class? : Relation<tinyint>,
    itemid? : Relation<mediumint>,
    amount? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class playercreateinfo_itemTable extends SqlTable<
    playercreateinfo_itemCreator,
    playercreateinfo_itemQuery,
    playercreateinfo_itemRow> {
    add(race : tinyint,cls : tinyint,itemid : mediumint, c? : playercreateinfo_itemCreator) : playercreateinfo_itemRow {
        const first = this.first();
        if(first) return first.clone(race,cls,itemid,c)
        else return this.rowCreator(this, {}).clone(race,cls,itemid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_playercreateinfo_item = new playercreateinfo_itemTable(
    'playercreateinfo_item',
    (table, obj)=>new playercreateinfo_itemRow(table, obj))