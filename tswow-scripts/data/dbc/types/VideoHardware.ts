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
import { int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class VideoHardwareRow extends DBCRow<VideoHardwareCreator,VideoHardwareQuery> {
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
    get VendorID() { return new DBCIntCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get DeviceID() { return new DBCIntCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get FarclipIdx() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get TerrainLODDistIdx() { return new DBCIntCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get TerrainShadowLOD() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get DetailDoodadDensityIdx() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get DetailDoodadAlpha() { return new DBCIntCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get AnimatingDoodadIdx() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get Trilinear() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get NumLights() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get Specularity() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get WaterLODIdx() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get ParticleDensityIdx() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get UnitDrawDistIdx() { return new DBCIntCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get SmallCullDistIdx() { return new DBCIntCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get ResolutionIdx() { return new DBCIntCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get BaseMipLevel() { return new DBCIntCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get OglOverrides() { return new DBCStringCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get D3dOverrides() { return new DBCStringCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get FixLag() { return new DBCIntCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get Multisample() { return new DBCIntCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get Atlasdisable() { return new DBCIntCell(this,this.buffer,this.offset+88)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : VideoHardwareCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type VideoHardwareCreator = {
    VendorID?: int
    DeviceID?: int
    FarclipIdx?: int
    TerrainLODDistIdx?: int
    TerrainShadowLOD?: int
    DetailDoodadDensityIdx?: int
    DetailDoodadAlpha?: int
    AnimatingDoodadIdx?: int
    Trilinear?: int
    NumLights?: int
    Specularity?: int
    WaterLODIdx?: int
    ParticleDensityIdx?: int
    UnitDrawDistIdx?: int
    SmallCullDistIdx?: int
    ResolutionIdx?: int
    BaseMipLevel?: int
    OglOverrides?: string
    D3dOverrides?: string
    FixLag?: int
    Multisample?: int
    Atlasdisable?: int
}

/**
 * Used for queries (Don't comment these)
 */
export type VideoHardwareQuery = {
    ID? : Relation<int>
    VendorID? : Relation<int>
    DeviceID? : Relation<int>
    FarclipIdx? : Relation<int>
    TerrainLODDistIdx? : Relation<int>
    TerrainShadowLOD? : Relation<int>
    DetailDoodadDensityIdx? : Relation<int>
    DetailDoodadAlpha? : Relation<int>
    AnimatingDoodadIdx? : Relation<int>
    Trilinear? : Relation<int>
    NumLights? : Relation<int>
    Specularity? : Relation<int>
    WaterLODIdx? : Relation<int>
    ParticleDensityIdx? : Relation<int>
    UnitDrawDistIdx? : Relation<int>
    SmallCullDistIdx? : Relation<int>
    ResolutionIdx? : Relation<int>
    BaseMipLevel? : Relation<int>
    OglOverrides? : Relation<string>
    D3dOverrides? : Relation<string>
    FixLag? : Relation<int>
    Multisample? : Relation<int>
    Atlasdisable? : Relation<int>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class VideoHardwareDBCFile extends DBCFile<
    VideoHardwareCreator,
    VideoHardwareQuery,
    VideoHardwareRow> {
    constructor() {
        super('VideoHardware',(t,b,o)=>new VideoHardwareRow(t,b,o))
    }
    /** Loads a new VideoHardware.dbc from a file. */
    static read(path: string): VideoHardwareDBCFile {
        return new VideoHardwareDBCFile().read(path);
    }
    add(ID : int, c? : VideoHardwareCreator) : VideoHardwareRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}