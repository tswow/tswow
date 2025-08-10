import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundSamplePreferencesRow extends DBCRow<SoundSamplePreferencesCreator, SoundSamplePreferencesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Field01(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field02(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field03(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field04(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field05(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field06(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field07(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field08(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Field09(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Field10(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field11(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field12(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field13(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Field14(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field15(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Field16(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundSamplePreferencesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundSamplePreferencesCreator = {
    Field01?: int;
    Field02?: int;
    Field03?: int;
    Field04?: int;
    Field05?: int;
    Field06?: int;
    Field07?: int;
    Field08?: float;
    Field09?: float;
    Field10?: int;
    Field11?: int;
    Field12?: int;
    Field13?: float;
    Field14?: int;
    Field15?: float;
    Field16?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundSamplePreferencesQuery = {
    ID?: Relation<int>;
    Field01?: Relation<int>;
    Field02?: Relation<int>;
    Field03?: Relation<int>;
    Field04?: Relation<int>;
    Field05?: Relation<int>;
    Field06?: Relation<int>;
    Field07?: Relation<int>;
    Field08?: Relation<float>;
    Field09?: Relation<float>;
    Field10?: Relation<int>;
    Field11?: Relation<int>;
    Field12?: Relation<int>;
    Field13?: Relation<float>;
    Field14?: Relation<int>;
    Field15?: Relation<float>;
    Field16?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundSamplePreferencesDBCFile extends DBCFile<SoundSamplePreferencesCreator, SoundSamplePreferencesQuery, SoundSamplePreferencesRow> {
    constructor();
    /** Loads a new SoundSamplePreferences.dbc from a file. */
    static read(path: string): SoundSamplePreferencesDBCFile;
    add(ID: int, c?: SoundSamplePreferencesCreator): SoundSamplePreferencesRow;
    findById(id: number): SoundSamplePreferencesRow;
}
