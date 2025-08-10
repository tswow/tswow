import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellMissileRow extends DBCRow<SpellMissileCreator, SpellMissileQuery> {
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
    get DefaultPitchMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DefaultPitchMax(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DefaultSpeedMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DefaultSpeedMax(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RandomizeFacingMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RandomizeFacingMax(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RandomizePitchMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RandomizePitchMax(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RandomizeSpeedMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RandomizeSpeedMax(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Gravity(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CollisionRadius(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellMissileCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellMissileCreator = {
    Flags?: int;
    DefaultPitchMin?: float;
    DefaultPitchMax?: float;
    DefaultSpeedMin?: float;
    DefaultSpeedMax?: float;
    RandomizeFacingMin?: float;
    RandomizeFacingMax?: float;
    RandomizePitchMin?: float;
    RandomizePitchMax?: float;
    RandomizeSpeedMin?: float;
    RandomizeSpeedMax?: float;
    Gravity?: float;
    MaxDuration?: float;
    CollisionRadius?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellMissileQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    DefaultPitchMin?: Relation<float>;
    DefaultPitchMax?: Relation<float>;
    DefaultSpeedMin?: Relation<float>;
    DefaultSpeedMax?: Relation<float>;
    RandomizeFacingMin?: Relation<float>;
    RandomizeFacingMax?: Relation<float>;
    RandomizePitchMin?: Relation<float>;
    RandomizePitchMax?: Relation<float>;
    RandomizeSpeedMin?: Relation<float>;
    RandomizeSpeedMax?: Relation<float>;
    Gravity?: Relation<float>;
    MaxDuration?: Relation<float>;
    CollisionRadius?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellMissileDBCFile extends DBCFile<SpellMissileCreator, SpellMissileQuery, SpellMissileRow> {
    constructor();
    /** Loads a new SpellMissile.dbc from a file. */
    static read(path: string): SpellMissileDBCFile;
    add(ID: int, c?: SpellMissileCreator): SpellMissileRow;
    findById(id: number): SpellMissileRow;
}
