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
import { float, int, tinyint } from '../../data/primitives'
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
export class vehicle_seat_addonRow extends SqlRow<vehicle_seat_addonCreator,vehicle_seat_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SeatEntry() {return new SQLCellReadOnly<int, this>(this, 'SeatEntry')}

    /**
     * No comment (yet!)
     */
    get SeatOrientation() {return new SQLCell<float, this>(this, 'SeatOrientation')}

    /**
     * No comment (yet!)
     */
    get ExitParamX() {return new SQLCell<float, this>(this, 'ExitParamX')}

    /**
     * No comment (yet!)
     */
    get ExitParamY() {return new SQLCell<float, this>(this, 'ExitParamY')}

    /**
     * No comment (yet!)
     */
    get ExitParamZ() {return new SQLCell<float, this>(this, 'ExitParamZ')}

    /**
     * No comment (yet!)
     */
    get ExitParamO() {return new SQLCell<float, this>(this, 'ExitParamO')}

    /**
     * No comment (yet!)
     */
    get ExitParamValue() {return new SQLCell<tinyint, this>(this, 'ExitParamValue')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(SeatEntry : int, c? : vehicle_seat_addonCreator) : this {
        return this.cloneInternal([SeatEntry],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type vehicle_seat_addonCreator = {
    SeatEntry? : int,
    SeatOrientation? : float,
    ExitParamX? : float,
    ExitParamY? : float,
    ExitParamZ? : float,
    ExitParamO? : float,
    ExitParamValue? : tinyint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type vehicle_seat_addonQuery = {
    SeatEntry? : Relation<int>,
    SeatOrientation? : Relation<float>,
    ExitParamX? : Relation<float>,
    ExitParamY? : Relation<float>,
    ExitParamZ? : Relation<float>,
    ExitParamO? : Relation<float>,
    ExitParamValue? : Relation<tinyint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class vehicle_seat_addonTable extends SqlTable<
    vehicle_seat_addonCreator,
    vehicle_seat_addonQuery,
    vehicle_seat_addonRow> {
    add(SeatEntry : int, c? : vehicle_seat_addonCreator) : vehicle_seat_addonRow {
        const first = this.first();
        if(first) return first.clone(SeatEntry,c)
        else return this.rowCreator(this, {}).clone(SeatEntry,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_vehicle_seat_addon = new vehicle_seat_addonTable(
    'vehicle_seat_addon',
    (table, obj)=>new vehicle_seat_addonRow(table, obj))