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
export declare class SoundFilterRow extends DBCRow<SoundFilterCreator, SoundFilterQuery> {
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
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundFilterCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundFilterCreator = {
    Name?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundFilterQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundFilterDBCFile extends DBCFile<SoundFilterCreator, SoundFilterQuery, SoundFilterRow> {
    constructor();
    /** Loads a new SoundFilter.dbc from a file. */
    static read(path: string): SoundFilterDBCFile;
    add(ID: int, c?: SoundFilterCreator): SoundFilterRow;
    findById(id: number): SoundFilterRow;
}
