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
export declare class ItemCondExtCostsRow extends DBCRow<ItemCondExtCostsCreator, ItemCondExtCostsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Field01(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemExtendedCost(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Field03(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemCondExtCostsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemCondExtCostsCreator = {
    Field01?: int;
    ItemExtendedCost?: int;
    Field03?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemCondExtCostsQuery = {
    ID?: Relation<int>;
    Field01?: Relation<int>;
    ItemExtendedCost?: Relation<int>;
    Field03?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemCondExtCostsDBCFile extends DBCFile<ItemCondExtCostsCreator, ItemCondExtCostsQuery, ItemCondExtCostsRow> {
    constructor();
    /** Loads a new ItemCondExtCosts.dbc from a file. */
    static read(path: string): ItemCondExtCostsDBCFile;
    add(ID: int, c?: ItemCondExtCostsCreator): ItemCondExtCostsRow;
    findById(id: number): ItemCondExtCostsRow;
}
