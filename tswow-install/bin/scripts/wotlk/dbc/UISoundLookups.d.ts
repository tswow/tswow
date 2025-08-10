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
export declare class UISoundLookupsRow extends DBCRow<UISoundLookupsCreator, UISoundLookupsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: UISoundLookupsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type UISoundLookupsCreator = {
    SoundID?: int;
    Name?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type UISoundLookupsQuery = {
    ID?: Relation<int>;
    SoundID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class UISoundLookupsDBCFile extends DBCFile<UISoundLookupsCreator, UISoundLookupsQuery, UISoundLookupsRow> {
    constructor();
    /** Loads a new UISoundLookups.dbc from a file. */
    static read(path: string): UISoundLookupsDBCFile;
    add(ID: int, c?: UISoundLookupsCreator): UISoundLookupsRow;
    findById(id: number): UISoundLookupsRow;
}
