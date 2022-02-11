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
import { int, mediumint, tinyint } from '../../data/primitives'
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
export class game_event_model_equipRow extends SqlRow<game_event_model_equipCreator,game_event_model_equipQuery> {
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
    get guid() {return new SQLCellReadOnly<int, this>(this, 'guid')}

    /**
     * No comment (yet!)
     */
    get modelid() {return new SQLCell<mediumint, this>(this, 'modelid')}

    /**
     * No comment (yet!)
     */
    get equipment_id() {return new SQLCell<tinyint, this>(this, 'equipment_id')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid : int, c? : game_event_model_equipCreator) : this {
        return this.cloneInternal([guid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_event_model_equipCreator = {
    eventEntry? : tinyint,
    guid? : int,
    modelid? : mediumint,
    equipment_id? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_event_model_equipQuery = {
    eventEntry? : Relation<tinyint>,
    guid? : Relation<int>,
    modelid? : Relation<mediumint>,
    equipment_id? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_event_model_equipTable extends SqlTable<
    game_event_model_equipCreator,
    game_event_model_equipQuery,
    game_event_model_equipRow> {
    add(guid : int, c? : game_event_model_equipCreator) : game_event_model_equipRow {
        const first = this.first();
        if(first) return first.clone(guid,c)
        else return this.rowCreator(this, {}).clone(guid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event_model_equip = new game_event_model_equipTable(
    'game_event_model_equip',
    (table, obj)=>new game_event_model_equipRow(table, obj))