import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundAmbienceRow extends DBCRow<SoundAmbienceCreator, SoundAmbienceQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get AmbienceID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundAmbienceCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundAmbienceCreator = {
    AmbienceID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundAmbienceQuery = {
    ID?: Relation<int>;
    AmbienceID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundAmbienceDBCFile extends DBCFile<SoundAmbienceCreator, SoundAmbienceQuery, SoundAmbienceRow> {
    constructor();
    /** Loads a new SoundAmbience.dbc from a file. */
    static read(path: string): SoundAmbienceDBCFile;
    add(ID: int, c?: SoundAmbienceCreator): SoundAmbienceRow;
    findById(id: number): SoundAmbienceRow;
}
