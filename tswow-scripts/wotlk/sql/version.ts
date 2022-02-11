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
export class versionRow extends SqlRow<versionCreator,versionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get core_version() {return new SQLCellReadOnly<varchar, this>(this, 'core_version')}

    /**
     * No comment (yet!)
     */
    get core_revision() {return new SQLCell<varchar, this>(this, 'core_revision')}

    /**
     * No comment (yet!)
     */
    get db_version() {return new SQLCell<varchar, this>(this, 'db_version')}

    /**
     * No comment (yet!)
     */
    get cache_id() {return new SQLCell<int, this>(this, 'cache_id')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(core_version : varchar, c? : versionCreator) : this {
        return this.cloneInternal([core_version],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type versionCreator = {
    core_version? : varchar,
    core_revision? : varchar,
    db_version? : varchar,
    cache_id? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type versionQuery = {
    core_version? : Relation<varchar>,
    core_revision? : Relation<varchar>,
    db_version? : Relation<varchar>,
    cache_id? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class versionTable extends SqlTable<
    versionCreator,
    versionQuery,
    versionRow> {
    add(core_version : varchar, c? : versionCreator) : versionRow {
        const first = this.first();
        if(first) return first.clone(core_version,c)
        else return this.rowCreator(this, {}).clone(core_version,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_version = new versionTable(
    'version',
    (table, obj)=>new versionRow(table, obj))