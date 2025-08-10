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
export declare class ItemSubClassMaskRow extends DBCRow<ItemSubClassMaskCreator, ItemSubClassMaskQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ClassID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get flag(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ClassID: int, c?: ItemSubClassMaskCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemSubClassMaskCreator = {
    flag?: int;
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemSubClassMaskQuery = {
    ClassID?: Relation<int>;
    flag?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemSubClassMaskDBCFile extends DBCFile<ItemSubClassMaskCreator, ItemSubClassMaskQuery, ItemSubClassMaskRow> {
    constructor();
    /** Loads a new ItemSubClassMask.dbc from a file. */
    static read(path: string): ItemSubClassMaskDBCFile;
    add(ClassID: int, c?: ItemSubClassMaskCreator): ItemSubClassMaskRow;
}
