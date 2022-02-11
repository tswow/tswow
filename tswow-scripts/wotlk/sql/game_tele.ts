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
import { float, mediumint, smallint, varchar } from '../../data/primitives'
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
export class game_teleRow extends SqlRow<game_teleCreator,game_teleQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get id() {return new SQLCellReadOnly<mediumint, this>(this, 'id')}

    /**
     * No comment (yet!)
     */
    get position_x() {return new SQLCell<float, this>(this, 'position_x')}

    /**
     * No comment (yet!)
     */
    get position_y() {return new SQLCell<float, this>(this, 'position_y')}

    /**
     * No comment (yet!)
     */
    get position_z() {return new SQLCell<float, this>(this, 'position_z')}

    /**
     * No comment (yet!)
     */
    get orientation() {return new SQLCell<float, this>(this, 'orientation')}

    /**
     * No comment (yet!)
     */
    get map() {return new SQLCell<smallint, this>(this, 'map')}

    /**
     * No comment (yet!)
     */
    get name() {return new SQLCell<varchar, this>(this, 'name')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : mediumint, c? : game_teleCreator) : this {
        return this.cloneInternal([id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_teleCreator = {
    id? : mediumint,
    position_x? : float,
    position_y? : float,
    position_z? : float,
    orientation? : float,
    map? : smallint,
    name? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_teleQuery = {
    id? : Relation<mediumint>,
    position_x? : Relation<float>,
    position_y? : Relation<float>,
    position_z? : Relation<float>,
    orientation? : Relation<float>,
    map? : Relation<smallint>,
    name? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_teleTable extends SqlTable<
    game_teleCreator,
    game_teleQuery,
    game_teleRow> {
    add(id : mediumint, c? : game_teleCreator) : game_teleRow {
        const first = this.first();
        if(first) return first.clone(id,c)
        else return this.rowCreator(this, {}).clone(id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_tele = new game_teleTable(
    'game_tele',
    (table, obj)=>new game_teleRow(table, obj))