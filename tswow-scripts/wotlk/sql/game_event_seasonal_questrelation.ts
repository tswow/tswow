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
import { int, mediumint } from '../../data/primitives'
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
export class game_event_seasonal_questrelationRow extends SqlRow<game_event_seasonal_questrelationCreator,game_event_seasonal_questrelationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get questId() {return new SQLCellReadOnly<int, this>(this, 'questId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get eventEntry() {return new SQLCellReadOnly<mediumint, this>(this, 'eventEntry')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(questId : int,eventEntry : mediumint, c? : game_event_seasonal_questrelationCreator) : this {
        return this.cloneInternal([questId,eventEntry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_seasonal_questrelationCreator = {
    questId? : int,
    eventEntry? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_seasonal_questrelationQuery = {
    questId? : Relation<int>,
    eventEntry? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_seasonal_questrelationTable extends SqlTable<
    game_event_seasonal_questrelationCreator,
    game_event_seasonal_questrelationQuery,
    game_event_seasonal_questrelationRow> {
    add(questId : int,eventEntry : mediumint, c? : game_event_seasonal_questrelationCreator) : game_event_seasonal_questrelationRow {
        const first = this.first();
        if(first) return first.clone(questId,eventEntry,c)
        else return this.rowCreator(this, {}).clone(questId,eventEntry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_seasonal_questrelation = new game_event_seasonal_questrelationTable(
    'game_event_seasonal_questrelation',
    (table, obj)=>new game_event_seasonal_questrelationRow(table, obj))