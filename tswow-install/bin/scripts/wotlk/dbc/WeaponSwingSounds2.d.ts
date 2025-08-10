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
export declare class WeaponSwingSounds2Row extends DBCRow<WeaponSwingSounds2Creator, WeaponSwingSounds2Query> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SwingType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Crit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WeaponSwingSounds2Creator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WeaponSwingSounds2Creator = {
    SwingType?: int;
    Crit?: int;
    SoundID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type WeaponSwingSounds2Query = {
    ID?: Relation<int>;
    SwingType?: Relation<int>;
    Crit?: Relation<int>;
    SoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WeaponSwingSounds2DBCFile extends DBCFile<WeaponSwingSounds2Creator, WeaponSwingSounds2Query, WeaponSwingSounds2Row> {
    constructor();
    /** Loads a new WeaponSwingSounds2.dbc from a file. */
    static read(path: string): WeaponSwingSounds2DBCFile;
    add(ID: int, c?: WeaponSwingSounds2Creator): WeaponSwingSounds2Row;
    findById(id: number): WeaponSwingSounds2Row;
}
