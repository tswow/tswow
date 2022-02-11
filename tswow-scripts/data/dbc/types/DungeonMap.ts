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
export class DungeonMapRow extends DBCRow<DungeonMapCreator,DungeonMapQuery> {
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
    get FloorIndex() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get MinX() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get MaxX() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get MinY() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get MaxY() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get ParentWorldMapID() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : DungeonMapCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type DungeonMapCreator = {
    MapID?: int
    FloorIndex?: int
    MinX?: float
    MaxX?: float
    MinY?: float
    MaxY?: float
    ParentWorldMapID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type DungeonMapQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    FloorIndex? : Relation<int>
    MinX? : Relation<float>
    MaxX? : Relation<float>
    MinY? : Relation<float>
    MaxY? : Relation<float>
    ParentWorldMapID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class DungeonMapDBCFile extends DBCFile<
    DungeonMapCreator,
    DungeonMapQuery,
    DungeonMapRow> {
    constructor() {
        super('DungeonMap',(t,b,o)=>new DungeonMapRow(t,b,o))
    }
    /** Loads a new DungeonMap.dbc from a file. */
    static read(path: string): DungeonMapDBCFile {
        return new DungeonMapDBCFile().read(path);
    }
    add(ID : int, c? : DungeonMapCreator) : DungeonMapRow {
        return this.makeRow(0).clone(ID,c)
    }
}