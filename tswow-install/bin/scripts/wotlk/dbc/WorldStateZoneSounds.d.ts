import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldStateZoneSoundsRow extends DBCRow<WorldStateZoneSoundsCreator, WorldStateZoneSoundsQuery> {
    /**
     * No comment (yet!)
     */
    get WorldStateID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WorldStateValue(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WMOAreaID(): DBCIntCell<this>;
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
    clone(c?: WorldStateZoneSoundsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WorldStateZoneSoundsCreator = {
    WorldStateID?: int;
    WorldStateValue?: int;
    AreaID?: int;
    WMOAreaID?: int;
    ZoneintroMusicID?: int;
    ZoneMusicID?: int;
    SoundAmbienceID?: int;
    SoundProviderPreferencesID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type WorldStateZoneSoundsQuery = {
    WorldStateID?: Relation<int>;
    WorldStateValue?: Relation<int>;
    AreaID?: Relation<int>;
    WMOAreaID?: Relation<int>;
    ZoneintroMusicID?: Relation<int>;
    ZoneMusicID?: Relation<int>;
    SoundAmbienceID?: Relation<int>;
    SoundProviderPreferencesID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldStateZoneSoundsDBCFile extends DBCFile<WorldStateZoneSoundsCreator, WorldStateZoneSoundsQuery, WorldStateZoneSoundsRow> {
    constructor();
    /** Loads a new WorldStateZoneSounds.dbc from a file. */
    static read(path: string): WorldStateZoneSoundsDBCFile;
    add(c?: WorldStateZoneSoundsCreator): WorldStateZoneSoundsRow;
}
