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
import { int, uint } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCUIntArrayCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class BannedAddOnsRow extends DBCRow<BannedAddOnsCreator,BannedAddOnsQuery> {
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
    get NameMD5_() { return new DBCUIntArrayCell(this,4,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get VersionMD5_() { return new DBCUIntArrayCell(this,4,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get LastModified() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : BannedAddOnsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type BannedAddOnsCreator = {
    NameMD5_?: uint[]
    VersionMD5_?: uint[]
    LastModified?: int
    Flags?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type BannedAddOnsQuery = {
    ID? : Relation<int>
    NameMD5_? : Relation<uint>
    VersionMD5_? : Relation<uint>
    LastModified? : Relation<int>
    Flags? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class BannedAddOnsDBCFile extends DBCFile<
    BannedAddOnsCreator,
    BannedAddOnsQuery,
    BannedAddOnsRow> {
    constructor() {
        super('BannedAddOns',(t,b,o)=>new BannedAddOnsRow(t,b,o))
    }
    /** Loads a new BannedAddOns.dbc from a file. */
    static read(path: string): BannedAddOnsDBCFile {
        return new BannedAddOnsDBCFile().read(path);
    }
    add(ID : int, c? : BannedAddOnsCreator) : BannedAddOnsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}