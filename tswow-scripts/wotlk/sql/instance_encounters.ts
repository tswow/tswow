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
import { int, smallint, tinyint, varchar } from '../../data/primitives'
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
export class instance_encountersRow extends SqlRow<instance_encountersCreator,instance_encountersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<int, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get creditType() {return new SQLCell<tinyint, this>(this, 'creditType')}

    /**
     * No comment (yet!)
     */
    get creditEntry() {return new SQLCell<int, this>(this, 'creditEntry')}

    /**
     * No comment (yet!)
     */
    get lastEncounterDungeon() {return new SQLCell<smallint, this>(this, 'lastEncounterDungeon')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<varchar, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : int, c? : instance_encountersCreator) : this {
        return this.cloneInternal([entry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type instance_encountersCreator = {
    entry? : int,
    creditType? : tinyint,
    creditEntry? : int,
    lastEncounterDungeon? : smallint,
    comment? : varchar,
}

/**
 * Used for object queries (Don't comment these)
 */
export type instance_encountersQuery = {
    entry? : Relation<int>,
    creditType? : Relation<tinyint>,
    creditEntry? : Relation<int>,
    lastEncounterDungeon? : Relation<smallint>,
    comment? : Relation<varchar>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class instance_encountersTable extends SqlTable<
    instance_encountersCreator,
    instance_encountersQuery,
    instance_encountersRow> {
    add(entry : int, c? : instance_encountersCreator) : instance_encountersRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_instance_encounters = new instance_encountersTable(
    'instance_encounters',
    (table, obj)=>new instance_encountersRow(table, obj))