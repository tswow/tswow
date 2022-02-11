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
import { int, varchar } from '../../data/primitives'
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
export class spawn_group_templateRow extends SqlRow<spawn_group_templateCreator,spawn_group_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get groupId() {return new SQLCellReadOnly<int, this>(this, 'groupId')}

    /**
     * No comment (yet!)
     */
    get groupName() {return new SQLCell<varchar, this>(this, 'groupName')}

    /**
     * No comment (yet!)
     */
    get groupFlags() {return new SQLCell<int, this>(this, 'groupFlags')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(groupId : int, c? : spawn_group_templateCreator) : this {
        return this.cloneInternal([groupId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spawn_group_templateCreator = {
    groupId? : int,
    groupName? : varchar,
    groupFlags? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spawn_group_templateQuery = {
    groupId? : Relation<int>,
    groupName? : Relation<varchar>,
    groupFlags? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spawn_group_templateTable extends SqlTable<
    spawn_group_templateCreator,
    spawn_group_templateQuery,
    spawn_group_templateRow> {
    add(groupId : int, c? : spawn_group_templateCreator) : spawn_group_templateRow {
        const first = this.first();
        if(first) return first.clone(groupId,c)
        else return this.rowCreator(this, {}).clone(groupId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spawn_group_template = new spawn_group_templateTable(
    'spawn_group_template',
    (table, obj)=>new spawn_group_templateRow(table, obj))