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
export declare class LanguageWordsRow extends DBCRow<LanguageWordsCreator, LanguageWordsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get LanguageID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Word(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LanguageWordsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LanguageWordsCreator = {
    LanguageID?: int;
    Word?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type LanguageWordsQuery = {
    ID?: Relation<int>;
    LanguageID?: Relation<int>;
    Word?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LanguageWordsDBCFile extends DBCFile<LanguageWordsCreator, LanguageWordsQuery, LanguageWordsRow> {
    constructor();
    /** Loads a new LanguageWords.dbc from a file. */
    static read(path: string): LanguageWordsDBCFile;
    add(ID: int, c?: LanguageWordsCreator): LanguageWordsRow;
    findById(id: number): LanguageWordsRow;
}
