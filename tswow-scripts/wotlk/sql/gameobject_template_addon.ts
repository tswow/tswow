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
import { int, mediumint, smallint } from '../../data/primitives'
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
export class gameobject_template_addonRow extends SqlRow<gameobject_template_addonCreator,gameobject_template_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get faction() {return new SQLCell<smallint, this>(this, 'faction')}

    /**
     * No comment (yet!)
     */
    get flags() {return new SQLCell<int, this>(this, 'flags')}

    /**
     * No comment (yet!)
     */
    get mingold() {return new SQLCell<mediumint, this>(this, 'mingold')}

    /**
     * No comment (yet!)
     */
    get maxgold() {return new SQLCell<mediumint, this>(this, 'maxgold')}

    /**
     * No comment (yet!)
     */
    get artkit0() {return new SQLCell<int, this>(this, 'artkit0')}

    /**
     * No comment (yet!)
     */
    get artkit1() {return new SQLCell<int, this>(this, 'artkit1')}

    /**
     * No comment (yet!)
     */
    get artkit2() {return new SQLCell<int, this>(this, 'artkit2')}

    /**
     * No comment (yet!)
     */
    get artkit3() {return new SQLCell<int, this>(this, 'artkit3')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint, c? : gameobject_template_addonCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_template_addonCreator = {
    entry? : mediumint,
    faction? : smallint,
    flags? : int,
    mingold? : mediumint,
    maxgold? : mediumint,
    artkit0? : int,
    artkit1? : int,
    artkit2? : int,
    artkit3? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_template_addonQuery = {
    entry? : Relation<mediumint>,
    faction? : Relation<smallint>,
    flags? : Relation<int>,
    mingold? : Relation<mediumint>,
    maxgold? : Relation<mediumint>,
    artkit0? : Relation<int>,
    artkit1? : Relation<int>,
    artkit2? : Relation<int>,
    artkit3? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gameobject_template_addonTable extends SqlTable<
    gameobject_template_addonCreator,
    gameobject_template_addonQuery,
    gameobject_template_addonRow> {
    add(entry : mediumint, c? : gameobject_template_addonCreator) : gameobject_template_addonRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gameobject_template_addon = new gameobject_template_addonTable(
    'gameobject_template_addon',
    (table, obj)=>new gameobject_template_addonRow(table, obj))