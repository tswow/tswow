import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ChatChannelsRow extends DBCRow<ChatChannelsCreator, ChatChannelsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FactionGroup(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Shortcut(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ChatChannelsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ChatChannelsCreator = {
    Flags?: int;
    FactionGroup?: int;
    Name?: loc_constructor;
    Shortcut?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type ChatChannelsQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    FactionGroup?: Relation<int>;
    Name?: Relation<string>;
    Shortcut?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ChatChannelsDBCFile extends DBCFile<ChatChannelsCreator, ChatChannelsQuery, ChatChannelsRow> {
    constructor();
    /** Loads a new ChatChannels.dbc from a file. */
    static read(path: string): ChatChannelsDBCFile;
    add(ID: int, c?: ChatChannelsCreator): ChatChannelsRow;
    findById(id: number): ChatChannelsRow;
}
