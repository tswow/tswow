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
export declare class ItemVisualsRow extends DBCRow<ItemVisualsCreator, ItemVisualsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Slot(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemVisualsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemVisualsCreator = {
    Slot?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemVisualsQuery = {
    ID?: Relation<int>;
    Slot?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemVisualsDBCFile extends DBCFile<ItemVisualsCreator, ItemVisualsQuery, ItemVisualsRow> {
    constructor();
    /** Loads a new ItemVisuals.dbc from a file. */
    static read(path: string): ItemVisualsDBCFile;
    add(ID: int, c?: ItemVisualsCreator): ItemVisualsRow;
    findById(id: number): ItemVisualsRow;
}
