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
export class game_event_creature_questRow extends SqlRow<game_event_creature_questCreator,game_event_creature_questQuery> {
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
    get id() {return new SQLCellReadOnly<mediumint, this>(this, 'id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get quest() {return new SQLCellReadOnly<mediumint, this>(this, 'quest')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : mediumint,quest : mediumint, c? : game_event_creature_questCreator) : this {
        return this.cloneInternal([id,quest],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_creature_questCreator = {
    eventEntry? : tinyint,
    id? : mediumint,
    quest? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_creature_questQuery = {
    eventEntry? : Relation<tinyint>,
    id? : Relation<mediumint>,
    quest? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_creature_questTable extends SqlTable<
    game_event_creature_questCreator,
    game_event_creature_questQuery,
    game_event_creature_questRow> {
    add(id : mediumint,quest : mediumint, c? : game_event_creature_questCreator) : game_event_creature_questRow {
        const first = this.first();
        if(first) return first.clone(id,quest,c)
        else return this.rowCreator(this, {}).clone(id,quest,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_creature_quest = new game_event_creature_questTable(
    'game_event_creature_quest',
    (table, obj)=>new game_event_creature_questRow(table, obj))