import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellFocusObjectRow extends DBCRow<SpellFocusObjectCreator, SpellFocusObjectQuery> {
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
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellFocusObjectCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellFocusObjectCreator = {
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellFocusObjectQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellFocusObjectDBCFile extends DBCFile<SpellFocusObjectCreator, SpellFocusObjectQuery, SpellFocusObjectRow> {
    constructor();
    /** Loads a new SpellFocusObject.dbc from a file. */
    static read(path: string): SpellFocusObjectDBCFile;
    add(ID: int, c?: SpellFocusObjectCreator): SpellFocusObjectRow;
    findById(id: number): SpellFocusObjectRow;
}
