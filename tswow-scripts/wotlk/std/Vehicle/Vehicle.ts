import { DBC } from "../../DBCFiles";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { VehicleQuery, VehicleRow } from "../../dbc/Vehicle";
import { Table } from "../../../data/table/Table";
import { ArrayRefSystem } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { HorizontalBoundary } from "../Misc/LimitCells";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { RegistryDynamic } from "../Refs/Registry";
import { VehicleSeatRegistry } from "./VehicleSeat";
import { VehicleUIIndicatorCell } from "./VehicleUIIndicator";

export enum VehicleFlags {
    NO_STRAFE           = 0x1,
    NO_JUMPING          = 0x2,
    FULL_SPEED_TURNING  = 0x4,
    ALLOW_PITCH         = 0x10,
    FULL_SPEED_PITCHING = 0x20,
    CUSTOM_PITCH        = 0x40,
    ADJUST_AIM_ANGLE    = 0x400,
    ADJUST_AIM_POWER    = 0x800,
    FIXED_POSITION      = 0x200000,
}

export class VehicleCameraFadeDist extends CellSystem<Vehicle> {
    get Min() { return this.ownerWrap(this.owner.row.CameraFadeDistScalarMin); }
    get Max() { return this.ownerWrap(this.owner.row.CameraFadeDistScalarMax); }

    set(min: number, max: number) {
        this.Min.set(min);
        this.Max.set(max);
        return this.owner;
    }
}

export class VehicleCameraOffset extends CellSystem<Vehicle> {
    get Pitch() { return this.ownerWrap(this.owner.row.CameraPitchOffset); }
    get Yaw() { return this.ownerWrap(this.owner.row.CameraYawOffset); }

    set(pitch: number, yaw: number) {
        this.Pitch.set(pitch);
        this.Yaw.set(yaw);
        return this.owner;
    }
}

export class VehicleCamera extends CellSystem<Vehicle> {
    get FadeDistScalar() { return new VehicleCameraFadeDist(this.owner); }
    get Offset() { return new VehicleCameraOffset(this.owner); }
}

export class VehiclePitch extends CellSystem<Vehicle> {
    get Speed() { return this.ownerWrap(this.owner.row.PitchSpeed); }
    get Min() { return this.ownerWrap(this.owner.row.PitchMin); }
    get Max() { return this.ownerWrap(this.owner.row.PitchMax); }

    set(speed: number, min: number, max: number) {
        this.Speed.set(speed);
        this.Min.set(min);
        this.Max.set(max);
        return this.owner;
    }
}

export class VehicleMissileImpactModel extends ArrayEntry<Vehicle> {
    clear(): this {
        return this
            .Model.set('')
            .Radius.set(0)
    }
    isClear(): boolean {
        return this.Model.get() === ''
    }

    get Model() {
        return this.wrapIndex(this.container.row.MsslTrgtImpactModel,this.index);
    }
    get Radius() {
        return this.wrapIndex(this.container.row.MsslTrgtImpactRadius,this.index);
    }
}

export class VehicleMissileImpactModels extends ArraySystem<VehicleMissileImpactModel,Vehicle> {
    get length(): number {
        return 2;
    }
    get(index: number): VehicleMissileImpactModel {
        return new VehicleMissileImpactModel(this.owner, index);
    }

    add(model: string, radius: number) {
        this.addGet()
            .Model.set(model)
            .Radius.set(radius)
        return this.owner;
    }
}

export class VehicleMissileImpactTexture extends CellSystem<Vehicle>
{
    get Filepath() { return this.ownerWrap(this.owner.row.MsslTrgtImpactTexture)}
    get Radius() { return this.ownerWrap(this.owner.row.MsslTrgtImpactTexRadius)}

    set(filepath: string, radius: number) {
        this.Filepath.set(filepath);
        this.Radius.set(radius);
        return this.owner;
    }
}

export class VehicleMissile extends CellSystem<Vehicle> {
    //get wiofj() { return this.ownerWrap(this.owner.row.mssl)}

    get TurnLingering() {
        return this.ownerWrap(this.owner.row.MsslTrgtTurnLingering);
    }
    get PitchLingering() {
        return this.ownerWrap(this.owner.row.MsslTrgtPitchLingering);
    }

    get MouseLingering() {
        return this.ownerWrap(this.owner.row.MsslTrgtMouseLingering);
    }

    get EndOpacity() {
        return this.ownerWrap(this.owner.row.MsslTrgtEndOpacity);
    }

    get ArcSpeed() {
        return this.ownerWrap(this.owner.row.MsslTrgtArcSpeed);
    }

    get ArcRepeat() {
        return this.ownerWrap(this.owner.row.MsslTrgtArcRepeat);
    }

    get ArcWidth() {
        return this.ownerWrap(this.owner.row.MsslTrgtArcWidth);
    }

    get Models() {
        return new VehicleMissileImpactModels(this.owner);
    }

    get ArcTexture() {
        return this.ownerWrap(this.owner.row.MsslTrgtArcTexture);
    }

    get ImpactTexture() {
        return new VehicleMissileImpactTexture(this.owner);
    }
}

export class Vehicle extends MainEntity<VehicleRow> {
    get ID() { return this.row.ID.get(); }

    get Flags() {
        return makeMaskCell32(VehicleFlags, this, this.row.Flags);
    }

    get Seats() {
        return new ArrayRefSystem (
            this
            , 0
            , 8
            ,  index => VehicleSeatRegistry.ref(
                      this
                    , this.wrapIndex(this.row.SeatID,index)
                )
            )
    }
    get Camera() { return new VehicleCamera(this); }
    get Pitch() { return new VehiclePitch(this); }
    get MouseLookOffsetPitch() { return this.wrap(this.row.MouseLookOffsetPitch); }
    get LocomotionType() { return this.wrap(this.row.UilocomotionType)}
    get PowerDisplay() {
        return new SingleArraySystem(this, this.row.PowerDisplayID, 0)
    }

    get FacingLimit() {
        return new HorizontalBoundary(
              this
            , this.row.FacingLimitLeft
            , this.row.FacingLimitRight
            )
    }

    get TurnSpeed() { return this.wrap(this.row.TurnSpeed); }
    get UIIndicator() {
        return new VehicleUIIndicatorCell(this, this.row.VehicleUIIndicatorID);
    }
}

export class VehicleRegistryClass
    extends RegistryDynamic<Vehicle,VehicleRow,VehicleQuery>
{
    protected Table(): Table<any, VehicleQuery, VehicleRow> & { add: (id: number) => VehicleRow; } {
        return DBC.Vehicle
    }
    protected ids(): DynamicIDGenerator {
        return Ids.Vehicle
    }
    Clear(entity: Vehicle): void {
        // TODO: need to specify this
    }
    protected FindByID(id: number): VehicleRow {
        return DBC.Vehicle.findById(id);
    }
    protected EmptyQuery(): VehicleQuery {
        return {}
    }
    ID(e: Vehicle): number {
        return e.ID
    }
    protected Entity(r: VehicleRow): Vehicle {
        return new Vehicle(r);
    }
}

export const VehicleRegistry = new VehicleRegistryClass();