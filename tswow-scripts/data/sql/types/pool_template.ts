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
import { int, mediumint, varchar } from '../../primitives'
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
export class pool_templateRow extends SqlRow<pool_templateCreator,pool_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get max_limit() {return new SQLCell<int, this>(this, 'max_limit')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<varchar, this>(this, 'description')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : pool_templateCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type pool_templateCreator = {
    entry? : mediumint,
    max_limit? : int,
    description? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type pool_templateQuery = {
    entry? : Relation<mediumint>,
    max_limit? : Relation<int>,
    description? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class pool_templateTable extends SqlTable<
    pool_templateCreator,
    pool_templateQuery,
    pool_templateRow> {
    add(entry : mediumint, c? : pool_templateCreator) : pool_templateRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_pool_template = new pool_templateTable(
    'pool_template',
    (table, obj)=>new pool_templateRow(table, obj))