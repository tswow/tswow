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
import { int, loc_constructor } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class WMOAreaTableRow extends DBCRow<WMOAreaTableCreator,WMOAreaTableQuery> {
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
    get WMOID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get NameSetID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get WMOGroupID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get SoundProviderPref() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get SoundProviderPrefUnderwater() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get AmbienceID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get ZoneMusic() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get IntroSound() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get AreaTableID() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get AreaName() { return new DBCLocCell(this,this.buffer,this.offset+44)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : WMOAreaTableCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WMOAreaTableCreator = {
    WMOID?: int
    NameSetID?: int
    WMOGroupID?: int
    SoundProviderPref?: int
    SoundProviderPrefUnderwater?: int
    AmbienceID?: int
    ZoneMusic?: int
    IntroSound?: int
    Flags?: int
    AreaTableID?: int
    AreaName?: loc_constructor
}

/**
 * Used for queries (Don't comment these)
 */
export type WMOAreaTableQuery = {
    ID? : Relation<int>
    WMOID? : Relation<int>
    NameSetID? : Relation<int>
    WMOGroupID? : Relation<int>
    SoundProviderPref? : Relation<int>
    SoundProviderPrefUnderwater? : Relation<int>
    AmbienceID? : Relation<int>
    ZoneMusic? : Relation<int>
    IntroSound? : Relation<int>
    Flags? : Relation<int>
    AreaTableID? : Relation<int>
    AreaName? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WMOAreaTableDBCFile extends DBCFile<
    WMOAreaTableCreator,
    WMOAreaTableQuery,
    WMOAreaTableRow> {
    constructor() {
        super('WMOAreaTable',(t,b,o)=>new WMOAreaTableRow(t,b,o))
    }
    /** Loads a new WMOAreaTable.dbc from a file. */
    static read(path: string): WMOAreaTableDBCFile {
        return new WMOAreaTableDBCFile().read(path);
    }
    add(ID : int, c? : WMOAreaTableCreator) : WMOAreaTableRow {
        return this.makeRow(0).clone(ID,c)
    }
}