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
import { DBCKeyCell , DBCFloatCell , DBCIntCell , DBCStringCell} from '../DBCCell'
import { int , float} from '../../primitives'
import { PrimaryKey } from '../../table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SoundEmittersRow extends DBCRow<SoundEmittersCreator,SoundEmittersQuery> {
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
    get PositionX() { return new DBCFloatCell(this,this.buffer,this.offset+4)}
    
    /**
     * No comment (yet!)
     */
    get PositionY() { return new DBCFloatCell(this,this.buffer,this.offset+8)}
    
    /**
     * No comment (yet!)
     */
    get PositionZ() { return new DBCFloatCell(this,this.buffer,this.offset+12)}
    
    /**
     * No comment (yet!)
     */
    get DirectionX() { return new DBCFloatCell(this,this.buffer,this.offset+16)}
    
    /**
     * No comment (yet!)
     */
    get DirectionY() { return new DBCFloatCell(this,this.buffer,this.offset+20)}
    
    /**
     * No comment (yet!)
     */
    get DirectionZ() { return new DBCFloatCell(this,this.buffer,this.offset+24)}
    
    /**
     * No comment (yet!)
     */
    get SoundEntriesID() { return new DBCIntCell(this,this.buffer,this.offset+28)}
    
    /**
     * No comment (yet!)
     */
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+32)}
    
    /**
     * No comment (yet!)
     */
    get Name() { return new DBCStringCell(this,this.buffer,this.offset+36)}
    
    /**
     * Creates a clone of this row with new primary keys.
     * 
     * Cloned rows are automatically added at the end of the DBC file.
     */ 
    clone(ID : int, c? : SoundEmittersCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SoundEmittersCreator = {
    PositionX?: float
    PositionY?: float
    PositionZ?: float
    DirectionX?: float
    DirectionY?: float
    DirectionZ?: float
    SoundEntriesID?: int
    MapID?: int
    Name?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type SoundEmittersQuery = {
    ID? : Relation<int>
    PositionX? : Relation<float>
    PositionY? : Relation<float>
    PositionZ? : Relation<float>
    DirectionX? : Relation<float>
    DirectionY? : Relation<float>
    DirectionZ? : Relation<float>
    SoundEntriesID? : Relation<int>
    MapID? : Relation<int>
    Name? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SoundEmittersDBCFile extends DBCFile<
    SoundEmittersCreator,
    SoundEmittersQuery,
    SoundEmittersRow> {
    add(ID : int, c? : SoundEmittersCreator) : SoundEmittersRow {
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
export const DBC_SoundEmitters = new SoundEmittersDBCFile(
    'SoundEmitters',
    (table,buffer,offset)=>new SoundEmittersRow(table,buffer,offset))
