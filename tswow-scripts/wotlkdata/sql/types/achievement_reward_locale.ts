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
import { mediumint, text, varchar } from '../../primitives'
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
export class achievement_reward_localeRow extends SqlRow<achievement_reward_localeCreator,achievement_reward_localeQuery> {
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
    get Subject() {return new SQLCell<text, this>(this, 'Subject')}

    /**
     * No comment (yet!)
     */
    get Body() {return new SQLCell<text, this>(this, 'Body')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint,Locale : varchar, c? : achievement_reward_localeCreator) : this {
        return this.cloneInternal([ID,Locale],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type achievement_reward_localeCreator = {
    ID? : mediumint,
    Locale? : varchar,
    Subject? : text,
    Body? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type achievement_reward_localeQuery = {
    ID? : Relation<mediumint>,
    Locale? : Relation<varchar>,
    Subject? : Relation<text>,
    Body? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class achievement_reward_localeTable extends SqlTable<
    achievement_reward_localeCreator,
    achievement_reward_localeQuery,
    achievement_reward_localeRow> {
    add(ID : mediumint,Locale : varchar, c? : achievement_reward_localeCreator) : achievement_reward_localeRow {
        const first = this.first();
        if(first) return first.clone(ID,Locale,c)
        else return this.rowCreator(this, {}).clone(ID,Locale,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_achievement_reward_locale = new achievement_reward_localeTable(
    'achievement_reward_locale',
    (table, obj)=>new achievement_reward_localeRow(table, obj))