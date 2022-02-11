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
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ZoneintroMusicTableRow extends DBCRow<ZoneintroMusicTableCreator,ZoneintroMusicTableQuery> {
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
    get Name() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Priority() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get MinDelayMinutes() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ZoneintroMusicTableCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ZoneintroMusicTableCreator = {
    Name?: string
    SoundID?: int
    Priority?: int
    MinDelayMinutes?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ZoneintroMusicTableQuery = {
    ID? : Relation<int>
    Name? : Relation<string>
    SoundID? : Relation<int>
    Priority? : Relation<int>
    MinDelayMinutes? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ZoneintroMusicTableDBCFile extends DBCFile<
    ZoneintroMusicTableCreator,
    ZoneintroMusicTableQuery,
    ZoneintroMusicTableRow> {
    constructor() {
        super('ZoneintroMusicTable',(t,b,o)=>new ZoneintroMusicTableRow(t,b,o))
    }
    /** Loads a new ZoneintroMusicTable.dbc from a file. */
    static read(path: string): ZoneintroMusicTableDBCFile {
        return new ZoneintroMusicTableDBCFile().read(path);
    }
    add(ID : int, c? : ZoneintroMusicTableCreator) : ZoneintroMusicTableRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}