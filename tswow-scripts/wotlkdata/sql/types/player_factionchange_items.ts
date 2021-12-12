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
import { int, text } from '../../primitives'
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
export class player_factionchange_itemsRow extends SqlRow<player_factionchange_itemsCreator,player_factionchange_itemsQuery> {
    /**
     * No comment (yet!)
     */
    get race_A() {return new SQLCell<int, this>(this, 'race_A')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get alliance_id() {return new SQLCellReadOnly<int, this>(this, 'alliance_id')}

    /**
     * No comment (yet!)
     */
    get commentA() {return new SQLCell<text, this>(this, 'commentA')}

    /**
     * No comment (yet!)
     */
    get race_H() {return new SQLCell<int, this>(this, 'race_H')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get horde_id() {return new SQLCellReadOnly<int, this>(this, 'horde_id')}

    /**
     * No comment (yet!)
     */
    get commentH() {return new SQLCell<text, this>(this, 'commentH')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(alliance_id : int,horde_id : int, c? : player_factionchange_itemsCreator) : this {
        return this.cloneInternal([alliance_id,horde_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type player_factionchange_itemsCreator = {
    race_A? : int,
    alliance_id? : int,
    commentA? : text,
    race_H? : int,
    horde_id? : int,
    commentH? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type player_factionchange_itemsQuery = {
    race_A? : Relation<int>,
    alliance_id? : Relation<int>,
    commentA? : Relation<text>,
    race_H? : Relation<int>,
    horde_id? : Relation<int>,
    commentH? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class player_factionchange_itemsTable extends SqlTable<
    player_factionchange_itemsCreator,
    player_factionchange_itemsQuery,
    player_factionchange_itemsRow> {
    add(alliance_id : int,horde_id : int, c? : player_factionchange_itemsCreator) : player_factionchange_itemsRow {
        const first = this.first();
        if(first) return first.clone(alliance_id,horde_id,c)
        else return this.rowCreator(this, {}).clone(alliance_id,horde_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_player_factionchange_items = new player_factionchange_itemsTable(
    'player_factionchange_items',
    (table, obj)=>new player_factionchange_itemsRow(table, obj))