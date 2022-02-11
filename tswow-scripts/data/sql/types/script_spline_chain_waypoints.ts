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
import { float, int, smallint, tinyint } from '../../primitives'
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
export class script_spline_chain_waypointsRow extends SqlRow<script_spline_chain_waypointsCreator,script_spline_chain_waypointsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<int, this>(this, 'entry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get chainId() {return new SQLCellReadOnly<smallint, this>(this, 'chainId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get splineId() {return new SQLCellReadOnly<tinyint, this>(this, 'splineId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get wpId() {return new SQLCellReadOnly<tinyint, this>(this, 'wpId')}

    /**
     * No comment (yet!)
     */
    get x() {return new SQLCell<float, this>(this, 'x')}

    /**
     * No comment (yet!)
     */
    get y() {return new SQLCell<float, this>(this, 'y')}

    /**
     * No comment (yet!)
     */
    get z() {return new SQLCell<float, this>(this, 'z')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : int,chainId : smallint,splineId : tinyint,wpId : tinyint, c? : script_spline_chain_waypointsCreator) : this {
        return this.cloneInternal([entry,chainId,splineId,wpId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type script_spline_chain_waypointsCreator = {
    entry? : int,
    chainId? : smallint,
    splineId? : tinyint,
    wpId? : tinyint,
    x? : float,
    y? : float,
    z? : float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type script_spline_chain_waypointsQuery = {
    entry? : Relation<int>,
    chainId? : Relation<smallint>,
    splineId? : Relation<tinyint>,
    wpId? : Relation<tinyint>,
    x? : Relation<float>,
    y? : Relation<float>,
    z? : Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class script_spline_chain_waypointsTable extends SqlTable<
    script_spline_chain_waypointsCreator,
    script_spline_chain_waypointsQuery,
    script_spline_chain_waypointsRow> {
    add(entry : int,chainId : smallint,splineId : tinyint,wpId : tinyint, c? : script_spline_chain_waypointsCreator) : script_spline_chain_waypointsRow {
        const first = this.first();
        if(first) return first.clone(entry,chainId,splineId,wpId,c)
        else return this.rowCreator(this, {}).clone(entry,chainId,splineId,wpId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_script_spline_chain_waypoints = new script_spline_chain_waypointsTable(
    'script_spline_chain_waypoints',
    (table, obj)=>new script_spline_chain_waypointsRow(table, obj))