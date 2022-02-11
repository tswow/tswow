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
export class WorldChunkSoundsRow extends DBCRow<WorldChunkSoundsCreator,WorldChunkSoundsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get WorldMapMapID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ChunkX() { return new DBCKeyCell(this,this.buffer,this.offset+4)}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ChunkY() { return new DBCKeyCell(this,this.buffer,this.offset+8)}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SubchunkX() { return new DBCKeyCell(this,this.buffer,this.offset+12)}

    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get SubchunkY() { return new DBCKeyCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get ZoneintroMusicID() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get ZoneMusicID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get SoundAmbienceID() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get SoundProviderPreferencesID() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(WorldMapMapID : int,ChunkX : int,ChunkY : int,SubchunkX : int,SubchunkY : int, c? : WorldChunkSoundsCreator) : this {
        return this.cloneInternal([WorldMapMapID,ChunkX,ChunkY,SubchunkX,SubchunkY],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type WorldChunkSoundsCreator = {
    ZoneintroMusicID?: int
    ZoneMusicID?: int
    SoundAmbienceID?: int
    SoundProviderPreferencesID?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type WorldChunkSoundsQuery = {
    WorldMapMapID? : Relation<int>
    ChunkX? : Relation<int>
    ChunkY? : Relation<int>
    SubchunkX? : Relation<int>
    SubchunkY? : Relation<int>
    ZoneintroMusicID? : Relation<int>
    ZoneMusicID? : Relation<int>
    SoundAmbienceID? : Relation<int>
    SoundProviderPreferencesID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class WorldChunkSoundsDBCFile extends DBCFile<
    WorldChunkSoundsCreator,
    WorldChunkSoundsQuery,
    WorldChunkSoundsRow> {
    constructor() {
        super('WorldChunkSounds',(t,b,o)=>new WorldChunkSoundsRow(t,b,o))
    }
    /** Loads a new WorldChunkSounds.dbc from a file. */
    static read(path: string): WorldChunkSoundsDBCFile {
        return new WorldChunkSoundsDBCFile().read(path);
    }
    add(WorldMapMapID : int,ChunkX : int,ChunkY : int,SubchunkX : int,SubchunkY : int, c? : WorldChunkSoundsCreator) : WorldChunkSoundsRow {
        return this.makeRow(0).clone(WorldMapMapID,ChunkX,ChunkY,SubchunkX,SubchunkY,c)
    }
}