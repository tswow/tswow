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
import { float } from '../../primitives'
import { Relation } from '../../query/Relations'
import { DBCFloatCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class GtChanceToMeleeCritRow extends DBCRow<GtChanceToMeleeCritCreator,GtChanceToMeleeCritQuery> {
    /**
     * No comment (yet!)
     */
    get Data() { return new DBCFloatCell(this,this.buffer,this.offset+0)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(c?: GtChanceToMeleeCritCreator) : this {
        return this.cloneInternal([],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type GtChanceToMeleeCritCreator = {
    Data?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type GtChanceToMeleeCritQuery = {
    Data? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class GtChanceToMeleeCritDBCFile extends DBCFile<
    GtChanceToMeleeCritCreator,
    GtChanceToMeleeCritQuery,
    GtChanceToMeleeCritRow> {
    constructor() {
        super('GtChanceToMeleeCrit',(t,b,o)=>new GtChanceToMeleeCritRow(t,b,o))
    }
    /** Loads a new GtChanceToMeleeCrit.dbc from a file. */
    static read(path: string): GtChanceToMeleeCritDBCFile {
        return new GtChanceToMeleeCritDBCFile().read(path);
    }
    add(c? : GtChanceToMeleeCritCreator) : GtChanceToMeleeCritRow {
        return this.makeRow(0).clone(c)
    }
}