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
import { tinyint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'
import { PrimaryKey } from '../../data/table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class class_has_runesRow extends SqlRow<class_has_runesCreator,class_has_runesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get classID() {return new SQLCellReadOnly<tinyint, this>(this, 'classID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get raceID() {return new SQLCellReadOnly<tinyint, this>(this, 'raceID')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(cls : tinyint,race : tinyint, c? : class_has_runesCreator) : this {
        return this.cloneInternal([cls,race],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type class_has_runesCreator = {
    classID? : tinyint,
    raceID? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type class_has_runesQuery = {
    classID? : Relation<tinyint>,
    raceID? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class class_has_runesTable extends SqlTable<
    class_has_runesCreator,
    class_has_runesQuery,
    class_has_runesRow> {
    add(cls : tinyint,race : tinyint, c? : class_has_runesCreator) : class_has_runesRow {
        const first = this.first();
        if(first) return first.clone(cls,race,c)
        else return this.rowCreator(this, {}).clone(cls,race)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_class_has_runes = new class_has_runesTable(
    'class_has_runes',
    (table, obj)=>new class_has_runesRow(table, obj))