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
import { float, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SoundEntriesRow extends DBCRow<SoundEntriesCreator,SoundEntriesQuery> {
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
    get SoundType() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCStringCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get File() { return new DBCStringArrayCell(this,10,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Freq() { return new DBCIntArrayCell(this,10,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get DirectoryBase() { return new DBCStringCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get Volumefloat() { return new DBCFloatCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get MinDistance() { return new DBCFloatCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get DistanceCutoff() { return new DBCFloatCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get EAXDef() { return new DBCIntCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get SoundEntriesAdvancedID() { return new DBCIntCell(this,this.buffer,this.offset+116)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SoundEntriesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SoundEntriesCreator = {
    SoundType?: int
    Name?: string
    File?: string[]
    Freq?: int[]
    DirectoryBase?: string
    Volumefloat?: float
    Flags?: int
    MinDistance?: float
    DistanceCutoff?: float
    EAXDef?: int
    SoundEntriesAdvancedID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SoundEntriesQuery = {
    ID? : Relation<int>
    SoundType? : Relation<int>
    Name? : Relation<string>
    File? : Relation<string>
    Freq? : Relation<int>
    DirectoryBase? : Relation<string>
    Volumefloat? : Relation<float>
    Flags? : Relation<int>
    MinDistance? : Relation<float>
    DistanceCutoff? : Relation<float>
    EAXDef? : Relation<int>
    SoundEntriesAdvancedID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SoundEntriesDBCFile extends DBCFile<
    SoundEntriesCreator,
    SoundEntriesQuery,
    SoundEntriesRow> {
    constructor() {
        super('SoundEntries',(t,b,o)=>new SoundEntriesRow(t,b,o))
    }
    /** Loads a new SoundEntries.dbc from a file. */
    static read(path: string): SoundEntriesDBCFile {
        return new SoundEntriesDBCFile().read(path);
    }
    add(ID : int, c? : SoundEntriesCreator) : SoundEntriesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}