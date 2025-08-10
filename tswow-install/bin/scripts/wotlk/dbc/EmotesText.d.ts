import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class EmotesTextRow extends DBCRow<EmotesTextCreator, EmotesTextQuery> {
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
    get EmoteID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EmoteText(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: EmotesTextCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type EmotesTextCreator = {
    Name?: string;
    EmoteID?: int;
    EmoteText?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type EmotesTextQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    EmoteID?: Relation<int>;
    EmoteText?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class EmotesTextDBCFile extends DBCFile<EmotesTextCreator, EmotesTextQuery, EmotesTextRow> {
    constructor();
    /** Loads a new EmotesText.dbc from a file. */
    static read(path: string): EmotesTextDBCFile;
    add(ID: int, c?: EmotesTextCreator): EmotesTextRow;
    findById(id: number): EmotesTextRow;
}
