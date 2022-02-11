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
import { int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class LockRow extends DBCRow<LockCreator,LockQuery> {
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
    get Type() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Index() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get Skill() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get Action() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+100)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : LockCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type LockCreator = {
    Type?: int[]
    Index?: int[]
    Skill?: int[]
    Action?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type LockQuery = {
    ID? : Relation<int>
    Type? : Relation<int>
    Index? : Relation<int>
    Skill? : Relation<int>
    Action? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class LockDBCFile extends DBCFile<
    LockCreator,
    LockQuery,
    LockRow> {
    constructor() {
        super('Lock',(t,b,o)=>new LockRow(t,b,o))
    }
    /** Loads a new Lock.dbc from a file. */
    static read(path: string): LockDBCFile {
        return new LockDBCFile().read(path);
    }
    add(ID : int, c? : LockCreator) : LockRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}