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
export declare class FileDataRow extends DBCRow<FileDataCreator, FileDataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Filename(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Filepath(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: FileDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type FileDataCreator = {
    Filename?: string;
    Filepath?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type FileDataQuery = {
    ID?: Relation<int>;
    Filename?: Relation<string>;
    Filepath?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class FileDataDBCFile extends DBCFile<FileDataCreator, FileDataQuery, FileDataRow> {
    constructor();
    /** Loads a new FileData.dbc from a file. */
    static read(path: string): FileDataDBCFile;
    add(ID: int, c?: FileDataCreator): FileDataRow;
    findById(id: number): FileDataRow;
}
