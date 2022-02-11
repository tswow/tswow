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
export class quest_pool_templateRow extends SqlRow<quest_pool_templateCreator,quest_pool_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get poolId() {return new SQLCellReadOnly<mediumint, this>(this, 'poolId')}

    /**
     * No comment (yet!)
     */
    get numActive() {return new SQLCell<int, this>(this, 'numActive')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<varchar, this>(this, 'description')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(poolId : mediumint, c? : quest_pool_templateCreator) : this {
        return this.cloneInternal([poolId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_pool_templateCreator = {
    poolId? : mediumint,
    numActive? : int,
    description? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_pool_templateQuery = {
    poolId? : Relation<mediumint>,
    numActive? : Relation<int>,
    description? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_pool_templateTable extends SqlTable<
    quest_pool_templateCreator,
    quest_pool_templateQuery,
    quest_pool_templateRow> {
    add(poolId : mediumint, c? : quest_pool_templateCreator) : quest_pool_templateRow {
        const first = this.first();
        if(first) return first.clone(poolId,c)
        else return this.rowCreator(this, {}).clone(poolId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_pool_template = new quest_pool_templateTable(
    'quest_pool_template',
    (table, obj)=>new quest_pool_templateRow(table, obj))