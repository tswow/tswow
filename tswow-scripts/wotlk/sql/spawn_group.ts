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
import { int, tinyint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class spawn_groupRow extends SqlRow<spawn_groupCreator,spawn_groupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get groupId() {return new SQLCellReadOnly<int, this>(this, 'groupId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spawnType() {return new SQLCellReadOnly<tinyint, this>(this, 'spawnType')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spawnId() {return new SQLCellReadOnly<int, this>(this, 'spawnId')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(groupId : int,spawnType : tinyint,spawnId : int, c? : spawn_groupCreator) : this {
        return this.cloneInternal([groupId,spawnType,spawnId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spawn_groupCreator = {
    groupId? : int,
    spawnType? : tinyint,
    spawnId? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spawn_groupQuery = {
    groupId? : Relation<int>,
    spawnType? : Relation<tinyint>,
    spawnId? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spawn_groupTable extends SqlTable<
    spawn_groupCreator,
    spawn_groupQuery,
    spawn_groupRow> {
    add(groupId : int,spawnType : tinyint,spawnId : int, c? : spawn_groupCreator) : spawn_groupRow {
        const first = this.first();
        if(first) return first.clone(groupId,spawnType,spawnId,c)
        else return this.rowCreator(this, {}).clone(groupId,spawnType,spawnId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spawn_group = new spawn_groupTable(
    'spawn_group',
    (table, obj)=>new spawn_groupRow(table, obj))