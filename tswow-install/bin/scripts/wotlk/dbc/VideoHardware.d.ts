import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class VideoHardwareRow extends DBCRow<VideoHardwareCreator, VideoHardwareQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get VendorID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DeviceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FarclipIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TerrainLODDistIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TerrainShadowLOD(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DetailDoodadDensityIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DetailDoodadAlpha(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AnimatingDoodadIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Trilinear(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get NumLights(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Specularity(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WaterLODIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ParticleDensityIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get UnitDrawDistIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SmallCullDistIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ResolutionIdx(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BaseMipLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OglOverrides(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get D3dOverrides(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get FixLag(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Multisample(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Atlasdisable(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: VideoHardwareCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type VideoHardwareCreator = {
    VendorID?: int;
    DeviceID?: int;
    FarclipIdx?: int;
    TerrainLODDistIdx?: int;
    TerrainShadowLOD?: int;
    DetailDoodadDensityIdx?: int;
    DetailDoodadAlpha?: int;
    AnimatingDoodadIdx?: int;
    Trilinear?: int;
    NumLights?: int;
    Specularity?: int;
    WaterLODIdx?: int;
    ParticleDensityIdx?: int;
    UnitDrawDistIdx?: int;
    SmallCullDistIdx?: int;
    ResolutionIdx?: int;
    BaseMipLevel?: int;
    OglOverrides?: string;
    D3dOverrides?: string;
    FixLag?: int;
    Multisample?: int;
    Atlasdisable?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type VideoHardwareQuery = {
    ID?: Relation<int>;
    VendorID?: Relation<int>;
    DeviceID?: Relation<int>;
    FarclipIdx?: Relation<int>;
    TerrainLODDistIdx?: Relation<int>;
    TerrainShadowLOD?: Relation<int>;
    DetailDoodadDensityIdx?: Relation<int>;
    DetailDoodadAlpha?: Relation<int>;
    AnimatingDoodadIdx?: Relation<int>;
    Trilinear?: Relation<int>;
    NumLights?: Relation<int>;
    Specularity?: Relation<int>;
    WaterLODIdx?: Relation<int>;
    ParticleDensityIdx?: Relation<int>;
    UnitDrawDistIdx?: Relation<int>;
    SmallCullDistIdx?: Relation<int>;
    ResolutionIdx?: Relation<int>;
    BaseMipLevel?: Relation<int>;
    OglOverrides?: Relation<string>;
    D3dOverrides?: Relation<string>;
    FixLag?: Relation<int>;
    Multisample?: Relation<int>;
    Atlasdisable?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class VideoHardwareDBCFile extends DBCFile<VideoHardwareCreator, VideoHardwareQuery, VideoHardwareRow> {
    constructor();
    /** Loads a new VideoHardware.dbc from a file. */
    static read(path: string): VideoHardwareDBCFile;
    add(ID: int, c?: VideoHardwareCreator): VideoHardwareRow;
    findById(id: number): VideoHardwareRow;
}
