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
import { int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SoundWaterTypeRow extends DBCRow<SoundWaterTypeCreator,SoundWaterTypeQuery> {
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
    get LiquidTypeID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get FluidSpeed() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SoundWaterTypeCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SoundWaterTypeCreator = {
    LiquidTypeID?: int
    FluidSpeed?: int
    SoundID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SoundWaterTypeQuery = {
    ID? : Relation<int>
    LiquidTypeID? : Relation<int>
    FluidSpeed? : Relation<int>
    SoundID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SoundWaterTypeDBCFile extends DBCFile<
    SoundWaterTypeCreator,
    SoundWaterTypeQuery,
    SoundWaterTypeRow> {
    constructor() {
        super('SoundWaterType',(t,b,o)=>new SoundWaterTypeRow(t,b,o))
    }
    /** Loads a new SoundWaterType.dbc from a file. */
    static read(path: string): SoundWaterTypeDBCFile {
        return new SoundWaterTypeDBCFile().read(path);
    }
    add(ID : int, c? : SoundWaterTypeCreator) : SoundWaterTypeRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}