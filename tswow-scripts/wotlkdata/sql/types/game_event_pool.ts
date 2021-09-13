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
import { mediumint, tinyint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../SQLCell'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class game_event_poolRow extends SqlRow<game_event_poolCreator,game_event_poolQuery> {
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
    get pool_entry() {return new SQLCellReadOnly<mediumint, this>(this, 'pool_entry')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(pool_entry : mediumint, c? : game_event_poolCreator) : this {
        return this.cloneInternal([pool_entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_poolCreator = {
    eventEntry? : tinyint,
    pool_entry? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_poolQuery = {
    eventEntry? : Relation<tinyint>,
    pool_entry? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_poolTable extends SqlTable<
    game_event_poolCreator,
    game_event_poolQuery,
    game_event_poolRow> {
    add(pool_entry : mediumint, c? : game_event_poolCreator) : game_event_poolRow {
        const first = this.first();
        if(first) return first.clone(pool_entry,c)
        else return this.rowCreator(this, {}).clone(pool_entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_pool = new game_event_poolTable(
    'game_event_pool',
    (table, obj)=>new game_event_poolRow(table, obj))