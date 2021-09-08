import { VehicleQuery, VehicleRow } from "wotlkdata/dbc/types/Vehicle";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { MainEntity } from "../Misc/Entity";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { HorizontalBoundary } from "../Misc/LimitCells";
import { DBC } from "wotlkdata"
import { Ids } from "../Misc/Ids";
import { ArrayRefSystem } from "../Misc/ArrayRefSystem";
import { VehicleSeatRef } from "./VehicleSeat";
import { VehicleUIIndicatorCell } from "./VehicleUIIndicator";
import { Ref, RefReadOnly } from "../Refs/Ref";

export class VehicleFlags extends MaskCell32<Vehicle> {
    get NoStrafe() { return this.bit(0); }
    get NoJumping() { return this.bit(1); }
    get FullSpeedTurning() { return this.bit(2); }

    get AllowPitch() { return this.bit(4); }
    get FullSpeedPitching() { return this.bit(5); }
    get CustomPitch() { return this.bit(6); }

    get AdjustAimAngle() { return this.bit(10); }
    get AdjustAimPower() { return this.bit(11); }
    get FixedPosition() { return this.bit(21); }
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
        throw new Error("Method not implemented.");
    }
    isClear(): boolean {
        throw new Error("Method not implemented.");
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
        this.getFree()
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
    get Flags() { return new VehicleFlags(this, this.row.Flags)}
    get Seats() {
        return new ArrayRefSystem (
            this
            , 0
            , 8
            ,  index => new VehicleSeatRef (
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

export const VehicleRegistry = {
    create(parent?: number) {
        return new Vehicle(
            parent
            ? DBC.Vehicle.findById(parent).clone(Ids.Vehicle.id())
            // TODO: how to clear this?
            : DBC.Vehicle.add(Ids.Vehicle.id())
        )
    },

    load(id: number) {
        let res = DBC.Vehicle.findById(id);
        return (res ? new Vehicle(res) : undefined) as Vehicle;
    },

    filter(query: VehicleQuery) {
        return DBC.Vehicle
            .filter(query)
            .map(x=> new Vehicle(x))
    },

    find(query: VehicleQuery) {
        let res = DBC.Vehicle.find(query);
        return (res ? new Vehicle(res) : undefined) as Vehicle;
    },
}

export class VehicleRef<T> extends Ref<T,Vehicle> {
    protected create(): Vehicle {
        return VehicleRegistry.create();
    }
    protected clone(): Vehicle {
        return VehicleRegistry.create(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: Vehicle): number {
        return v.ID;
    }
    protected resolve(): Vehicle {
        return VehicleRegistry.load(this.cell.get());
    }
}

export class VehicleRefReadOnly<T> extends RefReadOnly<T,Vehicle> {
    getRef(): Vehicle {
        return VehicleRegistry.load(this.cell.get())
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}