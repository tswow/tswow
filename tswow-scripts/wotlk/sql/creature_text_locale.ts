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
import { mediumint, text, tinyint, varchar } from '../../data/primitives'
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
export class creature_text_localeRow extends SqlRow<creature_text_localeCreator,creature_text_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get CreatureID() {return new SQLCellReadOnly<mediumint, this>(this, 'CreatureID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get GroupID() {return new SQLCellReadOnly<tinyint, this>(this, 'GroupID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<tinyint, this>(this, 'ID')}

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
    get Text() {return new SQLCell<text, this>(this, 'Text')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID : mediumint,GroupID : tinyint,ID : tinyint,Locale : varchar, c? : creature_text_localeCreator) : this {
        return this.cloneInternal([CreatureID,GroupID,ID,Locale],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_text_localeCreator = {
    CreatureID? : mediumint,
    GroupID? : tinyint,
    ID? : tinyint,
    Locale? : varchar,
    Text? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_text_localeQuery = {
    CreatureID? : Relation<mediumint>,
    GroupID? : Relation<tinyint>,
    ID? : Relation<tinyint>,
    Locale? : Relation<varchar>,
    Text? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_text_localeTable extends SqlTable<
    creature_text_localeCreator,
    creature_text_localeQuery,
    creature_text_localeRow> {
    add(CreatureID : mediumint,GroupID : tinyint,ID : tinyint,Locale : varchar, c? : creature_text_localeCreator) : creature_text_localeRow {
        const first = this.first();
        if(first) return first.clone(CreatureID,GroupID,ID,Locale,c)
        else return this.rowCreator(this, {}).clone(CreatureID,GroupID,ID,Locale,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_text_locale = new creature_text_localeTable(
    'creature_text_locale',
    (table, obj)=>new creature_text_localeRow(table, obj))