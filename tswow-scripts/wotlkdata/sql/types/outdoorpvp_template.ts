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
import { char, text, tinyint } from '../../primitives'
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
export class outdoorpvp_templateRow extends SqlRow<outdoorpvp_templateCreator,outdoorpvp_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get TypeId() {return new SQLCellReadOnly<tinyint, this>(this, 'TypeId')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<char, this>(this, 'ScriptName')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<text, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(TypeId : tinyint, c? : outdoorpvp_templateCreator) : this {
        return this.cloneInternal([TypeId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type outdoorpvp_templateCreator = {
    TypeId? : tinyint,
    ScriptName? : char,
    comment? : text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type outdoorpvp_templateQuery = {
    TypeId? : Relation<tinyint>,
    ScriptName? : Relation<char>,
    comment? : Relation<text>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class outdoorpvp_templateTable extends SqlTable<
    outdoorpvp_templateCreator,
    outdoorpvp_templateQuery,
    outdoorpvp_templateRow> {
    add(TypeId : tinyint, c? : outdoorpvp_templateCreator) : outdoorpvp_templateRow {
        const first = this.first();
        if(first) return first.clone(TypeId,c)
        else return this.rowCreator(this, {}).clone(TypeId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_outdoorpvp_template = new outdoorpvp_templateTable(
    'outdoorpvp_template',
    (table, obj)=>new outdoorpvp_templateRow(table, obj))