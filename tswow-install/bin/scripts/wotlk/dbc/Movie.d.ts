import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class MovieRow extends DBCRow<MovieCreator, MovieQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Filename(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Volume(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: MovieCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type MovieCreator = {
    Filename?: string;
    Volume?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type MovieQuery = {
    ID?: Relation<int>;
    Filename?: Relation<string>;
    Volume?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class MovieDBCFile extends DBCFile<MovieCreator, MovieQuery, MovieRow> {
    constructor();
    /** Loads a new Movie.dbc from a file. */
    static read(path: string): MovieDBCFile;
    add(ID: int, c?: MovieCreator): MovieRow;
    findById(id: number): MovieRow;
}
