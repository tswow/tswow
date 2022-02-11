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
import { int, loc_constructor } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CharTitlesRow extends DBCRow<CharTitlesCreator,CharTitlesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * Unused
     */
    get Condition_ID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Name1() { return new DBCLocCell(this,this.buffer,this.offset+76)}

    /**
     * Needs to auto-increment
     */
    get Mask_ID() { return new DBCIntCell(this,this.buffer,this.offset+144)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CharTitlesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CharTitlesCreator = {
    Condition_ID?: int
    Name?: loc_constructor
    Name1?: loc_constructor
    Mask_ID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type CharTitlesQuery = {
    ID? : Relation<int>
    Condition_ID? : Relation<int>
    Name? : Relation<string>
    Name1? : Relation<string>
    Mask_ID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CharTitlesDBCFile extends DBCFile<
    CharTitlesCreator,
    CharTitlesQuery,
    CharTitlesRow> {
    constructor() {
        super('CharTitles',(t,b,o)=>new CharTitlesRow(t,b,o))
    }
    /** Loads a new CharTitles.dbc from a file. */
    static read(path: string): CharTitlesDBCFile {
        return new CharTitlesDBCFile().read(path);
    }
    add(ID : int, c? : CharTitlesCreator) : CharTitlesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}