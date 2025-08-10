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
export declare class ItemRow extends DBCRow<ItemCreator, ItemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ClassID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SubclassID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Sound_Override_Subclassid(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Material(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayInfoID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get InventoryType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SheatheType(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemCreator = {
    ClassID?: int;
    SubclassID?: int;
    Sound_Override_Subclassid?: int;
    Material?: int;
    DisplayInfoID?: int;
    InventoryType?: int;
    SheatheType?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemQuery = {
    ID?: Relation<int>;
    ClassID?: Relation<int>;
    SubclassID?: Relation<int>;
    Sound_Override_Subclassid?: Relation<int>;
    Material?: Relation<int>;
    DisplayInfoID?: Relation<int>;
    InventoryType?: Relation<int>;
    SheatheType?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemDBCFile extends DBCFile<ItemCreator, ItemQuery, ItemRow> {
    constructor();
    /** Loads a new Item.dbc from a file. */
    static read(path: string): ItemDBCFile;
    add(ID: int, c?: ItemCreator): ItemRow;
    findById(id: number): ItemRow;
}
