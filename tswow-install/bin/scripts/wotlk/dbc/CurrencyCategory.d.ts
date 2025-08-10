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
export declare class CurrencyCategoryRow extends DBCRow<CurrencyCategoryCreator, CurrencyCategoryQuery> {
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
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CurrencyCategoryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CurrencyCategoryCreator = {
    Flags?: int;
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type CurrencyCategoryQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CurrencyCategoryDBCFile extends DBCFile<CurrencyCategoryCreator, CurrencyCategoryQuery, CurrencyCategoryRow> {
    constructor();
    /** Loads a new CurrencyCategory.dbc from a file. */
    static read(path: string): CurrencyCategoryDBCFile;
    add(ID: int, c?: CurrencyCategoryCreator): CurrencyCategoryRow;
}
