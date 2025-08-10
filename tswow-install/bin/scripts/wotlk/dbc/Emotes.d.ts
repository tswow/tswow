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
export declare class EmotesRow extends DBCRow<EmotesCreator, EmotesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get EmoteSlashCommand(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get AnimID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EmoteFlags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EmoteSpecProc(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EmoteSpecProcParam(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EventSoundID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: EmotesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type EmotesCreator = {
    EmoteSlashCommand?: string;
    AnimID?: int;
    EmoteFlags?: int;
    EmoteSpecProc?: int;
    EmoteSpecProcParam?: int;
    EventSoundID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type EmotesQuery = {
    ID?: Relation<int>;
    EmoteSlashCommand?: Relation<string>;
    AnimID?: Relation<int>;
    EmoteFlags?: Relation<int>;
    EmoteSpecProc?: Relation<int>;
    EmoteSpecProcParam?: Relation<int>;
    EventSoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class EmotesDBCFile extends DBCFile<EmotesCreator, EmotesQuery, EmotesRow> {
    constructor();
    /** Loads a new Emotes.dbc from a file. */
    static read(path: string): EmotesDBCFile;
    add(ID: int, c?: EmotesCreator): EmotesRow;
    findById(id: number): EmotesRow;
}
