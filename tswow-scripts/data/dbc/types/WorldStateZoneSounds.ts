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
import { DBCIntCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class WorldStateZoneSoundsRow extends DBCRow<WorldStateZoneSoundsCreator,WorldStateZoneSoundsQuery> {
    /**
     * No comment (yet!)
     */
    get WorldStateID() { return new DBCIntCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get WorldStateValue() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get AreaID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get WMOAreaID() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get ZoneintroMusicID() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get ZoneMusicID() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get SoundAmbienceID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get SoundProviderPreferencesID() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(c?: WorldStateZoneSoundsCreator) : this {
        return this.cloneInternal([],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WorldStateZoneSoundsCreator = {
    WorldStateID?: int
    WorldStateValue?: int
    AreaID?: int
    WMOAreaID?: int
    ZoneintroMusicID?: int
    ZoneMusicID?: int
    SoundAmbienceID?: int
    SoundProviderPreferencesID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type WorldStateZoneSoundsQuery = {
    WorldStateID? : Relation<int>
    WorldStateValue? : Relation<int>
    AreaID? : Relation<int>
    WMOAreaID? : Relation<int>
    ZoneintroMusicID? : Relation<int>
    ZoneMusicID? : Relation<int>
    SoundAmbienceID? : Relation<int>
    SoundProviderPreferencesID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WorldStateZoneSoundsDBCFile extends DBCFile<
    WorldStateZoneSoundsCreator,
    WorldStateZoneSoundsQuery,
    WorldStateZoneSoundsRow> {
    constructor() {
        super('WorldStateZoneSounds',(t,b,o)=>new WorldStateZoneSoundsRow(t,b,o))
    }
    /** Loads a new WorldStateZoneSounds.dbc from a file. */
    static read(path: string): WorldStateZoneSoundsDBCFile {
        return new WorldStateZoneSoundsDBCFile().read(path);
    }
    add(c? : WorldStateZoneSoundsCreator) : WorldStateZoneSoundsRow {
        return this.makeRow(0).clone(c)
    }
}