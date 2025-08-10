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
export declare class Cfg_CategoriesRow extends DBCRow<Cfg_CategoriesCreator, Cfg_CategoriesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get LocaleMask(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CharsetMask(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: Cfg_CategoriesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type Cfg_CategoriesCreator = {
    LocaleMask?: int;
    CharsetMask?: int;
    Flags?: int;
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type Cfg_CategoriesQuery = {
    ID?: Relation<int>;
    LocaleMask?: Relation<int>;
    CharsetMask?: Relation<int>;
    Flags?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class Cfg_CategoriesDBCFile extends DBCFile<Cfg_CategoriesCreator, Cfg_CategoriesQuery, Cfg_CategoriesRow> {
    constructor();
    /** Loads a new Cfg_Categories.dbc from a file. */
    static read(path: string): Cfg_CategoriesDBCFile;
    add(ID: int, c?: Cfg_CategoriesCreator): Cfg_CategoriesRow;
    findById(id: number): Cfg_CategoriesRow;
}
