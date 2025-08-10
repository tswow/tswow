import { byte } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCByteCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CharBaseInfoRow extends DBCRow<CharBaseInfoCreator, CharBaseInfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get RaceID(): DBCByteCell<this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ClassID(): DBCByteCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(RaceID: byte, ClassID: byte, c?: CharBaseInfoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CharBaseInfoCreator = {};
/**
 * Used for queries (Don't comment these)
 */
export type CharBaseInfoQuery = {
    RaceID?: Relation<byte>;
    ClassID?: Relation<byte>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CharBaseInfoDBCFile extends DBCFile<CharBaseInfoCreator, CharBaseInfoQuery, CharBaseInfoRow> {
    constructor();
    /** Loads a new CharBaseInfo.dbc from a file. */
    static read(path: string): CharBaseInfoDBCFile;
    add(RaceID: byte, ClassID: byte, c?: CharBaseInfoCreator): CharBaseInfoRow;
}
