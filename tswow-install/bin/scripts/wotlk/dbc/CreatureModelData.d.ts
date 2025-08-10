import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureModelDataRow extends DBCRow<CreatureModelDataCreator, CreatureModelDataQuery> {
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
    get ModelName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get SizeClass(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ModelScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get BloodID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FootprintTextureID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FootprintTextureLength(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FootprintTextureWidth(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FootprintParticleScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FoleyMaterialID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FootstepShakeSize(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DeathThudShakeSize(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CollisionWidth(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CollisionHeight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MountHeight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMinX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMinY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMinZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMaxX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMaxY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMaxZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WorldEffectScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get AttachedEffectScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileCollisionRadius(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileCollisionPush(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileCollisionRaise(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CreatureModelDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CreatureModelDataCreator = {
    Flags?: int;
    ModelName?: string;
    SizeClass?: int;
    ModelScale?: float;
    BloodID?: int;
    FootprintTextureID?: int;
    FootprintTextureLength?: float;
    FootprintTextureWidth?: float;
    FootprintParticleScale?: float;
    FoleyMaterialID?: int;
    FootstepShakeSize?: int;
    DeathThudShakeSize?: int;
    SoundID?: int;
    CollisionWidth?: float;
    CollisionHeight?: float;
    MountHeight?: float;
    GeoBoxMinX?: float;
    GeoBoxMinY?: float;
    GeoBoxMinZ?: float;
    GeoBoxMaxX?: float;
    GeoBoxMaxY?: float;
    GeoBoxMaxZ?: float;
    WorldEffectScale?: float;
    AttachedEffectScale?: float;
    MissileCollisionRadius?: float;
    MissileCollisionPush?: float;
    MissileCollisionRaise?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type CreatureModelDataQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    ModelName?: Relation<string>;
    SizeClass?: Relation<int>;
    ModelScale?: Relation<float>;
    BloodID?: Relation<int>;
    FootprintTextureID?: Relation<int>;
    FootprintTextureLength?: Relation<float>;
    FootprintTextureWidth?: Relation<float>;
    FootprintParticleScale?: Relation<float>;
    FoleyMaterialID?: Relation<int>;
    FootstepShakeSize?: Relation<int>;
    DeathThudShakeSize?: Relation<int>;
    SoundID?: Relation<int>;
    CollisionWidth?: Relation<float>;
    CollisionHeight?: Relation<float>;
    MountHeight?: Relation<float>;
    GeoBoxMinX?: Relation<float>;
    GeoBoxMinY?: Relation<float>;
    GeoBoxMinZ?: Relation<float>;
    GeoBoxMaxX?: Relation<float>;
    GeoBoxMaxY?: Relation<float>;
    GeoBoxMaxZ?: Relation<float>;
    WorldEffectScale?: Relation<float>;
    AttachedEffectScale?: Relation<float>;
    MissileCollisionRadius?: Relation<float>;
    MissileCollisionPush?: Relation<float>;
    MissileCollisionRaise?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureModelDataDBCFile extends DBCFile<CreatureModelDataCreator, CreatureModelDataQuery, CreatureModelDataRow> {
    constructor();
    /** Loads a new CreatureModelData.dbc from a file. */
    static read(path: string): CreatureModelDataDBCFile;
    add(ID: int, c?: CreatureModelDataCreator): CreatureModelDataRow;
    findById(id: number): CreatureModelDataRow;
}
