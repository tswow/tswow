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
export declare class GlyphSlotRow extends DBCRow<GlyphSlotCreator, GlyphSlotQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Type(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Tooltip(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GlyphSlotCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GlyphSlotCreator = {
    Type?: int;
    Tooltip?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type GlyphSlotQuery = {
    ID?: Relation<int>;
    Type?: Relation<int>;
    Tooltip?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GlyphSlotDBCFile extends DBCFile<GlyphSlotCreator, GlyphSlotQuery, GlyphSlotRow> {
    constructor();
    /** Loads a new GlyphSlot.dbc from a file. */
    static read(path: string): GlyphSlotDBCFile;
    add(ID: int, c?: GlyphSlotCreator): GlyphSlotRow;
    findById(id: number): GlyphSlotRow;
}
