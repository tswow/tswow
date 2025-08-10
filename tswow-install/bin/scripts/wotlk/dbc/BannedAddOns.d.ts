import { int, uint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCUIntArrayCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class BannedAddOnsRow extends DBCRow<BannedAddOnsCreator, BannedAddOnsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get NameMD5_(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get VersionMD5_(): DBCUIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get LastModified(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: BannedAddOnsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type BannedAddOnsCreator = {
    NameMD5_?: uint[];
    VersionMD5_?: uint[];
    LastModified?: int;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type BannedAddOnsQuery = {
    ID?: Relation<int>;
    NameMD5_?: Relation<uint>;
    VersionMD5_?: Relation<uint>;
    LastModified?: Relation<int>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class BannedAddOnsDBCFile extends DBCFile<BannedAddOnsCreator, BannedAddOnsQuery, BannedAddOnsRow> {
    constructor();
    /** Loads a new BannedAddOns.dbc from a file. */
    static read(path: string): BannedAddOnsDBCFile;
    add(ID: int, c?: BannedAddOnsCreator): BannedAddOnsRow;
    findById(id: number): BannedAddOnsRow;
}
