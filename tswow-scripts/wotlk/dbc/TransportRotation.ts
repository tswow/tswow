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
export class TransportRotationRow extends DBCRow<TransportRotationCreator,TransportRotationQuery> {
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
    get GameObjectsID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get TimeIndex() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get RotX() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get RotY() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get RotZ() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get RotW() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : TransportRotationCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TransportRotationCreator = {
    GameObjectsID?: int
    TimeIndex?: int
    RotX?: float
    RotY?: float
    RotZ?: float
    RotW?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type TransportRotationQuery = {
    ID? : Relation<int>
    GameObjectsID? : Relation<int>
    TimeIndex? : Relation<int>
    RotX? : Relation<float>
    RotY? : Relation<float>
    RotZ? : Relation<float>
    RotW? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TransportRotationDBCFile extends DBCFile<
    TransportRotationCreator,
    TransportRotationQuery,
    TransportRotationRow> {
    constructor() {
        super('TransportRotation',(t,b,o)=>new TransportRotationRow(t,b,o))
    }
    /** Loads a new TransportRotation.dbc from a file. */
    static read(path: string): TransportRotationDBCFile {
        return new TransportRotationDBCFile().read(path);
    }
    add(ID : int, c? : TransportRotationCreator) : TransportRotationRow {
        return this.makeRow(0).clone(ID,c)
    }
}