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
export declare class ItemRandomSuffixRow extends DBCRow<ItemRandomSuffixCreator, ItemRandomSuffixQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get InternalName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Enchantment(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get AllocationPct(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemRandomSuffixCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemRandomSuffixCreator = {
    Name?: loc_constructor;
    InternalName?: string;
    Enchantment?: int[];
    AllocationPct?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemRandomSuffixQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    InternalName?: Relation<string>;
    Enchantment?: Relation<int>;
    AllocationPct?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemRandomSuffixDBCFile extends DBCFile<ItemRandomSuffixCreator, ItemRandomSuffixQuery, ItemRandomSuffixRow> {
    constructor();
    /** Loads a new ItemRandomSuffix.dbc from a file. */
    static read(path: string): ItemRandomSuffixDBCFile;
    add(ID: int, c?: ItemRandomSuffixCreator): ItemRandomSuffixRow;
    findById(id: number): ItemRandomSuffixRow;
}
