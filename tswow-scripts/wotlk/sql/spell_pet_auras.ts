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
export class spell_pet_aurasRow extends SqlRow<spell_pet_aurasCreator,spell_pet_aurasQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spell() {return new SQLCellReadOnly<mediumint, this>(this, 'spell')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get effectId() {return new SQLCellReadOnly<tinyint, this>(this, 'effectId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get pet() {return new SQLCellReadOnly<mediumint, this>(this, 'pet')}

    /**
     * No comment (yet!)
     */
    get aura() {return new SQLCell<mediumint, this>(this, 'aura')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell : mediumint,effectId : tinyint,pet : mediumint, c? : spell_pet_aurasCreator) : this {
        return this.cloneInternal([spell,effectId,pet],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type spell_pet_aurasCreator = {
    spell? : mediumint,
    effectId? : tinyint,
    pet? : mediumint,
    aura? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type spell_pet_aurasQuery = {
    spell? : Relation<mediumint>,
    effectId? : Relation<tinyint>,
    pet? : Relation<mediumint>,
    aura? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class spell_pet_aurasTable extends SqlTable<
    spell_pet_aurasCreator,
    spell_pet_aurasQuery,
    spell_pet_aurasRow> {
    add(spell : mediumint,effectId : tinyint,pet : mediumint, c? : spell_pet_aurasCreator) : spell_pet_aurasRow {
        const first = this.first();
        if(first) return first.clone(spell,effectId,pet,c)
        else return this.rowCreator(this, {}).clone(spell,effectId,pet,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_spell_pet_auras = new spell_pet_aurasTable(
    'spell_pet_auras',
    (table, obj)=>new spell_pet_aurasRow(table, obj))