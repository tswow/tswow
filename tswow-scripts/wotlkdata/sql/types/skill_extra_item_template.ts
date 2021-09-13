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
import { float, mediumint, tinyint } from '../../primitives'
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
export class skill_extra_item_templateRow extends SqlRow<skill_extra_item_templateCreator,skill_extra_item_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spellId() {return new SQLCellReadOnly<mediumint, this>(this, 'spellId')}

    /**
     * No comment (yet!)
     */
    get requiredSpecialization() {return new SQLCell<mediumint, this>(this, 'requiredSpecialization')}

    /**
     * No comment (yet!)
     */
    get additionalCreateChance() {return new SQLCell<float, this>(this, 'additionalCreateChance')}

    /**
     * No comment (yet!)
     */
    get additionalMaxNum() {return new SQLCell<tinyint, this>(this, 'additionalMaxNum')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spellId : mediumint, c? : skill_extra_item_templateCreator) : this {
        return this.cloneInternal([spellId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type skill_extra_item_templateCreator = {
    spellId? : mediumint,
    requiredSpecialization? : mediumint,
    additionalCreateChance? : float,
    additionalMaxNum? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type skill_extra_item_templateQuery = {
    spellId? : Relation<mediumint>,
    requiredSpecialization? : Relation<mediumint>,
    additionalCreateChance? : Relation<float>,
    additionalMaxNum? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class skill_extra_item_templateTable extends SqlTable<
    skill_extra_item_templateCreator,
    skill_extra_item_templateQuery,
    skill_extra_item_templateRow> {
    add(spellId : mediumint, c? : skill_extra_item_templateCreator) : skill_extra_item_templateRow {
        const first = this.first();
        if(first) return first.clone(spellId,c)
        else return this.rowCreator(this, {}).clone(spellId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_skill_extra_item_template = new skill_extra_item_templateTable(
    'skill_extra_item_template',
    (table, obj)=>new skill_extra_item_templateRow(table, obj))