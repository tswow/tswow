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
import { float, mediumint, tinyint } from '../../data/primitives'
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
export class creature_model_infoRow extends SqlRow<creature_model_infoCreator,creature_model_infoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get DisplayID() {return new SQLCellReadOnly<mediumint, this>(this, 'DisplayID')}

    /**
     * No comment (yet!)
     */
    get BoundingRadius() {return new SQLCell<float, this>(this, 'BoundingRadius')}

    /**
     * No comment (yet!)
     */
    get CombatReach() {return new SQLCell<float, this>(this, 'CombatReach')}

    /**
     * No comment (yet!)
     */
    get Gender() {return new SQLCell<tinyint, this>(this, 'Gender')}

    /**
     * No comment (yet!)
     */
    get DisplayID_Other_Gender() {return new SQLCell<mediumint, this>(this, 'DisplayID_Other_Gender')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(DisplayID : mediumint, c? : creature_model_infoCreator) : this {
        return this.cloneInternal([DisplayID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type creature_model_infoCreator = {
    DisplayID? : mediumint,
    BoundingRadius? : float,
    CombatReach? : float,
    Gender? : tinyint,
    DisplayID_Other_Gender? : mediumint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type creature_model_infoQuery = {
    DisplayID? : Relation<mediumint>,
    BoundingRadius? : Relation<float>,
    CombatReach? : Relation<float>,
    Gender? : Relation<tinyint>,
    DisplayID_Other_Gender? : Relation<mediumint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class creature_model_infoTable extends SqlTable<
    creature_model_infoCreator,
    creature_model_infoQuery,
    creature_model_infoRow> {
    add(DisplayID : mediumint, c? : creature_model_infoCreator) : creature_model_infoRow {
        const first = this.first();
        if(first) return first.clone(DisplayID,c)
        else return this.rowCreator(this, {}).clone(DisplayID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_creature_model_info = new creature_model_infoTable(
    'creature_model_info',
    (table, obj)=>new creature_model_infoRow(table, obj))