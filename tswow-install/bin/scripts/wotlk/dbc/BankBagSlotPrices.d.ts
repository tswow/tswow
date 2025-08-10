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
export declare class BankBagSlotPricesRow extends DBCRow<BankBagSlotPricesCreator, BankBagSlotPricesQuery> {
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
    clone(ID: int, c?: BankBagSlotPricesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type BankBagSlotPricesCreator = {
    Cost?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type BankBagSlotPricesQuery = {
    ID?: Relation<int>;
    Cost?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class BankBagSlotPricesDBCFile extends DBCFile<BankBagSlotPricesCreator, BankBagSlotPricesQuery, BankBagSlotPricesRow> {
    constructor();
    /** Loads a new BankBagSlotPrices.dbc from a file. */
    static read(path: string): BankBagSlotPricesDBCFile;
    add(ID: int, c?: BankBagSlotPricesCreator): BankBagSlotPricesRow;
    findById(id: number): BankBagSlotPricesRow;
}
