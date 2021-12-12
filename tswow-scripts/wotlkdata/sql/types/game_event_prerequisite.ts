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
import { SQLCellReadOnly } from '../SQLCell'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class game_event_prerequisiteRow extends SqlRow<game_event_prerequisiteCreator,game_event_prerequisiteQuery> {
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
    get prerequisite_event() {return new SQLCellReadOnly<mediumint, this>(this, 'prerequisite_event')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry : tinyint,prerequisite_event : mediumint, c? : game_event_prerequisiteCreator) : this {
        return this.cloneInternal([eventEntry,prerequisite_event],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_prerequisiteCreator = {
    eventEntry? : tinyint,
    prerequisite_event? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_prerequisiteQuery = {
    eventEntry? : Relation<tinyint>,
    prerequisite_event? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_prerequisiteTable extends SqlTable<
    game_event_prerequisiteCreator,
    game_event_prerequisiteQuery,
    game_event_prerequisiteRow> {
    add(eventEntry : tinyint,prerequisite_event : mediumint, c? : game_event_prerequisiteCreator) : game_event_prerequisiteRow {
        const first = this.first();
        if(first) return first.clone(eventEntry,prerequisite_event,c)
        else return this.rowCreator(this, {}).clone(eventEntry,prerequisite_event,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_prerequisite = new game_event_prerequisiteTable(
    'game_event_prerequisite',
    (table, obj)=>new game_event_prerequisiteRow(table, obj))