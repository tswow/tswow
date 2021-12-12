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
import { mediumint } from '../../primitives'
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
export class spell_requiredRow extends SqlRow<spell_requiredCreator,spell_requiredQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spell_id() {return new SQLCellReadOnly<mediumint, this>(this, 'spell_id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get req_spell() {return new SQLCellReadOnly<mediumint, this>(this, 'req_spell')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell_id : mediumint,req_spell : mediumint, c? : spell_requiredCreator) : this {
        return this.cloneInternal([spell_id,req_spell],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_requiredCreator = {
    spell_id? : mediumint,
    req_spell? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_requiredQuery = {
    spell_id? : Relation<mediumint>,
    req_spell? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_requiredTable extends SqlTable<
    spell_requiredCreator,
    spell_requiredQuery,
    spell_requiredRow> {
    add(spell_id : mediumint,req_spell : mediumint, c? : spell_requiredCreator) : spell_requiredRow {
        const first = this.first();
        if(first) return first.clone(spell_id,req_spell,c)
        else return this.rowCreator(this, {}).clone(spell_id,req_spell,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_required = new spell_requiredTable(
    'spell_required',
    (table, obj)=>new spell_requiredRow(table, obj))