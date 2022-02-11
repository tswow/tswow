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
import { float, int } from '../../data/primitives'
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
export class spell_enchant_proc_dataRow extends SqlRow<spell_enchant_proc_dataCreator,spell_enchant_proc_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get EnchantID() {return new SQLCellReadOnly<int, this>(this, 'EnchantID')}

    /**
     * No comment (yet!)
     */
    get Chance() {return new SQLCell<float, this>(this, 'Chance')}

    /**
     * No comment (yet!)
     */
    get ProcsPerMinute() {return new SQLCell<float, this>(this, 'ProcsPerMinute')}

    /**
     * No comment (yet!)
     */
    get HitMask() {return new SQLCell<int, this>(this, 'HitMask')}

    /**
     * No comment (yet!)
     */
    get AttributesMask() {return new SQLCell<int, this>(this, 'AttributesMask')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(EnchantID : int, c? : spell_enchant_proc_dataCreator) : this {
        return this.cloneInternal([EnchantID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_enchant_proc_dataCreator = {
    EnchantID? : int,
    Chance? : float,
    ProcsPerMinute? : float,
    HitMask? : int,
    AttributesMask? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_enchant_proc_dataQuery = {
    EnchantID? : Relation<int>,
    Chance? : Relation<float>,
    ProcsPerMinute? : Relation<float>,
    HitMask? : Relation<int>,
    AttributesMask? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_enchant_proc_dataTable extends SqlTable<
    spell_enchant_proc_dataCreator,
    spell_enchant_proc_dataQuery,
    spell_enchant_proc_dataRow> {
    add(EnchantID : int, c? : spell_enchant_proc_dataCreator) : spell_enchant_proc_dataRow {
        const first = this.first();
        if(first) return first.clone(EnchantID,c)
        else return this.rowCreator(this, {}).clone(EnchantID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_enchant_proc_data = new spell_enchant_proc_dataTable(
    'spell_enchant_proc_data',
    (table, obj)=>new spell_enchant_proc_dataRow(table, obj))