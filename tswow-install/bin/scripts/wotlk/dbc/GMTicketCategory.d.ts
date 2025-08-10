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
export declare class GMTicketCategoryRow extends DBCRow<GMTicketCategoryCreator, GMTicketCategoryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Category(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GMTicketCategoryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GMTicketCategoryCreator = {
    Category?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type GMTicketCategoryQuery = {
    ID?: Relation<int>;
    Category?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GMTicketCategoryDBCFile extends DBCFile<GMTicketCategoryCreator, GMTicketCategoryQuery, GMTicketCategoryRow> {
    constructor();
    /** Loads a new GMTicketCategory.dbc from a file. */
    static read(path: string): GMTicketCategoryDBCFile;
    add(ID: int, c?: GMTicketCategoryCreator): GMTicketCategoryRow;
    findById(id: number): GMTicketCategoryRow;
}
