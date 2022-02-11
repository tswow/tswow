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
import { int, tinyint, varchar } from '../../primitives'
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
export class quest_pool_membersRow extends SqlRow<quest_pool_membersCreator,quest_pool_membersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get questId() {return new SQLCellReadOnly<int, this>(this, 'questId')}

    /**
     * No comment (yet!)
     */
    get poolId() {return new SQLCell<int, this>(this, 'poolId')}

    /**
     * No comment (yet!)
     */
    get poolIndex() {return new SQLCell<tinyint, this>(this, 'poolIndex')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<varchar, this>(this, 'description')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(questId : int, c? : quest_pool_membersCreator) : this {
        return this.cloneInternal([questId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_pool_membersCreator = {
    questId? : int,
    poolId? : int,
    poolIndex? : tinyint,
    description? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_pool_membersQuery = {
    questId? : Relation<int>,
    poolId? : Relation<int>,
    poolIndex? : Relation<tinyint>,
    description? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_pool_membersTable extends SqlTable<
    quest_pool_membersCreator,
    quest_pool_membersQuery,
    quest_pool_membersRow> {
    add(questId : int, c? : quest_pool_membersCreator) : quest_pool_membersRow {
        const first = this.first();
        if(first) return first.clone(questId,c)
        else return this.rowCreator(this, {}).clone(questId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_pool_members = new quest_pool_membersTable(
    'quest_pool_members',
    (table, obj)=>new quest_pool_membersRow(table, obj))