import { DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class Startup_stringsRow extends DBCRow<Startup_stringsCreator, Startup_stringsQuery> {
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
    get Message(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: Startup_stringsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type Startup_stringsCreator = {
    Name?: string;
    Message?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type Startup_stringsQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Message?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class Startup_stringsDBCFile extends DBCFile<Startup_stringsCreator, Startup_stringsQuery, Startup_stringsRow> {
    constructor();
    /** Loads a new Startup_strings.dbc from a file. */
    static read(path: string): Startup_stringsDBCFile;
    add(ID: int, c?: Startup_stringsCreator): Startup_stringsRow;
    findById(id: number): Startup_stringsRow;
}
