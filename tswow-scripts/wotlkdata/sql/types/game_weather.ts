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
import { char, mediumint, tinyint } from '../../primitives'
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
export class game_weatherRow extends SqlRow<game_weatherCreator,game_weatherQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get zone() {return new SQLCellReadOnly<mediumint, this>(this, 'zone')}

    /**
     * No comment (yet!)
     */
    get spring_rain_chance() {return new SQLCell<tinyint, this>(this, 'spring_rain_chance')}

    /**
     * No comment (yet!)
     */
    get spring_snow_chance() {return new SQLCell<tinyint, this>(this, 'spring_snow_chance')}

    /**
     * No comment (yet!)
     */
    get spring_storm_chance() {return new SQLCell<tinyint, this>(this, 'spring_storm_chance')}

    /**
     * No comment (yet!)
     */
    get summer_rain_chance() {return new SQLCell<tinyint, this>(this, 'summer_rain_chance')}

    /**
     * No comment (yet!)
     */
    get summer_snow_chance() {return new SQLCell<tinyint, this>(this, 'summer_snow_chance')}

    /**
     * No comment (yet!)
     */
    get summer_storm_chance() {return new SQLCell<tinyint, this>(this, 'summer_storm_chance')}

    /**
     * No comment (yet!)
     */
    get fall_rain_chance() {return new SQLCell<tinyint, this>(this, 'fall_rain_chance')}

    /**
     * No comment (yet!)
     */
    get fall_snow_chance() {return new SQLCell<tinyint, this>(this, 'fall_snow_chance')}

    /**
     * No comment (yet!)
     */
    get fall_storm_chance() {return new SQLCell<tinyint, this>(this, 'fall_storm_chance')}

    /**
     * No comment (yet!)
     */
    get winter_rain_chance() {return new SQLCell<tinyint, this>(this, 'winter_rain_chance')}

    /**
     * No comment (yet!)
     */
    get winter_snow_chance() {return new SQLCell<tinyint, this>(this, 'winter_snow_chance')}

    /**
     * No comment (yet!)
     */
    get winter_storm_chance() {return new SQLCell<tinyint, this>(this, 'winter_storm_chance')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<char, this>(this, 'ScriptName')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(zone : mediumint, c? : game_weatherCreator) : this {
        return this.cloneInternal([zone],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type game_weatherCreator = {
    zone? : mediumint,
    spring_rain_chance? : tinyint,
    spring_snow_chance? : tinyint,
    spring_storm_chance? : tinyint,
    summer_rain_chance? : tinyint,
    summer_snow_chance? : tinyint,
    summer_storm_chance? : tinyint,
    fall_rain_chance? : tinyint,
    fall_snow_chance? : tinyint,
    fall_storm_chance? : tinyint,
    winter_rain_chance? : tinyint,
    winter_snow_chance? : tinyint,
    winter_storm_chance? : tinyint,
    ScriptName? : char,
}

/**
 * Used for object queries (Don't comment these)
 */
export type game_weatherQuery = {
    zone? : Relation<mediumint>,
    spring_rain_chance? : Relation<tinyint>,
    spring_snow_chance? : Relation<tinyint>,
    spring_storm_chance? : Relation<tinyint>,
    summer_rain_chance? : Relation<tinyint>,
    summer_snow_chance? : Relation<tinyint>,
    summer_storm_chance? : Relation<tinyint>,
    fall_rain_chance? : Relation<tinyint>,
    fall_snow_chance? : Relation<tinyint>,
    fall_storm_chance? : Relation<tinyint>,
    winter_rain_chance? : Relation<tinyint>,
    winter_snow_chance? : Relation<tinyint>,
    winter_storm_chance? : Relation<tinyint>,
    ScriptName? : Relation<char>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class game_weatherTable extends SqlTable<
    game_weatherCreator,
    game_weatherQuery,
    game_weatherRow> {
    add(zone : mediumint, c? : game_weatherCreator) : game_weatherRow {
        const first = this.first();
        if(first) return first.clone(zone,c)
        else return this.rowCreator(this, {}).clone(zone,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_game_weather = new game_weatherTable(
    'game_weather',
    (table, obj)=>new game_weatherRow(table, obj))