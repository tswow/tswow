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
export declare class StableSlotPricesRow extends DBCRow<StableSlotPricesCreator, StableSlotPricesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Cost(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: StableSlotPricesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type StableSlotPricesCreator = {
    Cost?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type StableSlotPricesQuery = {
    ID?: Relation<int>;
    Cost?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class StableSlotPricesDBCFile extends DBCFile<StableSlotPricesCreator, StableSlotPricesQuery, StableSlotPricesRow> {
    constructor();
    /** Loads a new StableSlotPrices.dbc from a file. */
    static read(path: string): StableSlotPricesDBCFile;
    add(ID: int, c?: StableSlotPricesCreator): StableSlotPricesRow;
    findById(id: number): StableSlotPricesRow;
}
