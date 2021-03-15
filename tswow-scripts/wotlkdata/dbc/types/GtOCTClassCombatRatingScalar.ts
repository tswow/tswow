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
import { DBCRow } from '../DBCRow'
import { DBCFile } from '../DBCFile'
import { Relation } from '../../query/Relations'
import { DBCUIntCell , DBCFloatCell} from '../DBCCell'
import { uint , float} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

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
    add(c? : GtOCTClassCombatRatingScalarCreator) : GtOCTClassCombatRatingScalarRow {
        return this.makeRow(0).clone(c)
    }
}

/**
 * Table singleton (Object used by 'DBC' namespace)
 * - Add file comments to DBCFiles.ts
 */
export const DBC_GtOCTClassCombatRatingScalar = new GtOCTClassCombatRatingScalarDBCFile(
    'gtOCTClassCombatRatingScalar',
    (table,buffer,offset)=>new GtOCTClassCombatRatingScalarRow(table,buffer,offset))
