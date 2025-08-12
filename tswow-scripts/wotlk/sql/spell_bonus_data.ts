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
import { float, mediumint, varchar } from '../../data/primitives'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class spell_bonus_dataRow extends SqlRow<spell_bonus_dataCreator,spell_bonus_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}
    @PrimaryKey()
    get effect() {return new SQLCell<int, this>(this, 'effect')}

    /**
     * No comment (yet!)
     */
    get sp() {return new SQLCell<float, this>(this, 'sp')}

    /**
     * No comment (yet!)
     */
    get ap() {return new SQLCell<float, this>(this, 'ap')}


    /**
     * No comment (yet!)
     */
    get bv() {return new SQLCell<float, this>(this, 'bv')} 

    /**
     * No comment (yet!)
     */
    get comments() {return new SQLCell<varchar, this>(this, 'comments')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, effect: int, c? : spell_bonus_dataCreator) : this {
        return this.cloneInternal([entry, effect],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_bonus_dataCreator = {
    entry? : mediumint,
    effect?: int,
    sp? : float,
    ap? : float,
    bv? : float,
    comments? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_bonus_dataQuery = {
    entry? : mediumint,
    effect?: int,
    sp? : float,
    ap? : float,
    bv? : float,
    comments? : varchar,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_bonus_dataTable extends SqlTable<
    spell_bonus_dataCreator,
    spell_bonus_dataQuery,
    spell_bonus_dataRow> {
    add(entry : mediumint, effect: int, c? : spell_bonus_dataCreator) : spell_bonus_dataRow {
        const first = this.first();
        if(first) return first.clone(entry, effect, c)
        else return this.rowCreator(this, {}).clone(entry,effect,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_bonus_data = new spell_bonus_dataTable(
    'spell_bonus_data',
    (table, obj)=>new spell_bonus_dataRow(table, obj))