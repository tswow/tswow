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
import { float, int, smallint, varchar } from '../../data/primitives'
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
export class pool_membersRow extends SqlRow<pool_membersCreator,pool_membersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get type() {return new SQLCellReadOnly<smallint, this>(this, 'type')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spawnId() {return new SQLCellReadOnly<int, this>(this, 'spawnId')}

    /**
     * No comment (yet!)
     */
    get poolSpawnId() {return new SQLCell<int, this>(this, 'poolSpawnId')}

    /**
     * No comment (yet!)
     */
    get chance() {return new SQLCell<float, this>(this, 'chance')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<varchar, this>(this, 'description')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(type : smallint,spawnId : int, c? : pool_membersCreator) : this {
        return this.cloneInternal([type,spawnId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type pool_membersCreator = {
    type? : smallint,
    spawnId? : int,
    poolSpawnId? : int,
    chance? : float,
    description? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type pool_membersQuery = {
    type? : Relation<smallint>,
    spawnId? : Relation<int>,
    poolSpawnId? : Relation<int>,
    chance? : Relation<float>,
    description? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class pool_membersTable extends SqlTable<
    pool_membersCreator,
    pool_membersQuery,
    pool_membersRow> {
    add(type : smallint,spawnId : int, c? : pool_membersCreator) : pool_membersRow {
        const first = this.first();
        if(first) return first.clone(type,spawnId,c)
        else return this.rowCreator(this, {}).clone(type,spawnId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_pool_members = new pool_membersTable(
    'pool_members',
    (table, obj)=>new pool_membersRow(table, obj))