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
import { mediumint, text } from '../../data/primitives'
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
export class trinity_stringRow extends SqlRow<trinity_stringCreator,trinity_stringQuery> {
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
    get content_default() {return new SQLCell<text, this>(this, 'content_default')}

    /**
     * No comment (yet!)
     */
    get content_loc1() {return new SQLCell<text, this>(this, 'content_loc1')}

    /**
     * No comment (yet!)
     */
    get content_loc2() {return new SQLCell<text, this>(this, 'content_loc2')}

    /**
     * No comment (yet!)
     */
    get content_loc3() {return new SQLCell<text, this>(this, 'content_loc3')}

    /**
     * No comment (yet!)
     */
    get content_loc4() {return new SQLCell<text, this>(this, 'content_loc4')}

    /**
     * No comment (yet!)
     */
    get content_loc5() {return new SQLCell<text, this>(this, 'content_loc5')}

    /**
     * No comment (yet!)
     */
    get content_loc6() {return new SQLCell<text, this>(this, 'content_loc6')}

    /**
     * No comment (yet!)
     */
    get content_loc7() {return new SQLCell<text, this>(this, 'content_loc7')}

    /**
     * No comment (yet!)
     */
    get content_loc8() {return new SQLCell<text, this>(this, 'content_loc8')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : trinity_stringCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type trinity_stringCreator = {
    entry? : mediumint,
    content_default? : text,
    content_loc1? : text,
    content_loc2? : text,
    content_loc3? : text,
    content_loc4? : text,
    content_loc5? : text,
    content_loc6? : text,
    content_loc7? : text,
    content_loc8? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type trinity_stringQuery = {
    entry? : Relation<mediumint>,
    content_default? : Relation<text>,
    content_loc1? : Relation<text>,
    content_loc2? : Relation<text>,
    content_loc3? : Relation<text>,
    content_loc4? : Relation<text>,
    content_loc5? : Relation<text>,
    content_loc6? : Relation<text>,
    content_loc7? : Relation<text>,
    content_loc8? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class trinity_stringTable extends SqlTable<
    trinity_stringCreator,
    trinity_stringQuery,
    trinity_stringRow> {
    add(entry : mediumint, c? : trinity_stringCreator) : trinity_stringRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_trinity_string = new trinity_stringTable(
    'trinity_string',
    (table, obj)=>new trinity_stringRow(table, obj))