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
export class AreaTriggerRow extends DBCRow<AreaTriggerCreator,AreaTriggerQuery> {
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
    get X() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Y() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Z() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Radius() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get Box_Length() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get Box_Width() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get Box_Height() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get Box_Yaw() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : AreaTriggerCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type AreaTriggerCreator = {
    MapID?: int
    X?: float
    Y?: float
    Z?: float
    Radius?: float
    Box_Length?: float
    Box_Width?: float
    Box_Height?: float
    Box_Yaw?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type AreaTriggerQuery = {
    ID? : Relation<int>
    MapID? : Relation<int>
    X? : Relation<float>
    Y? : Relation<float>
    Z? : Relation<float>
    Radius? : Relation<float>
    Box_Length? : Relation<float>
    Box_Width? : Relation<float>
    Box_Height? : Relation<float>
    Box_Yaw? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class AreaTriggerDBCFile extends DBCFile<
    AreaTriggerCreator,
    AreaTriggerQuery,
    AreaTriggerRow> {
    constructor() {
        super('AreaTrigger',(t,b,o)=>new AreaTriggerRow(t,b,o))
    }
    /** Loads a new AreaTrigger.dbc from a file. */
    static read(path: string): AreaTriggerDBCFile {
        return new AreaTriggerDBCFile().read(path);
    }
    add(ID : int, c? : AreaTriggerCreator) : AreaTriggerRow {
        return this.makeRow(0).clone(ID,c)
    }
}