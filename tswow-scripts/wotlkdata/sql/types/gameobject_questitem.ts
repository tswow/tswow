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
import { int, smallint } from '../../primitives'
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
export class gameobject_questitemRow extends SqlRow<gameobject_questitemCreator,gameobject_questitemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get GameObjectEntry() {return new SQLCellReadOnly<int, this>(this, 'GameObjectEntry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Idx() {return new SQLCellReadOnly<int, this>(this, 'Idx')}

    /**
     * No comment (yet!)
     */
    get ItemId() {return new SQLCell<int, this>(this, 'ItemId')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(GameObjectEntry : int,Idx : int, c? : gameobject_questitemCreator) : this {
        return this.cloneInternal([GameObjectEntry,Idx],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_questitemCreator = {
    GameObjectEntry? : int,
    Idx? : int,
    ItemId? : int,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_questitemQuery = {
    GameObjectEntry? : Relation<int>,
    Idx? : Relation<int>,
    ItemId? : Relation<int>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gameobject_questitemTable extends SqlTable<
    gameobject_questitemCreator,
    gameobject_questitemQuery,
    gameobject_questitemRow> {
    add(GameObjectEntry : int,Idx : int, c? : gameobject_questitemCreator) : gameobject_questitemRow {
        const first = this.first();
        if(first) return first.clone(GameObjectEntry,Idx,c)
        else return this.rowCreator(this, {}).clone(GameObjectEntry,Idx,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gameobject_questitem = new gameobject_questitemTable(
    'gameobject_questitem',
    (table, obj)=>new gameobject_questitemRow(table, obj))