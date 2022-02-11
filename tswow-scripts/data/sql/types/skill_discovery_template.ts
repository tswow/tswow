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
import { float, mediumint, smallint } from '../../primitives'
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
export class skill_discovery_templateRow extends SqlRow<skill_discovery_templateCreator,skill_discovery_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get spellId() {return new SQLCellReadOnly<mediumint, this>(this, 'spellId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get reqSpell() {return new SQLCellReadOnly<mediumint, this>(this, 'reqSpell')}

    /**
     * No comment (yet!)
     */
    get reqSkillValue() {return new SQLCell<smallint, this>(this, 'reqSkillValue')}

    /**
     * No comment (yet!)
     */
    get chance() {return new SQLCell<float, this>(this, 'chance')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spellId : mediumint,reqSpell : mediumint, c? : skill_discovery_templateCreator) : this {
        return this.cloneInternal([spellId,reqSpell],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type skill_discovery_templateCreator = {
    spellId? : mediumint,
    reqSpell? : mediumint,
    reqSkillValue? : smallint,
    chance? : float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type skill_discovery_templateQuery = {
    spellId? : Relation<mediumint>,
    reqSpell? : Relation<mediumint>,
    reqSkillValue? : Relation<smallint>,
    chance? : Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class skill_discovery_templateTable extends SqlTable<
    skill_discovery_templateCreator,
    skill_discovery_templateQuery,
    skill_discovery_templateRow> {
    add(spellId : mediumint,reqSpell : mediumint, c? : skill_discovery_templateCreator) : skill_discovery_templateRow {
        const first = this.first();
        if(first) return first.clone(spellId,reqSpell,c)
        else return this.rowCreator(this, {}).clone(spellId,reqSpell,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_skill_discovery_template = new skill_discovery_templateTable(
    'skill_discovery_template',
    (table, obj)=>new skill_discovery_templateRow(table, obj))