import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemPurchaseGroupRow extends DBCRow<ItemPurchaseGroupCreator, ItemPurchaseGroupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemPurchaseGroupCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemPurchaseGroupCreator = {
    ItemID?: int[];
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemPurchaseGroupQuery = {
    ID?: Relation<int>;
    ItemID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemPurchaseGroupDBCFile extends DBCFile<ItemPurchaseGroupCreator, ItemPurchaseGroupQuery, ItemPurchaseGroupRow> {
    constructor();
    /** Loads a new ItemPurchaseGroup.dbc from a file. */
    static read(path: string): ItemPurchaseGroupDBCFile;
    add(ID: int, c?: ItemPurchaseGroupCreator): ItemPurchaseGroupRow;
    findById(id: number): ItemPurchaseGroupRow;
}
