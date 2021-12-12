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
import { int, mediumint, tinyint } from '../../primitives'
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
export class spell_areaRow extends SqlRow<spell_areaCreator,spell_areaQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spell() {return new SQLCellReadOnly<mediumint, this>(this, 'spell')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get area() {return new SQLCellReadOnly<mediumint, this>(this, 'area')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get quest_start() {return new SQLCellReadOnly<mediumint, this>(this, 'quest_start')}

    /**
     * No comment (yet!)
     */
    get quest_end() {return new SQLCell<mediumint, this>(this, 'quest_end')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get aura_spell() {return new SQLCellReadOnly<mediumint, this>(this, 'aura_spell')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get racemask() {return new SQLCellReadOnly<mediumint, this>(this, 'racemask')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get gender() {return new SQLCellReadOnly<tinyint, this>(this, 'gender')}

    /**
     * No comment (yet!)
     */
    get autocast() {return new SQLCell<tinyint, this>(this, 'autocast')}

    /**
     * No comment (yet!)
     */
    get quest_start_status() {return new SQLCell<int, this>(this, 'quest_start_status')}

    /**
     * No comment (yet!)
     */
    get quest_end_status() {return new SQLCell<int, this>(this, 'quest_end_status')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell : mediumint,area : mediumint,quest_start : mediumint,aura_spell : mediumint,racemask : mediumint,gender : tinyint, c? : spell_areaCreator) : this {
        return this.cloneInternal([spell,area,quest_start,aura_spell,racemask,gender],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_areaCreator = {
    spell? : mediumint,
    area? : mediumint,
    quest_start? : mediumint,
    quest_end? : mediumint,
    aura_spell? : mediumint,
    racemask? : mediumint,
    gender? : tinyint,
    autocast? : tinyint,
    quest_start_status? : int,
    quest_end_status? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_areaQuery = {
    spell? : Relation<mediumint>,
    area? : Relation<mediumint>,
    quest_start? : Relation<mediumint>,
    quest_end? : Relation<mediumint>,
    aura_spell? : Relation<mediumint>,
    racemask? : Relation<mediumint>,
    gender? : Relation<tinyint>,
    autocast? : Relation<tinyint>,
    quest_start_status? : Relation<int>,
    quest_end_status? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_areaTable extends SqlTable<
    spell_areaCreator,
    spell_areaQuery,
    spell_areaRow> {
    add(spell : mediumint,area : mediumint,quest_start : mediumint,aura_spell : mediumint,racemask : mediumint,gender : tinyint, c? : spell_areaCreator) : spell_areaRow {
        const first = this.first();
        if(first) return first.clone(spell,area,quest_start,aura_spell,racemask,gender,c)
        else return this.rowCreator(this, {}).clone(spell,area,quest_start,aura_spell,racemask,gender,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_area = new spell_areaTable(
    'spell_area',
    (table, obj)=>new spell_areaRow(table, obj))