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
export declare class ChatProfanityRow extends DBCRow<ChatProfanityCreator, ChatProfanityQuery> {
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
     * No comment (yet!)
     */
    get Language(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ChatProfanityCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ChatProfanityCreator = {
    Text?: string;
    Language?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ChatProfanityQuery = {
    ID?: Relation<int>;
    Text?: Relation<string>;
    Language?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ChatProfanityDBCFile extends DBCFile<ChatProfanityCreator, ChatProfanityQuery, ChatProfanityRow> {
    constructor();
    /** Loads a new ChatProfanity.dbc from a file. */
    static read(path: string): ChatProfanityDBCFile;
    add(ID: int, c?: ChatProfanityCreator): ChatProfanityRow;
    findById(id: number): ChatProfanityRow;
}
