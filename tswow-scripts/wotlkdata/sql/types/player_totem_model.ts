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
import { int, tinyint } from '../../primitives'
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
export class player_totem_modelRow extends SqlRow<player_totem_modelCreator,player_totem_modelQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get TotemSlot() {return new SQLCellReadOnly<tinyint, this>(this, 'TotemSlot')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get RaceId() {return new SQLCellReadOnly<tinyint, this>(this, 'RaceId')}

    /**
     * No comment (yet!)
     */
    get DisplayId() {return new SQLCell<int, this>(this, 'DisplayId')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(TotemSlot : tinyint,RaceId : tinyint, c? : player_totem_modelCreator) : this {
        return this.cloneInternal([TotemSlot,RaceId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type player_totem_modelCreator = {
    TotemSlot? : tinyint,
    RaceId? : tinyint,
    DisplayId? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type player_totem_modelQuery = {
    TotemSlot? : Relation<tinyint>,
    RaceId? : Relation<tinyint>,
    DisplayId? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class player_totem_modelTable extends SqlTable<
    player_totem_modelCreator,
    player_totem_modelQuery,
    player_totem_modelRow> {
    add(TotemSlot : tinyint,RaceId : tinyint, c? : player_totem_modelCreator) : player_totem_modelRow {
        const first = this.first();
        if(first) return first.clone(TotemSlot,RaceId,c)
        else return this.rowCreator(this, {}).clone(TotemSlot,RaceId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_player_totem_model = new player_totem_modelTable(
    'player_totem_model',
    (table, obj)=>new player_totem_modelRow(table, obj))