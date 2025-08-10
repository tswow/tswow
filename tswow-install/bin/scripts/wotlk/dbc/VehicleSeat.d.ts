import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCUIntCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class VehicleSeatRow extends DBCRow<VehicleSeatCreator, VehicleSeatQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttachmentID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttachmentOffsetX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get AttachmentOffsetY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get AttachmentOffsetZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterPreDelay(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterGravity(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterMinDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterMaxDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterMinArcHeight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterMaxArcHeight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterAnimStart(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterAnimLoop(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RideAnimStart(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RideAnimLoop(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RideUpperAnimStart(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RideUpperAnimLoop(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitPreDelay(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitGravity(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitMinDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitMaxDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitMinArcHeight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitMaxArcHeight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitAnimStart(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitAnimLoop(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitAnimEnd(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PassengerYaw(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PassengerPitch(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PassengerRoll(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PassengerAttachmentID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleEnterAnim(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleExitAnim(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleRideAnimLoop(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleEnterAnimBone(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleExitAnimBone(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleRideAnimLoopBone(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleEnterAnimDelay(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleExitAnimDelay(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleAbilityDisplay(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EnterUISoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExitUISoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get UiSkin(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FlagsB(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraEnteringDelay(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraEnteringDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraExitingDelay(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraExitingDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraOffsetX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraOffsetY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraOffsetZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraPosChaseRate(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraFacingChaseRate(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraEnteringZoom(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraSeatZoomMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CameraSeatZoomMax(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: VehicleSeatCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type VehicleSeatCreator = {
    Flags?: int;
    AttachmentID?: int;
    AttachmentOffsetX?: float;
    AttachmentOffsetY?: float;
    AttachmentOffsetZ?: float;
    EnterPreDelay?: float;
    EnterSpeed?: float;
    EnterGravity?: float;
    EnterMinDuration?: float;
    EnterMaxDuration?: float;
    EnterMinArcHeight?: float;
    EnterMaxArcHeight?: float;
    EnterAnimStart?: int;
    EnterAnimLoop?: int;
    RideAnimStart?: int;
    RideAnimLoop?: int;
    RideUpperAnimStart?: int;
    RideUpperAnimLoop?: int;
    ExitPreDelay?: float;
    ExitSpeed?: float;
    ExitGravity?: float;
    ExitMinDuration?: float;
    ExitMaxDuration?: float;
    ExitMinArcHeight?: float;
    ExitMaxArcHeight?: float;
    ExitAnimStart?: int;
    ExitAnimLoop?: int;
    ExitAnimEnd?: int;
    PassengerYaw?: float;
    PassengerPitch?: float;
    PassengerRoll?: float;
    PassengerAttachmentID?: int;
    VehicleEnterAnim?: int;
    VehicleExitAnim?: int;
    VehicleRideAnimLoop?: int;
    VehicleEnterAnimBone?: int;
    VehicleExitAnimBone?: int;
    VehicleRideAnimLoopBone?: int;
    VehicleEnterAnimDelay?: float;
    VehicleExitAnimDelay?: float;
    VehicleAbilityDisplay?: int;
    EnterUISoundID?: int;
    ExitUISoundID?: int;
    UiSkin?: int;
    FlagsB?: int;
    CameraEnteringDelay?: float;
    CameraEnteringDuration?: float;
    CameraExitingDelay?: float;
    CameraExitingDuration?: float;
    CameraOffsetX?: float;
    CameraOffsetY?: float;
    CameraOffsetZ?: float;
    CameraPosChaseRate?: float;
    CameraFacingChaseRate?: float;
    CameraEnteringZoom?: float;
    CameraSeatZoomMin?: float;
    CameraSeatZoomMax?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type VehicleSeatQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    AttachmentID?: Relation<int>;
    AttachmentOffsetX?: Relation<float>;
    AttachmentOffsetY?: Relation<float>;
    AttachmentOffsetZ?: Relation<float>;
    EnterPreDelay?: Relation<float>;
    EnterSpeed?: Relation<float>;
    EnterGravity?: Relation<float>;
    EnterMinDuration?: Relation<float>;
    EnterMaxDuration?: Relation<float>;
    EnterMinArcHeight?: Relation<float>;
    EnterMaxArcHeight?: Relation<float>;
    EnterAnimStart?: Relation<int>;
    EnterAnimLoop?: Relation<int>;
    RideAnimStart?: Relation<int>;
    RideAnimLoop?: Relation<int>;
    RideUpperAnimStart?: Relation<int>;
    RideUpperAnimLoop?: Relation<int>;
    ExitPreDelay?: Relation<float>;
    ExitSpeed?: Relation<float>;
    ExitGravity?: Relation<float>;
    ExitMinDuration?: Relation<float>;
    ExitMaxDuration?: Relation<float>;
    ExitMinArcHeight?: Relation<float>;
    ExitMaxArcHeight?: Relation<float>;
    ExitAnimStart?: Relation<int>;
    ExitAnimLoop?: Relation<int>;
    ExitAnimEnd?: Relation<int>;
    PassengerYaw?: Relation<float>;
    PassengerPitch?: Relation<float>;
    PassengerRoll?: Relation<float>;
    PassengerAttachmentID?: Relation<int>;
    VehicleEnterAnim?: Relation<int>;
    VehicleExitAnim?: Relation<int>;
    VehicleRideAnimLoop?: Relation<int>;
    VehicleEnterAnimBone?: Relation<int>;
    VehicleExitAnimBone?: Relation<int>;
    VehicleRideAnimLoopBone?: Relation<int>;
    VehicleEnterAnimDelay?: Relation<float>;
    VehicleExitAnimDelay?: Relation<float>;
    VehicleAbilityDisplay?: Relation<int>;
    EnterUISoundID?: Relation<int>;
    ExitUISoundID?: Relation<int>;
    UiSkin?: Relation<int>;
    FlagsB?: Relation<int>;
    CameraEnteringDelay?: Relation<float>;
    CameraEnteringDuration?: Relation<float>;
    CameraExitingDelay?: Relation<float>;
    CameraExitingDuration?: Relation<float>;
    CameraOffsetX?: Relation<float>;
    CameraOffsetY?: Relation<float>;
    CameraOffsetZ?: Relation<float>;
    CameraPosChaseRate?: Relation<float>;
    CameraFacingChaseRate?: Relation<float>;
    CameraEnteringZoom?: Relation<float>;
    CameraSeatZoomMin?: Relation<float>;
    CameraSeatZoomMax?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class VehicleSeatDBCFile extends DBCFile<VehicleSeatCreator, VehicleSeatQuery, VehicleSeatRow> {
    constructor();
    /** Loads a new VehicleSeat.dbc from a file. */
    static read(path: string): VehicleSeatDBCFile;
    add(ID: int, c?: VehicleSeatCreator): VehicleSeatRow;
    findById(id: number): VehicleSeatRow;
}
