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
import { mediumint, smallint } from '../../primitives'
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
export class gossip_menuRow extends SqlRow<gossip_menuCreator,gossip_menuQuery> {
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
    get TextID() {return new SQLCellReadOnly<mediumint, this>(this, 'TextID')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(MenuID : smallint,TextID : mediumint, c? : gossip_menuCreator) : this {
        return this.cloneInternal([MenuID,TextID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gossip_menuCreator = {
    MenuID? : smallint,
    TextID? : mediumint,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gossip_menuQuery = {
    MenuID? : Relation<smallint>,
    TextID? : Relation<mediumint>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gossip_menuTable extends SqlTable<
    gossip_menuCreator,
    gossip_menuQuery,
    gossip_menuRow> {
    add(MenuID : smallint,TextID : mediumint, c? : gossip_menuCreator) : gossip_menuRow {
        const first = this.first();
        if(first) return first.clone(MenuID,TextID,c)
        else return this.rowCreator(this, {}).clone(MenuID,TextID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gossip_menu = new gossip_menuTable(
    'gossip_menu',
    (table, obj)=>new gossip_menuRow(table, obj))