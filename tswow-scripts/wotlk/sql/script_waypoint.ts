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
import { float, int, mediumint, text } from '../../data/primitives'
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
export class script_waypointRow extends SqlRow<script_waypointCreator,script_waypointQuery> {
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
    get location_x() {return new SQLCell<float, this>(this, 'location_x')}

    /**
     * No comment (yet!)
     */
    get location_y() {return new SQLCell<float, this>(this, 'location_y')}

    /**
     * No comment (yet!)
     */
    get location_z() {return new SQLCell<float, this>(this, 'location_z')}

    /**
     * No comment (yet!)
     */
    get waittime() {return new SQLCell<int, this>(this, 'waittime')}

    /**
     * No comment (yet!)
     */
    get point_comment() {return new SQLCell<text, this>(this, 'point_comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint,pointid : mediumint, c? : script_waypointCreator) : this {
        return this.cloneInternal([entry,pointid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type script_waypointCreator = {
    entry? : mediumint,
    pointid? : mediumint,
    location_x? : float,
    location_y? : float,
    location_z? : float,
    waittime? : int,
    point_comment? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type script_waypointQuery = {
    entry? : Relation<mediumint>,
    pointid? : Relation<mediumint>,
    location_x? : Relation<float>,
    location_y? : Relation<float>,
    location_z? : Relation<float>,
    waittime? : Relation<int>,
    point_comment? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class script_waypointTable extends SqlTable<
    script_waypointCreator,
    script_waypointQuery,
    script_waypointRow> {
    add(entry : mediumint,pointid : mediumint, c? : script_waypointCreator) : script_waypointRow {
        const first = this.first();
        if(first) return first.clone(entry,pointid,c)
        else return this.rowCreator(this, {}).clone(entry,pointid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_script_waypoint = new script_waypointTable(
    'script_waypoint',
    (table, obj)=>new script_waypointRow(table, obj))