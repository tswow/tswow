import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemGroupSoundsRow extends DBCRow<ItemGroupSoundsCreator, ItemGroupSoundsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Sound(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemGroupSoundsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemGroupSoundsCreator = {
    Sound?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemGroupSoundsQuery = {
    ID?: Relation<int>;
    Sound?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemGroupSoundsDBCFile extends DBCFile<ItemGroupSoundsCreator, ItemGroupSoundsQuery, ItemGroupSoundsRow> {
    constructor();
    /** Loads a new ItemGroupSounds.dbc from a file. */
    static read(path: string): ItemGroupSoundsDBCFile;
    add(ID: int, c?: ItemGroupSoundsCreator): ItemGroupSoundsRow;
    findById(id: number): ItemGroupSoundsRow;
}
