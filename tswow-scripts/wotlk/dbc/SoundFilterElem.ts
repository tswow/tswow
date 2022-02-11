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
import { float, int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SoundFilterElemRow extends DBCRow<SoundFilterElemCreator,SoundFilterElemQuery> {
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
    get SoundFilterID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get OrderIndex() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get FilterType() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Params() { return new DBCFloatArrayCell(this,9,this.buffer,this.offset+16)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SoundFilterElemCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SoundFilterElemCreator = {
    SoundFilterID?: int
    OrderIndex?: int
    FilterType?: int
    Params?: float[]
}

/**
 * Used for queries (Don't comment these)
 */
export type SoundFilterElemQuery = {
    ID? : Relation<int>
    SoundFilterID? : Relation<int>
    OrderIndex? : Relation<int>
    FilterType? : Relation<int>
    Params? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SoundFilterElemDBCFile extends DBCFile<
    SoundFilterElemCreator,
    SoundFilterElemQuery,
    SoundFilterElemRow> {
    constructor() {
        super('SoundFilterElem',(t,b,o)=>new SoundFilterElemRow(t,b,o))
    }
    /** Loads a new SoundFilterElem.dbc from a file. */
    static read(path: string): SoundFilterElemDBCFile {
        return new SoundFilterElemDBCFile().read(path);
    }
    add(ID : int, c? : SoundFilterElemCreator) : SoundFilterElemRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}