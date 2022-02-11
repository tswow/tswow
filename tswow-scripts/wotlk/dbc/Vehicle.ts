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
import { float, int } from '../../data/primitives'
import { Relation } from '../../data/query/Relations'
import { PrimaryKey } from '../../data/table/PrimaryKey'
import { DBCFloatArrayCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell, DBCStringCell } from '../../data/dbc/DBCCell'
import { DBCFile } from '../../data/dbc/DBCFile'
import { DBCRow } from '../../data/dbc/DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class VehicleRow extends DBCRow<VehicleCreator,VehicleQuery> {
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
    get TurnSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get PitchSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get PitchMin() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get PitchMax() { return new DBCFloatCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get SeatID() { return new DBCIntArrayCell(this,8,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get MouseLookOffsetPitch() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get CameraFadeDistScalarMin() { return new DBCFloatCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get CameraFadeDistScalarMax() { return new DBCFloatCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get CameraPitchOffset() { return new DBCFloatCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get FacingLimitRight() { return new DBCFloatCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get FacingLimitLeft() { return new DBCFloatCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtTurnLingering() { return new DBCFloatCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtPitchLingering() { return new DBCFloatCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtMouseLingering() { return new DBCFloatCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtEndOpacity() { return new DBCFloatCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtArcSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtArcRepeat() { return new DBCFloatCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtArcWidth() { return new DBCFloatCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtImpactRadius() { return new DBCFloatArrayCell(this,2,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtArcTexture() { return new DBCStringCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtImpactTexture() { return new DBCStringCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtImpactModel() { return new DBCStringArrayCell(this,2,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get CameraYawOffset() { return new DBCFloatCell(this,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get UilocomotionType() { return new DBCIntCell(this,this.buffer,this.offset+136)}

    /**
     * No comment (yet!)
     */
    get MsslTrgtImpactTexRadius() { return new DBCFloatCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get VehicleUIIndicatorID() { return new DBCIntCell(this,this.buffer,this.offset+144)}

    /**
     * No comment (yet!)
     */
    get PowerDisplayID() { return new DBCIntArrayCell(this,3,this.buffer,this.offset+148)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : VehicleCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type VehicleCreator = {
    Flags?: int
    TurnSpeed?: float
    PitchSpeed?: float
    PitchMin?: float
    PitchMax?: float
    SeatID?: int[]
    MouseLookOffsetPitch?: float
    CameraFadeDistScalarMin?: float
    CameraFadeDistScalarMax?: float
    CameraPitchOffset?: float
    FacingLimitRight?: float
    FacingLimitLeft?: float
    MsslTrgtTurnLingering?: float
    MsslTrgtPitchLingering?: float
    MsslTrgtMouseLingering?: float
    MsslTrgtEndOpacity?: float
    MsslTrgtArcSpeed?: float
    MsslTrgtArcRepeat?: float
    MsslTrgtArcWidth?: float
    MsslTrgtImpactRadius?: float[]
    MsslTrgtArcTexture?: string
    MsslTrgtImpactTexture?: string
    MsslTrgtImpactModel?: string[]
    CameraYawOffset?: float
    UilocomotionType?: int
    MsslTrgtImpactTexRadius?: float
    VehicleUIIndicatorID?: int
    PowerDisplayID?: int[]
}

/**
 * Used for queries (Don't comment these)
 */
export type VehicleQuery = {
    ID? : Relation<int>
    Flags? : Relation<int>
    TurnSpeed? : Relation<float>
    PitchSpeed? : Relation<float>
    PitchMin? : Relation<float>
    PitchMax? : Relation<float>
    SeatID? : Relation<int>
    MouseLookOffsetPitch? : Relation<float>
    CameraFadeDistScalarMin? : Relation<float>
    CameraFadeDistScalarMax? : Relation<float>
    CameraPitchOffset? : Relation<float>
    FacingLimitRight? : Relation<float>
    FacingLimitLeft? : Relation<float>
    MsslTrgtTurnLingering? : Relation<float>
    MsslTrgtPitchLingering? : Relation<float>
    MsslTrgtMouseLingering? : Relation<float>
    MsslTrgtEndOpacity? : Relation<float>
    MsslTrgtArcSpeed? : Relation<float>
    MsslTrgtArcRepeat? : Relation<float>
    MsslTrgtArcWidth? : Relation<float>
    MsslTrgtImpactRadius? : Relation<float>
    MsslTrgtArcTexture? : Relation<string>
    MsslTrgtImpactTexture? : Relation<string>
    MsslTrgtImpactModel? : Relation<string>
    CameraYawOffset? : Relation<float>
    UilocomotionType? : Relation<int>
    MsslTrgtImpactTexRadius? : Relation<float>
    VehicleUIIndicatorID? : Relation<int>
    PowerDisplayID? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class VehicleDBCFile extends DBCFile<
    VehicleCreator,
    VehicleQuery,
    VehicleRow> {
    constructor() {
        super('Vehicle',(t,b,o)=>new VehicleRow(t,b,o))
    }
    /** Loads a new Vehicle.dbc from a file. */
    static read(path: string): VehicleDBCFile {
        return new VehicleDBCFile().read(path);
    }
    add(ID : int, c? : VehicleCreator) : VehicleRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}