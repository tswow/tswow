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
import { DBCFloatCell} from '../DBCCell'
import { float} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class GtCombatRatingsRow extends DBCRow<GtCombatRatingsCreator,GtCombatRatingsQuery> {
    /**
     * No comment (yet!)
     */
    get Data() { return new DBCFloatCell(this,this.buffer,this.offset+0)}
    
    /**
     * Creates a clone of this row with new primary keys.
     * 
     * Cloned rows are automatically added at the end of the DBC file.
     */ 
    clone(c?: GtCombatRatingsCreator) : this {
        return this.cloneInternal([],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type GtCombatRatingsCreator = {
    Data?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type GtCombatRatingsQuery = {
    Data? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class GtCombatRatingsDBCFile extends DBCFile<
    GtCombatRatingsCreator,
    GtCombatRatingsQuery,
    GtCombatRatingsRow> {
    add(c? : GtCombatRatingsCreator) : GtCombatRatingsRow {
        return this.makeRow(0).clone(c)
    }
}

/**
 * Table singleton (Object used by 'DBC' namespace)
 * - Add file comments to DBCFiles.ts
 */
export const DBC_GtCombatRatings = new GtCombatRatingsDBCFile(
    'gtCombatRatings',
    (table,buffer,offset)=>new GtCombatRatingsRow(table,buffer,offset))
