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
import { mediumint, timestamp, tinyint, varchar } from '../../primitives'
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
export class game_eventRow extends SqlRow<game_eventCreator,game_eventQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get eventEntry() {return new SQLCellReadOnly<tinyint, this>(this, 'eventEntry')}

    /**
     * No comment (yet!)
     */
    get start_time() {return new SQLCell<timestamp, this>(this, 'start_time')}

    /**
     * No comment (yet!)
     */
    get end_time() {return new SQLCell<timestamp, this>(this, 'end_time')}

    /**
     * No comment (yet!)
     */
    get occurence() {return new SQLCell<bigint, this>(this, 'occurence')}

    /**
     * No comment (yet!)
     */
    get length() {return new SQLCell<bigint, this>(this, 'length')}

    /**
     * No comment (yet!)
     */
    get holiday() {return new SQLCell<mediumint, this>(this, 'holiday')}

    /**
     * No comment (yet!)
     */
    get holidayStage() {return new SQLCell<tinyint, this>(this, 'holidayStage')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<varchar, this>(this, 'description')}

    /**
     * No comment (yet!)
     */
    get world_event() {return new SQLCell<tinyint, this>(this, 'world_event')}

    /**
     * No comment (yet!)
     */
    get announce() {return new SQLCell<tinyint, this>(this, 'announce')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry : tinyint, c? : game_eventCreator) : this {
        return this.cloneInternal([eventEntry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_eventCreator = {
    eventEntry? : tinyint,
    start_time? : timestamp,
    end_time? : timestamp,
    occurence? : bigint,
    length? : bigint,
    holiday? : mediumint,
    holidayStage? : tinyint,
    description? : varchar,
    world_event? : tinyint,
    announce? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_eventQuery = {
    eventEntry? : Relation<tinyint>,
    start_time? : Relation<timestamp>,
    end_time? : Relation<timestamp>,
    holiday? : Relation<mediumint>,
    holidayStage? : Relation<tinyint>,
    description? : Relation<varchar>,
    world_event? : Relation<tinyint>,
    announce? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_eventTable extends SqlTable<
    game_eventCreator,
    game_eventQuery,
    game_eventRow> {
    add(eventEntry : tinyint, c? : game_eventCreator) : game_eventRow {
        const first = this.first();
        if(first) return first.clone(eventEntry,c)
        else return this.rowCreator(this, {}).clone(eventEntry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_event = new game_eventTable(
    'game_event',
    (table, obj)=>new game_eventRow(table, obj))