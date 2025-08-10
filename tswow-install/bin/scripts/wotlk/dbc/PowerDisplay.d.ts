import { byte, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCByteCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class PowerDisplayRow extends DBCRow<PowerDisplayCreator, PowerDisplayQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ActualType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get GlobalstringBaseTag(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Red(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get Green(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get Blue(): DBCByteCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: PowerDisplayCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type PowerDisplayCreator = {
    ActualType?: int;
    GlobalstringBaseTag?: string;
    Red?: byte;
    Green?: byte;
    Blue?: byte;
};
/**
 * Used for queries (Don't comment these)
 */
export type PowerDisplayQuery = {
    ID?: Relation<int>;
    ActualType?: Relation<int>;
    GlobalstringBaseTag?: Relation<string>;
    Red?: Relation<byte>;
    Green?: Relation<byte>;
    Blue?: Relation<byte>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class PowerDisplayDBCFile extends DBCFile<PowerDisplayCreator, PowerDisplayQuery, PowerDisplayRow> {
    constructor();
    /** Loads a new PowerDisplay.dbc from a file. */
    static read(path: string): PowerDisplayDBCFile;
    add(ID: int, c?: PowerDisplayCreator): PowerDisplayRow;
    findById(id: number): PowerDisplayRow;
}
