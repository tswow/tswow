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
import { float, int, varchar } from '../../data/primitives'
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
export class waypoint_scriptsRow extends SqlRow<waypoint_scriptsCreator,waypoint_scriptsQuery> {
    /**
     * No comment (yet!)
     */
    get id() {return new SQLCell<int, this>(this, 'id')}

    /**
     * No comment (yet!)
     */
    get delay() {return new SQLCell<int, this>(this, 'delay')}

    /**
     * No comment (yet!)
     */
    get command() {return new SQLCell<int, this>(this, 'command')}

    /**
     * No comment (yet!)
     */
    get datalong() {return new SQLCell<int, this>(this, 'datalong')}

    /**
     * No comment (yet!)
     */
    get datalong2() {return new SQLCell<int, this>(this, 'datalong2')}

    /**
     * No comment (yet!)
     */
    get dataint() {return new SQLCell<int, this>(this, 'dataint')}

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
     * No comment (yet!)
     */
    get o() {return new SQLCell<float, this>(this, 'o')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get guid() {return new SQLCellReadOnly<int, this>(this, 'guid')}

    /**
     * No comment (yet!)
     */
    get Comment() {return new SQLCell<varchar, this>(this, 'Comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid : int, c? : waypoint_scriptsCreator) : this {
        return this.cloneInternal([guid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type waypoint_scriptsCreator = {
    id? : int,
    delay? : int,
    command? : int,
    datalong? : int,
    datalong2? : int,
    dataint? : int,
    x? : float,
    y? : float,
    z? : float,
    o? : float,
    guid? : int,
    Comment? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type waypoint_scriptsQuery = {
    id? : Relation<int>,
    delay? : Relation<int>,
    command? : Relation<int>,
    datalong? : Relation<int>,
    datalong2? : Relation<int>,
    dataint? : Relation<int>,
    x? : Relation<float>,
    y? : Relation<float>,
    z? : Relation<float>,
    o? : Relation<float>,
    guid? : Relation<int>,
    Comment? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class waypoint_scriptsTable extends SqlTable<
    waypoint_scriptsCreator,
    waypoint_scriptsQuery,
    waypoint_scriptsRow> {
    add(guid : int, c? : waypoint_scriptsCreator) : waypoint_scriptsRow {
        const first = this.first();
        if(first) return first.clone(guid,c)
        else return this.rowCreator(this, {}).clone(guid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_waypoint_scripts = new waypoint_scriptsTable(
    'waypoint_scripts',
    (table, obj)=>new waypoint_scriptsRow(table, obj))