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
import { mediumint, tinyint } from '../../data/primitives'
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
export class exploration_basexpRow extends SqlRow<exploration_basexpCreator,exploration_basexpQuery> {
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
    get basexp() {return new SQLCell<mediumint, this>(this, 'basexp')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(level : tinyint, c? : exploration_basexpCreator) : this {
        return this.cloneInternal([level],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type exploration_basexpCreator = {
    level? : tinyint,
    basexp? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type exploration_basexpQuery = {
    level? : Relation<tinyint>,
    basexp? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class exploration_basexpTable extends SqlTable<
    exploration_basexpCreator,
    exploration_basexpQuery,
    exploration_basexpRow> {
    add(level : tinyint, c? : exploration_basexpCreator) : exploration_basexpRow {
        const first = this.first();
        if(first) return first.clone(level,c)
        else return this.rowCreator(this, {}).clone(level,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_exploration_basexp = new exploration_basexpTable(
    'exploration_basexp',
    (table, obj)=>new exploration_basexpRow(table, obj))