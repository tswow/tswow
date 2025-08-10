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
export declare class SpellIconRow extends DBCRow<SpellIconCreator, SpellIconQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureFilename(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellIconCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellIconCreator = {
    TextureFilename?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellIconQuery = {
    ID?: Relation<int>;
    TextureFilename?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellIconDBCFile extends DBCFile<SpellIconCreator, SpellIconQuery, SpellIconRow> {
    constructor();
    /** Loads a new SpellIcon.dbc from a file. */
    static read(path: string): SpellIconDBCFile;
    add(ID: int, c?: SpellIconCreator): SpellIconRow;
    findById(id: number): SpellIconRow;
}
