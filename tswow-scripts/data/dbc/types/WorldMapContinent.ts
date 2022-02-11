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
export class WorldMapContinentRow extends DBCRow<WorldMapContinentCreator,WorldMapContinentQuery> {
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
    get LeftBoundary() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get RightBoundary() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get TopBoundary() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get BottomBoundary() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get ContinentOffsetX() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get ContinentOffsetY() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get Scale() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get TaxiMinX() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get TaxiMinY() { return new DBCFloatCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get TaxiMaxX() { return new DBCFloatCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get TaxiMaxY() { return new DBCFloatCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get WorldMapID() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : WorldMapContinentCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WorldMapContinentCreator = {
    MapID?: int
    LeftBoundary?: int
    RightBoundary?: int
    TopBoundary?: int
    BottomBoundary?: int
    ContinentOffsetX?: float
    ContinentOffsetY?: float
    Scale?: float
    TaxiMinX?: float
    TaxiMinY?: float
    TaxiMaxX?: float
    TaxiMaxY?: float
    WorldMapID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type WorldMapContinentQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    LeftBoundary? : Relation<int>
    RightBoundary? : Relation<int>
    TopBoundary? : Relation<int>
    BottomBoundary? : Relation<int>
    ContinentOffsetX? : Relation<float>
    ContinentOffsetY? : Relation<float>
    Scale? : Relation<float>
    TaxiMinX? : Relation<float>
    TaxiMinY? : Relation<float>
    TaxiMaxX? : Relation<float>
    TaxiMaxY? : Relation<float>
    WorldMapID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WorldMapContinentDBCFile extends DBCFile<
    WorldMapContinentCreator,
    WorldMapContinentQuery,
    WorldMapContinentRow> {
    constructor() {
        super('WorldMapContinent',(t,b,o)=>new WorldMapContinentRow(t,b,o))
    }
    /** Loads a new WorldMapContinent.dbc from a file. */
    static read(path: string): WorldMapContinentDBCFile {
        return new WorldMapContinentDBCFile().read(path);
    }
    add(ID : int, c? : WorldMapContinentCreator) : WorldMapContinentRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}