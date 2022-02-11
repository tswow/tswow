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
export class battleground_door_objectRow extends SqlRow<battleground_door_objectCreator,battleground_door_objectQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    @PrimaryKey()
    get map() { return new SQLCellReadOnly<mediumint, this>(this, 'map') }
    get type() { return new SQLCell<mediumint, this>(this, 'type') }

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, map: mediumint, c? : battleground_door_objectCreator) : this {
        return this.cloneInternal([entry,map],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type battleground_door_objectCreator = {
    entry?: mediumint,
    map?: mediumint,
    type?: mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type battleground_door_objectQuery = {
    entry?: Relation<mediumint>,
    map?: Relation<mediumint>,
    type?: Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class battleground_door_objectTable extends SqlTable<
    battleground_door_objectCreator,
    battleground_door_objectQuery,
    battleground_door_objectRow> {
    add(entry: mediumint, map: mediumint, c? : battleground_door_objectCreator) : battleground_door_objectRow {
        const first = this.first();
        if(first) return first.clone(entry,map,c)
        else return this.rowCreator(this, {}).clone(entry,map,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_battleground_door_object = new battleground_door_objectTable(
    'battleground_door_object',
    (table, obj)=>new battleground_door_objectRow(table, obj))