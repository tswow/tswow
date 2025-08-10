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
export declare class ItemClassRow extends DBCRow<ItemClassCreator, ItemClassQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ClassID(): DBCKeyCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SubclassMapID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ClassName(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ClassID: int, SubclassMapID: int, c?: ItemClassCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemClassCreator = {
    Flags?: int;
    ClassName?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemClassQuery = {
    ClassID?: Relation<int>;
    SubclassMapID?: Relation<int>;
    Flags?: Relation<int>;
    ClassName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemClassDBCFile extends DBCFile<ItemClassCreator, ItemClassQuery, ItemClassRow> {
    constructor();
    /** Loads a new ItemClass.dbc from a file. */
    static read(path: string): ItemClassDBCFile;
    add(ClassID: int, SubclassMapID: int, c?: ItemClassCreator): ItemClassRow;
}
