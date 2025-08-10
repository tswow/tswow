import { byte, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCByteCell, DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CharStartOutfitRow extends DBCRow<CharStartOutfitCreator, CharStartOutfitQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get RaceID(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get ClassID(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get SexID(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get OutfitID(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayItemID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get InventoryType(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CharStartOutfitCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CharStartOutfitCreator = {
    RaceID?: byte;
    ClassID?: byte;
    SexID?: byte;
    OutfitID?: byte;
    ItemID?: int[];
    DisplayItemID?: int[];
    InventoryType?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type CharStartOutfitQuery = {
    ID?: Relation<int>;
    RaceID?: Relation<byte>;
    ClassID?: Relation<byte>;
    SexID?: Relation<byte>;
    OutfitID?: Relation<byte>;
    ItemID?: Relation<int>;
    DisplayItemID?: Relation<int>;
    InventoryType?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CharStartOutfitDBCFile extends DBCFile<CharStartOutfitCreator, CharStartOutfitQuery, CharStartOutfitRow> {
    constructor();
    /** Loads a new CharStartOutfit.dbc from a file. */
    static read(path: string): CharStartOutfitDBCFile;
    add(ID: int, c?: CharStartOutfitCreator): CharStartOutfitRow;
}
