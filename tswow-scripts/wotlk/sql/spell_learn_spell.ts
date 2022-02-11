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
import { smallint, tinyint } from '../../data/primitives'
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
export class spell_learn_spellRow extends SqlRow<spell_learn_spellCreator,spell_learn_spellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<smallint, this>(this, 'entry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SpellID() {return new SQLCellReadOnly<smallint, this>(this, 'SpellID')}

    /**
     * No comment (yet!)
     */
    get Active() {return new SQLCell<tinyint, this>(this, 'Active')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : smallint,SpellID : smallint, c? : spell_learn_spellCreator) : this {
        return this.cloneInternal([entry,SpellID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_learn_spellCreator = {
    entry? : smallint,
    SpellID? : smallint,
    Active? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_learn_spellQuery = {
    entry? : Relation<smallint>,
    SpellID? : Relation<smallint>,
    Active? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_learn_spellTable extends SqlTable<
    spell_learn_spellCreator,
    spell_learn_spellQuery,
    spell_learn_spellRow> {
    add(entry : smallint,SpellID : smallint, c? : spell_learn_spellCreator) : spell_learn_spellRow {
        const first = this.first();
        if(first) return first.clone(entry,SpellID,c)
        else return this.rowCreator(this, {}).clone(entry,SpellID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_learn_spell = new spell_learn_spellTable(
    'spell_learn_spell',
    (table, obj)=>new spell_learn_spellRow(table, obj))