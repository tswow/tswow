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
import { DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class FootprintTexturesRow extends DBCRow<FootprintTexturesCreator,FootprintTexturesQuery> {
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
    get FootstepFilename() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : FootprintTexturesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type FootprintTexturesCreator = {
    FootstepFilename?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type FootprintTexturesQuery = {
    ID? : Relation<int>
    FootstepFilename? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class FootprintTexturesDBCFile extends DBCFile<
    FootprintTexturesCreator,
    FootprintTexturesQuery,
    FootprintTexturesRow> {
    constructor() {
        super('FootprintTextures',(t,b,o)=>new FootprintTexturesRow(t,b,o))
    }
    /** Loads a new FootprintTextures.dbc from a file. */
    static read(path: string): FootprintTexturesDBCFile {
        return new FootprintTexturesDBCFile().read(path);
    }
    add(ID : int, c? : FootprintTexturesCreator) : FootprintTexturesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}