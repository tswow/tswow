import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { VehicleSeatQuery, VehicleSeatRow } from "../../dbc/VehicleSeat";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { PositionXYZCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
import { SpellAnimation } from "../Spell/SpellAnimation";
export declare enum VehicleSeatFlags {
    HAS_LOWER_ANIM_FOR_ENTER = 1,
    HAS_LOWER_ANIM_FOR_RIDE = 2,
    UNK3 = 4,
    SHOULD_USE_SEAT_ANIM_ON_VOLUNTARY_EXIT = 8,
    UNK5 = 16,
    UNK6 = 32,
    UNK7 = 64,
    UNK8 = 128,
    UNK9 = 256,
    HIDE_PASSENGER = 512,
    ALLOW_TURNING = 1024,
    CAN_CONTROL = 2048,
    CAN_CAST_MOUNT_SPELL = 4096,
    UNCONTROLLED = 8192,
    CAN_ATTACK = 16384,
    SHOULD_USE_SEAT_ANIM_ON_FORCED_EXIT = 32768,
    UNK17 = 65536,
    /** Related to permanent auras */
    UNK18 = 131072,
    HAS_VOLUNTARY_EXIT_ANIM = 262144,
    HAS_FORCED_EXIT_ANIM = 524288,
    PASSENGER_NOT_SELECTABLE = 1048576,
    UNK22 = 2097152,
    HAS_VEHICLE_ENTER_ANIM = 4194304,
    IS_USING_VEHICLE_CONTROLS = 8388608,
    ENABLE_VEHICLE_ZOOM = 16777216,
    CAN_ENTER_OR_EXIT = 33554432,
    CAN_SWITCH = 67108864,
    HAS_START_WAITING_FOR_ANIM_ENTER = 134217728,
    HAS_START_WAITING_FOR_ANIM_EXIT = 268435456,
    CAN_CAST = 536870912,
    UNK2 = 1073741824,
    ALLOWS_INTERACTION = 2147483648
}
export declare enum VehicleSeatFlagsB {
    USABLE_FORCED = 2,
    TARGETS_IN_RADIUS = 8,
    EJECTABLE = 32,
    USABLE_FORCED2 = 64,
    USABLE_FORCED3 = 256,
    UNK7 = 65536,
    KEEP_PET = 131072,
    USABLE_FORCED4 = 33554432,
    CAN_SWITCH = 67108864,
    VEHICLE_PLAYER_FRAME_UI = 2147483648
}
export declare class VehicleSeatAttachment extends CellSystem<VehicleSeat> {
    get ID(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get OffsetX(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get OffsetY(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get OffsetZ(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    set(id: number, offsetX: number, offsetY: number, offsetZ: number): VehicleSeat;
    clear(): VehicleSeat;
}
export declare class VehicleSeatEnter extends CellSystem<VehicleSeat> {
    get PreDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Speed(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Gravity(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Duration(): MinMaxCell<VehicleSeat>;
    get ArcHeight(): MinMaxCell<VehicleSeat>;
    get AnimStart(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get AnimLoop(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get UISound(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get CameraDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get CameraDuration(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get CameraZoom(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    clear(): VehicleSeat;
}
export declare class VehicleSeatRide extends CellSystem<VehicleSeat> {
    get AnimStart(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get AnimLoop(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get UpperAnimStart(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get UpperAnimLoop(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    clear(): VehicleSeat;
}
export declare class VehicleSeatExit extends CellSystem<VehicleSeat> {
    get PreDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Speed(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Gravity(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Duration(): MinMaxCell<VehicleSeat>;
    get ArcHeight(): MinMaxCell<VehicleSeat>;
    get AnimStart(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get AnimLoop(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get UISound(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get CameraDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get CameraDuration(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    clear(): VehicleSeat;
}
export declare class VehicleSeatPassenger extends CellSystem<VehicleSeat> {
    get Attachment(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Yaw(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Pitch(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Roll(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    set(attachment: number, yaw: number, pitch: number, roll: number): VehicleSeat;
    clear(): VehicleSeat;
}
export declare class VehicleSeatVehicle extends CellSystem<VehicleSeat> {
    get EnterAnim(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get EnterAnimBone(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get ExitAnim(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get ExitAnimBone(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get RideAnimLoop(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellAnimation>;
    get RideAnimLoopBone(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get EnterAnimDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get ExitAnimDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get AbilityDisplay(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    clear(): VehicleSeat;
}
export declare class VehicleCamera extends CellSystem<VehicleSeat> {
    get Offset(): PositionXYZCell<this>;
    get PosChaseRate(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get FacingChaseRate(): import("../../../data/cell/cells/Cell").CellWrapper<number, VehicleSeat>;
    get Zoom(): MinMaxCell<this>;
    clear(): VehicleSeat;
}
export declare class VehicleSeat extends MainEntity<VehicleSeatRow> {
    get ID(): number;
    get FlagsA(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof VehicleSeatFlags>;
    get FlagsB(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof VehicleSeatFlagsB>;
    get Attachment(): VehicleSeatAttachment;
    get Enter(): VehicleSeatEnter;
    get Ride(): VehicleSeatRide;
    get Exit(): VehicleSeatExit;
    get Passenger(): VehicleSeatPassenger;
    get Vehicle(): VehicleSeatVehicle;
    get HasUISkin(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    clear(): this;
}
export declare class VehicleSeatRegistryClass extends RegistryDynamic<VehicleSeat, VehicleSeatRow, VehicleSeatQuery> {
    protected Table(): Table<any, VehicleSeatQuery, VehicleSeatRow> & {
        add: (id: number) => VehicleSeatRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: VehicleSeat): void;
    protected FindByID(id: number): VehicleSeatRow;
    protected EmptyQuery(): VehicleSeatQuery;
    ID(e: VehicleSeat): number;
    protected Entity(r: VehicleSeatRow): VehicleSeat;
}
export declare const VehicleSeatRegistry: VehicleSeatRegistryClass;
