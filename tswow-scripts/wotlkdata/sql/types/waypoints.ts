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
import { float, int, mediumint, text } from '../../primitives'
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
export class waypointsRow extends SqlRow<waypointsCreator,waypointsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get pointid() {return new SQLCellReadOnly<mediumint, this>(this, 'pointid')}

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
    get point_comment() {return new SQLCell<text, this>(this, 'point_comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint,pointid : mediumint, c? : waypointsCreator) : this {
        return this.cloneInternal([entry,pointid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type waypointsCreator = {
    entry? : mediumint,
    pointid? : mediumint,
    position_x? : float,
    position_y? : float,
    position_z? : float,
    orientation? : float,
    delay? : int,
    point_comment? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type waypointsQuery = {
    entry? : Relation<mediumint>,
    pointid? : Relation<mediumint>,
    position_x? : Relation<float>,
    position_y? : Relation<float>,
    position_z? : Relation<float>,
    orientation? : Relation<float>,
    delay? : Relation<int>,
    point_comment? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class waypointsTable extends SqlTable<
    waypointsCreator,
    waypointsQuery,
    waypointsRow> {
    add(entry : mediumint,pointid : mediumint, c? : waypointsCreator) : waypointsRow {
        const first = this.first();
        if(first) return first.clone(entry,pointid,c)
        else return this.rowCreator(this, {}).clone(entry,pointid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_waypoints = new waypointsTable(
    'waypoints',
    (table, obj)=>new waypointsRow(table, obj))