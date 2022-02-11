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
import { int, mediumint, smallint, tinyint } from '../../data/primitives'
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
export class pet_levelstatsRow extends SqlRow<pet_levelstatsCreator,pet_levelstatsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get creature_entry() {return new SQLCellReadOnly<mediumint, this>(this, 'creature_entry')}

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
    get hp() {return new SQLCell<smallint, this>(this, 'hp')}

    /**
     * No comment (yet!)
     */
    get mana() {return new SQLCell<smallint, this>(this, 'mana')}

    /**
     * No comment (yet!)
     */
    get armor() {return new SQLCell<int, this>(this, 'armor')}

    /**
     * No comment (yet!)
     */
    get str() {return new SQLCell<smallint, this>(this, 'str')}

    /**
     * No comment (yet!)
     */
    get agi() {return new SQLCell<smallint, this>(this, 'agi')}

    /**
     * No comment (yet!)
     */
    get sta() {return new SQLCell<smallint, this>(this, 'sta')}

    /**
     * No comment (yet!)
     */
    get inte() {return new SQLCell<smallint, this>(this, 'inte')}

    /**
     * No comment (yet!)
     */
    get spi() {return new SQLCell<smallint, this>(this, 'spi')}

    /**
     * No comment (yet!)
     */
    get min_dmg() {return new SQLCell<smallint, this>(this, 'min_dmg')}

    /**
     * No comment (yet!)
     */
    get max_dmg() {return new SQLCell<smallint, this>(this, 'max_dmg')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(creature_entry : mediumint,level : tinyint, c? : pet_levelstatsCreator) : this {
        return this.cloneInternal([creature_entry,level],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type pet_levelstatsCreator = {
    creature_entry? : mediumint,
    level? : tinyint,
    hp? : smallint,
    mana? : smallint,
    armor? : int,
    str? : smallint,
    agi? : smallint,
    sta? : smallint,
    inte? : smallint,
    spi? : smallint,
    min_dmg? : smallint,
    max_dmg? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type pet_levelstatsQuery = {
    creature_entry? : Relation<mediumint>,
    level? : Relation<tinyint>,
    hp? : Relation<smallint>,
    mana? : Relation<smallint>,
    armor? : Relation<int>,
    str? : Relation<smallint>,
    agi? : Relation<smallint>,
    sta? : Relation<smallint>,
    inte? : Relation<smallint>,
    spi? : Relation<smallint>,
    min_dmg? : Relation<smallint>,
    max_dmg? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class pet_levelstatsTable extends SqlTable<
    pet_levelstatsCreator,
    pet_levelstatsQuery,
    pet_levelstatsRow> {
    add(creature_entry : mediumint,level : tinyint, c? : pet_levelstatsCreator) : pet_levelstatsRow {
        const first = this.first();
        if(first) return first.clone(creature_entry,level,c)
        else return this.rowCreator(this, {}).clone(creature_entry,level,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_pet_levelstats = new pet_levelstatsTable(
    'pet_levelstats',
    (table, obj)=>new pet_levelstatsRow(table, obj))