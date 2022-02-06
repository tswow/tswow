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
import { int, loc_constructor } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCKeyCell, DBCLocCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class LockTypeRow extends DBCRow<LockTypeCreator,LockTypeQuery> {
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
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get ResourceName() { return new DBCLocCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get Verb() { return new DBCLocCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get CursorName() { return new DBCStringCell(this,this.buffer,this.offset+208)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : LockTypeCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LockTypeCreator = {
    Name?: loc_constructor
    ResourceName?: loc_constructor
    Verb?: loc_constructor
    CursorName?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type LockTypeQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    ResourceName? : Relation<string>
    Verb? : Relation<string>
    CursorName? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class LockTypeDBCFile extends DBCFile<
    LockTypeCreator,
    LockTypeQuery,
    LockTypeRow> {
    constructor() {
        super('LockType',(t,b,o)=>new LockTypeRow(t,b,o))
    }
    /** Loads a new LockType.dbc from a file. */
    static read(path: string): LockTypeDBCFile {
        return new LockTypeDBCFile().read(path);
    }
    add(ID : int, c? : LockTypeCreator) : LockTypeRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}