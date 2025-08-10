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
export declare class StringLookupsRow extends DBCRow<StringLookupsCreator, StringLookupsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get String(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: StringLookupsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type StringLookupsCreator = {
    String?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type StringLookupsQuery = {
    ID?: Relation<int>;
    String?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class StringLookupsDBCFile extends DBCFile<StringLookupsCreator, StringLookupsQuery, StringLookupsRow> {
    constructor();
    /** Loads a new StringLookups.dbc from a file. */
    static read(path: string): StringLookupsDBCFile;
    add(ID: int, c?: StringLookupsCreator): StringLookupsRow;
    findById(id: number): StringLookupsRow;
}
