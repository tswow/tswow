import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemVisualEffectsRow extends DBCRow<ItemVisualEffectsCreator, ItemVisualEffectsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Model(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemVisualEffectsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemVisualEffectsCreator = {
    Model?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemVisualEffectsQuery = {
    ID?: Relation<int>;
    Model?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemVisualEffectsDBCFile extends DBCFile<ItemVisualEffectsCreator, ItemVisualEffectsQuery, ItemVisualEffectsRow> {
    constructor();
    /** Loads a new ItemVisualEffects.dbc from a file. */
    static read(path: string): ItemVisualEffectsDBCFile;
    add(ID: int, c?: ItemVisualEffectsCreator): ItemVisualEffectsRow;
    findById(id: number): ItemVisualEffectsRow;
}
