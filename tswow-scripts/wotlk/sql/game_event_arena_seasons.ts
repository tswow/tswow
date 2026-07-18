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
import { tinyint } from '../../data/primitives'
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
export class game_event_arena_seasonsRow extends SqlRow<game_event_arena_seasonsCreator,game_event_arena_seasonsQuery> {
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
    get season() {return new SQLCellReadOnly<tinyint, this>(this, 'season')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry : tinyint,season : tinyint, c? : game_event_arena_seasonsCreator) : this {
        return this.cloneInternal([eventEntry,season],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_arena_seasonsCreator = {
    eventEntry? : tinyint,
    season? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_arena_seasonsQuery = {
    eventEntry? : Relation<tinyint>,
    season? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_arena_seasonsTable extends SqlTable<
    game_event_arena_seasonsCreator,
    game_event_arena_seasonsQuery,
    game_event_arena_seasonsRow> {
    add(eventEntry : tinyint,season : tinyint, c? : game_event_arena_seasonsCreator) : game_event_arena_seasonsRow {
        const first = this.first();
        if(first) return first.clone(eventEntry,season,c)
        else return this.rowCreator(this, {}).clone(eventEntry,season,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_arena_seasons = new game_event_arena_seasonsTable(
    'game_event_arena_seasons',
    (table, obj)=>new game_event_arena_seasonsRow(table, obj))

