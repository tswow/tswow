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
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class EmotesRow extends DBCRow<EmotesCreator,EmotesQuery> {
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
    get EmoteSlashCommand() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get AnimID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get EmoteFlags() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get EmoteSpecProc() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get EmoteSpecProcParam() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get EventSoundID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : EmotesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type EmotesCreator = {
    EmoteSlashCommand?: string
    AnimID?: int
    EmoteFlags?: int
    EmoteSpecProc?: int
    EmoteSpecProcParam?: int
    EventSoundID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type EmotesQuery = {
    ID? : Relation<int>
    EmoteSlashCommand? : Relation<string>
    AnimID? : Relation<int>
    EmoteFlags? : Relation<int>
    EmoteSpecProc? : Relation<int>
    EmoteSpecProcParam? : Relation<int>
    EventSoundID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class EmotesDBCFile extends DBCFile<
    EmotesCreator,
    EmotesQuery,
    EmotesRow> {
    constructor() {
        super('Emotes',(t,b,o)=>new EmotesRow(t,b,o))
    }
    /** Loads a new Emotes.dbc from a file. */
    static read(path: string): EmotesDBCFile {
        return new EmotesDBCFile().read(path);
    }
    add(ID : int, c? : EmotesCreator) : EmotesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}