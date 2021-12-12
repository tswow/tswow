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
import { float, mediumint, tinyint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { SQLCellReadOnly } from '../SQLCell'
import { SqlRow } from '../SQLRow'
import { SqlTable } from '../SQLTable'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class battleground_setsRow extends SqlRow<battleground_setsCreator,battleground_setsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get set() {return new SQLCellReadOnly<mediumint, this>(this, 'set')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get battleground() {return new SQLCellReadOnly<tinyint, this>(this, 'battleground')}



    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(battleground: mediumint,map: tinyint, c? : battleground_setsCreator) : this {
        return this.cloneInternal([battleground,map],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type battleground_setsCreator = {
    weight?: float
}

/**
 * Used for object queries (Don't comment these)
 */
export type battleground_setsQuery = {
    set?: Relation<mediumint>,
    battleground?: Relation<mediumint>
    weight?: Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class battleground_setsTable extends SqlTable<
    battleground_setsCreator,
    battleground_setsQuery,
    battleground_setsRow> {
    add(set: mediumint,battleground: mediumint, c? : battleground_setsCreator) : battleground_setsRow {
        const first = this.first();
        if(first) return first.clone(set,battleground,c)
        else return this.rowCreator(this, {}).clone(set,battleground,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_battleground_sets = new battleground_setsTable(
    'battleground_sets',
    (table, obj)=>new battleground_setsRow(table, obj))