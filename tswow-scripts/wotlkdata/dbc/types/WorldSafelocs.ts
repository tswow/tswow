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
import { float, int, loc_constructor } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class WorldSafelocsRow extends DBCRow<WorldSafelocsCreator,WorldSafelocsQuery> {
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
    get Continent() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get LocX() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get LocY() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get LocZ() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get AreaName() { return new DBCLocCell(this,this.buffer,this.offset+20)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : WorldSafelocsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WorldSafelocsCreator = {
    Continent?: int
    LocX?: float
    LocY?: float
    LocZ?: float
    AreaName?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type WorldSafelocsQuery = {
    ID? : Relation<int>
    Continent? : Relation<int>
    LocX? : Relation<float>
    LocY? : Relation<float>
    LocZ? : Relation<float>
    AreaName? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WorldSafelocsDBCFile extends DBCFile<
    WorldSafelocsCreator,
    WorldSafelocsQuery,
    WorldSafelocsRow> {
    constructor() {
        super('WorldSafelocs',(t,b,o)=>new WorldSafelocsRow(t,b,o))
    }
    /** Loads a new WorldSafelocs.dbc from a file. */
    static read(path: string): WorldSafelocsDBCFile {
        return new WorldSafelocsDBCFile().read(path);
    }
    add(ID : int, c? : WorldSafelocsCreator) : WorldSafelocsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}