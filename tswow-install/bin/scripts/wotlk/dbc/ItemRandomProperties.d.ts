import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemRandomPropertiesRow extends DBCRow<ItemRandomPropertiesCreator, ItemRandomPropertiesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Enchantment(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Name2(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemRandomPropertiesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemRandomPropertiesCreator = {
    Name?: string;
    Enchantment?: int[];
    Name2?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemRandomPropertiesQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Enchantment?: Relation<int>;
    Name2?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemRandomPropertiesDBCFile extends DBCFile<ItemRandomPropertiesCreator, ItemRandomPropertiesQuery, ItemRandomPropertiesRow> {
    constructor();
    /** Loads a new ItemRandomProperties.dbc from a file. */
    static read(path: string): ItemRandomPropertiesDBCFile;
    add(ID: int, c?: ItemRandomPropertiesCreator): ItemRandomPropertiesRow;
    findById(id: number): ItemRandomPropertiesRow;
}
