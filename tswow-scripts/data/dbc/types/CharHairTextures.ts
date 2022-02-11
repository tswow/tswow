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
import { bool, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCBoolCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CharHairTexturesRow extends DBCRow<CharHairTexturesCreator,CharHairTexturesQuery> {
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
    get Race() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Gender() { return new DBCBoolCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Field03() { return new DBCBoolCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Field04() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+16)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CharHairTexturesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CharHairTexturesCreator = {
    Race?: int
    Gender?: bool
    Field03?: bool
    Field04?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type CharHairTexturesQuery = {
    ID? : Relation<int>
    Race? : Relation<int>
    Gender? : Relation<bool>
    Field03? : Relation<bool>
    Field04? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CharHairTexturesDBCFile extends DBCFile<
    CharHairTexturesCreator,
    CharHairTexturesQuery,
    CharHairTexturesRow> {
    constructor() {
        super('CharHairTextures',(t,b,o)=>new CharHairTexturesRow(t,b,o))
    }
    /** Loads a new CharHairTextures.dbc from a file. */
    static read(path: string): CharHairTexturesDBCFile {
        return new CharHairTexturesDBCFile().read(path);
    }
    add(ID : int, c? : CharHairTexturesCreator) : CharHairTexturesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}