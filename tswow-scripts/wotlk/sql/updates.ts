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
import { char, int, text, timestamp, varchar } from '../../data/primitives'
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
export class updatesRow extends SqlRow<updatesCreator,updatesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get name() {return new SQLCellReadOnly<varchar, this>(this, 'name')}

    /**
     * No comment (yet!)
     */
    get hash() {return new SQLCell<char, this>(this, 'hash')}

    /**
     * No comment (yet!)
     */
    get state() {return new SQLCell<text, this>(this, 'state')}

    /**
     * No comment (yet!)
     */
    get timestamp() {return new SQLCell<timestamp, this>(this, 'timestamp')}

    /**
     * No comment (yet!)
     */
    get speed() {return new SQLCell<int, this>(this, 'speed')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(name : varchar, c? : updatesCreator) : this {
        return this.cloneInternal([name],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type updatesCreator = {
    name? : varchar,
    hash? : char,
    state? : text,
    timestamp? : timestamp,
    speed? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type updatesQuery = {
    name? : Relation<varchar>,
    hash? : Relation<char>,
    state? : Relation<text>,
    timestamp? : Relation<timestamp>,
    speed? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class updatesTable extends SqlTable<
    updatesCreator,
    updatesQuery,
    updatesRow> {
    add(name : varchar, c? : updatesCreator) : updatesRow {
        const first = this.first();
        if(first) return first.clone(name,c)
        else return this.rowCreator(this, {}).clone(name,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_updates = new updatesTable(
    'updates',
    (table, obj)=>new updatesRow(table, obj))