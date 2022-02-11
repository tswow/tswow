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
import { float, int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SoundProviderPreferencesRow extends DBCRow<SoundProviderPreferencesCreator,SoundProviderPreferencesQuery> {
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
    get Description() { return new DBCStringCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get EAXEnvironmentSelection() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get EAXDecayTime() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get EAX2EnvironmentSize() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get EAX2EnvironmentDiffusion() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get EAX2Room() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get EAX2RoomHF() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get EAX2DecayHFRatio() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get EAX2Reflections() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get EAX2ReflectionsDelay() { return new DBCFloatCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get EAX2Reverb() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get EAX2ReverbDelay() { return new DBCFloatCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get EAX2RoomRolloff() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get EAX2AirAbsorption() { return new DBCFloatCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get EAX3RoomLF() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get EAX3DecayLFRatio() { return new DBCFloatCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get EAX3EchoTime() { return new DBCFloatCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get EAX3EchoDepth() { return new DBCFloatCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get EAX3ModulationTime() { return new DBCFloatCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get EAX3ModulationDepth() { return new DBCFloatCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get EAX3HFReference() { return new DBCFloatCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get EAX3LFReference() { return new DBCFloatCell(this,this.buffer,this.offset+92)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SoundProviderPreferencesCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SoundProviderPreferencesCreator = {
    Description?: string
    Flags?: int
    EAXEnvironmentSelection?: int
    EAXDecayTime?: float
    EAX2EnvironmentSize?: float
    EAX2EnvironmentDiffusion?: float
    EAX2Room?: int
    EAX2RoomHF?: int
    EAX2DecayHFRatio?: float
    EAX2Reflections?: int
    EAX2ReflectionsDelay?: float
    EAX2Reverb?: int
    EAX2ReverbDelay?: float
    EAX2RoomRolloff?: float
    EAX2AirAbsorption?: float
    EAX3RoomLF?: int
    EAX3DecayLFRatio?: float
    EAX3EchoTime?: float
    EAX3EchoDepth?: float
    EAX3ModulationTime?: float
    EAX3ModulationDepth?: float
    EAX3HFReference?: float
    EAX3LFReference?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type SoundProviderPreferencesQuery = {
    ID? : Relation<int>
    Description? : Relation<string>
    Flags? : Relation<int>
    EAXEnvironmentSelection? : Relation<int>
    EAXDecayTime? : Relation<float>
    EAX2EnvironmentSize? : Relation<float>
    EAX2EnvironmentDiffusion? : Relation<float>
    EAX2Room? : Relation<int>
    EAX2RoomHF? : Relation<int>
    EAX2DecayHFRatio? : Relation<float>
    EAX2Reflections? : Relation<int>
    EAX2ReflectionsDelay? : Relation<float>
    EAX2Reverb? : Relation<int>
    EAX2ReverbDelay? : Relation<float>
    EAX2RoomRolloff? : Relation<float>
    EAX2AirAbsorption? : Relation<float>
    EAX3RoomLF? : Relation<int>
    EAX3DecayLFRatio? : Relation<float>
    EAX3EchoTime? : Relation<float>
    EAX3EchoDepth? : Relation<float>
    EAX3ModulationTime? : Relation<float>
    EAX3ModulationDepth? : Relation<float>
    EAX3HFReference? : Relation<float>
    EAX3LFReference? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SoundProviderPreferencesDBCFile extends DBCFile<
    SoundProviderPreferencesCreator,
    SoundProviderPreferencesQuery,
    SoundProviderPreferencesRow> {
    constructor() {
        super('SoundProviderPreferences',(t,b,o)=>new SoundProviderPreferencesRow(t,b,o))
    }
    /** Loads a new SoundProviderPreferences.dbc from a file. */
    static read(path: string): SoundProviderPreferencesDBCFile {
        return new SoundProviderPreferencesDBCFile().read(path);
    }
    add(ID : int, c? : SoundProviderPreferencesCreator) : SoundProviderPreferencesRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}