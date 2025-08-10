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
export declare class SpellCategoryRow extends DBCRow<SpellCategoryCreator, SpellCategoryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellCategoryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellCategoryCreator = {
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellCategoryQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellCategoryDBCFile extends DBCFile<SpellCategoryCreator, SpellCategoryQuery, SpellCategoryRow> {
    constructor();
    /** Loads a new SpellCategory.dbc from a file. */
    static read(path: string): SpellCategoryDBCFile;
    add(ID: int, c?: SpellCategoryCreator): SpellCategoryRow;
    findById(id: number): SpellCategoryRow;
}
