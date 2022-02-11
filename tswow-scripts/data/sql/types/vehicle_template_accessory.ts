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
import { int, mediumint, text, tinyint } from '../../primitives'
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
export class vehicle_template_accessoryRow extends SqlRow<vehicle_template_accessoryCreator,vehicle_template_accessoryQuery> {
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
    get accessory_entry() {return new SQLCell<mediumint, this>(this, 'accessory_entry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get seat_id() {return new SQLCellReadOnly<tinyint, this>(this, 'seat_id')}

    /**
     * No comment (yet!)
     */
    get minion() {return new SQLCell<tinyint, this>(this, 'minion')}

    /**
     * No comment (yet!)
     */
    get description() {return new SQLCell<text, this>(this, 'description')}

    /**
     * No comment (yet!)
     */
    get summontype() {return new SQLCell<tinyint, this>(this, 'summontype')}

    /**
     * No comment (yet!)
     */
    get summontimer() {return new SQLCell<int, this>(this, 'summontimer')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : mediumint,seat_id : tinyint, c? : vehicle_template_accessoryCreator) : this {
        return this.cloneInternal([entry,seat_id],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type vehicle_template_accessoryCreator = {
    entry? : mediumint,
    accessory_entry? : mediumint,
    seat_id? : tinyint,
    minion? : tinyint,
    description? : text,
    summontype? : tinyint,
    summontimer? : int,
}

/**
 * Used for object queries (Don't comment these)
 */
export type vehicle_template_accessoryQuery = {
    entry? : Relation<mediumint>,
    accessory_entry? : Relation<mediumint>,
    seat_id? : Relation<tinyint>,
    minion? : Relation<tinyint>,
    description? : Relation<text>,
    summontype? : Relation<tinyint>,
    summontimer? : Relation<int>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class vehicle_template_accessoryTable extends SqlTable<
    vehicle_template_accessoryCreator,
    vehicle_template_accessoryQuery,
    vehicle_template_accessoryRow> {
    add(entry : mediumint,seat_id : tinyint, c? : vehicle_template_accessoryCreator) : vehicle_template_accessoryRow {
        const first = this.first();
        if(first) return first.clone(entry,seat_id,c)
        else return this.rowCreator(this, {}).clone(entry,seat_id,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_vehicle_template_accessory = new vehicle_template_accessoryTable(
    'vehicle_template_accessory',
    (table, obj)=>new vehicle_template_accessoryRow(table, obj))