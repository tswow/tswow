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
import { mediumint } from '../../data/primitives'
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
export class instance_boss_creatureRow extends SqlRow<instance_boss_creatureCreator,instance_boss_creatureQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get guid() {return new SQLCellReadOnly<mediumint, this>(this, 'guid')}

    /**
     * No comment (yet!)
     */
    get map() {return new SQLCell<mediumint, this>(this, 'map')}

    /**
     * No comment (yet!)
     */
    get boss() {return new SQLCell<mediumint, this>(this, 'boss')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: mediumint, c? : instance_boss_creatureCreator) : this {
        return this.cloneInternal([guid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type instance_boss_creatureCreator = {
    guid?: mediumint,
    map?: mediumint,
    boss?: mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type instance_boss_creatureQuery = {
    guid?: Relation<mediumint>,
    map?: Relation<mediumint>,
    boss?: Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class instance_boss_creatureTable extends SqlTable<
    instance_boss_creatureCreator,
    instance_boss_creatureQuery,
    instance_boss_creatureRow> {
    add(guid: mediumint, c? : instance_boss_creatureCreator) : instance_boss_creatureRow {
        const first = this.first();
        if(first) return first.clone(guid,c)
        else return this.rowCreator(this, {}).clone(guid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_instance_boss_creature = new instance_boss_creatureTable(
    'instance_boss_creature',
    (table, obj)=>new instance_boss_creatureRow(table, obj))