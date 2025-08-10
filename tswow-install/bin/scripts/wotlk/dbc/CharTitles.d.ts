import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CharTitlesRow extends DBCRow<CharTitlesCreator, CharTitlesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * Unused
     */
    get Condition_ID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Name1(): DBCLocCell<this>;
    /**
     * Needs to auto-increment
     */
    get Mask_ID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CharTitlesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CharTitlesCreator = {
    Condition_ID?: int;
    Name?: loc_constructor;
    Name1?: loc_constructor;
    Mask_ID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type CharTitlesQuery = {
    ID?: Relation<int>;
    Condition_ID?: Relation<int>;
    Name?: Relation<string>;
    Name1?: Relation<string>;
    Mask_ID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CharTitlesDBCFile extends DBCFile<CharTitlesCreator, CharTitlesQuery, CharTitlesRow> {
    constructor();
    /** Loads a new CharTitles.dbc from a file. */
    static read(path: string): CharTitlesDBCFile;
    add(ID: int, c?: CharTitlesCreator): CharTitlesRow;
    findById(id: number): CharTitlesRow;
}
