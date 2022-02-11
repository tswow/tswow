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
import { smallint, text, varchar } from '../../primitives'
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
export class gossip_menu_option_localeRow extends SqlRow<gossip_menu_option_localeCreator,gossip_menu_option_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get MenuID() {return new SQLCellReadOnly<smallint, this>(this, 'MenuID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get OptionID() {return new SQLCellReadOnly<smallint, this>(this, 'OptionID')}

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
    get OptionText() {return new SQLCell<text, this>(this, 'OptionText')}

    /**
     * No comment (yet!)
     */
    get BoxText() {return new SQLCell<text, this>(this, 'BoxText')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(MenuID : smallint,OptionID : smallint,Locale : varchar, c? : gossip_menu_option_localeCreator) : this {
        return this.cloneInternal([MenuID,OptionID,Locale],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gossip_menu_option_localeCreator = {
    MenuID? : smallint,
    OptionID? : smallint,
    Locale? : varchar,
    OptionText? : text,
    BoxText? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gossip_menu_option_localeQuery = {
    MenuID? : Relation<smallint>,
    OptionID? : Relation<smallint>,
    Locale? : Relation<varchar>,
    OptionText? : Relation<text>,
    BoxText? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gossip_menu_option_localeTable extends SqlTable<
    gossip_menu_option_localeCreator,
    gossip_menu_option_localeQuery,
    gossip_menu_option_localeRow> {
    add(MenuID : smallint,OptionID : smallint,Locale : varchar, c? : gossip_menu_option_localeCreator) : gossip_menu_option_localeRow {
        const first = this.first();
        if(first) return first.clone(MenuID,OptionID,Locale,c)
        else return this.rowCreator(this, {}).clone(MenuID,OptionID,Locale,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gossip_menu_option_locale = new gossip_menu_option_localeTable(
    'gossip_menu_option_locale',
    (table, obj)=>new gossip_menu_option_localeRow(table, obj))