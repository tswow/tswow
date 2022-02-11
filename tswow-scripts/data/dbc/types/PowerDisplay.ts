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
import { byte, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCByteCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class PowerDisplayRow extends DBCRow<PowerDisplayCreator,PowerDisplayQuery> {
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
    get ActualType() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get GlobalstringBaseTag() { return new DBCStringCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Red() { return new DBCByteCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Green() { return new DBCByteCell(this,this.buffer,this.offset+13)}

    /**
     * No comment (yet!)
     */
    get Blue() { return new DBCByteCell(this,this.buffer,this.offset+14)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : PowerDisplayCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type PowerDisplayCreator = {
    ActualType?: int
    GlobalstringBaseTag?: string
    Red?: byte
    Green?: byte
    Blue?: byte
}

/**
 * Used for queries (Don't comment these)
 */
export type PowerDisplayQuery = {
    ID? : Relation<int>
    ActualType? : Relation<int>
    GlobalstringBaseTag? : Relation<string>
    Red? : Relation<byte>
    Green? : Relation<byte>
    Blue? : Relation<byte>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class PowerDisplayDBCFile extends DBCFile<
    PowerDisplayCreator,
    PowerDisplayQuery,
    PowerDisplayRow> {
    constructor() {
        super('PowerDisplay',(t,b,o)=>new PowerDisplayRow(t,b,o))
    }
    /** Loads a new PowerDisplay.dbc from a file. */
    static read(path: string): PowerDisplayDBCFile {
        return new PowerDisplayDBCFile().read(path);
    }
    add(ID : int, c? : PowerDisplayCreator) : PowerDisplayRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}