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
import { int, tinyint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class game_event_creatureRow extends SqlRow<game_event_creatureCreator,game_event_creatureQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get eventEntry() {return new SQLCellReadOnly<tinyint, this>(this, 'eventEntry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get guid() {return new SQLCellReadOnly<int, this>(this, 'guid')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry: int, guid : tinyint, c? : game_event_creatureCreator) : this {
        return this.cloneInternal([guid,eventEntry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_creatureCreator = {
    eventEntry? : tinyint,
    guid? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_creatureQuery = {
    eventEntry? : Relation<tinyint>,
    guid? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_creatureTable extends SqlTable<
    game_event_creatureCreator,
    game_event_creatureQuery,
    game_event_creatureRow> {
    add(eventEntry: int, guid : tinyint, c? : game_event_creatureCreator) : game_event_creatureRow {
        const first = this.first();
        if(first) return first.clone(guid,eventEntry,c)
        else return this.rowCreator(this, {}).clone(guid,eventEntry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_creature = new game_event_creatureTable(
    'game_event_creature',
    (table, obj)=>new game_event_creatureRow(table, obj))