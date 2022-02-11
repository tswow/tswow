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
import { int, tinyint } from '../../data/primitives'
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
export class spell_group_stack_rulesRow extends SqlRow<spell_group_stack_rulesCreator,spell_group_stack_rulesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get group_id() {return new SQLCellReadOnly<int, this>(this, 'group_id')}

    /**
     * No comment (yet!)
     */
    get stack_rule() {return new SQLCell<tinyint, this>(this, 'stack_rule')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(group_id : int, c? : spell_group_stack_rulesCreator) : this {
        return this.cloneInternal([group_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_group_stack_rulesCreator = {
    group_id? : int,
    stack_rule? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_group_stack_rulesQuery = {
    group_id? : Relation<int>,
    stack_rule? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_group_stack_rulesTable extends SqlTable<
    spell_group_stack_rulesCreator,
    spell_group_stack_rulesQuery,
    spell_group_stack_rulesRow> {
    add(group_id : int, c? : spell_group_stack_rulesCreator) : spell_group_stack_rulesRow {
        const first = this.first();
        if(first) return first.clone(group_id,c)
        else return this.rowCreator(this, {}).clone(group_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_group_stack_rules = new spell_group_stack_rulesTable(
    'spell_group_stack_rules',
    (table, obj)=>new spell_group_stack_rulesRow(table, obj))