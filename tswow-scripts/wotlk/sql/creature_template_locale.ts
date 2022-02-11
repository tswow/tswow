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
import { mediumint, smallint, text, varchar } from '../../data/primitives'
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
export class creature_template_localeRow extends SqlRow<creature_template_localeCreator,creature_template_localeQuery> {
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
    get locale() {return new SQLCellReadOnly<varchar, this>(this, 'locale')}

    /**
     * No comment (yet!)
     */
    get Name() {return new SQLCell<text, this>(this, 'Name')}

    /**
     * No comment (yet!)
     */
    get Title() {return new SQLCell<text, this>(this, 'Title')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint,locale : varchar, c? : creature_template_localeCreator) : this {
        return this.cloneInternal([entry,locale],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_localeCreator = {
    entry? : mediumint,
    locale? : varchar,
    Name? : text,
    Title? : text,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_localeQuery = {
    entry? : Relation<mediumint>,
    locale? : Relation<varchar>,
    Name? : Relation<text>,
    Title? : Relation<text>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_template_localeTable extends SqlTable<
    creature_template_localeCreator,
    creature_template_localeQuery,
    creature_template_localeRow> {
    add(entry : mediumint,locale : varchar, c? : creature_template_localeCreator) : creature_template_localeRow {
        const first = this.first();
        if(first) return first.clone(entry,locale,c)
        else return this.rowCreator(this, {}).clone(entry,locale,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_template_locale = new creature_template_localeTable(
    'creature_template_locale',
    (table, obj)=>new creature_template_localeRow(table, obj))