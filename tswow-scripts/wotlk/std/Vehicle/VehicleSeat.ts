import { DBC } from "wotlkdata";
import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { VehicleSeatQuery, VehicleSeatRow } from "wotlkdata/wotlkdata/dbc/types/VehicleSeat";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { PositionXYZCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "../Sound/SoundEntry";
import { SpellAnimation } from "../Spell/SpellAnimation";

export enum VehicleSeatFlags {
    HAS_LOWER_ANIM_FOR_ENTER               = 0x1,
    HAS_LOWER_ANIM_FOR_RIDE                = 0x2,
    UNK3                                   = 0x4,
    SHOULD_USE_SEAT_ANIM_ON_VOLUNTARY_EXIT = 0x8,
    UNK5                                   = 0x10,
    UNK6                                   = 0x20,
    UNK7                                   = 0x40,
    UNK8                                   = 0x80,
    UNK9                                   = 0x100,
    HIDE_PASSENGER                         = 0x200,
    ALLOW_TURNING                          = 0x400,
    CAN_CONTROL                            = 0x800,
    CAN_CAST_MOUNT_SPELL                   = 0x1000,
    UNCONTROLLED                           = 0x2000,
    CAN_ATTACK                             = 0x4000,
    SHOULD_USE_SEAT_ANIM_ON_FORCED_EXIT    = 0x8000,
    UNK17                                  = 0x10000,
    /** Related to permanent auras */
    UNK18                                  = 0x20000,
    HAS_VOLUNTARY_EXIT_ANIM                = 0x40000,
    HAS_FORCED_EXIT_ANIM                   = 0x80000,
    PASSENGER_NOT_SELECTABLE               = 0x100000,
    UNK22                                  = 0x200000,
    HAS_VEHICLE_ENTER_ANIM                 = 0x400000,
    IS_USING_VEHICLE_CONTROLS              = 0x800000,
    ENABLE_VEHICLE_ZOOM                    = 0x1000000,
    CAN_ENTER_OR_EXIT                      = 0x2000000,
    CAN_SWITCH                             = 0x4000000,
    HAS_START_WAITING_FOR_ANIM_ENTER       = 0x8000000,
    HAS_START_WAITING_FOR_ANIM_EXIT        = 0x10000000,
    CAN_CAST                               = 0x20000000,
    UNK2                                   = 0x40000000,
    ALLOWS_INTERACTION                     = 0x80000000,
}

export enum VehicleSeatFlagsB {
    USABLE_FORCED            = 0x2,
    TARGETS_IN_RADIUS        = 0x8,
    EJECTABLE                = 0x20,
    USABLE_FORCED2           = 0x40,
    USABLE_FORCED3           = 0x100,
    UNK7                   = 0x10000,
    KEEP_PET                 = 0x20000,
    USABLE_FORCED4           = 0x2000000,
    CAN_SWITCH               = 0x4000000,
    VEHICLE_PLAYER_FRAME_UI = 0x80000000,
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

    get AnimStart() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.EnterAnimStart);
    }
    get AnimLoop() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.EnterAnimLoop);
    }

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
    get AnimStart() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.RideAnimStart);
    }
    get AnimLoop() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.RideAnimLoop);
    }

    get UpperAnimStart() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.RideUpperAnimStart);
    }
    get UpperAnimLoop() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.RideUpperAnimLoop);
    }

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

    get AnimStart() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.ExitAnimStart);
    }
    get AnimLoop() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.ExitAnimLoop);
    }
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
    get EnterAnim() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.VehicleEnterAnim);
    }
    get EnterAnimBone() { return this.ownerWrap(this.owner.row.VehicleEnterAnimBone); }
    get ExitAnim() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.VehicleExitAnim);
    }
    get ExitAnimBone() { return this.ownerWrap(this.owner.row.VehicleExitAnimBone); }
    get RideAnimLoop() {
        return makeEnumCell(SpellAnimation, this, this.owner.row.VehicleRideAnimLoop);
    }
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
    get FlagsA() {
        return makeMaskCell32(VehicleSeatFlags, this, this.row.Flags);
    }
    get FlagsB() {
        return makeMaskCell32(VehicleSeatFlagsB, this, this.row.FlagsB);
    }
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