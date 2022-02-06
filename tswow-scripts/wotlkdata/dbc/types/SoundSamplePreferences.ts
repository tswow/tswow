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
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SoundSamplePreferencesRow extends DBCRow<SoundSamplePreferencesCreator,SoundSamplePreferencesQuery> {
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
    get Field01() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Field02() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get Field03() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Field04() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get Field05() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get Field06() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get Field07() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get Field08() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get Field09() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get Field10() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get Field11() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get Field12() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get Field13() { return new DBCFloatCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get Field14() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get Field15() { return new DBCFloatCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get Field16() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SoundSamplePreferencesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SoundSamplePreferencesCreator = {
    Field01?: int
    Field02?: int
    Field03?: int
    Field04?: int
    Field05?: int
    Field06?: int
    Field07?: int
    Field08?: float
    Field09?: float
    Field10?: int
    Field11?: int
    Field12?: int
    Field13?: float
    Field14?: int
    Field15?: float
    Field16?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SoundSamplePreferencesQuery = {
    ID? : Relation<int>
    Field01? : Relation<int>
    Field02? : Relation<int>
    Field03? : Relation<int>
    Field04? : Relation<int>
    Field05? : Relation<int>
    Field06? : Relation<int>
    Field07? : Relation<int>
    Field08? : Relation<float>
    Field09? : Relation<float>
    Field10? : Relation<int>
    Field11? : Relation<int>
    Field12? : Relation<int>
    Field13? : Relation<float>
    Field14? : Relation<int>
    Field15? : Relation<float>
    Field16? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SoundSamplePreferencesDBCFile extends DBCFile<
    SoundSamplePreferencesCreator,
    SoundSamplePreferencesQuery,
    SoundSamplePreferencesRow> {
    constructor() {
        super('SoundSamplePreferences',(t,b,o)=>new SoundSamplePreferencesRow(t,b,o))
    }
    /** Loads a new SoundSamplePreferences.dbc from a file. */
    static read(path: string): SoundSamplePreferencesDBCFile {
        return new SoundSamplePreferencesDBCFile().read(path);
    }
    add(ID : int, c? : SoundSamplePreferencesCreator) : SoundSamplePreferencesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}