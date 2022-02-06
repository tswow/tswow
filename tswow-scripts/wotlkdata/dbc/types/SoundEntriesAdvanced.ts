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
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SoundEntriesAdvancedRow extends DBCRow<SoundEntriesAdvancedCreator,SoundEntriesAdvancedQuery> {
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
    get SoundEntryID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get InnerRadius2D() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get TimeA() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get TimeB() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get TimeC() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get TimeD() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get RandomOffsetRange() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get Usage() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get TimeintervalMin() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get TimeintervalMax() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get VolumeSliderCategory() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get DuckToSFX() { return new DBCFloatCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get DuckToMusic() { return new DBCFloatCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get DuckToAmbience() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get InnerRadiusOfInfluence() { return new DBCFloatCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get OuterRadiusOfInfluence() { return new DBCFloatCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get TimeToDuck() { return new DBCIntCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get TimeToUnduck() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get InsideAngle() { return new DBCFloatCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get OutsideAngle() { return new DBCFloatCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get OutsideVolume() { return new DBCFloatCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get OuterRadius2D() { return new DBCFloatCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get Name() { return new DBCStringCell(this,this.buffer,this.offset+92)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SoundEntriesAdvancedCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SoundEntriesAdvancedCreator = {
    SoundEntryID?: int
    InnerRadius2D?: float
    TimeA?: int
    TimeB?: int
    TimeC?: int
    TimeD?: int
    RandomOffsetRange?: int
    Usage?: int
    TimeintervalMin?: int
    TimeintervalMax?: int
    VolumeSliderCategory?: int
    DuckToSFX?: float
    DuckToMusic?: float
    DuckToAmbience?: float
    InnerRadiusOfInfluence?: float
    OuterRadiusOfInfluence?: float
    TimeToDuck?: int
    TimeToUnduck?: int
    InsideAngle?: float
    OutsideAngle?: float
    OutsideVolume?: float
    OuterRadius2D?: float
    Name?: string
}

/**
 * Used for queries (Don't comment these)
 */
export type SoundEntriesAdvancedQuery = {
    ID? : Relation<int>
    SoundEntryID? : Relation<int>
    InnerRadius2D? : Relation<float>
    TimeA? : Relation<int>
    TimeB? : Relation<int>
    TimeC? : Relation<int>
    TimeD? : Relation<int>
    RandomOffsetRange? : Relation<int>
    Usage? : Relation<int>
    TimeintervalMin? : Relation<int>
    TimeintervalMax? : Relation<int>
    VolumeSliderCategory? : Relation<int>
    DuckToSFX? : Relation<float>
    DuckToMusic? : Relation<float>
    DuckToAmbience? : Relation<float>
    InnerRadiusOfInfluence? : Relation<float>
    OuterRadiusOfInfluence? : Relation<float>
    TimeToDuck? : Relation<int>
    TimeToUnduck? : Relation<int>
    InsideAngle? : Relation<float>
    OutsideAngle? : Relation<float>
    OutsideVolume? : Relation<float>
    OuterRadius2D? : Relation<float>
    Name? : Relation<string>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SoundEntriesAdvancedDBCFile extends DBCFile<
    SoundEntriesAdvancedCreator,
    SoundEntriesAdvancedQuery,
    SoundEntriesAdvancedRow> {
    constructor() {
        super('SoundEntriesAdvanced',(t,b,o)=>new SoundEntriesAdvancedRow(t,b,o))
    }
    /** Loads a new SoundEntriesAdvanced.dbc from a file. */
    static read(path: string): SoundEntriesAdvancedDBCFile {
        return new SoundEntriesAdvancedDBCFile().read(path);
    }
    add(ID : int, c? : SoundEntriesAdvancedCreator) : SoundEntriesAdvancedRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}