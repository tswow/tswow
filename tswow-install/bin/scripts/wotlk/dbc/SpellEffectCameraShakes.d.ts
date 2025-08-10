import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellEffectCameraShakesRow extends DBCRow<SpellEffectCameraShakesCreator, SpellEffectCameraShakesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraShake(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellEffectCameraShakesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellEffectCameraShakesCreator = {
    CameraShake?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellEffectCameraShakesQuery = {
    ID?: Relation<int>;
    CameraShake?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellEffectCameraShakesDBCFile extends DBCFile<SpellEffectCameraShakesCreator, SpellEffectCameraShakesQuery, SpellEffectCameraShakesRow> {
    constructor();
    /** Loads a new SpellEffectCameraShakes.dbc from a file. */
    static read(path: string): SpellEffectCameraShakesDBCFile;
    add(ID: int, c?: SpellEffectCameraShakesCreator): SpellEffectCameraShakesRow;
    findById(id: number): SpellEffectCameraShakesRow;
}
