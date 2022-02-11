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
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class DanceMovesRow extends DBCRow<DanceMovesCreator,DanceMovesQuery> {
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
    get Type() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Param() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Fallback() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Racemask() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Internal_Name() { return new DBCStringCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get LockID() { return new DBCIntCell(this,this.buffer,this.offset+92)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : DanceMovesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type DanceMovesCreator = {
    Type?: int
    Param?: int
    Fallback?: int
    Racemask?: int
    Internal_Name?: string
    Name?: loc_constructor
    LockID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type DanceMovesQuery = {
    ID? : Relation<int>
    Type? : Relation<int>
    Param? : Relation<int>
    Fallback? : Relation<int>
    Racemask? : Relation<int>
    Internal_Name? : Relation<string>
    Name? : Relation<string>
    LockID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class DanceMovesDBCFile extends DBCFile<
    DanceMovesCreator,
    DanceMovesQuery,
    DanceMovesRow> {
    constructor() {
        super('DanceMoves',(t,b,o)=>new DanceMovesRow(t,b,o))
    }
    /** Loads a new DanceMoves.dbc from a file. */
    static read(path: string): DanceMovesDBCFile {
        return new DanceMovesDBCFile().read(path);
    }
    add(ID : int, c? : DanceMovesCreator) : DanceMovesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}