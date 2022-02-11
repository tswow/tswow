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
import { int, smallint } from '../../data/primitives'
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
export class creature_questitemRow extends SqlRow<creature_questitemCreator,creature_questitemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get CreatureEntry() {return new SQLCellReadOnly<int, this>(this, 'CreatureEntry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Idx() {return new SQLCellReadOnly<int, this>(this, 'Idx')}

    /**
     * No comment (yet!)
     */
    get ItemId() {return new SQLCell<int, this>(this, 'ItemId')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureEntry : int,Idx : int, c? : creature_questitemCreator) : this {
        return this.cloneInternal([CreatureEntry,Idx],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_questitemCreator = {
    CreatureEntry? : int,
    Idx? : int,
    ItemId? : int,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_questitemQuery = {
    CreatureEntry? : Relation<int>,
    Idx? : Relation<int>,
    ItemId? : Relation<int>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_questitemTable extends SqlTable<
    creature_questitemCreator,
    creature_questitemQuery,
    creature_questitemRow> {
    add(CreatureEntry : int,Idx : int, c? : creature_questitemCreator) : creature_questitemRow {
        const first = this.first();
        if(first) return first.clone(CreatureEntry,Idx,c)
        else return this.rowCreator(this, {}).clone(CreatureEntry,Idx,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_questitem = new creature_questitemTable(
    'creature_questitem',
    (table, obj)=>new creature_questitemRow(table, obj))