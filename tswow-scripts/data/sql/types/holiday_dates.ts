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
import { int, tinyint } from '../../primitives'
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
export class holiday_datesRow extends SqlRow<holiday_datesCreator,holiday_datesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get id() {return new SQLCellReadOnly<int, this>(this, 'id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get date_id() {return new SQLCellReadOnly<tinyint, this>(this, 'date_id')}

    /**
     * No comment (yet!)
     */
    get date_value() {return new SQLCell<int, this>(this, 'date_value')}

    /**
     * No comment (yet!)
     */
    get holiday_duration() {return new SQLCell<int, this>(this, 'holiday_duration')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : int,date_id : tinyint, c? : holiday_datesCreator) : this {
        return this.cloneInternal([id,date_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type holiday_datesCreator = {
    id? : int,
    date_id? : tinyint,
    date_value? : int,
    holiday_duration? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type holiday_datesQuery = {
    id? : Relation<int>,
    date_id? : Relation<tinyint>,
    date_value? : Relation<int>,
    holiday_duration? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class holiday_datesTable extends SqlTable<
    holiday_datesCreator,
    holiday_datesQuery,
    holiday_datesRow> {
    add(id : int,date_id : tinyint, c? : holiday_datesCreator) : holiday_datesRow {
        const first = this.first();
        if(first) return first.clone(id,date_id,c)
        else return this.rowCreator(this, {}).clone(id,date_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_holiday_dates = new holiday_datesTable(
    'holiday_dates',
    (table, obj)=>new holiday_datesRow(table, obj))