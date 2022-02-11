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
import { tinyint } from '../../primitives'
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
export class player_levelstatsRow extends SqlRow<player_levelstatsCreator,player_levelstatsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get race() {return new SQLCellReadOnly<tinyint, this>(this, 'race')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get class() {return new SQLCellReadOnly<tinyint, this>(this, 'class')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get level() {return new SQLCellReadOnly<tinyint, this>(this, 'level')}

    /**
     * No comment (yet!)
     */
    get str() {return new SQLCell<tinyint, this>(this, 'str')}

    /**
     * No comment (yet!)
     */
    get agi() {return new SQLCell<tinyint, this>(this, 'agi')}

    /**
     * No comment (yet!)
     */
    get sta() {return new SQLCell<tinyint, this>(this, 'sta')}

    /**
     * No comment (yet!)
     */
    get inte() {return new SQLCell<tinyint, this>(this, 'inte')}

    /**
     * No comment (yet!)
     */
    get spi() {return new SQLCell<tinyint, this>(this, 'spi')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(race : tinyint,cls : tinyint,level : tinyint, c? : player_levelstatsCreator) : this {
        return this.cloneInternal([race,cls,level],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type player_levelstatsCreator = {
    race? : tinyint,
    class? : tinyint,
    level? : tinyint,
    str? : tinyint,
    agi? : tinyint,
    sta? : tinyint,
    inte? : tinyint,
    spi? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type player_levelstatsQuery = {
    race? : Relation<tinyint>,
    class? : Relation<tinyint>,
    level? : Relation<tinyint>,
    str? : Relation<tinyint>,
    agi? : Relation<tinyint>,
    sta? : Relation<tinyint>,
    inte? : Relation<tinyint>,
    spi? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class player_levelstatsTable extends SqlTable<
    player_levelstatsCreator,
    player_levelstatsQuery,
    player_levelstatsRow> {
    add(race : tinyint,cls : tinyint,level : tinyint, c? : player_levelstatsCreator) : player_levelstatsRow {
        const first = this.first();
        if(first) return first.clone(race,cls,level,c)
        else return this.rowCreator(this, {}).clone(race,cls,level,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_player_levelstats = new player_levelstatsTable(
    'player_levelstats',
    (table, obj)=>new player_levelstatsRow(table, obj))