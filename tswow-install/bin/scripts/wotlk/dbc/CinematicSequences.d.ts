import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CinematicSequencesRow extends DBCRow<CinematicSequencesCreator, CinematicSequencesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Camera(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CinematicSequencesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CinematicSequencesCreator = {
    SoundID?: int;
    Camera?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type CinematicSequencesQuery = {
    ID?: Relation<int>;
    SoundID?: Relation<int>;
    Camera?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CinematicSequencesDBCFile extends DBCFile<CinematicSequencesCreator, CinematicSequencesQuery, CinematicSequencesRow> {
    constructor();
    /** Loads a new CinematicSequences.dbc from a file. */
    static read(path: string): CinematicSequencesDBCFile;
    add(ID: int, c?: CinematicSequencesCreator): CinematicSequencesRow;
    findById(id: number): CinematicSequencesRow;
}
