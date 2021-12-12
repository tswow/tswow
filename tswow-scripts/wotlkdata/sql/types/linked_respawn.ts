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
import { int, tinyint } from '../../primitives'
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
export class linked_respawnRow extends SqlRow<linked_respawnCreator,linked_respawnQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get guid() {return new SQLCellReadOnly<int, this>(this, 'guid')}

    /**
     * No comment (yet!)
     */
    get linkedGuid() {return new SQLCell<int, this>(this, 'linkedGuid')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get linkType() {return new SQLCellReadOnly<tinyint, this>(this, 'linkType')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid : int,linkType : tinyint, c? : linked_respawnCreator) : this {
        return this.cloneInternal([guid,linkType],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type linked_respawnCreator = {
    guid? : int,
    linkedGuid? : int,
    linkType? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type linked_respawnQuery = {
    guid? : Relation<int>,
    linkedGuid? : Relation<int>,
    linkType? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class linked_respawnTable extends SqlTable<
    linked_respawnCreator,
    linked_respawnQuery,
    linked_respawnRow> {
    add(guid : int,linkType : tinyint, c? : linked_respawnCreator) : linked_respawnRow {
        const first = this.first();
        if(first) return first.clone(guid,linkType,c)
        else return this.rowCreator(this, {}).clone(guid,linkType,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_linked_respawn = new linked_respawnTable(
    'linked_respawn',
    (table, obj)=>new linked_respawnRow(table, obj))