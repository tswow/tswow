import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class MaterialRow extends DBCRow<MaterialCreator, MaterialQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FoleySoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SheatheSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get UnsheatheSoundID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: MaterialCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type MaterialCreator = {
    Flags?: int;
    FoleySoundID?: int;
    SheatheSoundID?: int;
    UnsheatheSoundID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type MaterialQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    FoleySoundID?: Relation<int>;
    SheatheSoundID?: Relation<int>;
    UnsheatheSoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class MaterialDBCFile extends DBCFile<MaterialCreator, MaterialQuery, MaterialRow> {
    constructor();
    /** Loads a new Material.dbc from a file. */
    static read(path: string): MaterialDBCFile;
    add(ID: int, c?: MaterialCreator): MaterialRow;
    findById(id: number): MaterialRow;
}
