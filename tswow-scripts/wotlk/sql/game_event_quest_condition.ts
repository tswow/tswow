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
import { float, mediumint, tinyint } from '../../data/primitives'
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
export class game_event_quest_conditionRow extends SqlRow<game_event_quest_conditionCreator,game_event_quest_conditionQuery> {
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
    get quest() {return new SQLCellReadOnly<mediumint, this>(this, 'quest')}

    /**
     * No comment (yet!)
     */
    get condition_id() {return new SQLCell<mediumint, this>(this, 'condition_id')}

    /**
     * No comment (yet!)
     */
    get num() {return new SQLCell<float, this>(this, 'num')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(quest : mediumint, c? : game_event_quest_conditionCreator) : this {
        return this.cloneInternal([quest],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_quest_conditionCreator = {
    eventEntry? : tinyint,
    quest? : mediumint,
    condition_id? : mediumint,
    num? : float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_quest_conditionQuery = {
    eventEntry? : Relation<tinyint>,
    quest? : Relation<mediumint>,
    condition_id? : Relation<mediumint>,
    num? : Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_quest_conditionTable extends SqlTable<
    game_event_quest_conditionCreator,
    game_event_quest_conditionQuery,
    game_event_quest_conditionRow> {
    add(quest : mediumint, c? : game_event_quest_conditionCreator) : game_event_quest_conditionRow {
        const first = this.first();
        if(first) return first.clone(quest,c)
        else return this.rowCreator(this, {}).clone(quest,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_quest_condition = new game_event_quest_conditionTable(
    'game_event_quest_condition',
    (table, obj)=>new game_event_quest_conditionRow(table, obj))