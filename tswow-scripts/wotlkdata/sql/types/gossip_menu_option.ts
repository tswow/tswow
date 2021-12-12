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
import { int, mediumint, smallint, text, tinyint } from '../../primitives'
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
export class gossip_menu_optionRow extends SqlRow<gossip_menu_optionCreator,gossip_menu_optionQuery> {
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
     * No comment (yet!)
     */
    get OptionIcon() {return new SQLCell<mediumint, this>(this, 'OptionIcon')}

    /**
     * No comment (yet!)
     */
    get OptionText() {return new SQLCell<text, this>(this, 'OptionText')}

    /**
     * No comment (yet!)
     */
    get OptionBroadcastTextID() {return new SQLCell<mediumint, this>(this, 'OptionBroadcastTextID')}

    /**
     * No comment (yet!)
     */
    get OptionType() {return new SQLCell<tinyint, this>(this, 'OptionType')}

    /**
     * No comment (yet!)
     */
    get OptionNpcFlag() {return new SQLCell<int, this>(this, 'OptionNpcFlag')}

    /**
     * No comment (yet!)
     */
    get ActionMenuID() {return new SQLCell<int, this>(this, 'ActionMenuID')}

    /**
     * No comment (yet!)
     */
    get ActionPoiID() {return new SQLCell<mediumint, this>(this, 'ActionPoiID')}

    /**
     * No comment (yet!)
     */
    get BoxCoded() {return new SQLCell<tinyint, this>(this, 'BoxCoded')}

    /**
     * No comment (yet!)
     */
    get BoxMoney() {return new SQLCell<int, this>(this, 'BoxMoney')}

    /**
     * No comment (yet!)
     */
    get BoxText() {return new SQLCell<text, this>(this, 'BoxText')}

    /**
     * No comment (yet!)
     */
    get BoxBroadcastTextID() {return new SQLCell<mediumint, this>(this, 'BoxBroadcastTextID')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(MenuID : smallint,OptionID : smallint, c? : gossip_menu_optionCreator) : this {
        return this.cloneInternal([MenuID,OptionID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gossip_menu_optionCreator = {
    MenuID? : smallint,
    OptionID? : smallint,
    OptionIcon? : mediumint,
    OptionText? : text,
    OptionBroadcastTextID? : mediumint,
    OptionType? : tinyint,
    OptionNpcFlag? : int,
    ActionMenuID? : int,
    ActionPoiID? : mediumint,
    BoxCoded? : tinyint,
    BoxMoney? : int,
    BoxText? : text,
    BoxBroadcastTextID? : mediumint,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gossip_menu_optionQuery = {
    MenuID? : Relation<smallint>,
    OptionID? : Relation<smallint>,
    OptionIcon? : Relation<mediumint>,
    OptionText? : Relation<text>,
    OptionBroadcastTextID? : Relation<mediumint>,
    OptionType? : Relation<tinyint>,
    OptionNpcFlag? : Relation<int>,
    ActionMenuID? : Relation<int>,
    ActionPoiID? : Relation<mediumint>,
    BoxCoded? : Relation<tinyint>,
    BoxMoney? : Relation<int>,
    BoxText? : Relation<text>,
    BoxBroadcastTextID? : Relation<mediumint>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gossip_menu_optionTable extends SqlTable<
    gossip_menu_optionCreator,
    gossip_menu_optionQuery,
    gossip_menu_optionRow> {
    add(MenuID : smallint,OptionID : smallint, c? : gossip_menu_optionCreator) : gossip_menu_optionRow {
        const first = this.first();
        if(first) return first.clone(MenuID,OptionID,c)
        else return this.rowCreator(this, {}).clone(MenuID,OptionID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gossip_menu_option = new gossip_menu_optionTable(
    'gossip_menu_option',
    (table, obj)=>new gossip_menu_optionRow(table, obj))