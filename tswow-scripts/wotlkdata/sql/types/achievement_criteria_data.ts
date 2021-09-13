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
import { char, mediumint, tinyint } from '../../primitives'
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
export class achievement_criteria_dataRow extends SqlRow<achievement_criteria_dataCreator,achievement_criteria_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get criteria_id() {return new SQLCellReadOnly<mediumint, this>(this, 'criteria_id')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get type() {return new SQLCellReadOnly<tinyint, this>(this, 'type')}

    /**
     * No comment (yet!)
     */
    get value1() {return new SQLCell<mediumint, this>(this, 'value1')}

    /**
     * No comment (yet!)
     */
    get value2() {return new SQLCell<mediumint, this>(this, 'value2')}

    /**
     * No comment (yet!)
     */
    get ScriptName() {return new SQLCell<char, this>(this, 'ScriptName')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(criteria_id : mediumint,type : tinyint, c? : achievement_criteria_dataCreator) : this {
        return this.cloneInternal([criteria_id,type],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type achievement_criteria_dataCreator = {
    criteria_id? : mediumint,
    type? : tinyint,
    value1? : mediumint,
    value2? : mediumint,
    ScriptName? : char,
}

/**
 * Used for object queries (Don't comment these)
 */
export type achievement_criteria_dataQuery = {
    criteria_id? : Relation<mediumint>,
    type? : Relation<tinyint>,
    value1? : Relation<mediumint>,
    value2? : Relation<mediumint>,
    ScriptName? : Relation<char>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class achievement_criteria_dataTable extends SqlTable<
    achievement_criteria_dataCreator,
    achievement_criteria_dataQuery,
    achievement_criteria_dataRow> {
    add(criteria_id : mediumint,type : tinyint, c? : achievement_criteria_dataCreator) : achievement_criteria_dataRow {
        const first = this.first();
        if(first) return first.clone(criteria_id,type,c)
        else return this.rowCreator(this, {}).clone(criteria_id,type,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_achievement_criteria_data = new achievement_criteria_dataTable(
    'achievement_criteria_data',
    (table, obj)=>new achievement_criteria_dataRow(table, obj))