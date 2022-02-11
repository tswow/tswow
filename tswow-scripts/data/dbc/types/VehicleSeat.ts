/*
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/* tslint:disable */
import { float, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class VehicleSeatRow extends DBCRow<VehicleSeatCreator,VehicleSeatQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    @PrimaryKey()
    get ID() { return new DBCKeyCell(this,this.buffer,this.offset+0)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get AttachmentID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get AttachmentOffsetX() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get AttachmentOffsetY() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get AttachmentOffsetZ() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get EnterPreDelay() { return new DBCFloatCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get EnterSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get EnterGravity() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get EnterMinDuration() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get EnterMaxDuration() { return new DBCFloatCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get EnterMinArcHeight() { return new DBCFloatCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get EnterMaxArcHeight() { return new DBCFloatCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get EnterAnimStart() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get EnterAnimLoop() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get RideAnimStart() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get RideAnimLoop() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get RideUpperAnimStart() { return new DBCIntCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get RideUpperAnimLoop() { return new DBCIntCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get ExitPreDelay() { return new DBCFloatCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get ExitSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get ExitGravity() { return new DBCFloatCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get ExitMinDuration() { return new DBCFloatCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get ExitMaxDuration() { return new DBCFloatCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get ExitMinArcHeight() { return new DBCFloatCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get ExitMaxArcHeight() { return new DBCFloatCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get ExitAnimStart() { return new DBCIntCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get ExitAnimLoop() { return new DBCIntCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get ExitAnimEnd() { return new DBCIntCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get PassengerYaw() { return new DBCFloatCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get PassengerPitch() { return new DBCFloatCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get PassengerRoll() { return new DBCFloatCell(this,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get PassengerAttachmentID() { return new DBCIntCell(this,this.buffer,this.offset+128)}

    /**
     * No comment (yet!)
     */
    get VehicleEnterAnim() { return new DBCIntCell(this,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get VehicleExitAnim() { return new DBCIntCell(this,this.buffer,this.offset+136)}

    /**
     * No comment (yet!)
     */
    get VehicleRideAnimLoop() { return new DBCIntCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get VehicleEnterAnimBone() { return new DBCIntCell(this,this.buffer,this.offset+144)}

    /**
     * No comment (yet!)
     */
    get VehicleExitAnimBone() { return new DBCIntCell(this,this.buffer,this.offset+148)}

    /**
     * No comment (yet!)
     */
    get VehicleRideAnimLoopBone() { return new DBCIntCell(this,this.buffer,this.offset+152)}

    /**
     * No comment (yet!)
     */
    get VehicleEnterAnimDelay() { return new DBCFloatCell(this,this.buffer,this.offset+156)}

    /**
     * No comment (yet!)
     */
    get VehicleExitAnimDelay() { return new DBCFloatCell(this,this.buffer,this.offset+160)}

    /**
     * No comment (yet!)
     */
    get VehicleAbilityDisplay() { return new DBCIntCell(this,this.buffer,this.offset+164)}

    /**
     * No comment (yet!)
     */
    get EnterUISoundID() { return new DBCIntCell(this,this.buffer,this.offset+168)}

    /**
     * No comment (yet!)
     */
    get ExitUISoundID() { return new DBCIntCell(this,this.buffer,this.offset+172)}

    /**
     * No comment (yet!)
     */
    get UiSkin() { return new DBCIntCell(this,this.buffer,this.offset+176)}

    /**
     * No comment (yet!)
     */
    get FlagsB() { return new DBCIntCell(this,this.buffer,this.offset+180)}

    /**
     * No comment (yet!)
     */
    get CameraEnteringDelay() { return new DBCFloatCell(this,this.buffer,this.offset+184)}

    /**
     * No comment (yet!)
     */
    get CameraEnteringDuration() { return new DBCFloatCell(this,this.buffer,this.offset+188)}

    /**
     * No comment (yet!)
     */
    get CameraExitingDelay() { return new DBCFloatCell(this,this.buffer,this.offset+192)}

    /**
     * No comment (yet!)
     */
    get CameraExitingDuration() { return new DBCFloatCell(this,this.buffer,this.offset+196)}

    /**
     * No comment (yet!)
     */
    get CameraOffsetX() { return new DBCFloatCell(this,this.buffer,this.offset+200)}

    /**
     * No comment (yet!)
     */
    get CameraOffsetY() { return new DBCFloatCell(this,this.buffer,this.offset+204)}

    /**
     * No comment (yet!)
     */
    get CameraOffsetZ() { return new DBCFloatCell(this,this.buffer,this.offset+208)}

    /**
     * No comment (yet!)
     */
    get CameraPosChaseRate() { return new DBCFloatCell(this,this.buffer,this.offset+212)}

    /**
     * No comment (yet!)
     */
    get CameraFacingChaseRate() { return new DBCFloatCell(this,this.buffer,this.offset+216)}

    /**
     * No comment (yet!)
     */
    get CameraEnteringZoom() { return new DBCFloatCell(this,this.buffer,this.offset+220)}

    /**
     * No comment (yet!)
     */
    get CameraSeatZoomMin() { return new DBCFloatCell(this,this.buffer,this.offset+224)}

    /**
     * No comment (yet!)
     */
    get CameraSeatZoomMax() { return new DBCFloatCell(this,this.buffer,this.offset+228)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : VehicleSeatCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type VehicleSeatCreator = {
    Flags?: int
    AttachmentID?: int
    AttachmentOffsetX?: float
    AttachmentOffsetY?: float
    AttachmentOffsetZ?: float
    EnterPreDelay?: float
    EnterSpeed?: float
    EnterGravity?: float
    EnterMinDuration?: float
    EnterMaxDuration?: float
    EnterMinArcHeight?: float
    EnterMaxArcHeight?: float
    EnterAnimStart?: int
    EnterAnimLoop?: int
    RideAnimStart?: int
    RideAnimLoop?: int
    RideUpperAnimStart?: int
    RideUpperAnimLoop?: int
    ExitPreDelay?: float
    ExitSpeed?: float
    ExitGravity?: float
    ExitMinDuration?: float
    ExitMaxDuration?: float
    ExitMinArcHeight?: float
    ExitMaxArcHeight?: float
    ExitAnimStart?: int
    ExitAnimLoop?: int
    ExitAnimEnd?: int
    PassengerYaw?: float
    PassengerPitch?: float
    PassengerRoll?: float
    PassengerAttachmentID?: int
    VehicleEnterAnim?: int
    VehicleExitAnim?: int
    VehicleRideAnimLoop?: int
    VehicleEnterAnimBone?: int
    VehicleExitAnimBone?: int
    VehicleRideAnimLoopBone?: int
    VehicleEnterAnimDelay?: float
    VehicleExitAnimDelay?: float
    VehicleAbilityDisplay?: int
    EnterUISoundID?: int
    ExitUISoundID?: int
    UiSkin?: int
    FlagsB?: int
    CameraEnteringDelay?: float
    CameraEnteringDuration?: float
    CameraExitingDelay?: float
    CameraExitingDuration?: float
    CameraOffsetX?: float
    CameraOffsetY?: float
    CameraOffsetZ?: float
    CameraPosChaseRate?: float
    CameraFacingChaseRate?: float
    CameraEnteringZoom?: float
    CameraSeatZoomMin?: float
    CameraSeatZoomMax?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type VehicleSeatQuery = {
    ID? : Relation<int>
    Flags? : Relation<int>
    AttachmentID? : Relation<int>
    AttachmentOffsetX? : Relation<float>
    AttachmentOffsetY? : Relation<float>
    AttachmentOffsetZ? : Relation<float>
    EnterPreDelay? : Relation<float>
    EnterSpeed? : Relation<float>
    EnterGravity? : Relation<float>
    EnterMinDuration? : Relation<float>
    EnterMaxDuration? : Relation<float>
    EnterMinArcHeight? : Relation<float>
    EnterMaxArcHeight? : Relation<float>
    EnterAnimStart? : Relation<int>
    EnterAnimLoop? : Relation<int>
    RideAnimStart? : Relation<int>
    RideAnimLoop? : Relation<int>
    RideUpperAnimStart? : Relation<int>
    RideUpperAnimLoop? : Relation<int>
    ExitPreDelay? : Relation<float>
    ExitSpeed? : Relation<float>
    ExitGravity? : Relation<float>
    ExitMinDuration? : Relation<float>
    ExitMaxDuration? : Relation<float>
    ExitMinArcHeight? : Relation<float>
    ExitMaxArcHeight? : Relation<float>
    ExitAnimStart? : Relation<int>
    ExitAnimLoop? : Relation<int>
    ExitAnimEnd? : Relation<int>
    PassengerYaw? : Relation<float>
    PassengerPitch? : Relation<float>
    PassengerRoll? : Relation<float>
    PassengerAttachmentID? : Relation<int>
    VehicleEnterAnim? : Relation<int>
    VehicleExitAnim? : Relation<int>
    VehicleRideAnimLoop? : Relation<int>
    VehicleEnterAnimBone? : Relation<int>
    VehicleExitAnimBone? : Relation<int>
    VehicleRideAnimLoopBone? : Relation<int>
    VehicleEnterAnimDelay? : Relation<float>
    VehicleExitAnimDelay? : Relation<float>
    VehicleAbilityDisplay? : Relation<int>
    EnterUISoundID? : Relation<int>
    ExitUISoundID? : Relation<int>
    UiSkin? : Relation<int>
    FlagsB? : Relation<int>
    CameraEnteringDelay? : Relation<float>
    CameraEnteringDuration? : Relation<float>
    CameraExitingDelay? : Relation<float>
    CameraExitingDuration? : Relation<float>
    CameraOffsetX? : Relation<float>
    CameraOffsetY? : Relation<float>
    CameraOffsetZ? : Relation<float>
    CameraPosChaseRate? : Relation<float>
    CameraFacingChaseRate? : Relation<float>
    CameraEnteringZoom? : Relation<float>
    CameraSeatZoomMin? : Relation<float>
    CameraSeatZoomMax? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class VehicleSeatDBCFile extends DBCFile<
    VehicleSeatCreator,
    VehicleSeatQuery,
    VehicleSeatRow> {
    constructor() {
        super('VehicleSeat',(t,b,o)=>new VehicleSeatRow(t,b,o))
    }
    /** Loads a new VehicleSeat.dbc from a file. */
    static read(path: string): VehicleSeatDBCFile {
        return new VehicleSeatDBCFile().read(path);
    }
    add(ID : int, c? : VehicleSeatCreator) : VehicleSeatRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}