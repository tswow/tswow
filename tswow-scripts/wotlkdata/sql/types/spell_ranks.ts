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
export class spell_ranksRow extends SqlRow<spell_ranksCreator,spell_ranksQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get first_spell_id() {return new SQLCellReadOnly<int, this>(this, 'first_spell_id')}

    /**
     * No comment (yet!)
     */
    get spell_id() {return new SQLCell<int, this>(this, 'spell_id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get rank() {return new SQLCellReadOnly<tinyint, this>(this, 'rank')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(first_spell_id : int,rank : tinyint, c? : spell_ranksCreator) : this {
        return this.cloneInternal([first_spell_id,rank],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_ranksCreator = {
    first_spell_id? : int,
    spell_id? : int,
    rank? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_ranksQuery = {
    first_spell_id? : Relation<int>,
    spell_id? : Relation<int>,
    rank? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_ranksTable extends SqlTable<
    spell_ranksCreator,
    spell_ranksQuery,
    spell_ranksRow> {
    add(first_spell_id : int,rank : tinyint, c? : spell_ranksCreator) : spell_ranksRow {
        const first = this.first();
        if(first) return first.clone(first_spell_id,rank,c)
        else return this.rowCreator(this, {}).clone(first_spell_id,rank,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_ranks = new spell_ranksTable(
    'spell_ranks',
    (table, obj)=>new spell_ranksRow(table, obj))