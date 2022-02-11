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
import { int, mediumint, smallint, text, tinyint } from '../../data/primitives'
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
export class trainerRow extends SqlRow<trainerCreator,trainerQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Id() {return new SQLCellReadOnly<int, this>(this, 'Id')}

    /**
     * No comment (yet!)
     */
    get Type() {return new SQLCell<tinyint, this>(this, 'Type')}

    /**
     * No comment (yet!)
     */
    get Requirement() {return new SQLCell<mediumint, this>(this, 'Requirement')}

    /**
     * No comment (yet!)
     */
    get Greeting() {return new SQLCell<text, this>(this, 'Greeting')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Custom tswow field
     */
    get raceMask() { return new SQLCell<int,this>(this, 'raceMask')}

    /**
     * Custom tswow field
     */
    get classMask() { return new SQLCell<int,this>(this, 'classMask')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Id : int, c? : trainerCreator) : this {
        return this.cloneInternal([Id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type trainerCreator = {
    Id? : int,
    Type? : tinyint,
    Requirement? : mediumint,
    Greeting? : text,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type trainerQuery = {
    Id? : Relation<int>,
    Type? : Relation<tinyint>,
    Requirement? : Relation<mediumint>,
    Greeting? : Relation<text>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class trainerTable extends SqlTable<
    trainerCreator,
    trainerQuery,
    trainerRow> {
    add(Id : int, c? : trainerCreator) : trainerRow {
        const first = this.first();
        if(first) return first.clone(Id,c)
        else return this.rowCreator(this, {}).clone(Id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_trainer = new trainerTable(
    'trainer',
    (table, obj)=>new trainerRow(table, obj))