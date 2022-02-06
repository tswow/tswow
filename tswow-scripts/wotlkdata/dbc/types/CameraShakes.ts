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
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CameraShakesRow extends DBCRow<CameraShakesCreator,CameraShakesQuery> {
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
    get ShakeType() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Direction() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Amplitude() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Frequency() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Duration() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get Phase() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get Coefficient() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CameraShakesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CameraShakesCreator = {
    ShakeType?: int
    Direction?: int
    Amplitude?: float
    Frequency?: float
    Duration?: float
    Phase?: float
    Coefficient?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type CameraShakesQuery = {
    ID? : Relation<int>
    ShakeType? : Relation<int>
    Direction? : Relation<int>
    Amplitude? : Relation<float>
    Frequency? : Relation<float>
    Duration? : Relation<float>
    Phase? : Relation<float>
    Coefficient? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CameraShakesDBCFile extends DBCFile<
    CameraShakesCreator,
    CameraShakesQuery,
    CameraShakesRow> {
    constructor() {
        super('CameraShakes',(t,b,o)=>new CameraShakesRow(t,b,o))
    }
    /** Loads a new CameraShakes.dbc from a file. */
    static read(path: string): CameraShakesDBCFile {
        return new CameraShakesDBCFile().read(path);
    }
    add(ID : int, c? : CameraShakesCreator) : CameraShakesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}