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
export class TaxiPathNodeRow extends DBCRow<TaxiPathNodeCreator,TaxiPathNodeQuery> {
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
    get PathID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get NodeIndex() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get MapID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get LocX() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get LocY() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get LocZ() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get Delay() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get ArrivalEventID() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get DepartureEventID() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : TaxiPathNodeCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TaxiPathNodeCreator = {
    PathID?: int
    NodeIndex?: int
    MapID?: int
    LocX?: float
    LocY?: float
    LocZ?: float
    Flags?: int
    Delay?: int
    ArrivalEventID?: int
    DepartureEventID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type TaxiPathNodeQuery = {
    ID? : Relation<int>
    PathID? : Relation<int>
    NodeIndex? : Relation<int>
    MapID? : Relation<int>
    LocX? : Relation<float>
    LocY? : Relation<float>
    LocZ? : Relation<float>
    Flags? : Relation<int>
    Delay? : Relation<int>
    ArrivalEventID? : Relation<int>
    DepartureEventID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TaxiPathNodeDBCFile extends DBCFile<
    TaxiPathNodeCreator,
    TaxiPathNodeQuery,
    TaxiPathNodeRow> {
    constructor() {
        super('TaxiPathNode',(t,b,o)=>new TaxiPathNodeRow(t,b,o))
    }
    /** Loads a new TaxiPathNode.dbc from a file. */
    static read(path: string): TaxiPathNodeDBCFile {
        return new TaxiPathNodeDBCFile().read(path);
    }
    add(ID : int, c? : TaxiPathNodeCreator) : TaxiPathNodeRow {
        return this.makeRow(0).clone(ID,c)
    }
}