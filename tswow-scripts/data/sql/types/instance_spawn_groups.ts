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
import { int, smallint, tinyint } from '../../primitives'
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
export class instance_spawn_groupsRow extends SqlRow<instance_spawn_groupsCreator,instance_spawn_groupsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get instanceMapId() {return new SQLCellReadOnly<smallint, this>(this, 'instanceMapId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get bossStateId() {return new SQLCellReadOnly<tinyint, this>(this, 'bossStateId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get bossStates() {return new SQLCellReadOnly<tinyint, this>(this, 'bossStates')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spawnGroupId() {return new SQLCellReadOnly<int, this>(this, 'spawnGroupId')}

    /**
     * No comment (yet!)
     */
    get flags() {return new SQLCell<tinyint, this>(this, 'flags')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(instanceMapId : smallint,bossStateId : tinyint,spawnGroupId : tinyint,bossStates : int, c? : instance_spawn_groupsCreator) : this {
        return this.cloneInternal([instanceMapId,bossStateId,spawnGroupId,bossStates],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type instance_spawn_groupsCreator = {
    instanceMapId? : smallint,
    bossStateId? : tinyint,
    bossStates? : tinyint,
    spawnGroupId? : int,
    flags? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type instance_spawn_groupsQuery = {
    instanceMapId? : Relation<smallint>,
    bossStateId? : Relation<tinyint>,
    bossStates? : Relation<tinyint>,
    spawnGroupId? : Relation<int>,
    flags? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class instance_spawn_groupsTable extends SqlTable<
    instance_spawn_groupsCreator,
    instance_spawn_groupsQuery,
    instance_spawn_groupsRow> {
    add(instanceMapId : smallint,bossStateId : tinyint,spawnGroupId : tinyint,bossStates : int, c? : instance_spawn_groupsCreator) : instance_spawn_groupsRow {
        const first = this.first();
        if(first) return first.clone(instanceMapId,bossStateId,spawnGroupId,bossStates,c)
        else return this.rowCreator(this, {}).clone(instanceMapId,bossStateId,spawnGroupId,bossStates,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_instance_spawn_groups = new instance_spawn_groupsTable(
    'instance_spawn_groups',
    (table, obj)=>new instance_spawn_groupsRow(table, obj))