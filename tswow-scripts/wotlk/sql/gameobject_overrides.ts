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
import { int, smallint } from '../../data/primitives'
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
export class gameobject_overridesRow extends SqlRow<gameobject_overridesCreator,gameobject_overridesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spawnId() {return new SQLCellReadOnly<int, this>(this, 'spawnId')}

    /**
     * No comment (yet!)
     */
    get faction() {return new SQLCell<smallint, this>(this, 'faction')}

    /**
     * No comment (yet!)
     */
    get flags() {return new SQLCell<int, this>(this, 'flags')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spawnId : int, c? : gameobject_overridesCreator) : this {
        return this.cloneInternal([spawnId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_overridesCreator = {
    spawnId? : int,
    faction? : smallint,
    flags? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_overridesQuery = {
    spawnId? : Relation<int>,
    faction? : Relation<smallint>,
    flags? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class gameobject_overridesTable extends SqlTable<
    gameobject_overridesCreator,
    gameobject_overridesQuery,
    gameobject_overridesRow> {
    add(spawnId : int, c? : gameobject_overridesCreator) : gameobject_overridesRow {
        const first = this.first();
        if(first) return first.clone(spawnId,c)
        else return this.rowCreator(this, {}).clone(spawnId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_gameobject_overrides = new gameobject_overridesTable(
    'gameobject_overrides',
    (table, obj)=>new gameobject_overridesRow(table, obj))