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
import { DBCKeyCell, DBCLocCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ServerMessagesRow extends DBCRow<ServerMessagesCreator,ServerMessagesQuery> {
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
    get Text() { return new DBCLocCell(this,this.buffer,this.offset+4)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ServerMessagesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ServerMessagesCreator = {
    Text?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type ServerMessagesQuery = {
    ID? : Relation<int>
    Text? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ServerMessagesDBCFile extends DBCFile<
    ServerMessagesCreator,
    ServerMessagesQuery,
    ServerMessagesRow> {
    constructor() {
        super('ServerMessages',(t,b,o)=>new ServerMessagesRow(t,b,o))
    }
    /** Loads a new ServerMessages.dbc from a file. */
    static read(path: string): ServerMessagesDBCFile {
        return new ServerMessagesDBCFile().read(path);
    }
    add(ID : int, c? : ServerMessagesCreator) : ServerMessagesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}