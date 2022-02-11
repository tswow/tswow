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
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ChatChannelsRow extends DBCRow<ChatChannelsCreator,ChatChannelsQuery> {
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
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get FactionGroup() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Shortcut() { return new DBCLocCell(this,this.buffer,this.offset+80)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ChatChannelsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ChatChannelsCreator = {
    Flags?: int
    FactionGroup?: int
    Name?: loc_constructor
    Shortcut?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type ChatChannelsQuery = {
    ID? : Relation<int>
    Flags? : Relation<int>
    FactionGroup? : Relation<int>
    Name? : Relation<string>
    Shortcut? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ChatChannelsDBCFile extends DBCFile<
    ChatChannelsCreator,
    ChatChannelsQuery,
    ChatChannelsRow> {
    constructor() {
        super('ChatChannels',(t,b,o)=>new ChatChannelsRow(t,b,o))
    }
    /** Loads a new ChatChannels.dbc from a file. */
    static read(path: string): ChatChannelsDBCFile {
        return new ChatChannelsDBCFile().read(path);
    }
    add(ID : int, c? : ChatChannelsCreator) : ChatChannelsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}