import { bool, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCBoolCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CharHairTexturesRow extends DBCRow<CharHairTexturesCreator, CharHairTexturesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Race(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Gender(): DBCBoolCell<this>;
    /**
     * No comment (yet!)
     */
    get Field03(): DBCBoolCell<this>;
    /**
     * No comment (yet!)
     */
    get Field04(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CharHairTexturesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CharHairTexturesCreator = {
    Race?: int;
    Gender?: bool;
    Field03?: bool;
    Field04?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type CharHairTexturesQuery = {
    ID?: Relation<int>;
    Race?: Relation<int>;
    Gender?: Relation<bool>;
    Field03?: Relation<bool>;
    Field04?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CharHairTexturesDBCFile extends DBCFile<CharHairTexturesCreator, CharHairTexturesQuery, CharHairTexturesRow> {
    constructor();
    /** Loads a new CharHairTextures.dbc from a file. */
    static read(path: string): CharHairTexturesDBCFile;
    add(ID: int, c?: CharHairTexturesCreator): CharHairTexturesRow;
    findById(id: number): CharHairTexturesRow;
}
