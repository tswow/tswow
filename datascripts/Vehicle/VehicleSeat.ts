import { DBC } from "wotlkdata";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { VehicleSeatQuery, VehicleSeatRow } from "wotlkdata/dbc/types/VehicleSeat";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { PositionXYZCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "../Sound/SoundEntry";
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

    clear() {
        this.set(0,0,0,0)
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

    get UISound() { return SoundEntryRegistry.ref(this, this.owner.row.EnterUISoundID)}

    get CameraDelay() {
        return this.ownerWrap(this.owner.row.CameraEnteringDelay);
    }

    get CameraDuration() {
        return this.ownerWrap(this.owner.row.CameraEnteringDuration);
    }

    get CameraZoom() {
        return this.ownerWrap(this.owner.row.CameraEnteringZoom);
    }

    clear() {
        this.AnimLoop.set(0)
        this.AnimStart.set(0)
        this.ArcHeight.set(0,0)
        this.CameraDelay.set(0)
        this.CameraDuration.set(0)
        this.CameraZoom.set(0)
        this.Duration.set(0,0)
        this.Gravity.set(0)
        this.PreDelay.set(0)
        this.Speed.set(0)
        this.UISound.set(0)
        return this.owner;
    }
}

export class VehicleSeatRide extends CellSystem<VehicleSeat> {
    get AnimStart() { return new SpellAnimation(this, this.owner.row.RideAnimStart); }
    get AnimLoop() { return new SpellAnimation(this, this.owner.row.RideAnimLoop); }

    get UpperAnimStart() { return new SpellAnimation(this, this.owner.row.RideUpperAnimStart); }
    get UpperAnimLoop() { return new SpellAnimation(this, this.owner.row.RideUpperAnimLoop); }

    clear() {
        this.AnimStart.set(0)
        this.AnimLoop.set(0)
        this.UpperAnimStart.set(0)
        this.UpperAnimLoop.set(0)
        return this.owner;
    }
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
    get UISound() { return SoundEntryRegistry.ref(this, this.owner.row.ExitUISoundID)}

    get CameraDelay() {
        return this.ownerWrap(this.owner.row.CameraExitingDelay);
    }

    get CameraDuration() {
        return this.ownerWrap(this.owner.row.CameraExitingDuration);
    }

    clear() {
        this.PreDelay.set(0)
        this.Speed.set(0)
        this.Gravity.set(0)
        this.Duration.set(0,0)
        this.ArcHeight.set(0,0)
        this.AnimStart.set(0)
        this.AnimLoop.set(0)
        this.UISound.set(0)
        this.CameraDelay.set(0)
        this.CameraDuration.set(0)
        return this.owner
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

    clear() {
        this.set(0,0,0,0)
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

    clear() {
        this.EnterAnim.set(0)
        this.EnterAnimBone.set(0)
        this.ExitAnim.set(0)
        this.ExitAnimBone.set(0)
        this.RideAnimLoop.set(0)
        this.RideAnimLoopBone.set(0)
        this.EnterAnimDelay.set(0)
        this.ExitAnimDelay.set(0)
        this.AbilityDisplay.set(0)
        return this.owner;
    }
}

export class VehicleCamera extends CellSystem<VehicleSeat> {

    get Offset() {
        return new PositionXYZCell(this,
              this.owner.row.CameraOffsetX
            , this.owner.row.CameraOffsetY
            , this.owner.row.CameraOffsetZ
        )
    }

    get PosChaseRate() { return this.ownerWrap(this.owner.row.CameraPosChaseRate); }
    get FacingChaseRate() { return this.ownerWrap(this.owner.row.CameraFacingChaseRate); }
    get Zoom() {
        return new MinMaxCell(this
            , this.owner.row.CameraSeatZoomMin
            , this.owner.row.CameraSeatZoomMax
        )
    }

    clear() {
        this.Offset.setSpread(0,0,0)
        this.PosChaseRate.set(0)
        this.FacingChaseRate.set(0)
        this.Zoom.set(0,0)
        return this.owner
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

    clear() {
        this.FlagsA.set(0)
        this.FlagsB.set(0)
        this.Attachment.clear()
        this.Enter.clear()
        this.Ride.clear()
        this.Exit.clear()
        this.Passenger.clear()
        this.Vehicle.clear()
        this.HasUISkin.set(0)
        return this;
    }
}

export class VehicleSeatRegistryClass
    extends RegistryDynamic<VehicleSeat,VehicleSeatRow,VehicleSeatQuery>
{
    protected Table(): Table<any, VehicleSeatQuery, VehicleSeatRow> & { add: (id: number) => VehicleSeatRow; } {
        return DBC.VehicleSeat
    }
    protected ids(): DynamicIDGenerator {
        return Ids.VehicleSeat
    }
    Clear(entity: VehicleSeat): void {
        entity.clear();
    }
    protected Clone(entity: VehicleSeat, parent: VehicleSeat): void {
        throw new Error("Method not implemented.");
    }
    protected FindByID(id: number): VehicleSeatRow {
        return DBC.VehicleSeat.findById(id);
    }
    protected EmptyQuery(): VehicleSeatQuery {
        return {}
    }
    ID(e: VehicleSeat): number {
        return e.ID
    }
    protected Entity(r: VehicleSeatRow): VehicleSeat {
        return new VehicleSeat(r);
    }
}

export const VehicleSeatRegistry = new VehicleSeatRegistryClass();