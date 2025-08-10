import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LanguagesRow extends DBCRow<LanguagesCreator, LanguagesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LanguagesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LanguagesCreator = {
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type LanguagesQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LanguagesDBCFile extends DBCFile<LanguagesCreator, LanguagesQuery, LanguagesRow> {
    constructor();
    /** Loads a new Languages.dbc from a file. */
    static read(path: string): LanguagesDBCFile;
    add(ID: int, c?: LanguagesCreator): LanguagesRow;
    findById(id: number): LanguagesRow;
}
