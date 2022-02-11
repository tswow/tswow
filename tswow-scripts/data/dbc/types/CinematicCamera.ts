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
import { float, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CinematicCameraRow extends DBCRow<CinematicCameraCreator,CinematicCameraQuery> {
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
    get Model() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get OriginX() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get OriginY() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get OriginZ() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get OriginFacing() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CinematicCameraCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CinematicCameraCreator = {
    Model?: string
    SoundID?: int
    OriginX?: float
    OriginY?: float
    OriginZ?: float
    OriginFacing?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type CinematicCameraQuery = {
    ID? : Relation<int>
    Model? : Relation<string>
    SoundID? : Relation<int>
    OriginX? : Relation<float>
    OriginY? : Relation<float>
    OriginZ? : Relation<float>
    OriginFacing? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CinematicCameraDBCFile extends DBCFile<
    CinematicCameraCreator,
    CinematicCameraQuery,
    CinematicCameraRow> {
    constructor() {
        super('CinematicCamera',(t,b,o)=>new CinematicCameraRow(t,b,o))
    }
    /** Loads a new CinematicCamera.dbc from a file. */
    static read(path: string): CinematicCameraDBCFile {
        return new CinematicCameraDBCFile().read(path);
    }
    add(ID : int, c? : CinematicCameraCreator) : CinematicCameraRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}