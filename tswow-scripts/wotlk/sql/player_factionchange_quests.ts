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
import { int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class player_factionchange_questsRow extends SqlRow<player_factionchange_questsCreator,player_factionchange_questsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get alliance_id() {return new SQLCellReadOnly<int, this>(this, 'alliance_id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get horde_id() {return new SQLCellReadOnly<int, this>(this, 'horde_id')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(alliance_id : int,horde_id : int, c? : player_factionchange_questsCreator) : this {
        return this.cloneInternal([alliance_id,horde_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type player_factionchange_questsCreator = {
    alliance_id? : int,
    horde_id? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type player_factionchange_questsQuery = {
    alliance_id? : Relation<int>,
    horde_id? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class player_factionchange_questsTable extends SqlTable<
    player_factionchange_questsCreator,
    player_factionchange_questsQuery,
    player_factionchange_questsRow> {
    add(alliance_id : int,horde_id : int, c? : player_factionchange_questsCreator) : player_factionchange_questsRow {
        const first = this.first();
        if(first) return first.clone(alliance_id,horde_id,c)
        else return this.rowCreator(this, {}).clone(alliance_id,horde_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_player_factionchange_quests = new player_factionchange_questsTable(
    'player_factionchange_quests',
    (table, obj)=>new player_factionchange_questsRow(table, obj))