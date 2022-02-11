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
import { float, int, loc_constructor, uint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFlagCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCPointerCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class AreaPOIRow extends DBCRow<AreaPOICreator,AreaPOIQuery> {
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
    get Importance() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * Normal,Normal50%,Normal0%,Horde,Horde50%,Horde0%,Alliance,Alliance50%,Alliance0%
     */
    get Icon() { return new DBCIntArrayCell(this,9,this.buffer,this.offset+8)}

    /**
     * What faction this poi belongs to
     */
    get FactionID() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * Global x coordinate
     */
    get X() { return new DBCFloatCell(this,this.buffer,this.offset+48)}

    /**
     * Global y coordinate
     */
    get Y() { return new DBCFloatCell(this,this.buffer,this.offset+52)}

    /**
     * Global z coordinate
     */
    get Z() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * 4=zone,128=BG,512=showInBattle
     */
    get Flags() { return new DBCFlagCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get AreaID() { return new DBCPointerCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get Description() { return new DBCLocCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get WorldStateID() { return new DBCIntCell(this,this.buffer,this.offset+208)}

    /**
     * No comment (yet!)
     */
    get WorldMapLink() { return new DBCIntCell(this,this.buffer,this.offset+212)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : AreaPOICreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type AreaPOICreator = {
    Importance?: int
    Icon?: int[]
    FactionID?: int
    X?: float
    Y?: float
    Z?: float
    MapID?: int
    Flags?: uint
    AreaID?: uint
    Name?: loc_constructor
    Description?: loc_constructor
    WorldStateID?: int
    WorldMapLink?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type AreaPOIQuery = {
    ID? : Relation<int>
    Importance? : Relation<int>
    Icon? : Relation<int>
    FactionID? : Relation<int>
    X? : Relation<float>
    Y? : Relation<float>
    Z? : Relation<float>
    MapID? : Relation<int>
    Flags? : Relation<number>
    AreaID? : Relation<number>
    Name? : Relation<string>
    Description? : Relation<string>
    WorldStateID? : Relation<int>
    WorldMapLink? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class AreaPOIDBCFile extends DBCFile<
    AreaPOICreator,
    AreaPOIQuery,
    AreaPOIRow> {
    constructor() {
        super('AreaPOI',(t,b,o)=>new AreaPOIRow(t,b,o))
    }
    /** Loads a new AreaPOI.dbc from a file. */
    static read(path: string): AreaPOIDBCFile {
        return new AreaPOIDBCFile().read(path);
    }
    add(ID : int, c? : AreaPOICreator) : AreaPOIRow {
        return this.makeRow(0).clone(ID,c)
    }
}