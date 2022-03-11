/*
  * Copyright (C) 2022 tswow <https://github.com/tswow/>
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
import { mediumint, text, tinyint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell'
import { SqlRow } from '../../data/sql/SQLRow'
import { SqlTable } from '../../data/sql/SQLTable'
import { PrimaryKey } from '../../data/table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class spell_linked_spellRow extends SqlRow<spell_linked_spellCreator,spell_linked_spellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spell_trigger() {return new SQLCellReadOnly<mediumint, this>(this, 'spell_trigger')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spell_effect() {return new SQLCellReadOnly<mediumint, this>(this, 'spell_effect')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get type() {return new SQLCell<tinyint, this>(this, 'type')}

    /**
     * No comment (yet!)
     */
    get comment() {return new SQLCell<text, this>(this, 'comment')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell_trigger: mediumint, spell_effect: mediumint,type: tinyint, c? : spell_linked_spellCreator) : this {
        return this.cloneInternal([spell_trigger,spell_effect,type],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_linked_spellCreator = {
    comment?: text,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_linked_spellQuery = {
    spell_trigger?: Relation<mediumint>,
    spell_effect?: Relation<mediumint>,
    type?: Relation<mediumint>,
    comment?: Relation<text>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_linked_spellTable extends SqlTable<
    spell_linked_spellCreator,
    spell_linked_spellQuery,
    spell_linked_spellRow> {
    add(spell_trigger: mediumint, spell_effect: mediumint,type: tinyint, c? : spell_linked_spellCreator) : spell_linked_spellRow {
        const first = this.first();
        if(first) return first.clone(spell_trigger,spell_effect,type,c)
        else return this.rowCreator(this, {}).clone(spell_trigger,spell_effect,type,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_linked_spell = new spell_linked_spellTable(
    'spell_linked_spell',
    (table, obj)=>new spell_linked_spellRow(table, obj))