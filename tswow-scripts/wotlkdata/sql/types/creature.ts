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
import { char, float, int, mediumint, smallint, tinyint } from '../../primitives'
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
export class creatureRow extends SqlRow<creatureCreator,creatureQuery> {
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
    get id() {return new SQLCell<mediumint, this>(this, 'id')}

    /**
     * No comment (yet!)
     */
    get map() {return new SQLCell<smallint, this>(this, 'map')}

    /**
     * No comment (yet!)
     */
    get zoneId() {return new SQLCell<smallint, this>(this, 'zoneId')}

    /**
     * No comment (yet!)
     */
    get areaId() {return new SQLCell<smallint, this>(this, 'areaId')}

    /**
     * No comment (yet!)
     */
    get spawnMask() {return new SQLCell<tinyint, this>(this, 'spawnMask')}

    /**
     * No comment (yet!)
     */
    get phaseMask() {return new SQLCell<int, this>(this, 'phaseMask')}

    /**
     * No comment (yet!)
     */
    get modelid() {return new SQLCell<mediumint, this>(this, 'modelid')}

    /**
     * No comment (yet!)
     */
    get equipment_id() {return new SQLCell<tinyint, this>(this, 'equipment_id')}

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
    get spawntimesecs() {return new SQLCell<int, this>(this, 'spawntimesecs')}

    /**
     * No comment (yet!)
     */
    get wander_distance() {return new SQLCell<float, this>(this, 'wander_distance')}

    /**
     * No comment (yet!)
     */
    get currentwaypoint() {return new SQLCell<mediumint, this>(this, 'currentwaypoint')}

    /**
     * No comment (yet!)
     */
    get curhealth() {return new SQLCell<int, this>(this, 'curhealth')}

    /**
     * No comment (yet!)
     */
    get curmana() {return new SQLCell<int, this>(this, 'curmana')}

    /**
     * No comment (yet!)
     */
    get MovementType() {return new SQLCell<tinyint, this>(this, 'MovementType')}

    /**
     * No comment (yet!)
     */
    get npcflag() {return new SQLCell<int, this>(this, 'npcflag')}

    /**
     * No comment (yet!)
     */
    get unit_flags() {return new SQLCell<int, this>(this, 'unit_flags')}

    /**
     * No comment (yet!)
     */
    get dynamicflags() {return new SQLCell<int, this>(this, 'dynamicflags')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<char, this>(this, 'ScriptName')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid : int, c? : creatureCreator) : this {
        return this.cloneInternal([guid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creatureCreator = {
    guid? : int,
    id? : mediumint,
    map? : smallint,
    zoneId? : smallint,
    areaId? : smallint,
    spawnMask? : tinyint,
    phaseMask? : int,
    modelid? : mediumint,
    equipment_id? : tinyint,
    position_x? : float,
    position_y? : float,
    position_z? : float,
    orientation? : float,
    spawntimesecs? : int,
    wander_distance? : float,
    currentwaypoint? : mediumint,
    curhealth? : int,
    curmana? : int,
    MovementType? : tinyint,
    npcflag? : int,
    unit_flags? : int,
    dynamicflags? : int,
    ScriptName? : char,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creatureQuery = {
    guid? : Relation<int>,
    id? : Relation<mediumint>,
    map? : Relation<smallint>,
    zoneId? : Relation<smallint>,
    areaId? : Relation<smallint>,
    spawnMask? : Relation<tinyint>,
    phaseMask? : Relation<int>,
    modelid? : Relation<mediumint>,
    equipment_id? : Relation<tinyint>,
    position_x? : Relation<float>,
    position_y? : Relation<float>,
    position_z? : Relation<float>,
    orientation? : Relation<float>,
    spawntimesecs? : Relation<int>,
    wander_distance? : Relation<float>,
    currentwaypoint? : Relation<mediumint>,
    curhealth? : Relation<int>,
    curmana? : Relation<int>,
    MovementType? : Relation<tinyint>,
    npcflag? : Relation<int>,
    unit_flags? : Relation<int>,
    dynamicflags? : Relation<int>,
    ScriptName? : Relation<char>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creatureTable extends SqlTable<
    creatureCreator,
    creatureQuery,
    creatureRow> {
    add(guid : int, c? : creatureCreator) : creatureRow {
        const first = this.first();
        if(first) return first.clone(guid,c)
        else return this.rowCreator(this, {}).clone(guid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature = new creatureTable(
    'creature',
    (table, obj)=>new creatureRow(table, obj))