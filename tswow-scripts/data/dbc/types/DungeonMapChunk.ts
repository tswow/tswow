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
export class DungeonMapChunkRow extends DBCRow<DungeonMapChunkCreator,DungeonMapChunkQuery> {
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
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get WmoGroupID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get DungeonMapID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get MinZ() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : DungeonMapChunkCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type DungeonMapChunkCreator = {
    MapID?: int
    WmoGroupID?: int
    DungeonMapID?: int
    MinZ?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type DungeonMapChunkQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    WmoGroupID? : Relation<int>
    DungeonMapID? : Relation<int>
    MinZ? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class DungeonMapChunkDBCFile extends DBCFile<
    DungeonMapChunkCreator,
    DungeonMapChunkQuery,
    DungeonMapChunkRow> {
    constructor() {
        super('DungeonMapChunk',(t,b,o)=>new DungeonMapChunkRow(t,b,o))
    }
    /** Loads a new DungeonMapChunk.dbc from a file. */
    static read(path: string): DungeonMapChunkDBCFile {
        return new DungeonMapChunkDBCFile().read(path);
    }
    add(ID : int, c? : DungeonMapChunkCreator) : DungeonMapChunkRow {
        return this.makeRow(0).clone(ID,c)
    }
}