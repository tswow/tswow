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
export class SoundAmbienceRow extends DBCRow<SoundAmbienceCreator,SoundAmbienceQuery> {
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
    get AmbienceID() { return new DBCIntArrayCell(this,2,this.buffer,this.offset+4)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SoundAmbienceCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SoundAmbienceCreator = {
    AmbienceID?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type SoundAmbienceQuery = {
    ID? : Relation<int>
    AmbienceID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SoundAmbienceDBCFile extends DBCFile<
    SoundAmbienceCreator,
    SoundAmbienceQuery,
    SoundAmbienceRow> {
    constructor() {
        super('SoundAmbience',(t,b,o)=>new SoundAmbienceRow(t,b,o))
    }
    /** Loads a new SoundAmbience.dbc from a file. */
    static read(path: string): SoundAmbienceDBCFile {
        return new SoundAmbienceDBCFile().read(path);
    }
    add(ID : int, c? : SoundAmbienceCreator) : SoundAmbienceRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}