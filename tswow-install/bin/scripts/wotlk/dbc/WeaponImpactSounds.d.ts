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
export declare class WeaponImpactSoundsRow extends DBCRow<WeaponImpactSoundsCreator, WeaponImpactSoundsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponSubClassID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ParrySoundType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ImpactSoundID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get CritImpactSoundID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WeaponImpactSoundsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WeaponImpactSoundsCreator = {
    WeaponSubClassID?: int;
    ParrySoundType?: int;
    ImpactSoundID?: int[];
    CritImpactSoundID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type WeaponImpactSoundsQuery = {
    ID?: Relation<int>;
    WeaponSubClassID?: Relation<int>;
    ParrySoundType?: Relation<int>;
    ImpactSoundID?: Relation<int>;
    CritImpactSoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WeaponImpactSoundsDBCFile extends DBCFile<WeaponImpactSoundsCreator, WeaponImpactSoundsQuery, WeaponImpactSoundsRow> {
    constructor();
    /** Loads a new WeaponImpactSounds.dbc from a file. */
    static read(path: string): WeaponImpactSoundsDBCFile;
    add(ID: int, c?: WeaponImpactSoundsCreator): WeaponImpactSoundsRow;
    findById(id: number): WeaponImpactSoundsRow;
}
