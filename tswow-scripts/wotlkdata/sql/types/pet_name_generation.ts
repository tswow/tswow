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
import { mediumint, tinyint, tinytext } from '../../primitives'
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
export class pet_name_generationRow extends SqlRow<pet_name_generationCreator,pet_name_generationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get id() {return new SQLCellReadOnly<mediumint, this>(this, 'id')}

    /**
     * No comment (yet!)
     */
    get word() {return new SQLCell<tinytext, this>(this, 'word')}

    /**
     * No comment (yet!)
     */
    get entry() {return new SQLCell<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get half() {return new SQLCell<tinyint, this>(this, 'half')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : mediumint, c? : pet_name_generationCreator) : this {
        return this.cloneInternal([id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type pet_name_generationCreator = {
    id? : mediumint,
    word? : tinytext,
    entry? : mediumint,
    half? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type pet_name_generationQuery = {
    id? : Relation<mediumint>,
    word? : Relation<tinytext>,
    entry? : Relation<mediumint>,
    half? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class pet_name_generationTable extends SqlTable<
    pet_name_generationCreator,
    pet_name_generationQuery,
    pet_name_generationRow> {
    add(id : mediumint, c? : pet_name_generationCreator) : pet_name_generationRow {
        const first = this.first();
        if(first) return first.clone(id,c)
        else return this.rowCreator(this, {}).clone(id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_pet_name_generation = new pet_name_generationTable(
    'pet_name_generation',
    (table, obj)=>new pet_name_generationRow(table, obj))