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
import { mediumint, smallint, text, tinyint, varchar } from '../../data/primitives'
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
export class quest_greeting_localeRow extends SqlRow<quest_greeting_localeCreator,quest_greeting_localeQuery> {
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
    get Type() {return new SQLCellReadOnly<tinyint, this>(this, 'Type')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get locale() {return new SQLCellReadOnly<varchar, this>(this, 'locale')}

    /**
     * No comment (yet!)
     */
    get Greeting() {return new SQLCell<text, this>(this, 'Greeting')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint,Type : tinyint,locale : varchar, c? : quest_greeting_localeCreator) : this {
        return this.cloneInternal([ID,Type,locale],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type quest_greeting_localeCreator = {
    ID? : mediumint,
    Type? : tinyint,
    locale? : varchar,
    Greeting? : text,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type quest_greeting_localeQuery = {
    ID? : Relation<mediumint>,
    Type? : Relation<tinyint>,
    locale? : Relation<varchar>,
    Greeting? : Relation<text>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class quest_greeting_localeTable extends SqlTable<
    quest_greeting_localeCreator,
    quest_greeting_localeQuery,
    quest_greeting_localeRow> {
    add(ID : mediumint,Type : tinyint,locale : varchar, c? : quest_greeting_localeCreator) : quest_greeting_localeRow {
        const first = this.first();
        if(first) return first.clone(ID,Type,locale,c)
        else return this.rowCreator(this, {}).clone(ID,Type,locale,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_quest_greeting_locale = new quest_greeting_localeTable(
    'quest_greeting_locale',
    (table, obj)=>new quest_greeting_localeRow(table, obj))