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
export declare class EmotesTextDataRow extends DBCRow<EmotesTextDataCreator, EmotesTextDataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Text(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: EmotesTextDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type EmotesTextDataCreator = {
    Text?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type EmotesTextDataQuery = {
    ID?: Relation<int>;
    Text?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class EmotesTextDataDBCFile extends DBCFile<EmotesTextDataCreator, EmotesTextDataQuery, EmotesTextDataRow> {
    constructor();
    /** Loads a new EmotesTextData.dbc from a file. */
    static read(path: string): EmotesTextDataDBCFile;
    add(ID: int, c?: EmotesTextDataCreator): EmotesTextDataRow;
    findById(id: number): EmotesTextDataRow;
}
