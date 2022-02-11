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
import { longtext, varchar } from '../../primitives'
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
export class commandRow extends SqlRow<commandCreator,commandQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get name() {return new SQLCellReadOnly<varchar, this>(this, 'name')}

    /**
     * No comment (yet!)
     */
    get help() {return new SQLCell<longtext, this>(this, 'help')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(name : varchar, c? : commandCreator) : this {
        return this.cloneInternal([name],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type commandCreator = {
    name? : varchar,
    help? : longtext,
}

/**
 * Used for object queries (Don't comment these)
 */
export type commandQuery = {
    name? : Relation<varchar>,
    help? : Relation<longtext>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class commandTable extends SqlTable<
    commandCreator,
    commandQuery,
    commandRow> {
    add(name : varchar, c? : commandCreator) : commandRow {
        const first = this.first();
        if(first) return first.clone(name,c)
        else return this.rowCreator(this, {}).clone(name,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_command = new commandTable(
    'command',
    (table, obj)=>new commandRow(table, obj))