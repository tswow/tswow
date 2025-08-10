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
export declare class FootstepTerrainLookupRow extends DBCRow<FootstepTerrainLookupCreator, FootstepTerrainLookupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureFootstepID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TerrainSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundIDSplash(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: FootstepTerrainLookupCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type FootstepTerrainLookupCreator = {
    CreatureFootstepID?: int;
    TerrainSoundID?: int;
    SoundID?: int;
    SoundIDSplash?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type FootstepTerrainLookupQuery = {
    ID?: Relation<int>;
    CreatureFootstepID?: Relation<int>;
    TerrainSoundID?: Relation<int>;
    SoundID?: Relation<int>;
    SoundIDSplash?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class FootstepTerrainLookupDBCFile extends DBCFile<FootstepTerrainLookupCreator, FootstepTerrainLookupQuery, FootstepTerrainLookupRow> {
    constructor();
    /** Loads a new FootstepTerrainLookup.dbc from a file. */
    static read(path: string): FootstepTerrainLookupDBCFile;
    add(ID: int, c?: FootstepTerrainLookupCreator): FootstepTerrainLookupRow;
    findById(id: number): FootstepTerrainLookupRow;
}
