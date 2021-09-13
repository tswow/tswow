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
export class gameobjectRow extends SqlRow<gameobjectCreator,gameobjectQuery> {
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
    get rotation0() {return new SQLCell<float, this>(this, 'rotation0')}

    /**
     * No comment (yet!)
     */
    get rotation1() {return new SQLCell<float, this>(this, 'rotation1')}

    /**
     * No comment (yet!)
     */
    get rotation2() {return new SQLCell<float, this>(this, 'rotation2')}

    /**
     * No comment (yet!)
     */
    get rotation3() {return new SQLCell<float, this>(this, 'rotation3')}

    /**
     * No comment (yet!)
     */
    get spawntimesecs() {return new SQLCell<int, this>(this, 'spawntimesecs')}

    /**
     * No comment (yet!)
     */
    get animprogress() {return new SQLCell<tinyint, this>(this, 'animprogress')}

    /**
     * No comment (yet!)
     */
    get state() {return new SQLCell<tinyint, this>(this, 'state')}

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
    clone(guid : int, c? : gameobjectCreator) : this {
        return this.cloneInternal([guid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gameobjectCreator = {
    guid? : int,
    id? : mediumint,
    map? : smallint,
    zoneId? : smallint,
    areaId? : smallint,
    spawnMask? : tinyint,
    phaseMask? : int,
    position_x? : float,
    position_y? : float,
    position_z? : float,
    orientation? : float,
    rotation0? : float,
    rotation1? : float,
    rotation2? : float,
    rotation3? : float,
    spawntimesecs? : int,
    animprogress? : tinyint,
    state? : tinyint,
    ScriptName? : char,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gameobjectQuery = {
    guid? : Relation<int>,
    id? : Relation<mediumint>,
    map? : Relation<smallint>,
    zoneId? : Relation<smallint>,
    areaId? : Relation<smallint>,
    spawnMask? : Relation<tinyint>,
    phaseMask? : Relation<int>,
    position_x? : Relation<float>,
    position_y? : Relation<float>,
    position_z? : Relation<float>,
    orientation? : Relation<float>,
    rotation0? : Relation<float>,
    rotation1? : Relation<float>,
    rotation2? : Relation<float>,
    rotation3? : Relation<float>,
    spawntimesecs? : Relation<int>,
    animprogress? : Relation<tinyint>,
    state? : Relation<tinyint>,
    ScriptName? : Relation<char>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gameobjectTable extends SqlTable<
    gameobjectCreator,
    gameobjectQuery,
    gameobjectRow> {
    add(guid : int, c? : gameobjectCreator) : gameobjectRow {
        const first = this.first();
        if(first) return first.clone(guid,c)
        else return this.rowCreator(this, {}).clone(guid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gameobject = new gameobjectTable(
    'gameobject',
    (table, obj)=>new gameobjectRow(table, obj))