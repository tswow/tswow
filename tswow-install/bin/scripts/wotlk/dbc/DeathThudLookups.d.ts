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
export declare class DeathThudLookupsRow extends DBCRow<DeathThudLookupsCreator, DeathThudLookupsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SizeClass(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TerraintypeSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundEntryID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundEntryIDWater(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DeathThudLookupsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DeathThudLookupsCreator = {
    SizeClass?: int;
    TerraintypeSoundID?: int;
    SoundEntryID?: int;
    SoundEntryIDWater?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type DeathThudLookupsQuery = {
    ID?: Relation<int>;
    SizeClass?: Relation<int>;
    TerraintypeSoundID?: Relation<int>;
    SoundEntryID?: Relation<int>;
    SoundEntryIDWater?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DeathThudLookupsDBCFile extends DBCFile<DeathThudLookupsCreator, DeathThudLookupsQuery, DeathThudLookupsRow> {
    constructor();
    /** Loads a new DeathThudLookups.dbc from a file. */
    static read(path: string): DeathThudLookupsDBCFile;
    add(ID: int, c?: DeathThudLookupsCreator): DeathThudLookupsRow;
    findById(id: number): DeathThudLookupsRow;
}
