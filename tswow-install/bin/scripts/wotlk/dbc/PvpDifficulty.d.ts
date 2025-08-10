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
export declare class PvpDifficultyRow extends DBCRow<PvpDifficultyCreator, PvpDifficultyQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RangeIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Difficulty(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: PvpDifficultyCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type PvpDifficultyCreator = {
    MapID?: int;
    RangeIndex?: int;
    MinLevel?: int;
    MaxLevel?: int;
    Difficulty?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type PvpDifficultyQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    RangeIndex?: Relation<int>;
    MinLevel?: Relation<int>;
    MaxLevel?: Relation<int>;
    Difficulty?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class PvpDifficultyDBCFile extends DBCFile<PvpDifficultyCreator, PvpDifficultyQuery, PvpDifficultyRow> {
    constructor();
    /** Loads a new PvpDifficulty.dbc from a file. */
    static read(path: string): PvpDifficultyDBCFile;
    add(ID: int, c?: PvpDifficultyCreator): PvpDifficultyRow;
    findById(id: number): PvpDifficultyRow;
}
