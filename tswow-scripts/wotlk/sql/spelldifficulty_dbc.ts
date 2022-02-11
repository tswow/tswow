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
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class spelldifficulty_dbcRow extends SqlRow<spelldifficulty_dbcCreator,spelldifficulty_dbcQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get id() {return new SQLCellReadOnly<int, this>(this, 'id')}

    /**
     * No comment (yet!)
     */
    get spellid0() {return new SQLCell<int, this>(this, 'spellid0')}

    /**
     * No comment (yet!)
     */
    get spellid1() {return new SQLCell<int, this>(this, 'spellid1')}

    /**
     * No comment (yet!)
     */
    get spellid2() {return new SQLCell<int, this>(this, 'spellid2')}

    /**
     * No comment (yet!)
     */
    get spellid3() {return new SQLCell<int, this>(this, 'spellid3')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : int, c? : spelldifficulty_dbcCreator) : this {
        return this.cloneInternal([id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spelldifficulty_dbcCreator = {
    id? : int,
    spellid0? : int,
    spellid1? : int,
    spellid2? : int,
    spellid3? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spelldifficulty_dbcQuery = {
    id? : Relation<int>,
    spellid0? : Relation<int>,
    spellid1? : Relation<int>,
    spellid2? : Relation<int>,
    spellid3? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spelldifficulty_dbcTable extends SqlTable<
    spelldifficulty_dbcCreator,
    spelldifficulty_dbcQuery,
    spelldifficulty_dbcRow> {
    add(id : int, c? : spelldifficulty_dbcCreator) : spelldifficulty_dbcRow {
        const first = this.first();
        if(first) return first.clone(id,c)
        else return this.rowCreator(this, {}).clone(id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spelldifficulty_dbc = new spelldifficulty_dbcTable(
    'spelldifficulty_dbc',
    (table, obj)=>new spelldifficulty_dbcRow(table, obj))