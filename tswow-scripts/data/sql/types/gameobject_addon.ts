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
import { float, int, tinyint } from '../../primitives'
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
export class gameobject_addonRow extends SqlRow<gameobject_addonCreator,gameobject_addonQuery> {
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
    get parent_rotation0() {return new SQLCell<float, this>(this, 'parent_rotation0')}

    /**
     * No comment (yet!)
     */
    get parent_rotation1() {return new SQLCell<float, this>(this, 'parent_rotation1')}

    /**
     * No comment (yet!)
     */
    get parent_rotation2() {return new SQLCell<float, this>(this, 'parent_rotation2')}

    /**
     * No comment (yet!)
     */
    get parent_rotation3() {return new SQLCell<float, this>(this, 'parent_rotation3')}

    /**
     * No comment (yet!)
     */
    get invisibilityType() {return new SQLCell<tinyint, this>(this, 'invisibilityType')}

    /**
     * No comment (yet!)
     */
    get invisibilityValue() {return new SQLCell<int, this>(this, 'invisibilityValue')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid : int, c? : gameobject_addonCreator) : this {
        return this.cloneInternal([guid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_addonCreator = {
    guid? : int,
    parent_rotation0? : float,
    parent_rotation1? : float,
    parent_rotation2? : float,
    parent_rotation3? : float,
    invisibilityType? : tinyint,
    invisibilityValue? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_addonQuery = {
    guid? : Relation<int>,
    parent_rotation0? : Relation<float>,
    parent_rotation1? : Relation<float>,
    parent_rotation2? : Relation<float>,
    parent_rotation3? : Relation<float>,
    invisibilityType? : Relation<tinyint>,
    invisibilityValue? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gameobject_addonTable extends SqlTable<
    gameobject_addonCreator,
    gameobject_addonQuery,
    gameobject_addonRow> {
    add(guid : int, c? : gameobject_addonCreator) : gameobject_addonRow {
        const first = this.first();
        if(first) return first.clone(guid,c)
        else return this.rowCreator(this, {}).clone(guid,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gameobject_addon = new gameobject_addonTable(
    'gameobject_addon',
    (table, obj)=>new gameobject_addonRow(table, obj))