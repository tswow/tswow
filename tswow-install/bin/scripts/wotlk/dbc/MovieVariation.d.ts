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
export declare class MovieVariationRow extends DBCRow<MovieVariationCreator, MovieVariationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MovieID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FileDataID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: MovieVariationCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type MovieVariationCreator = {
    MovieID?: int;
    FileDataID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type MovieVariationQuery = {
    ID?: Relation<int>;
    MovieID?: Relation<int>;
    FileDataID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class MovieVariationDBCFile extends DBCFile<MovieVariationCreator, MovieVariationQuery, MovieVariationRow> {
    constructor();
    /** Loads a new MovieVariation.dbc from a file. */
    static read(path: string): MovieVariationDBCFile;
    add(ID: int, c?: MovieVariationCreator): MovieVariationRow;
    findById(id: number): MovieVariationRow;
}
