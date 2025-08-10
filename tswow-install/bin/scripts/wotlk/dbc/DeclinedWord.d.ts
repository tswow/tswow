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
export declare class DeclinedWordRow extends DBCRow<DeclinedWordCreator, DeclinedWordQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Word(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DeclinedWordCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DeclinedWordCreator = {
    Word?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type DeclinedWordQuery = {
    ID?: Relation<int>;
    Word?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DeclinedWordDBCFile extends DBCFile<DeclinedWordCreator, DeclinedWordQuery, DeclinedWordRow> {
    constructor();
    /** Loads a new DeclinedWord.dbc from a file. */
    static read(path: string): DeclinedWordDBCFile;
    add(ID: int, c?: DeclinedWordCreator): DeclinedWordRow;
    findById(id: number): DeclinedWordRow;
}
