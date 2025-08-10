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
export declare class SheatheSoundLookupsRow extends DBCRow<SheatheSoundLookupsCreator, SheatheSoundLookupsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemClass(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemSubclass(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemEnvTypes(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get IsShield(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SheathSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get UnsheathSoundID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SheatheSoundLookupsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SheatheSoundLookupsCreator = {
    ItemClass?: int;
    ItemSubclass?: int;
    ItemEnvTypes?: int;
    IsShield?: int;
    SheathSoundID?: int;
    UnsheathSoundID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SheatheSoundLookupsQuery = {
    ID?: Relation<int>;
    ItemClass?: Relation<int>;
    ItemSubclass?: Relation<int>;
    ItemEnvTypes?: Relation<int>;
    IsShield?: Relation<int>;
    SheathSoundID?: Relation<int>;
    UnsheathSoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SheatheSoundLookupsDBCFile extends DBCFile<SheatheSoundLookupsCreator, SheatheSoundLookupsQuery, SheatheSoundLookupsRow> {
    constructor();
    /** Loads a new SheatheSoundLookups.dbc from a file. */
    static read(path: string): SheatheSoundLookupsDBCFile;
    add(ID: int, c?: SheatheSoundLookupsCreator): SheatheSoundLookupsRow;
    findById(id: number): SheatheSoundLookupsRow;
}
