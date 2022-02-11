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
import { int, smallint, varchar } from '../../data/primitives'
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
export class disablesRow extends SqlRow<disablesCreator,disablesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get sourceType() {return new SQLCellReadOnly<int, this>(this, 'sourceType')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<int, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get flags() {return new SQLCell<smallint, this>(this, 'flags')}

    /**
     * No comment (yet!)
     */
    get params_0() {return new SQLCell<varchar, this>(this, 'params_0')}

    /**
     * No comment (yet!)
     */
    get params_1() {return new SQLCell<varchar, this>(this, 'params_1')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<varchar, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(sourceType : int,entry : int, c? : disablesCreator) : this {
        return this.cloneInternal([sourceType,entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type disablesCreator = {
    sourceType? : int,
    entry? : int,
    flags? : smallint,
    params_0? : varchar,
    params_1? : varchar,
    comment? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type disablesQuery = {
    sourceType? : Relation<int>,
    entry? : Relation<int>,
    flags? : Relation<smallint>,
    params_0? : Relation<varchar>,
    params_1? : Relation<varchar>,
    comment? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class disablesTable extends SqlTable<
    disablesCreator,
    disablesQuery,
    disablesRow> {
    add(sourceType : int,entry : int, c? : disablesCreator) : disablesRow {
        const first = this.first();
        if(first) return first.clone(sourceType,entry,c)
        else return this.rowCreator(this, {}).clone(sourceType,entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_disables = new disablesTable(
    'disables',
    (table, obj)=>new disablesRow(table, obj))