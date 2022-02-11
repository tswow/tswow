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
import { float, uint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { DBCFloatCell, DBCUIntCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class GtOCTClassCombatRatingScalarRow extends DBCRow<GtOCTClassCombatRatingScalarCreator,GtOCTClassCombatRatingScalarQuery> {
    /**
     * No comment (yet!)
     */
    get ID() { return new DBCUIntCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get Data() { return new DBCFloatCell(this,this.buffer,this.offset+4)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(c?: GtOCTClassCombatRatingScalarCreator) : this {
        return this.cloneInternal([],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type GtOCTClassCombatRatingScalarCreator = {
    ID?: uint
    Data?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type GtOCTClassCombatRatingScalarQuery = {
    ID? : Relation<uint>
    Data? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class GtOCTClassCombatRatingScalarDBCFile extends DBCFile<
    GtOCTClassCombatRatingScalarCreator,
    GtOCTClassCombatRatingScalarQuery,
    GtOCTClassCombatRatingScalarRow> {
    constructor() {
        super('GtOCTClassCombatRatingScalar',(t,b,o)=>new GtOCTClassCombatRatingScalarRow(t,b,o))
    }
    /** Loads a new GtOCTClassCombatRatingScalar.dbc from a file. */
    static read(path: string): GtOCTClassCombatRatingScalarDBCFile {
        return new GtOCTClassCombatRatingScalarDBCFile().read(path);
    }
    add(c? : GtOCTClassCombatRatingScalarCreator) : GtOCTClassCombatRatingScalarRow {
        return this.makeRow(0).clone(c)
    }
}