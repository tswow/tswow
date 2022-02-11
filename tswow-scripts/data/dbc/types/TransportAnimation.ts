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
export class TransportAnimationRow extends DBCRow<TransportAnimationCreator,TransportAnimationQuery> {
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
    get TransportID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get TimeIndex() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get PosX() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get PosY() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get PosZ() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get SequenceID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : TransportAnimationCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TransportAnimationCreator = {
    TransportID?: int
    TimeIndex?: int
    PosX?: float
    PosY?: float
    PosZ?: float
    SequenceID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type TransportAnimationQuery = {
    ID? : Relation<int>
    TransportID? : Relation<int>
    TimeIndex? : Relation<int>
    PosX? : Relation<float>
    PosY? : Relation<float>
    PosZ? : Relation<float>
    SequenceID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TransportAnimationDBCFile extends DBCFile<
    TransportAnimationCreator,
    TransportAnimationQuery,
    TransportAnimationRow> {
    constructor() {
        super('TransportAnimation',(t,b,o)=>new TransportAnimationRow(t,b,o))
    }
    /** Loads a new TransportAnimation.dbc from a file. */
    static read(path: string): TransportAnimationDBCFile {
        return new TransportAnimationDBCFile().read(path);
    }
    add(ID : int, c? : TransportAnimationCreator) : TransportAnimationRow {
        return this.makeRow(0).clone(ID,c)
    }
}