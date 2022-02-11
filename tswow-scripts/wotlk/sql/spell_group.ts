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
import { int } from '../../data/primitives'
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
export class spell_groupRow extends SqlRow<spell_groupCreator,spell_groupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get id() {return new SQLCellReadOnly<int, this>(this, 'id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spell_id() {return new SQLCellReadOnly<int, this>(this, 'spell_id')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : int,spell_id : int, c? : spell_groupCreator) : this {
        return this.cloneInternal([id,spell_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_groupCreator = {
    id? : int,
    spell_id? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_groupQuery = {
    id? : Relation<int>,
    spell_id? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_groupTable extends SqlTable<
    spell_groupCreator,
    spell_groupQuery,
    spell_groupRow> {
    add(id : int,spell_id : int, c? : spell_groupCreator) : spell_groupRow {
        const first = this.first();
        if(first) return first.clone(id,spell_id,c)
        else return this.rowCreator(this, {}).clone(id,spell_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_group = new spell_groupTable(
    'spell_group',
    (table, obj)=>new spell_groupRow(table, obj))