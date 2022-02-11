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
import { byte } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCByteCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CharBaseInfoRow extends DBCRow<CharBaseInfoCreator,CharBaseInfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get RaceID() { return new DBCByteCell(this,this.buffer,this.offset+0)}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ClassID() { return new DBCByteCell(this,this.buffer,this.offset+1)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(RaceID : byte,ClassID : byte, c? : CharBaseInfoCreator) : this {
        return this.cloneInternal([RaceID,ClassID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CharBaseInfoCreator = {
}

/**
 * Used for queries (Don't comment these)
 */
export type CharBaseInfoQuery = {
    RaceID? : Relation<byte>
    ClassID? : Relation<byte>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CharBaseInfoDBCFile extends DBCFile<
    CharBaseInfoCreator,
    CharBaseInfoQuery,
    CharBaseInfoRow> {
    constructor() {
        super('CharBaseInfo',(t,b,o)=>new CharBaseInfoRow(t,b,o))
    }
    /** Loads a new CharBaseInfo.dbc from a file. */
    static read(path: string): CharBaseInfoDBCFile {
        return new CharBaseInfoDBCFile().read(path);
    }
    add(RaceID : byte,ClassID : byte, c? : CharBaseInfoCreator) : CharBaseInfoRow {
        return this.makeRow(0).clone(RaceID,ClassID,c)
    }
}