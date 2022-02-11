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
import { float, mediumint, smallint, text } from '../../data/primitives'
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
export class areatrigger_teleportRow extends SqlRow<areatrigger_teleportCreator,areatrigger_teleportQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() {return new SQLCellReadOnly<mediumint, this>(this, 'ID')}

    /**
     * No comment (yet!)
     */
    get Name() {return new SQLCell<text, this>(this, 'Name')}

    /**
     * No comment (yet!)
     */
    get target_map() {return new SQLCell<smallint, this>(this, 'target_map')}

    /**
     * No comment (yet!)
     */
    get target_position_x() {return new SQLCell<float, this>(this, 'target_position_x')}

    /**
     * No comment (yet!)
     */
    get target_position_y() {return new SQLCell<float, this>(this, 'target_position_y')}

    /**
     * No comment (yet!)
     */
    get target_position_z() {return new SQLCell<float, this>(this, 'target_position_z')}

    /**
     * No comment (yet!)
     */
    get target_orientation() {return new SQLCell<float, this>(this, 'target_orientation')}

    /**
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID : mediumint, c? : areatrigger_teleportCreator) : this {
        return this.cloneInternal([ID],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type areatrigger_teleportCreator = {
    ID? : mediumint,
    Name? : text,
    target_map? : smallint,
    target_position_x? : float,
    target_position_y? : float,
    target_position_z? : float,
    target_orientation? : float,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type areatrigger_teleportQuery = {
    ID? : Relation<mediumint>,
    Name? : Relation<text>,
    target_map? : Relation<smallint>,
    target_position_x? : Relation<float>,
    target_position_y? : Relation<float>,
    target_position_z? : Relation<float>,
    target_orientation? : Relation<float>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class areatrigger_teleportTable extends SqlTable<
    areatrigger_teleportCreator,
    areatrigger_teleportQuery,
    areatrigger_teleportRow> {
    add(ID : mediumint, c? : areatrigger_teleportCreator) : areatrigger_teleportRow {
        const first = this.first();
        if(first) return first.clone(ID,c)
        else return this.rowCreator(this, {}).clone(ID,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_areatrigger_teleport = new areatrigger_teleportTable(
    'areatrigger_teleport',
    (table, obj)=>new areatrigger_teleportRow(table, obj))