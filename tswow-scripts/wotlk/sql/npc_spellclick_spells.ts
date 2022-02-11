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
import { int, smallint, tinyint } from '../../data/primitives'
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
export class npc_spellclick_spellsRow extends SqlRow<npc_spellclick_spellsCreator,npc_spellclick_spellsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get npc_entry() {return new SQLCellReadOnly<int, this>(this, 'npc_entry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spell_id() {return new SQLCellReadOnly<int, this>(this, 'spell_id')}

    /**
     * No comment (yet!)
     */
    get cast_flags() {return new SQLCell<tinyint, this>(this, 'cast_flags')}

    /**
     * No comment (yet!)
     */
    get user_type() {return new SQLCell<smallint, this>(this, 'user_type')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(npc_entry : int,spell_id : int, c? : npc_spellclick_spellsCreator) : this {
        return this.cloneInternal([npc_entry,spell_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type npc_spellclick_spellsCreator = {
    npc_entry? : int,
    spell_id? : int,
    cast_flags? : tinyint,
    user_type? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type npc_spellclick_spellsQuery = {
    npc_entry? : Relation<int>,
    spell_id? : Relation<int>,
    cast_flags? : Relation<tinyint>,
    user_type? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class npc_spellclick_spellsTable extends SqlTable<
    npc_spellclick_spellsCreator,
    npc_spellclick_spellsQuery,
    npc_spellclick_spellsRow> {
    add(npc_entry : int,spell_id : int, c? : npc_spellclick_spellsCreator) : npc_spellclick_spellsRow {
        const first = this.first();
        if(first) return first.clone(npc_entry,spell_id,c)
        else return this.rowCreator(this, {}).clone(npc_entry,spell_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_npc_spellclick_spells = new npc_spellclick_spellsTable(
    'npc_spellclick_spells',
    (table, obj)=>new npc_spellclick_spellsRow(table, obj))