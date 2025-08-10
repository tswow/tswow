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
export declare class SpellVisualPrecastTransitionsRow extends DBCRow<SpellVisualPrecastTransitionsCreator, SpellVisualPrecastTransitionsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get LoadAnimation(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get HoldAnimation(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellVisualPrecastTransitionsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualPrecastTransitionsCreator = {
    LoadAnimation?: string;
    HoldAnimation?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualPrecastTransitionsQuery = {
    ID?: Relation<int>;
    LoadAnimation?: Relation<string>;
    HoldAnimation?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualPrecastTransitionsDBCFile extends DBCFile<SpellVisualPrecastTransitionsCreator, SpellVisualPrecastTransitionsQuery, SpellVisualPrecastTransitionsRow> {
    constructor();
    /** Loads a new SpellVisualPrecastTransitions.dbc from a file. */
    static read(path: string): SpellVisualPrecastTransitionsDBCFile;
    add(ID: int, c?: SpellVisualPrecastTransitionsCreator): SpellVisualPrecastTransitionsRow;
    findById(id: number): SpellVisualPrecastTransitionsRow;
}
