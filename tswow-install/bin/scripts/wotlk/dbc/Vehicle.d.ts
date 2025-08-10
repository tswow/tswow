import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class VehicleRow extends DBCRow<VehicleCreator, VehicleQuery> {
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
    get TurnSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PitchSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PitchMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PitchMax(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get SeatID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get MouseLookOffsetPitch(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraFadeDistScalarMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraFadeDistScalarMax(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraPitchOffset(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FacingLimitRight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FacingLimitLeft(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtTurnLingering(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtPitchLingering(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtMouseLingering(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtEndOpacity(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtArcSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtArcRepeat(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtArcWidth(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtImpactRadius(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtArcTexture(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtImpactTexture(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtImpactModel(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraYawOffset(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get UilocomotionType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MsslTrgtImpactTexRadius(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleUIIndicatorID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PowerDisplayID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: VehicleCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type VehicleCreator = {
    Flags?: int;
    TurnSpeed?: float;
    PitchSpeed?: float;
    PitchMin?: float;
    PitchMax?: float;
    SeatID?: int[];
    MouseLookOffsetPitch?: float;
    CameraFadeDistScalarMin?: float;
    CameraFadeDistScalarMax?: float;
    CameraPitchOffset?: float;
    FacingLimitRight?: float;
    FacingLimitLeft?: float;
    MsslTrgtTurnLingering?: float;
    MsslTrgtPitchLingering?: float;
    MsslTrgtMouseLingering?: float;
    MsslTrgtEndOpacity?: float;
    MsslTrgtArcSpeed?: float;
    MsslTrgtArcRepeat?: float;
    MsslTrgtArcWidth?: float;
    MsslTrgtImpactRadius?: float[];
    MsslTrgtArcTexture?: string;
    MsslTrgtImpactTexture?: string;
    MsslTrgtImpactModel?: string[];
    CameraYawOffset?: float;
    UilocomotionType?: int;
    MsslTrgtImpactTexRadius?: float;
    VehicleUIIndicatorID?: int;
    PowerDisplayID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type VehicleQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    TurnSpeed?: Relation<float>;
    PitchSpeed?: Relation<float>;
    PitchMin?: Relation<float>;
    PitchMax?: Relation<float>;
    SeatID?: Relation<int>;
    MouseLookOffsetPitch?: Relation<float>;
    CameraFadeDistScalarMin?: Relation<float>;
    CameraFadeDistScalarMax?: Relation<float>;
    CameraPitchOffset?: Relation<float>;
    FacingLimitRight?: Relation<float>;
    FacingLimitLeft?: Relation<float>;
    MsslTrgtTurnLingering?: Relation<float>;
    MsslTrgtPitchLingering?: Relation<float>;
    MsslTrgtMouseLingering?: Relation<float>;
    MsslTrgtEndOpacity?: Relation<float>;
    MsslTrgtArcSpeed?: Relation<float>;
    MsslTrgtArcRepeat?: Relation<float>;
    MsslTrgtArcWidth?: Relation<float>;
    MsslTrgtImpactRadius?: Relation<float>;
    MsslTrgtArcTexture?: Relation<string>;
    MsslTrgtImpactTexture?: Relation<string>;
    MsslTrgtImpactModel?: Relation<string>;
    CameraYawOffset?: Relation<float>;
    UilocomotionType?: Relation<int>;
    MsslTrgtImpactTexRadius?: Relation<float>;
    VehicleUIIndicatorID?: Relation<int>;
    PowerDisplayID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class VehicleDBCFile extends DBCFile<VehicleCreator, VehicleQuery, VehicleRow> {
    constructor();
    /** Loads a new Vehicle.dbc from a file. */
    static read(path: string): VehicleDBCFile;
    add(ID: int, c?: VehicleCreator): VehicleRow;
    findById(id: number): VehicleRow;
}
