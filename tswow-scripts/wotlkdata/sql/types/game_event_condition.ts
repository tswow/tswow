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
import { float, mediumint, smallint, tinyint, varchar } from '../../primitives'
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
export class game_event_conditionRow extends SqlRow<game_event_conditionCreator,game_event_conditionQuery> {
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
    get condition_id() {return new SQLCellReadOnly<mediumint, this>(this, 'condition_id')}

    /**
     * No comment (yet!)
     */
    get req_num() {return new SQLCell<float, this>(this, 'req_num')}

    /**
     * No comment (yet!)
     */
    get max_world_state_field() {return new SQLCell<smallint, this>(this, 'max_world_state_field')}

    /**
     * No comment (yet!)
     */
    get done_world_state_field() {return new SQLCell<smallint, this>(this, 'done_world_state_field')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<varchar, this>(this, 'description')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry : tinyint,condition_id : mediumint, c? : game_event_conditionCreator) : this {
        return this.cloneInternal([eventEntry,condition_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_conditionCreator = {
    eventEntry? : tinyint,
    condition_id? : mediumint,
    req_num? : float,
    max_world_state_field? : smallint,
    done_world_state_field? : smallint,
    description? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_conditionQuery = {
    eventEntry? : Relation<tinyint>,
    condition_id? : Relation<mediumint>,
    req_num? : Relation<float>,
    max_world_state_field? : Relation<smallint>,
    done_world_state_field? : Relation<smallint>,
    description? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_conditionTable extends SqlTable<
    game_event_conditionCreator,
    game_event_conditionQuery,
    game_event_conditionRow> {
    add(eventEntry : tinyint,condition_id : mediumint, c? : game_event_conditionCreator) : game_event_conditionRow {
        const first = this.first();
        if(first) return first.clone(eventEntry,condition_id,c)
        else return this.rowCreator(this, {}).clone(eventEntry,condition_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_condition = new game_event_conditionTable(
    'game_event_condition',
    (table, obj)=>new game_event_conditionRow(table, obj))