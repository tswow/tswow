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
import { char, int, mediumint, text } from '../../primitives'
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
export class transportsRow extends SqlRow<transportsCreator,transportsQuery> {
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
    get entry() {return new SQLCell<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get name() {return new SQLCell<text, this>(this, 'name')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<char, this>(this, 'ScriptName')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid : int, c? : transportsCreator) : this {
        return this.cloneInternal([guid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type transportsCreator = {
    guid? : int,
    entry? : mediumint,
    name? : text,
    ScriptName? : char,
}

/**
 * Used for object queries (Don't comment these)
 */
export type transportsQuery = {
    guid? : Relation<int>,
    entry? : Relation<mediumint>,
    name? : Relation<text>,
    ScriptName? : Relation<char>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class transportsTable extends SqlTable<
    transportsCreator,
    transportsQuery,
    transportsRow> {
    add(guid : int, c? : transportsCreator) : transportsRow {
        const first = this.first();
        if(first) return first.clone(guid,c)
        else return this.rowCreator(this, {}).clone(guid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_transports = new transportsTable(
    'transports',
    (table, obj)=>new transportsRow(table, obj))