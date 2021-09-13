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
import { float, smallint, text, tinyint } from '../../primitives'
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
export class creature_classlevelstatsRow extends SqlRow<creature_classlevelstatsCreator,creature_classlevelstatsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get level() {return new SQLCellReadOnly<tinyint, this>(this, 'level')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get class() {return new SQLCellReadOnly<tinyint, this>(this, 'class')}

    /**
     * No comment (yet!)
     */
    get basehp0() {return new SQLCell<smallint, this>(this, 'basehp0')}

    /**
     * No comment (yet!)
     */
    get basehp1() {return new SQLCell<smallint, this>(this, 'basehp1')}

    /**
     * No comment (yet!)
     */
    get basehp2() {return new SQLCell<smallint, this>(this, 'basehp2')}

    /**
     * No comment (yet!)
     */
    get basemana() {return new SQLCell<smallint, this>(this, 'basemana')}

    /**
     * No comment (yet!)
     */
    get basearmor() {return new SQLCell<smallint, this>(this, 'basearmor')}

    /**
     * No comment (yet!)
     */
    get attackpower() {return new SQLCell<smallint, this>(this, 'attackpower')}

    /**
     * No comment (yet!)
     */
    get rangedattackpower() {return new SQLCell<smallint, this>(this, 'rangedattackpower')}

    /**
     * No comment (yet!)
     */
    get damage_base() {return new SQLCell<float, this>(this, 'damage_base')}

    /**
     * No comment (yet!)
     */
    get damage_exp1() {return new SQLCell<float, this>(this, 'damage_exp1')}

    /**
     * No comment (yet!)
     */
    get damage_exp2() {return new SQLCell<float, this>(this, 'damage_exp2')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<text, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(level : tinyint,cls : tinyint, c? : creature_classlevelstatsCreator) : this {
        return this.cloneInternal([level,cls],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_classlevelstatsCreator = {
    level? : tinyint,
    class? : tinyint,
    basehp0? : smallint,
    basehp1? : smallint,
    basehp2? : smallint,
    basemana? : smallint,
    basearmor? : smallint,
    attackpower? : smallint,
    rangedattackpower? : smallint,
    damage_base? : float,
    damage_exp1? : float,
    damage_exp2? : float,
    comment? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_classlevelstatsQuery = {
    level? : Relation<tinyint>,
    class? : Relation<tinyint>,
    basehp0? : Relation<smallint>,
    basehp1? : Relation<smallint>,
    basehp2? : Relation<smallint>,
    basemana? : Relation<smallint>,
    basearmor? : Relation<smallint>,
    attackpower? : Relation<smallint>,
    rangedattackpower? : Relation<smallint>,
    damage_base? : Relation<float>,
    damage_exp1? : Relation<float>,
    damage_exp2? : Relation<float>,
    comment? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_classlevelstatsTable extends SqlTable<
    creature_classlevelstatsCreator,
    creature_classlevelstatsQuery,
    creature_classlevelstatsRow> {
    add(level : tinyint,cls : tinyint, c? : creature_classlevelstatsCreator) : creature_classlevelstatsRow {
        const first = this.first();
        if(first) return first.clone(level,cls,c)
        else return this.rowCreator(this, {}).clone(level,cls,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_classlevelstats = new creature_classlevelstatsTable(
    'creature_classlevelstats',
    (table, obj)=>new creature_classlevelstatsRow(table, obj))