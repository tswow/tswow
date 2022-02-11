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
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class CreatureModelDataRow extends DBCRow<CreatureModelDataCreator,CreatureModelDataQuery> {
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
    get ModelName() { return new DBCStringCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get SizeClass() { return new DBCIntCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get ModelScale() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get BloodID() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get FootprintTextureID() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get FootprintTextureLength() { return new DBCFloatCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get FootprintTextureWidth() { return new DBCFloatCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get FootprintParticleScale() { return new DBCFloatCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get FoleyMaterialID() { return new DBCIntCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get FootstepShakeSize() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get DeathThudShakeSize() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get SoundID() { return new DBCIntCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get CollisionWidth() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get CollisionHeight() { return new DBCFloatCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get MountHeight() { return new DBCFloatCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMinX() { return new DBCFloatCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMinY() { return new DBCFloatCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMinZ() { return new DBCFloatCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMaxX() { return new DBCFloatCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMaxY() { return new DBCFloatCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get GeoBoxMaxZ() { return new DBCFloatCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get WorldEffectScale() { return new DBCFloatCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get AttachedEffectScale() { return new DBCFloatCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get MissileCollisionRadius() { return new DBCFloatCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get MissileCollisionPush() { return new DBCFloatCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get MissileCollisionRaise() { return new DBCFloatCell(this,this.buffer,this.offset+108)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : CreatureModelDataCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type CreatureModelDataCreator = {
    Flags?: int
    ModelName?: string
    SizeClass?: int
    ModelScale?: float
    BloodID?: int
    FootprintTextureID?: int
    FootprintTextureLength?: float
    FootprintTextureWidth?: float
    FootprintParticleScale?: float
    FoleyMaterialID?: int
    FootstepShakeSize?: int
    DeathThudShakeSize?: int
    SoundID?: int
    CollisionWidth?: float
    CollisionHeight?: float
    MountHeight?: float
    GeoBoxMinX?: float
    GeoBoxMinY?: float
    GeoBoxMinZ?: float
    GeoBoxMaxX?: float
    GeoBoxMaxY?: float
    GeoBoxMaxZ?: float
    WorldEffectScale?: float
    AttachedEffectScale?: float
    MissileCollisionRadius?: float
    MissileCollisionPush?: float
    MissileCollisionRaise?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type CreatureModelDataQuery = {
    ID? : Relation<int>
    Flags? : Relation<int>
    ModelName? : Relation<string>
    SizeClass? : Relation<int>
    ModelScale? : Relation<float>
    BloodID? : Relation<int>
    FootprintTextureID? : Relation<int>
    FootprintTextureLength? : Relation<float>
    FootprintTextureWidth? : Relation<float>
    FootprintParticleScale? : Relation<float>
    FoleyMaterialID? : Relation<int>
    FootstepShakeSize? : Relation<int>
    DeathThudShakeSize? : Relation<int>
    SoundID? : Relation<int>
    CollisionWidth? : Relation<float>
    CollisionHeight? : Relation<float>
    MountHeight? : Relation<float>
    GeoBoxMinX? : Relation<float>
    GeoBoxMinY? : Relation<float>
    GeoBoxMinZ? : Relation<float>
    GeoBoxMaxX? : Relation<float>
    GeoBoxMaxY? : Relation<float>
    GeoBoxMaxZ? : Relation<float>
    WorldEffectScale? : Relation<float>
    AttachedEffectScale? : Relation<float>
    MissileCollisionRadius? : Relation<float>
    MissileCollisionPush? : Relation<float>
    MissileCollisionRaise? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class CreatureModelDataDBCFile extends DBCFile<
    CreatureModelDataCreator,
    CreatureModelDataQuery,
    CreatureModelDataRow> {
    constructor() {
        super('CreatureModelData',(t,b,o)=>new CreatureModelDataRow(t,b,o))
    }
    /** Loads a new CreatureModelData.dbc from a file. */
    static read(path: string): CreatureModelDataDBCFile {
        return new CreatureModelDataDBCFile().read(path);
    }
    add(ID : int, c? : CreatureModelDataCreator) : CreatureModelDataRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}