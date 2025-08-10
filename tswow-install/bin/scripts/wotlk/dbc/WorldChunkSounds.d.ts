import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldChunkSoundsRow extends DBCRow<WorldChunkSoundsCreator, WorldChunkSoundsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get WorldMapMapID(): DBCKeyCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ChunkX(): DBCKeyCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ChunkY(): DBCKeyCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SubchunkX(): DBCKeyCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SubchunkY(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ZoneintroMusicID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ZoneMusicID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundAmbienceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundProviderPreferencesID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(WorldMapMapID: int, ChunkX: int, ChunkY: int, SubchunkX: int, SubchunkY: int, c?: WorldChunkSoundsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WorldChunkSoundsCreator = {
    ZoneintroMusicID?: int;
    ZoneMusicID?: int;
    SoundAmbienceID?: int;
    SoundProviderPreferencesID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type WorldChunkSoundsQuery = {
    WorldMapMapID?: Relation<int>;
    ChunkX?: Relation<int>;
    ChunkY?: Relation<int>;
    SubchunkX?: Relation<int>;
    SubchunkY?: Relation<int>;
    ZoneintroMusicID?: Relation<int>;
    ZoneMusicID?: Relation<int>;
    SoundAmbienceID?: Relation<int>;
    SoundProviderPreferencesID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldChunkSoundsDBCFile extends DBCFile<WorldChunkSoundsCreator, WorldChunkSoundsQuery, WorldChunkSoundsRow> {
    constructor();
    /** Loads a new WorldChunkSounds.dbc from a file. */
    static read(path: string): WorldChunkSoundsDBCFile;
    add(WorldMapMapID: int, ChunkX: int, ChunkY: int, SubchunkX: int, SubchunkY: int, c?: WorldChunkSoundsCreator): WorldChunkSoundsRow;
}
