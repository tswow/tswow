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
import { mediumint, text } from '../../primitives'
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
export class areatrigger_tavernRow extends SqlRow<areatrigger_tavernCreator,areatrigger_tavernQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get id() {return new SQLCellReadOnly<mediumint, this>(this, 'id')}

    /**
     * No comment (yet!)
     */
    get name() {return new SQLCell<text, this>(this, 'name')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : mediumint, c? : areatrigger_tavernCreator) : this {
        return this.cloneInternal([id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type areatrigger_tavernCreator = {
    id? : mediumint,
    name? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type areatrigger_tavernQuery = {
    id? : Relation<mediumint>,
    name? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class areatrigger_tavernTable extends SqlTable<
    areatrigger_tavernCreator,
    areatrigger_tavernQuery,
    areatrigger_tavernRow> {
    add(id : mediumint, c? : areatrigger_tavernCreator) : areatrigger_tavernRow {
        const first = this.first();
        if(first) return first.clone(id,c)
        else return this.rowCreator(this, {}).clone(id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_areatrigger_tavern = new areatrigger_tavernTable(
    'areatrigger_tavern',
    (table, obj)=>new areatrigger_tavernRow(table, obj))