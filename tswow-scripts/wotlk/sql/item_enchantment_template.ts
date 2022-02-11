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
import { float, mediumint } from '../../data/primitives'
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
export class item_enchantment_templateRow extends SqlRow<item_enchantment_templateCreator,item_enchantment_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ench() {return new SQLCellReadOnly<mediumint, this>(this, 'ench')}

    /**
     * No comment (yet!)
     */
    get chance() {return new SQLCell<float, this>(this, 'chance')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint,ench : mediumint, c? : item_enchantment_templateCreator) : this {
        return this.cloneInternal([entry,ench],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type item_enchantment_templateCreator = {
    entry? : mediumint,
    ench? : mediumint,
    chance? : float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type item_enchantment_templateQuery = {
    entry? : Relation<mediumint>,
    ench? : Relation<mediumint>,
    chance? : Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class item_enchantment_templateTable extends SqlTable<
    item_enchantment_templateCreator,
    item_enchantment_templateQuery,
    item_enchantment_templateRow> {
    add(entry : mediumint,ench : mediumint, c? : item_enchantment_templateCreator) : item_enchantment_templateRow {
        const first = this.first();
        if(first) return first.clone(entry,ench,c)
        else return this.rowCreator(this, {}).clone(entry,ench,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_item_enchantment_template = new item_enchantment_templateTable(
    'item_enchantment_template',
    (table, obj)=>new item_enchantment_templateRow(table, obj))