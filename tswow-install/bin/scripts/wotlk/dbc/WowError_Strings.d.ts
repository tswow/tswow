import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class WowError_StringsRow extends DBCRow<WowError_StringsCreator, WowError_StringsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ErrorName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get ErrorString(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WowError_StringsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WowError_StringsCreator = {
    ErrorName?: string;
    ErrorString?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type WowError_StringsQuery = {
    ID?: Relation<int>;
    ErrorName?: Relation<string>;
    ErrorString?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WowError_StringsDBCFile extends DBCFile<WowError_StringsCreator, WowError_StringsQuery, WowError_StringsRow> {
    constructor();
    /** Loads a new WowError_Strings.dbc from a file. */
    static read(path: string): WowError_StringsDBCFile;
    add(ID: int, c?: WowError_StringsCreator): WowError_StringsRow;
    findById(id: number): WowError_StringsRow;
}
