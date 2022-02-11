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
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class WorldMapTransformsRow extends DBCRow<WorldMapTransformsCreator,WorldMapTransformsQuery> {
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
    get RegionMinX() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get RegionMinY() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get RegionMaxX() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get RegionMaxY() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get NewMapID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get RegionOffsetX() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get RegionOffsetY() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get NewDungeonMapID() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : WorldMapTransformsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WorldMapTransformsCreator = {
    MapID?: int
    RegionMinX?: float
    RegionMinY?: float
    RegionMaxX?: float
    RegionMaxY?: float
    NewMapID?: int
    RegionOffsetX?: float
    RegionOffsetY?: float
    NewDungeonMapID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type WorldMapTransformsQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    RegionMinX? : Relation<float>
    RegionMinY? : Relation<float>
    RegionMaxX? : Relation<float>
    RegionMaxY? : Relation<float>
    NewMapID? : Relation<int>
    RegionOffsetX? : Relation<float>
    RegionOffsetY? : Relation<float>
    NewDungeonMapID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WorldMapTransformsDBCFile extends DBCFile<
    WorldMapTransformsCreator,
    WorldMapTransformsQuery,
    WorldMapTransformsRow> {
    constructor() {
        super('WorldMapTransforms',(t,b,o)=>new WorldMapTransformsRow(t,b,o))
    }
    /** Loads a new WorldMapTransforms.dbc from a file. */
    static read(path: string): WorldMapTransformsDBCFile {
        return new WorldMapTransformsDBCFile().read(path);
    }
    add(ID : int, c? : WorldMapTransformsCreator) : WorldMapTransformsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}