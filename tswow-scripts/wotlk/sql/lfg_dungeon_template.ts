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
import { float, int, smallint, varchar } from '../../data/primitives'
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
export class lfg_dungeon_templateRow extends SqlRow<lfg_dungeon_templateCreator,lfg_dungeon_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get dungeonId() {return new SQLCellReadOnly<int, this>(this, 'dungeonId')}

    /**
     * No comment (yet!)
     */
    get name() {return new SQLCell<varchar, this>(this, 'name')}

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
     * No comment (yet!)
     */
    get VerifiedBuild() {return new SQLCell<smallint, this>(this, 'VerifiedBuild')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(dungeonId : int, c? : lfg_dungeon_templateCreator) : this {
        return this.cloneInternal([dungeonId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type lfg_dungeon_templateCreator = {
    dungeonId? : int,
    name? : varchar,
    position_x? : float,
    position_y? : float,
    position_z? : float,
    orientation? : float,
    VerifiedBuild? : smallint,
}

/**
 * Used for object queries (Don't comment these)
 */
export type lfg_dungeon_templateQuery = {
    dungeonId? : Relation<int>,
    name? : Relation<varchar>,
    position_x? : Relation<float>,
    position_y? : Relation<float>,
    position_z? : Relation<float>,
    orientation? : Relation<float>,
    VerifiedBuild? : Relation<smallint>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class lfg_dungeon_templateTable extends SqlTable<
    lfg_dungeon_templateCreator,
    lfg_dungeon_templateQuery,
    lfg_dungeon_templateRow> {
    add(dungeonId : int, c? : lfg_dungeon_templateCreator) : lfg_dungeon_templateRow {
        const first = this.first();
        if(first) return first.clone(dungeonId,c)
        else return this.rowCreator(this, {}).clone(dungeonId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_lfg_dungeon_template = new lfg_dungeon_templateTable(
    'lfg_dungeon_template',
    (table, obj)=>new lfg_dungeon_templateRow(table, obj))