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
import { float, mediumint, varchar } from '../../primitives'
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
export class spell_bonus_dataRow extends SqlRow<spell_bonus_dataCreator,spell_bonus_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get direct_bonus() {return new SQLCell<float, this>(this, 'direct_bonus')}

    /**
     * No comment (yet!)
     */
    get dot_bonus() {return new SQLCell<float, this>(this, 'dot_bonus')}

    /**
     * No comment (yet!)
     */
    get ap_bonus() {return new SQLCell<float, this>(this, 'ap_bonus')}

    /**
     * No comment (yet!)
     */
    get ap_dot_bonus() {return new SQLCell<float, this>(this, 'ap_dot_bonus')}

    /**
     * No comment (yet!)
     */
    get comments() {return new SQLCell<varchar, this>(this, 'comments')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : spell_bonus_dataCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_bonus_dataCreator = {
    entry? : mediumint,
    direct_bonus? : float,
    dot_bonus? : float,
    ap_bonus? : float,
    ap_dot_bonus? : float,
    comments? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_bonus_dataQuery = {
    entry? : Relation<mediumint>,
    direct_bonus? : Relation<float>,
    dot_bonus? : Relation<float>,
    ap_bonus? : Relation<float>,
    ap_dot_bonus? : Relation<float>,
    comments? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_bonus_dataTable extends SqlTable<
    spell_bonus_dataCreator,
    spell_bonus_dataQuery,
    spell_bonus_dataRow> {
    add(entry : mediumint, c? : spell_bonus_dataCreator) : spell_bonus_dataRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_bonus_data = new spell_bonus_dataTable(
    'spell_bonus_data',
    (table, obj)=>new spell_bonus_dataRow(table, obj))