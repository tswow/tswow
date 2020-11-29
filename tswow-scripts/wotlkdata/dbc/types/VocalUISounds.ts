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
import { DBCKeyCell , DBCIntCell , DBCIntArrayCell} from '../DBCCell'
import { int} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class VocalUISoundsRow extends DBCRow<VocalUISoundsCreator,VocalUISoundsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}
    
    /**
     * No comment (yet!)
     */
    get VocalUIEnum() { return new DBCIntCell(this,this.buffer,this.offset+4)}
    
    /**
     * No comment (yet!)
     */
    get RaceID() { return new DBCIntCell(this,this.buffer,this.offset+8)}
    
    /**
     * No comment (yet!)
     */
    get NormalSoundID() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+12)}
    
    /**
     * No comment (yet!)
     */
    get PissedSoundID() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+20)}
    
    /**
     * Creates a clone of this row with new primary keys.
     * 
     * Cloned rows are automatically added at the end of the DBC file.
     */ 
    clone(ID : int, c? : VocalUISoundsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type VocalUISoundsCreator = {
    VocalUIEnum?: int
    RaceID?: int
    NormalSoundID?: int
    PissedSoundID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type VocalUISoundsQuery = {
    ID? : Relation<int>
    VocalUIEnum? : Relation<int>
    RaceID? : Relation<int>
    NormalSoundID? : Relation<int>
    PissedSoundID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class VocalUISoundsDBCFile extends DBCFile<
    VocalUISoundsCreator,
    VocalUISoundsQuery,
    VocalUISoundsRow> {
    add(ID : int, c? : VocalUISoundsCreator) : VocalUISoundsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}

/**
 * Table singleton (Object used by 'DBC' namespace)
 * - Add file comments to DBCFiles.ts
 */
export const DBC_VocalUISounds = new VocalUISoundsDBCFile(
    'VocalUISounds',
    (table,buffer,offset)=>new VocalUISoundsRow(table,buffer,offset))
