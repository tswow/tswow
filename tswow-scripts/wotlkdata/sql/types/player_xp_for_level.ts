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
export class player_xp_for_levelRow extends SqlRow<player_xp_for_levelCreator,player_xp_for_levelQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Level() {return new SQLCellReadOnly<tinyint, this>(this, 'Level')}

    /**
     * No comment (yet!)
     */
    get Experience() {return new SQLCell<int, this>(this, 'Experience')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Level : tinyint, c? : player_xp_for_levelCreator) : this {
        return this.cloneInternal([Level],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type player_xp_for_levelCreator = {
    Level? : tinyint,
    Experience? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type player_xp_for_levelQuery = {
    Level? : Relation<tinyint>,
    Experience? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class player_xp_for_levelTable extends SqlTable<
    player_xp_for_levelCreator,
    player_xp_for_levelQuery,
    player_xp_for_levelRow> {
    add(Level : tinyint, c? : player_xp_for_levelCreator) : player_xp_for_levelRow {
        const first = this.first();
        if(first) return first.clone(Level,c)
        else return this.rowCreator(this, {}).clone(Level,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_player_xp_for_level = new player_xp_for_levelTable(
    'player_xp_for_level',
    (table, obj)=>new player_xp_for_levelRow(table, obj))