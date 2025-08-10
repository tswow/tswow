import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class FootprintTexturesRow extends DBCRow<FootprintTexturesCreator, FootprintTexturesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get FootstepFilename(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: FootprintTexturesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type FootprintTexturesCreator = {
    FootstepFilename?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type FootprintTexturesQuery = {
    ID?: Relation<int>;
    FootstepFilename?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class FootprintTexturesDBCFile extends DBCFile<FootprintTexturesCreator, FootprintTexturesQuery, FootprintTexturesRow> {
    constructor();
    /** Loads a new FootprintTextures.dbc from a file. */
    static read(path: string): FootprintTexturesDBCFile;
    add(ID: int, c?: FootprintTexturesCreator): FootprintTexturesRow;
    findById(id: number): FootprintTexturesRow;
}
