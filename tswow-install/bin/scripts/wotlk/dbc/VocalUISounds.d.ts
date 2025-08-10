import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class VocalUISoundsRow extends DBCRow<VocalUISoundsCreator, VocalUISoundsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get VocalUIEnum(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RaceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get NormalSoundID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get PissedSoundID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: VocalUISoundsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type VocalUISoundsCreator = {
    VocalUIEnum?: int;
    RaceID?: int;
    NormalSoundID?: int[];
    PissedSoundID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type VocalUISoundsQuery = {
    ID?: Relation<int>;
    VocalUIEnum?: Relation<int>;
    RaceID?: Relation<int>;
    NormalSoundID?: Relation<int>;
    PissedSoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class VocalUISoundsDBCFile extends DBCFile<VocalUISoundsCreator, VocalUISoundsQuery, VocalUISoundsRow> {
    constructor();
    /** Loads a new VocalUISounds.dbc from a file. */
    static read(path: string): VocalUISoundsDBCFile;
    add(ID: int, c?: VocalUISoundsCreator): VocalUISoundsRow;
    findById(id: number): VocalUISoundsRow;
}
