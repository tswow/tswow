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
export declare class SpamMessagesRow extends DBCRow<SpamMessagesCreator, SpamMessagesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Text(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpamMessagesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpamMessagesCreator = {
    Text?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpamMessagesQuery = {
    ID?: Relation<int>;
    Text?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpamMessagesDBCFile extends DBCFile<SpamMessagesCreator, SpamMessagesQuery, SpamMessagesRow> {
    constructor();
    /** Loads a new SpamMessages.dbc from a file. */
    static read(path: string): SpamMessagesDBCFile;
    add(ID: int, c?: SpamMessagesCreator): SpamMessagesRow;
    findById(id: number): SpamMessagesRow;
}
