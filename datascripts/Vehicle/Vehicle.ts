import { VehicleQuery, VehicleRow } from "wotlkdata/dbc/types/Vehicle";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { MainEntity } from "../Misc/Entity";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";

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

    /*
    add(model: string, radius: number) {
        new VehicleMissileImpactModel(this.owner, this.index);
    }
    */
}

export class VehicleMissile extends CellSystem<Vehicle> {
    //get wiofj() { return this.ownerWrap(this.owner.row.mssl)}
}

export class Vehicle extends MainEntity<VehicleRow> {
    get Flags() { return new VehicleFlags(this, this.row.Flags)}
    get Seats() { return new SingleArraySystem(this, this.row.SeatID, 0)}
    get Camera() { return  new VehicleCamera(this); }
    get Pitch() { return new VehiclePitch(this); }
    get MouseLookOffsetPitch() { return this.wrap(this.row.MouseLookOffsetPitch); }
    get LocomotionType() { return this.wrap(this.row.UilocomotionType)}
    get PowerDisplay() { 
        return new SingleArraySystem(this, this.row.PowerDisplayID, 0)
    }
}

export const VehicleRegistry = {
    create() {

    },

    load(id: number) {

    },

    filter(query: VehicleQuery) {

    },

    find(query: VehicleQuery) {

    },
}