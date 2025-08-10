import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class EmotesTextSoundRow extends DBCRow<EmotesTextSoundCreator, EmotesTextSoundQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get EmotesTextID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RaceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SexID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: EmotesTextSoundCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type EmotesTextSoundCreator = {
    EmotesTextID?: int;
    RaceID?: int;
    SexID?: int;
    SoundID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type EmotesTextSoundQuery = {
    ID?: Relation<int>;
    EmotesTextID?: Relation<int>;
    RaceID?: Relation<int>;
    SexID?: Relation<int>;
    SoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class EmotesTextSoundDBCFile extends DBCFile<EmotesTextSoundCreator, EmotesTextSoundQuery, EmotesTextSoundRow> {
    constructor();
    /** Loads a new EmotesTextSound.dbc from a file. */
    static read(path: string): EmotesTextSoundDBCFile;
    add(ID: int, c?: EmotesTextSoundCreator): EmotesTextSoundRow;
}
