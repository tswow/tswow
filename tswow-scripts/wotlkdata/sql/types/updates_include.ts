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
import { text, varchar } from '../../primitives'
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
export class updates_includeRow extends SqlRow<updates_includeCreator,updates_includeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get path() {return new SQLCellReadOnly<varchar, this>(this, 'path')}

    /**
     * No comment (yet!)
     */
    get state() {return new SQLCell<text, this>(this, 'state')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(path : varchar, c? : updates_includeCreator) : this {
        return this.cloneInternal([path],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type updates_includeCreator = {
    path? : varchar,
    state? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type updates_includeQuery = {
    path? : Relation<varchar>,
    state? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class updates_includeTable extends SqlTable<
    updates_includeCreator,
    updates_includeQuery,
    updates_includeRow> {
    add(path : varchar, c? : updates_includeCreator) : updates_includeRow {
        const first = this.first();
        if(first) return first.clone(path,c)
        else return this.rowCreator(this, {}).clone(path,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_updates_include = new updates_includeTable(
    'updates_include',
    (table, obj)=>new updates_includeRow(table, obj))