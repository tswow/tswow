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
import { longtext, mediumint, varchar } from '../../data/primitives'
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
export class npc_text_localeRow extends SqlRow<npc_text_localeCreator,npc_text_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<mediumint, this>(this, 'ID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Locale() {return new SQLCellReadOnly<varchar, this>(this, 'Locale')}

    /**
     * No comment (yet!)
     */
    get Text0_0() {return new SQLCell<longtext, this>(this, 'Text0_0')}

    /**
     * No comment (yet!)
     */
    get Text0_1() {return new SQLCell<longtext, this>(this, 'Text0_1')}

    /**
     * No comment (yet!)
     */
    get Text1_0() {return new SQLCell<longtext, this>(this, 'Text1_0')}

    /**
     * No comment (yet!)
     */
    get Text1_1() {return new SQLCell<longtext, this>(this, 'Text1_1')}

    /**
     * No comment (yet!)
     */
    get Text2_0() {return new SQLCell<longtext, this>(this, 'Text2_0')}

    /**
     * No comment (yet!)
     */
    get Text2_1() {return new SQLCell<longtext, this>(this, 'Text2_1')}

    /**
     * No comment (yet!)
     */
    get Text3_0() {return new SQLCell<longtext, this>(this, 'Text3_0')}

    /**
     * No comment (yet!)
     */
    get Text3_1() {return new SQLCell<longtext, this>(this, 'Text3_1')}

    /**
     * No comment (yet!)
     */
    get Text4_0() {return new SQLCell<longtext, this>(this, 'Text4_0')}

    /**
     * No comment (yet!)
     */
    get Text4_1() {return new SQLCell<longtext, this>(this, 'Text4_1')}

    /**
     * No comment (yet!)
     */
    get Text5_0() {return new SQLCell<longtext, this>(this, 'Text5_0')}

    /**
     * No comment (yet!)
     */
    get Text5_1() {return new SQLCell<longtext, this>(this, 'Text5_1')}

    /**
     * No comment (yet!)
     */
    get Text6_0() {return new SQLCell<longtext, this>(this, 'Text6_0')}

    /**
     * No comment (yet!)
     */
    get Text6_1() {return new SQLCell<longtext, this>(this, 'Text6_1')}

    /**
     * No comment (yet!)
     */
    get Text7_0() {return new SQLCell<longtext, this>(this, 'Text7_0')}

    /**
     * No comment (yet!)
     */
    get Text7_1() {return new SQLCell<longtext, this>(this, 'Text7_1')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint,Locale : varchar, c? : npc_text_localeCreator) : this {
        return this.cloneInternal([ID,Locale],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type npc_text_localeCreator = {
    ID? : mediumint,
    Locale? : varchar,
    Text0_0? : longtext,
    Text0_1? : longtext,
    Text1_0? : longtext,
    Text1_1? : longtext,
    Text2_0? : longtext,
    Text2_1? : longtext,
    Text3_0? : longtext,
    Text3_1? : longtext,
    Text4_0? : longtext,
    Text4_1? : longtext,
    Text5_0? : longtext,
    Text5_1? : longtext,
    Text6_0? : longtext,
    Text6_1? : longtext,
    Text7_0? : longtext,
    Text7_1? : longtext,
}

/**
 * Used for object queries (Don't comment these)
 */
export type npc_text_localeQuery = {
    ID? : Relation<mediumint>,
    Locale? : Relation<varchar>,
    Text0_0? : Relation<longtext>,
    Text0_1? : Relation<longtext>,
    Text1_0? : Relation<longtext>,
    Text1_1? : Relation<longtext>,
    Text2_0? : Relation<longtext>,
    Text2_1? : Relation<longtext>,
    Text3_0? : Relation<longtext>,
    Text3_1? : Relation<longtext>,
    Text4_0? : Relation<longtext>,
    Text4_1? : Relation<longtext>,
    Text5_0? : Relation<longtext>,
    Text5_1? : Relation<longtext>,
    Text6_0? : Relation<longtext>,
    Text6_1? : Relation<longtext>,
    Text7_0? : Relation<longtext>,
    Text7_1? : Relation<longtext>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class npc_text_localeTable extends SqlTable<
    npc_text_localeCreator,
    npc_text_localeQuery,
    npc_text_localeRow> {
    add(ID : mediumint,Locale : varchar, c? : npc_text_localeCreator) : npc_text_localeRow {
        const first = this.first();
        if(first) return first.clone(ID,Locale,c)
        else return this.rowCreator(this, {}).clone(ID,Locale,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_npc_text_locale = new npc_text_localeTable(
    'npc_text_locale',
    (table, obj)=>new npc_text_localeRow(table, obj))