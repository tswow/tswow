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
import { float, int, loc_constructor, uint } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFlagCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCPointerCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class AreaTableRow extends DBCRow<AreaTableCreator,AreaTableQuery> {
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
    get MapID() { return new DBCPointerCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get ParentAreaID() { return new DBCPointerCell(this,this.buffer,this.offset+8)}

    /**
     * Flag bit used to track if this Area has been discovered.
     */
    get ExploreFlag() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCFlagCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get SoundProviderPref() { return new DBCPointerCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get SoundProviderPrefUnderwater() { return new DBCPointerCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get AmbienceID() { return new DBCPointerCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get ZoneMusic() { return new DBCPointerCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get IntroSound() { return new DBCPointerCell(this,this.buffer,this.offset+36)}

    /**
     * Decides the experience gained from exploring this area.
     */
    get ExplorationLevel() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get AreaName() { return new DBCLocCell(this,this.buffer,this.offset+44)}

    /**
     * Faction that owns this area.
     */
    get FactionGroupMask() { return new DBCIntCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get LiquidTypeID() { return new DBCIntArrayCell(this,4,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get MinElevation() { return new DBCFloatCell(this,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get Ambient_Multiplier() { return new DBCFloatCell(this,this.buffer,this.offset+136)}

    /**
     * No comment (yet!)
     */
    get Lightid() { return new DBCPointerCell(this,this.buffer,this.offset+140)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : AreaTableCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type AreaTableCreator = {
    MapID?: uint
    ParentAreaID?: uint
    ExploreFlag?: int
    Flags?: uint
    SoundProviderPref?: uint
    SoundProviderPrefUnderwater?: uint
    AmbienceID?: uint
    ZoneMusic?: uint
    IntroSound?: uint
    ExplorationLevel?: int
    AreaName?: loc_constructor
    FactionGroupMask?: int
    LiquidTypeID?: int[]
    MinElevation?: float
    Ambient_Multiplier?: float
    Lightid?: uint
}

/**
 * Used for queries (Don't comment these)
 */
export type AreaTableQuery = {
    ID? : Relation<int>
    MapID? : Relation<number>
    ParentAreaID? : Relation<number>
    ExploreFlag? : Relation<int>
    Flags? : Relation<number>
    SoundProviderPref? : Relation<number>
    SoundProviderPrefUnderwater? : Relation<number>
    AmbienceID? : Relation<number>
    ZoneMusic? : Relation<number>
    IntroSound? : Relation<number>
    ExplorationLevel? : Relation<int>
    AreaName? : Relation<string>
    FactionGroupMask? : Relation<int>
    LiquidTypeID? : Relation<int>
    MinElevation? : Relation<float>
    Ambient_Multiplier? : Relation<float>
    Lightid? : Relation<number>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class AreaTableDBCFile extends DBCFile<
    AreaTableCreator,
    AreaTableQuery,
    AreaTableRow> {
    constructor() {
        super('AreaTable',(t,b,o)=>new AreaTableRow(t,b,o))
    }
    /** Loads a new AreaTable.dbc from a file. */
    static read(path: string): AreaTableDBCFile {
        return new AreaTableDBCFile().read(path);
    }
    add(ID : int, c? : AreaTableCreator) : AreaTableRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}