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
import { float, int, mediumint, smallint } from '../../data/primitives'
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
export class waypoint_dataRow extends SqlRow<waypoint_dataCreator,waypoint_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get id() {return new SQLCellReadOnly<int, this>(this, 'id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get point() {return new SQLCellReadOnly<mediumint, this>(this, 'point')}

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
    get delay() {return new SQLCell<int, this>(this, 'delay')}

    /**
     * No comment (yet!)
     */
    get move_type() {return new SQLCell<int, this>(this, 'move_type')}

    /**
     * No comment (yet!)
     */
    get action() {return new SQLCell<int, this>(this, 'action')}

    /**
     * No comment (yet!)
     */
    get action_chance() {return new SQLCell<smallint, this>(this, 'action_chance')}

    /**
     * No comment (yet!)
     */
    get wpguid() {return new SQLCell<int, this>(this, 'wpguid')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : int,point : mediumint, c? : waypoint_dataCreator) : this {
        return this.cloneInternal([id,point],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type waypoint_dataCreator = {
    id? : int,
    point? : mediumint,
    position_x? : float,
    position_y? : float,
    position_z? : float,
    orientation? : float,
    delay? : int,
    move_type? : int,
    action? : int,
    action_chance? : smallint,
    wpguid? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type waypoint_dataQuery = {
    id? : Relation<int>,
    point? : Relation<mediumint>,
    position_x? : Relation<float>,
    position_y? : Relation<float>,
    position_z? : Relation<float>,
    orientation? : Relation<float>,
    delay? : Relation<int>,
    move_type? : Relation<int>,
    action? : Relation<int>,
    action_chance? : Relation<smallint>,
    wpguid? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class waypoint_dataTable extends SqlTable<
    waypoint_dataCreator,
    waypoint_dataQuery,
    waypoint_dataRow> {
    add(id : int,point : mediumint, c? : waypoint_dataCreator) : waypoint_dataRow {
        const first = this.first();
        if(first) return first.clone(id,point,c)
        else return this.rowCreator(this, {}).clone(id,point,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_waypoint_data = new waypoint_dataTable(
    'waypoint_data',
    (table, obj)=>new waypoint_dataRow(table, obj))