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
import { mediumint, smallint, tinyint } from '../../primitives'
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
export class creature_template_spellRow extends SqlRow<creature_template_spellCreator,creature_template_spellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get CreatureID() {return new SQLCellReadOnly<mediumint, this>(this, 'CreatureID')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get Index() {return new SQLCellReadOnly<tinyint, this>(this, 'Index')}

    /**
     * No comment (yet!)
     */
    get Spell() {return new SQLCell<mediumint, this>(this, 'Spell')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID : mediumint,Index : tinyint, c? : creature_template_spellCreator) : this {
        return this.cloneInternal([CreatureID,Index],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_spellCreator = {
    CreatureID? : mediumint,
    Index? : tinyint,
    Spell? : mediumint,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_spellQuery = {
    CreatureID? : Relation<mediumint>,
    Index? : Relation<tinyint>,
    Spell? : Relation<mediumint>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_template_spellTable extends SqlTable<
    creature_template_spellCreator,
    creature_template_spellQuery,
    creature_template_spellRow> {
    add(CreatureID : mediumint,Index : tinyint, c? : creature_template_spellCreator) : creature_template_spellRow {
        const first = this.first();
        if(first) return first.clone(CreatureID,Index,c)
        else return this.rowCreator(this, {}).clone(CreatureID,Index,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_template_spell = new creature_template_spellTable(
    'creature_template_spell',
    (table, obj)=>new creature_template_spellRow(table, obj))