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
import { smallint, tinyint } from '../../primitives'
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
export class player_classlevelstatsRow extends SqlRow<player_classlevelstatsCreator,player_classlevelstatsQuery> {
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
    get basehp() {return new SQLCell<smallint, this>(this, 'basehp')}

    /**
     * No comment (yet!)
     */
    get basemana() {return new SQLCell<smallint, this>(this, 'basemana')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(cls : tinyint,level : tinyint, c? : player_classlevelstatsCreator) : this {
        return this.cloneInternal([cls,level],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type player_classlevelstatsCreator = {
    class? : tinyint,
    level? : tinyint,
    basehp? : smallint,
    basemana? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type player_classlevelstatsQuery = {
    class? : Relation<tinyint>,
    level? : Relation<tinyint>,
    basehp? : Relation<smallint>,
    basemana? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class player_classlevelstatsTable extends SqlTable<
    player_classlevelstatsCreator,
    player_classlevelstatsQuery,
    player_classlevelstatsRow> {
    add(cls : tinyint,level : tinyint, c? : player_classlevelstatsCreator) : player_classlevelstatsRow {
        const first = this.first();
        if(first) return first.clone(cls,level,c)
        else return this.rowCreator(this, {}).clone(cls,level,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_player_classlevelstats = new player_classlevelstatsTable(
    'player_classlevelstats',
    (table, obj)=>new player_classlevelstatsRow(table, obj))