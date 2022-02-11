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
import { mediumint } from '../../data/primitives'
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
export class areatrigger_involvedrelationRow extends SqlRow<areatrigger_involvedrelationCreator,areatrigger_involvedrelationQuery> {
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
    get quest() {return new SQLCell<mediumint, this>(this, 'quest')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id : mediumint, c? : areatrigger_involvedrelationCreator) : this {
        return this.cloneInternal([id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type areatrigger_involvedrelationCreator = {
    id? : mediumint,
    quest? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type areatrigger_involvedrelationQuery = {
    id? : Relation<mediumint>,
    quest? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class areatrigger_involvedrelationTable extends SqlTable<
    areatrigger_involvedrelationCreator,
    areatrigger_involvedrelationQuery,
    areatrigger_involvedrelationRow> {
    add(id : mediumint, c? : areatrigger_involvedrelationCreator) : areatrigger_involvedrelationRow {
        const first = this.first();
        if(first) return first.clone(id,c)
        else return this.rowCreator(this, {}).clone(id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_areatrigger_involvedrelation = new areatrigger_involvedrelationTable(
    'areatrigger_involvedrelation',
    (table, obj)=>new areatrigger_involvedrelationRow(table, obj))