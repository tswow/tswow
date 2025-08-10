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
export declare class ItemLimitCategoryRow extends DBCRow<ItemLimitCategoryCreator, ItemLimitCategoryQuery> {
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
     * No comment (yet!)
     */
    get Quantity(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemLimitCategoryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemLimitCategoryCreator = {
    Name?: loc_constructor;
    Quantity?: int;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemLimitCategoryQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Quantity?: Relation<int>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemLimitCategoryDBCFile extends DBCFile<ItemLimitCategoryCreator, ItemLimitCategoryQuery, ItemLimitCategoryRow> {
    constructor();
    /** Loads a new ItemLimitCategory.dbc from a file. */
    static read(path: string): ItemLimitCategoryDBCFile;
    add(ID: int, c?: ItemLimitCategoryCreator): ItemLimitCategoryRow;
    findById(id: number): ItemLimitCategoryRow;
}
