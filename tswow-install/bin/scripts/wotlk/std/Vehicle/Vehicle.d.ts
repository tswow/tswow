import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { VehicleQuery, VehicleRow } from "../../dbc/Vehicle";
import { ArrayRefSystem } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { HorizontalBoundary } from "../Misc/LimitCells";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { RegistryDynamic } from "../Refs/Registry";
import { VehicleUIIndicatorCell } from "./VehicleUIIndicator";
export declare enum VehicleFlags {
    NO_STRAFE = 1,
    NO_JUMPING = 2,
    FULL_SPEED_TURNING = 4,
    ALLOW_PITCH = 16,
    FULL_SPEED_PITCHING = 32,
    CUSTOM_PITCH = 64,
    ADJUST_AIM_ANGLE = 1024,
    ADJUST_AIM_POWER = 2048,
    FIXED_POSITION = 2097152
}
export declare class VehicleCameraFadeDist extends CellSystem<Vehicle> {
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    set(min: number, max: number): Vehicle;
}
export declare class VehicleCameraOffset extends CellSystem<Vehicle> {
    get Pitch(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get Yaw(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    set(pitch: number, yaw: number): Vehicle;
}
export declare class VehicleCamera extends CellSystem<Vehicle> {
    get FadeDistScalar(): VehicleCameraFadeDist;
    get Offset(): VehicleCameraOffset;
}
export declare class VehiclePitch extends CellSystem<Vehicle> {
    get Speed(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    set(speed: number, min: number, max: number): Vehicle;
}
export declare class VehicleMissileImpactModel extends ArrayEntry<Vehicle> {
    clear(): this;
    isClear(): boolean;
    get Model(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<string, this>;
    get Radius(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
}
export declare class VehicleMissileImpactModels extends ArraySystem<VehicleMissileImpactModel, Vehicle> {
    get length(): number;
    get(index: number): VehicleMissileImpactModel;
    add(model: string, radius: number): Vehicle;
}
export declare class VehicleMissileImpactTexture extends CellSystem<Vehicle> {
    get Filepath(): import("../../../data/cell/cells/Cell").CellWrapper<string, Vehicle>;
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    set(filepath: string, radius: number): Vehicle;
}
export declare class VehicleMissile extends CellSystem<Vehicle> {
    get TurnLingering(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get PitchLingering(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get MouseLingering(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get EndOpacity(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get ArcSpeed(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get ArcRepeat(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get ArcWidth(): import("../../../data/cell/cells/Cell").CellWrapper<number, Vehicle>;
    get Models(): VehicleMissileImpactModels;
    get ArcTexture(): import("../../../data/cell/cells/Cell").CellWrapper<string, Vehicle>;
    get ImpactTexture(): VehicleMissileImpactTexture;
}
export declare class Vehicle extends MainEntity<VehicleRow> {
    get ID(): number;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof VehicleFlags>;
    get Seats(): ArrayRefSystem<this, import("./VehicleSeat").VehicleSeat>;
    get Camera(): VehicleCamera;
    get Pitch(): VehiclePitch;
    get MouseLookOffsetPitch(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LocomotionType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PowerDisplay(): SingleArraySystem<number, this>;
    get FacingLimit(): HorizontalBoundary<this>;
    get TurnSpeed(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get UIIndicator(): VehicleUIIndicatorCell<this>;
}
export declare class VehicleRegistryClass extends RegistryDynamic<Vehicle, VehicleRow, VehicleQuery> {
    protected Table(): Table<any, VehicleQuery, VehicleRow> & {
        add: (id: number) => VehicleRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: Vehicle): void;
    protected FindByID(id: number): VehicleRow;
    protected EmptyQuery(): VehicleQuery;
    ID(e: Vehicle): number;
    protected Entity(r: VehicleRow): Vehicle;
}
export declare const VehicleRegistry: VehicleRegistryClass;
