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
import { DBCFloatCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class TransportPhysicsRow extends DBCRow<TransportPhysicsCreator,TransportPhysicsQuery> {
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
    get WaveAmp() { return new DBCFloatCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get WaveTimeScale() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get RollAmp() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get RollTimeScale() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get PitchAmp() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get PitchTimeScale() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get MaxBank() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get MaxBankTurnSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get SpeedDampThresh() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get SpeedDamp() { return new DBCFloatCell(this,this.buffer,this.offset+40)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : TransportPhysicsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type TransportPhysicsCreator = {
    WaveAmp?: float
    WaveTimeScale?: float
    RollAmp?: float
    RollTimeScale?: float
    PitchAmp?: float
    PitchTimeScale?: float
    MaxBank?: float
    MaxBankTurnSpeed?: float
    SpeedDampThresh?: float
    SpeedDamp?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type TransportPhysicsQuery = {
    ID? : Relation<int>
    WaveAmp? : Relation<float>
    WaveTimeScale? : Relation<float>
    RollAmp? : Relation<float>
    RollTimeScale? : Relation<float>
    PitchAmp? : Relation<float>
    PitchTimeScale? : Relation<float>
    MaxBank? : Relation<float>
    MaxBankTurnSpeed? : Relation<float>
    SpeedDampThresh? : Relation<float>
    SpeedDamp? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class TransportPhysicsDBCFile extends DBCFile<
    TransportPhysicsCreator,
    TransportPhysicsQuery,
    TransportPhysicsRow> {
    constructor() {
        super('TransportPhysics',(t,b,o)=>new TransportPhysicsRow(t,b,o))
    }
    /** Loads a new TransportPhysics.dbc from a file. */
    static read(path: string): TransportPhysicsDBCFile {
        return new TransportPhysicsDBCFile().read(path);
    }
    add(ID : int, c? : TransportPhysicsCreator) : TransportPhysicsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}