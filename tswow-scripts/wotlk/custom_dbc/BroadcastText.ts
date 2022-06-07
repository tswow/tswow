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
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCUIntCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'
import { int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class BroadcastTextRow extends DBCRow<BroadcastTextCreator,BroadcastTextQuery> {
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
    get LanguageID() { return new DBCUIntCell(this, this.buffer, this.offset+4); }

    /**
     * No comment (yet!)
     */
    get Text() { return new DBCLocCell(this, this.buffer, this.offset+8); }

    /**
     * No comment (yet!)
     */
    get Text1() { return new DBCLocCell(this, this.buffer, this.offset+76); }

    /**
     * No comment (yet!)
     */
    get EmoteID1() { return new DBCIntCell(this, this.buffer, this.offset + 144 )}

    /**
     * No comment (yet!)
     */
    get EmoteID2() { return new DBCIntCell(this, this.buffer, this.offset + 148 )}

    /**
     * No comment (yet!)
     */
    get EmoteID3() { return new DBCIntCell(this, this.buffer, this.offset + 152)}

    /**
     * No comment (yet!)
     */
    get EmoteDelay1() { return new DBCIntCell(this, this.buffer, this.offset + 156)}

    /**
     * No comment (yet!)
     */
    get EmoteDelay2() { return new DBCIntCell(this, this.buffer, this.offset + 160)}

    /**
     * No comment (yet!)
     */
    get EmoteDelay3() { return new DBCIntCell(this, this.buffer, this.offset + 164)}

    /**
     * No comment (yet!)
     */
    get SoundEntriesID() { return new DBCIntCell(this, this.buffer, this.offset + 168)}

    /**
     * No comment (yet!)
     */
    get EmotesID() { return new DBCIntCell(this, this.buffer, this.offset + 172)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this, this.buffer, this.offset + 176)}

    static SIZE = 180;

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : BroadcastTextCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type BroadcastTextCreator = {
    LanguageID? : int32,
    Text? : string,
    Text1? : string,
    EmoteID1? : uint32,
    EmoteID2? : uint32,
    EmoteID3? : uint32,
    EmoteDelay1? : uint32,
    EmoteDelay2? : uint32,
    EmoteDelay3? : uint32,
    SoundEntriesID? : uint32,
    EmotesID? : uint32,
    Flags? : uint32,
}

/**
 * Used for queries (Don't comment these)
 */
export type BroadcastTextQuery = {
    ID? : Relation<int>
    LanguageID? : Relation<uint32>,
    Text? : Relation<string>,
    Text1? : Relation<string>,
    EmoteID1? : Relation<uint32>,
    EmoteID2? : Relation<uint32>,
    EmoteID3? : Relation<uint32>,
    EmoteDelay1? : Relation<uint32>,
    EmoteDelay2? : Relation<uint32>,
    EmoteDelay3? : Relation<uint32>,
    SoundEntriesID? : Relation<uint32>,
    EmotesID? : Relation<uint32>,
    Flags? : Relation<uint32>,
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class BroadcastTextDBCFile extends DBCFile<
    BroadcastTextCreator,
    BroadcastTextQuery,
    BroadcastTextRow> {
    constructor() {
        super('BroadcastText',(t,b,o)=>new BroadcastTextRow(t,b,o))
    }
    /** Loads a new BroadcastText.dbc from a file. */
    static read(path: string): BroadcastTextDBCFile {
        return new BroadcastTextDBCFile().read(path);
    }

    add(entry : int, c? : BroadcastTextCreator) : BroadcastTextRow {
        return this.makeRow(0).clone(entry,c)
    }

    findById(id: number) {
        return this.fastSearch(id);
    }
}