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
import { float, int, smallint, tinyint } from '../../primitives'
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
export class script_spline_chain_metaRow extends SqlRow<script_spline_chain_metaCreator,script_spline_chain_metaQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get entry() {return new SQLCellReadOnly<int, this>(this, 'entry')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get chainId() {return new SQLCellReadOnly<smallint, this>(this, 'chainId')}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get splineId() {return new SQLCellReadOnly<tinyint, this>(this, 'splineId')}

    /**
     * No comment (yet!)
     */
    get expectedDuration() {return new SQLCell<int, this>(this, 'expectedDuration')}

    /**
     * No comment (yet!)
     */
    get msUntilNext() {return new SQLCell<int, this>(this, 'msUntilNext')}

    /**
     * No comment (yet!)
     */
    get velocity() {return new SQLCell<float, this>(this, 'velocity')}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry : int,chainId : smallint,splineId : tinyint, c? : script_spline_chain_metaCreator) : this {
        return this.cloneInternal([entry,chainId,splineId],c)
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type script_spline_chain_metaCreator = {
    entry? : int,
    chainId? : smallint,
    splineId? : tinyint,
    expectedDuration? : int,
    msUntilNext? : int,
    velocity? : float,
}

/**
 * Used for object queries (Don't comment these)
 */
export type script_spline_chain_metaQuery = {
    entry? : Relation<int>,
    chainId? : Relation<smallint>,
    splineId? : Relation<tinyint>,
    expectedDuration? : Relation<int>,
    msUntilNext? : Relation<int>,
    velocity? : Relation<float>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export class script_spline_chain_metaTable extends SqlTable<
    script_spline_chain_metaCreator,
    script_spline_chain_metaQuery,
    script_spline_chain_metaRow> {
    add(entry : int,chainId : smallint,splineId : tinyint, c? : script_spline_chain_metaCreator) : script_spline_chain_metaRow {
        const first = this.first();
        if(first) return first.clone(entry,chainId,splineId,c)
        else return this.rowCreator(this, {}).clone(entry,chainId,splineId,c)
    }
}

/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export const SQL_script_spline_chain_meta = new script_spline_chain_metaTable(
    'script_spline_chain_meta',
    (table, obj)=>new script_spline_chain_metaRow(table, obj))