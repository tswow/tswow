import { DBC } from "wotlkdata";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { VehicleSeatQuery, VehicleSeatRow } from "wotlkdata/dbc/types/VehicleSeat";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { Ref } from "../Refs/RefOld";
import { SoundEntryPointer } from "../Sound/SoundEntry";
import { SpellAnimation } from "../Spell/SpellAnimation";

export class VehicleSeatFlags extends MaskCell32<VehicleSeat> {
    get HasLowerAnimForEnter() { return this.bit(0); }
    get HasLowerAnimForRide() { return this.bit(1); }
    get UNK3() { return this.bit(2); }
    get ShouldUseSeatAnimOnVoluntaryExit() { return this.bit(3); }
    get UNK5() { return this.bit(4); }
    get UNK6() { return this.bit(5); }
    get UNK7() { return this.bit(6); }
    get UNK8() { return this.bit(7); }
    get UNK9() { return this.bit(8); }
    get HidePassenger() { return this.bit(9); }
    get AllowTurning() { return this.bit(10); }
    get CanControl() { return this.bit(11); }
    get CanCastMountSpell() { return this.bit(12); }
    get Uncontrolled() { return this.bit(13); }
    get CanAttack() { return this.bit(14); }
    get ShouldUseSeatAnimOnForcedExit() { return this.bit(15); }
    get UNK17() { return this.bit(16); }
    /** related to permanent auras */
    get UNK18() { return this.bit(17); }
    get HasVoluntaryExitAnim() { return this.bit(18); }
    get HasForcedExitAnim() { return this.bit(19); }
    get PassengerNotSelectable() { return this.bit(20); }
    get UNK22() { return this.bit(21); }
    get HasVehicleEnterAnim() { return this.bit(22); }
    get IsUsingVehicleControls() { return this.bit(23); }
    get EnableVehicleZoom() { return this.bit(24); }
    get CanEnterOrExit() { return this.bit(25); }
    get CanSwitch() { return this.bit(26); }
    get HasStartWaitingForAnimEnter() { return this.bit(27); }
    get HasStartWaitingForAnimExit() { return this.bit(28); }
    get CanCast() { return this.bit(29); }
    get UNK2() { return this.bit(30); }
    get AllowsInteraction() { return this.bit(31); }
}

export class VehicleSeatFlagsB extends MaskCell32<VehicleSeat> {
    get UsableForced() { return this.bit(1); }
    get TargetsInRadius() { return this.bit(3); }
    get Ejectable() { return this.bit(5); }
    get UsableForced2() { return this.bit(6); }
    get UsableForced3() { return this.bit(8); }
    get UNK7() { return this.bit(16); }
    get KeepPet() { return this.bit(17); }
    get UsableForced4() { return this.bit(25); }
    get CanSwitch() { return this.bit(26); }
    get VehiclePlayerFrameUI() { return this.bit(31); }
}

export class VehicleSeatAttachment extends CellSystem<VehicleSeat> {
    get ID() { return this.ownerWrap(this.owner.row.AttachmentID); }
    get OffsetX() { return this.ownerWrap(this.owner.row.AttachmentOffsetX); }
    get OffsetY() { return this.ownerWrap(this.owner.row.AttachmentOffsetY); }
    get OffsetZ() { return this.ownerWrap(this.owner.row.AttachmentOffsetZ); }

    set(id: number, offsetX: number, offsetY: number, offsetZ: number) {
        this.ID.set(id);
        this.OffsetX.set(offsetX);
        this.OffsetY.set(offsetY);
        this.OffsetZ.set(offsetZ);
        return this.owner;
    }
}

export class VehicleSeatEnter extends CellSystem<VehicleSeat> {
    get PreDelay() { return this.ownerWrap(this.owner.row.EnterPreDelay); }
    get Speed() { return this.ownerWrap(this.owner.row.EnterSpeed); }
    get Gravity() { return this.ownerWrap(this.owner.row.EnterGravity); }
    get Duration() {
        return new MinMaxCell(
              this.owner
            , this.owner.row.EnterMinDuration
            , this.owner.row.EnterMaxDuration
            );
    }
    get ArcHeight() {
        return new MinMaxCell(
            this.owner
          , this.owner.row.EnterMinArcHeight
          , this.owner.row.EnterMaxArcHeight
          );
    }

    get AnimStart() { return new SpellAnimation(this, this.owner.row.EnterAnimStart); }
    get AnimLoop() { return new SpellAnimation(this, this.owner.row.EnterAnimLoop); }

    get UISound() { return new SoundEntryPointer(this, this.owner.row.EnterUISoundID)}

    get CameraDelay() {
        return this.ownerWrap(this.owner.row.CameraEnteringDelay);
    }

    get CameraDuration() {
        return this.ownerWrap(this.owner.row.CameraEnteringDuration);
    }

    get CameraZoom() {
        return this.ownerWrap(this.owner.row.CameraEnteringZoom);
    }
}

export class VehicleSeatRide extends CellSystem<VehicleSeat> {
    get AnimStart() { return new SpellAnimation(this, this.owner.row.RideAnimStart); }
    get AnimLoop() { return new SpellAnimation(this, this.owner.row.RideAnimLoop); }

    get UpperAnimStart() { return new SpellAnimation(this, this.owner.row.RideUpperAnimStart); }
    get UpperAnimLoop() { return new SpellAnimation(this, this.owner.row.RideUpperAnimLoop); }
}

export class VehicleSeatExit extends CellSystem<VehicleSeat> {
    get PreDelay() { return this.ownerWrap(this.owner.row.ExitPreDelay); }
    get Speed() { return this.ownerWrap(this.owner.row.ExitSpeed); }
    get Gravity() { return this.ownerWrap(this.owner.row.ExitGravity); }
    get Duration() {
        return new MinMaxCell(
              this.owner
            , this.owner.row.ExitMinDuration
            , this.owner.row.ExitMaxDuration
            );
    }
    get ArcHeight() {
        return new MinMaxCell(
            this.owner
          , this.owner.row.ExitMinArcHeight
          , this.owner.row.ExitMaxArcHeight
          );
    }

    get AnimStart() { return new SpellAnimation(this, this.owner.row.ExitAnimStart); }
    get AnimLoop() { return new SpellAnimation(this, this.owner.row.ExitAnimLoop); }
    get UISound() { return new SoundEntryPointer(this, this.owner.row.ExitUISoundID)}

    get CameraDelay() {
        return this.ownerWrap(this.owner.row.CameraExitingDelay);
    }

    get CameraDuration() {
        return this.ownerWrap(this.owner.row.CameraExitingDuration);
    }
}

export class VehicleSeatPassenger extends CellSystem<VehicleSeat> {
    get Attachment() { return this.ownerWrap(this.owner.row.PassengerAttachmentID); }
    get Yaw() { return this.ownerWrap(this.owner.row.PassengerYaw); }
    get Pitch() { return this.ownerWrap(this.owner.row.PassengerPitch); }
    get Roll() { return this.ownerWrap(this.owner.row.PassengerRoll); }

    set(attachment: number, yaw: number, pitch: number, roll: number) {
        this.Attachment.set(attachment);
        this.Yaw.set(yaw);
        this.Pitch.set(pitch);
        this.Roll.set(roll);
        return this.owner;
    }
}

export class VehicleSeatVehicle extends CellSystem<VehicleSeat> {
    get EnterAnim() { return new SpellAnimation(this, this.owner.row.VehicleEnterAnim); }
    get EnterAnimBone() { return this.ownerWrap(this.owner.row.VehicleEnterAnimBone); }
    get ExitAnim() { return new SpellAnimation(this, this.owner.row.VehicleExitAnim); }
    get ExitAnimBone() { return this.ownerWrap(this.owner.row.VehicleExitAnimBone); }
    get RideAnimLoop() { return new SpellAnimation(this, this.owner.row.VehicleRideAnimLoop); }
    get RideAnimLoopBone() { return this.ownerWrap(this.owner.row.VehicleRideAnimLoopBone); }

    get EnterAnimDelay() { return this.ownerWrap(this.owner.row.VehicleEnterAnimDelay); }
    get ExitAnimDelay() { return this.ownerWrap(this.owner.row.VehicleExitAnimDelay); }

    get AbilityDisplay() { return this.ownerWrap(this.owner.row.VehicleAbilityDisplay); }
}

export class VehicleCamera extends CellSystem<VehicleSeat> {
    get OffsetX() { return this.ownerWrap(this.owner.row.CameraOffsetX); }
    get OffsetY() { return this.ownerWrap(this.owner.row.CameraOffsetY); }
    get OffsetZ() { return this.ownerWrap(this.owner.row.CameraOffsetZ); }
    get PosChaseRate() { return this.ownerWrap(this.owner.row.CameraPosChaseRate); }
    get FacingChaseRate() { return this.ownerWrap(this.owner.row.CameraFacingChaseRate); }
    get Zoom() {
        return new MinMaxCell(this
            , this.owner.row.CameraSeatZoomMin
            , this.owner.row.CameraSeatZoomMax
        )
    }
}

export class VehicleSeat extends MainEntity<VehicleSeatRow> {
    get ID() { return this.row.ID.get(); }
    get FlagsA() { return new VehicleSeatFlags(this, this.row.Flags); }
    get FlagsB() { return new VehicleSeatFlags(this, this.row.FlagsB); }
    get Attachment() { return new VehicleSeatAttachment(this); }
    get Enter() { return new VehicleSeatEnter(this); }
    get Ride() { return new VehicleSeatRide(this); }
    get Exit() { return new VehicleSeatExit(this); }
    get Passenger() { return new VehicleSeatPassenger(this); }
    get Vehicle() { return new VehicleSeatVehicle(this); }
    get HasUISkin() { return this.wrap(this.row.UiSkin); }
}

export const VehicleSeatRegistry = {
    create(parent?: number) {
        return new VehicleSeat(
            parent
            ? DBC.VehicleSeat
                .findById(parent)
                .clone(Ids.VehicleSeat.id())
            : DBC.VehicleSeat.add(Ids.VehicleSeat.id())
        )
    },

    load(id: number) {
        let res = DBC.VehicleSeat.findById(id);
        return (res ? new VehicleSeat(res) : undefined) as VehicleSeat
    },

    filter(query: VehicleSeatQuery) {
        return DBC.VehicleSeat
            .filter(query)
            .map(x=>new VehicleSeat(x));
    },

    find(query: VehicleSeatQuery) {
        let res = DBC.VehicleSeat.find(query)
        return (res ? new VehicleSeat(res) : undefined) as VehicleSeat
    }
}

export class VehicleSeatRef<T> extends Ref<T,VehicleSeat> {
    protected create(): VehicleSeat {
        return VehicleSeatRegistry.create();
    }

    protected clone(): VehicleSeat {
        return VehicleSeatRegistry.create(this.cell.get())
    }

    exists(): boolean {
        return this.cell.get() > 0;
    }

    protected id(v: VehicleSeat): number {
        return v.ID
    }

    protected resolve(): VehicleSeat {
        return VehicleSeatRegistry.load(this.cell.get());
    }
}