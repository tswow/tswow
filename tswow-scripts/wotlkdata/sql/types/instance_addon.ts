/*
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { mediumint, tinyint } from '../../primitives'
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
export class instance_addonRow extends SqlRow<instance_addonCreator,instance_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get map() {return new SQLCellReadOnly<mediumint, this>(this, 'map')}

    /**
     * No comment (yet!)
     */
    get boss_count() {return new SQLCell<mediumint, this>(this, 'boss_count')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(map: mediumint, c? : instance_addonCreator) : this {
        return this.cloneInternal([map],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type instance_addonCreator = {
    map?: mediumint,
    boss_count?: mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type instance_addonQuery = {
    map?: Relation<mediumint>,
    boss_count?: Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class instance_addonTable extends SqlTable<
    instance_addonCreator,
    instance_addonQuery,
    instance_addonRow> {
    add(map: tinyint, c? : instance_addonCreator) : instance_addonRow {
        const first = this.first();
        if(first) return first.clone(map,c)
        else return this.rowCreator(this, {}).clone(map,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_instance_addon = new instance_addonTable(
    'instance_addon',
    (table, obj)=>new instance_addonRow(table, obj))