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
import { DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SheatheSoundLookupsRow extends DBCRow<SheatheSoundLookupsCreator,SheatheSoundLookupsQuery> {
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
    get ItemClass() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get ItemSubclass() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ItemEnvTypes() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get IsShield() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get SheathSoundID() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get UnsheathSoundID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SheatheSoundLookupsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SheatheSoundLookupsCreator = {
    ItemClass?: int
    ItemSubclass?: int
    ItemEnvTypes?: int
    IsShield?: int
    SheathSoundID?: int
    UnsheathSoundID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type SheatheSoundLookupsQuery = {
    ID? : Relation<int>
    ItemClass? : Relation<int>
    ItemSubclass? : Relation<int>
    ItemEnvTypes? : Relation<int>
    IsShield? : Relation<int>
    SheathSoundID? : Relation<int>
    UnsheathSoundID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SheatheSoundLookupsDBCFile extends DBCFile<
    SheatheSoundLookupsCreator,
    SheatheSoundLookupsQuery,
    SheatheSoundLookupsRow> {
    constructor() {
        super('SheatheSoundLookups',(t,b,o)=>new SheatheSoundLookupsRow(t,b,o))
    }
    /** Loads a new SheatheSoundLookups.dbc from a file. */
    static read(path: string): SheatheSoundLookupsDBCFile {
        return new SheatheSoundLookupsDBCFile().read(path);
    }
    add(ID : int, c? : SheatheSoundLookupsCreator) : SheatheSoundLookupsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}