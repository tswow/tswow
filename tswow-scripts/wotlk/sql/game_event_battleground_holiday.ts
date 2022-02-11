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
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class game_event_battleground_holidayRow extends SqlRow<game_event_battleground_holidayCreator,game_event_battleground_holidayQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get EventEntry() {return new SQLCellReadOnly<tinyint, this>(this, 'EventEntry')}

    /**
     * No comment (yet!)
     */
    get BattlegroundID() {return new SQLCell<int, this>(this, 'BattlegroundID')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(EventEntry : tinyint, c? : game_event_battleground_holidayCreator) : this {
        return this.cloneInternal([EventEntry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_battleground_holidayCreator = {
    EventEntry? : tinyint,
    BattlegroundID? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_battleground_holidayQuery = {
    EventEntry? : Relation<tinyint>,
    BattlegroundID? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_battleground_holidayTable extends SqlTable<
    game_event_battleground_holidayCreator,
    game_event_battleground_holidayQuery,
    game_event_battleground_holidayRow> {
    add(EventEntry : tinyint, c? : game_event_battleground_holidayCreator) : game_event_battleground_holidayRow {
        const first = this.first();
        if(first) return first.clone(EventEntry,c)
        else return this.rowCreator(this, {}).clone(EventEntry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_battleground_holiday = new game_event_battleground_holidayTable(
    'game_event_battleground_holiday',
    (table, obj)=>new game_event_battleground_holidayRow(table, obj))