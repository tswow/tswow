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
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringArrayCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class ChrRacesRow extends DBCRow<ChrRacesCreator,ChrRacesQuery> {
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
    get FactionID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get ExplorationSoundID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get MaleDisplayId() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get FemaleDisplayId() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get ClientPrefix() { return new DBCStringCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get BaseLanguage() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get CreatureType() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get ResSicknessSpellID() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get SplashSoundID() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get ClientFilestring() { return new DBCStringCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get CinematicSequenceID() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get Alliance() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCLocCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get Name_Female() { return new DBCLocCell(this,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get Name_Male() { return new DBCLocCell(this,this.buffer,this.offset+192)}

    /**
     * No comment (yet!)
     */
    get FacialHairCustomization() { return new DBCStringArrayCell(this,2,this.buffer,this.offset+260)}

    /**
     * No comment (yet!)
     */
    get HairCustomization() { return new DBCStringCell(this,this.buffer,this.offset+268)}

    /**
     * No comment (yet!)
     */
    get Required_Expansion() { return new DBCIntCell(this,this.buffer,this.offset+272)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : ChrRacesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type ChrRacesCreator = {
    Flags?: int
    FactionID?: int
    ExplorationSoundID?: int
    MaleDisplayId?: int
    FemaleDisplayId?: int
    ClientPrefix?: string
    BaseLanguage?: int
    CreatureType?: int
    ResSicknessSpellID?: int
    SplashSoundID?: int
    ClientFilestring?: string
    CinematicSequenceID?: int
    Alliance?: int
    Name?: loc_constructor
    Name_Female?: loc_constructor
    Name_Male?: loc_constructor
    FacialHairCustomization?: string[]
    HairCustomization?: string
    Required_Expansion?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type ChrRacesQuery = {
    ID? : Relation<int>
    Flags? : Relation<int>
    FactionID? : Relation<int>
    ExplorationSoundID? : Relation<int>
    MaleDisplayId? : Relation<int>
    FemaleDisplayId? : Relation<int>
    ClientPrefix? : Relation<string>
    BaseLanguage? : Relation<int>
    CreatureType? : Relation<int>
    ResSicknessSpellID? : Relation<int>
    SplashSoundID? : Relation<int>
    ClientFilestring? : Relation<string>
    CinematicSequenceID? : Relation<int>
    Alliance? : Relation<int>
    Name? : Relation<string>
    Name_Female? : Relation<string>
    Name_Male? : Relation<string>
    FacialHairCustomization? : Relation<string>
    HairCustomization? : Relation<string>
    Required_Expansion? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class ChrRacesDBCFile extends DBCFile<
    ChrRacesCreator,
    ChrRacesQuery,
    ChrRacesRow> {
    constructor() {
        super('ChrRaces',(t,b,o)=>new ChrRacesRow(t,b,o))
    }
    /** Loads a new ChrRaces.dbc from a file. */
    static read(path: string): ChrRacesDBCFile {
        return new ChrRacesDBCFile().read(path);
    }
    add(ID : int, c? : ChrRacesCreator) : ChrRacesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}