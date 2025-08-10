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
export declare class MovieFileDataRow extends DBCRow<MovieFileDataCreator, MovieFileDataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Resolution(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: MovieFileDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type MovieFileDataCreator = {
    Resolution?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type MovieFileDataQuery = {
    ID?: Relation<int>;
    Resolution?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class MovieFileDataDBCFile extends DBCFile<MovieFileDataCreator, MovieFileDataQuery, MovieFileDataRow> {
    constructor();
    /** Loads a new MovieFileData.dbc from a file. */
    static read(path: string): MovieFileDataDBCFile;
    add(ID: int, c?: MovieFileDataCreator): MovieFileDataRow;
    findById(id: number): MovieFileDataRow;
}
