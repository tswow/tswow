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
import { float, mediumint, smallint, tinyint } from '../../data/primitives'
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
export class playercreateinfoRow extends SqlRow<playercreateinfoCreator,playercreateinfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get race() {return new SQLCellReadOnly<tinyint, this>(this, 'race')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get class() {return new SQLCellReadOnly<tinyint, this>(this, 'class')}

    /**
     * No comment (yet!)
     */
    get map() {return new SQLCell<smallint, this>(this, 'map')}

    /**
     * No comment (yet!)
     */
    get zone() {return new SQLCell<mediumint, this>(this, 'zone')}

    /**
     * No comment (yet!)
     */
    get position_x() {return new SQLCell<float, this>(this, 'position_x')}

    /**
     * No comment (yet!)
     */
    get position_y() {return new SQLCell<float, this>(this, 'position_y')}

    /**
     * No comment (yet!)
     */
    get position_z() {return new SQLCell<float, this>(this, 'position_z')}

    /**
     * No comment (yet!)
     */
    get orientation() {return new SQLCell<float, this>(this, 'orientation')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(race : tinyint,cls : tinyint, c? : playercreateinfoCreator) : this {
        return this.cloneInternal([race,cls],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfoCreator = {
    race? : tinyint,
    class? : tinyint,
    map? : smallint,
    zone? : mediumint,
    position_x? : float,
    position_y? : float,
    position_z? : float,
    orientation? : float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfoQuery = {
    race? : Relation<tinyint>,
    class? : Relation<tinyint>,
    map? : Relation<smallint>,
    zone? : Relation<mediumint>,
    position_x? : Relation<float>,
    position_y? : Relation<float>,
    position_z? : Relation<float>,
    orientation? : Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class playercreateinfoTable extends SqlTable<
    playercreateinfoCreator,
    playercreateinfoQuery,
    playercreateinfoRow> {
    add(race : tinyint,cls : tinyint, c? : playercreateinfoCreator) : playercreateinfoRow {
        const first = this.first();
        if(first) return first.clone(race,cls,c)
        else return this.rowCreator(this, {}).clone(race,cls,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_playercreateinfo = new playercreateinfoTable(
    'playercreateinfo',
    (table, obj)=>new playercreateinfoRow(table, obj))