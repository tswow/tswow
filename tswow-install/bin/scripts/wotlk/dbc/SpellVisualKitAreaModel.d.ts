import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualKitAreaModelRow extends DBCRow<SpellVisualKitAreaModelCreator, SpellVisualKitAreaModelQuery> {
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
    get EnumID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellVisualKitAreaModelCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualKitAreaModelCreator = {
    Name?: string;
    EnumID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualKitAreaModelQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    EnumID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualKitAreaModelDBCFile extends DBCFile<SpellVisualKitAreaModelCreator, SpellVisualKitAreaModelQuery, SpellVisualKitAreaModelRow> {
    constructor();
    /** Loads a new SpellVisualKitAreaModel.dbc from a file. */
    static read(path: string): SpellVisualKitAreaModelDBCFile;
    add(ID: int, c?: SpellVisualKitAreaModelCreator): SpellVisualKitAreaModelRow;
    findById(id: number): SpellVisualKitAreaModelRow;
}
