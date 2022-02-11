/*
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { mediumint } from '../../data/primitives'
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
export class instance_encounter_achievementRow extends SqlRow<instance_encounter_achievementCreator,instance_encounter_achievementQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<mediumint, this>(this, 'entry')}

    /**
     * No comment (yet!)
     */
    get map() {return new SQLCell<mediumint, this>(this, 'map')}

    /**
     * No comment (yet!)
     */
    get boss() {return new SQLCell<mediumint, this>(this, 'boss')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: mediumint, c? : instance_encounter_achievementCreator) : this {
        return this.cloneInternal([guid],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type instance_encounter_achievementCreator = {
    entry?: mediumint,
    map?: mediumint,
    boss?: mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type instance_encounter_achievementQuery = {
    entry?: Relation<mediumint>,
    map?: Relation<mediumint>,
    boss?: Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class instance_encounter_achievementTable extends SqlTable<
    instance_encounter_achievementCreator,
    instance_encounter_achievementQuery,
    instance_encounter_achievementRow> {
    add(entry: mediumint, c? : instance_encounter_achievementCreator) : instance_encounter_achievementRow {
        const first = this.first();
        if(first) return first.clone(entry,c)
        else return this.rowCreator(this, {}).clone(entry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_instance_encounter_achievement = new instance_encounter_achievementTable(
    'instance_encounter_achievement',
    (table, obj)=>new instance_encounter_achievementRow(table, obj))