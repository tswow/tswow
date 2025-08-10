import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class PaperDollItemFrameRow extends DBCRow<PaperDollItemFrameCreator, PaperDollItemFrameQuery> {
    /**
     * No comment (yet!)
     */
    get ItemButtonName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get SlotIcon(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get SlotNumber(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(c?: PaperDollItemFrameCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type PaperDollItemFrameCreator = {
    ItemButtonName?: string;
    SlotIcon?: string;
    SlotNumber?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type PaperDollItemFrameQuery = {
    ItemButtonName?: Relation<string>;
    SlotIcon?: Relation<string>;
    SlotNumber?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class PaperDollItemFrameDBCFile extends DBCFile<PaperDollItemFrameCreator, PaperDollItemFrameQuery, PaperDollItemFrameRow> {
    constructor();
    /** Loads a new PaperDollItemFrame.dbc from a file. */
    static read(path: string): PaperDollItemFrameDBCFile;
    add(c?: PaperDollItemFrameCreator): PaperDollItemFrameRow;
}
