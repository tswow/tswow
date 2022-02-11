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
import { mediumint, smallint, tinyint } from '../../data/primitives'
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
export class creature_template_resistanceRow extends SqlRow<creature_template_resistanceCreator,creature_template_resistanceQuery> {
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
    get School() {return new SQLCellReadOnly<tinyint, this>(this, 'School')}

    /**
     * No comment (yet!)
     */
    get Resistance() {return new SQLCell<smallint, this>(this, 'Resistance')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID : mediumint,School : tinyint, c? : creature_template_resistanceCreator) : this {
        return this.cloneInternal([CreatureID,School],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_resistanceCreator = {
    CreatureID? : mediumint,
    School? : tinyint,
    Resistance? : smallint,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_resistanceQuery = {
    CreatureID? : Relation<mediumint>,
    School? : Relation<tinyint>,
    Resistance? : Relation<smallint>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_template_resistanceTable extends SqlTable<
    creature_template_resistanceCreator,
    creature_template_resistanceQuery,
    creature_template_resistanceRow> {
    add(CreatureID : mediumint,School : tinyint, c? : creature_template_resistanceCreator) : creature_template_resistanceRow {
        const first = this.first();
        if(first) return first.clone(CreatureID,School,c)
        else return this.rowCreator(this, {}).clone(CreatureID,School,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_template_resistance = new creature_template_resistanceTable(
    'creature_template_resistance',
    (table, obj)=>new creature_template_resistanceRow(table, obj))