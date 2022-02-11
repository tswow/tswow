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
import { mediumint, smallint, tinyint } from '../../data/primitives'
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
export class game_event_npc_vendorRow extends SqlRow<game_event_npc_vendorCreator,game_event_npc_vendorQuery> {
    /**
     * No comment (yet!)
     */
    get eventEntry() {return new SQLCell<tinyint, this>(this, 'eventEntry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get guid() {return new SQLCellReadOnly<mediumint, this>(this, 'guid')}

    /**
     * No comment (yet!)
     */
    get slot() {return new SQLCell<smallint, this>(this, 'slot')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get item() {return new SQLCellReadOnly<mediumint, this>(this, 'item')}

    /**
     * No comment (yet!)
     */
    get maxcount() {return new SQLCell<mediumint, this>(this, 'maxcount')}

    /**
     * No comment (yet!)
     */
    get incrtime() {return new SQLCell<mediumint, this>(this, 'incrtime')}

    /**
     * No comment (yet!)
     */
    get ExtendedCost() {return new SQLCell<mediumint, this>(this, 'ExtendedCost')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid : mediumint,item : mediumint, c? : game_event_npc_vendorCreator) : this {
        return this.cloneInternal([guid,item],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_npc_vendorCreator = {
    eventEntry? : tinyint,
    guid? : mediumint,
    slot? : smallint,
    item? : mediumint,
    maxcount? : mediumint,
    incrtime? : mediumint,
    ExtendedCost? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_npc_vendorQuery = {
    eventEntry? : Relation<tinyint>,
    guid? : Relation<mediumint>,
    slot? : Relation<smallint>,
    item? : Relation<mediumint>,
    maxcount? : Relation<mediumint>,
    incrtime? : Relation<mediumint>,
    ExtendedCost? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_npc_vendorTable extends SqlTable<
    game_event_npc_vendorCreator,
    game_event_npc_vendorQuery,
    game_event_npc_vendorRow> {
    add(guid : mediumint,item : mediumint, c? : game_event_npc_vendorCreator) : game_event_npc_vendorRow {
        const first = this.first();
        if(first) return first.clone(guid,item,c)
        else return this.rowCreator(this, {}).clone(guid,item,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_npc_vendor = new game_event_npc_vendorTable(
    'game_event_npc_vendor',
    (table, obj)=>new game_event_npc_vendorRow(table, obj))