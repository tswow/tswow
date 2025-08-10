import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemExtendedCostRow extends DBCRow<ItemExtendedCostCreator, ItemExtendedCostQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get HonorPoints(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ArenaPoints(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ArenaBracket(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemCount(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredArenaRating(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemPurchaseGroup(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemExtendedCostCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemExtendedCostCreator = {
    HonorPoints?: int;
    ArenaPoints?: int;
    ArenaBracket?: int;
    ItemID?: int[];
    ItemCount?: int[];
    RequiredArenaRating?: int;
    ItemPurchaseGroup?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemExtendedCostQuery = {
    ID?: Relation<int>;
    HonorPoints?: Relation<int>;
    ArenaPoints?: Relation<int>;
    ArenaBracket?: Relation<int>;
    ItemID?: Relation<int>;
    ItemCount?: Relation<int>;
    RequiredArenaRating?: Relation<int>;
    ItemPurchaseGroup?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemExtendedCostDBCFile extends DBCFile<ItemExtendedCostCreator, ItemExtendedCostQuery, ItemExtendedCostRow> {
    constructor();
    /** Loads a new ItemExtendedCost.dbc from a file. */
    static read(path: string): ItemExtendedCostDBCFile;
    add(ID: int, c?: ItemExtendedCostCreator): ItemExtendedCostRow;
    findById(id: number): ItemExtendedCostRow;
}
