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
import { DBCIntCell, DBCKeyCell, DBCStringArrayCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CharSectionsRow extends DBCRow<CharSectionsCreator,CharSectionsQuery> {
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
    get RaceID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get SexID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get BaseSection() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get TextureName() { return new DBCStringArrayCell(this,3,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get VariationIndex() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get ColorIndex() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CharSectionsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CharSectionsCreator = {
    RaceID?: int
    SexID?: int
    BaseSection?: int
    TextureName?: string[]
    Flags?: int
    VariationIndex?: int
    ColorIndex?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type CharSectionsQuery = {
    ID? : Relation<int>
    RaceID? : Relation<int>
    SexID? : Relation<int>
    BaseSection? : Relation<int>
    TextureName? : Relation<string>
    Flags? : Relation<int>
    VariationIndex? : Relation<int>
    ColorIndex? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CharSectionsDBCFile extends DBCFile<
    CharSectionsCreator,
    CharSectionsQuery,
    CharSectionsRow> {
    constructor() {
        super('CharSections',(t,b,o)=>new CharSectionsRow(t,b,o))
    }
    /** Loads a new CharSections.dbc from a file. */
    static read(path: string): CharSectionsDBCFile {
        return new CharSectionsDBCFile().read(path);
    }
    add(ID : int, c? : CharSectionsCreator) : CharSectionsRow {
        return this.makeRow(0).clone(ID,c)
    }
}