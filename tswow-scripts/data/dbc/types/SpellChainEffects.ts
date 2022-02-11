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
import { byte, float, int } from '../../primitives'
import { Relation } from '../../query/Relations'
import { PrimaryKey } from '../../table/PrimaryKey'
import { DBCByteCell, DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../DBCCell'
import { DBCFile } from '../DBCFile'
import { DBCRow } from '../DBCRow'

 /**
  * Main row definition
  * - Add column comments to the commented getters below
  * - Add file comments to DBCFiles.ts
  */
export class SpellChainEffectsRow extends DBCRow<SpellChainEffectsCreator,SpellChainEffectsQuery> {
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
    get AvgSegLen() { return new DBCFloatCell(this,this.buffer,this.offset+4)}

    /**
     * No comment (yet!)
     */
    get Width() { return new DBCFloatCell(this,this.buffer,this.offset+8)}

    /**
     * No comment (yet!)
     */
    get NoiseScale() { return new DBCFloatCell(this,this.buffer,this.offset+12)}

    /**
     * No comment (yet!)
     */
    get TexCoordScale() { return new DBCFloatCell(this,this.buffer,this.offset+16)}

    /**
     * No comment (yet!)
     */
    get SegDuration() { return new DBCIntCell(this,this.buffer,this.offset+20)}

    /**
     * No comment (yet!)
     */
    get SegDelay() { return new DBCIntCell(this,this.buffer,this.offset+24)}

    /**
     * No comment (yet!)
     */
    get Texture() { return new DBCStringCell(this,this.buffer,this.offset+28)}

    /**
     * No comment (yet!)
     */
    get Flags() { return new DBCIntCell(this,this.buffer,this.offset+32)}

    /**
     * No comment (yet!)
     */
    get JointCount() { return new DBCIntCell(this,this.buffer,this.offset+36)}

    /**
     * No comment (yet!)
     */
    get JointOffsetRadius() { return new DBCFloatCell(this,this.buffer,this.offset+40)}

    /**
     * No comment (yet!)
     */
    get JointsPerMinorJoint() { return new DBCIntCell(this,this.buffer,this.offset+44)}

    /**
     * No comment (yet!)
     */
    get MinorJointsPerMajorJoint() { return new DBCIntCell(this,this.buffer,this.offset+48)}

    /**
     * No comment (yet!)
     */
    get MinorJointScale() { return new DBCFloatCell(this,this.buffer,this.offset+52)}

    /**
     * No comment (yet!)
     */
    get MajorJointScale() { return new DBCFloatCell(this,this.buffer,this.offset+56)}

    /**
     * No comment (yet!)
     */
    get JointMoveSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+60)}

    /**
     * No comment (yet!)
     */
    get JointSmoothness() { return new DBCFloatCell(this,this.buffer,this.offset+64)}

    /**
     * No comment (yet!)
     */
    get MinDurationBetweenJointJumps() { return new DBCFloatCell(this,this.buffer,this.offset+68)}

    /**
     * No comment (yet!)
     */
    get MaxDurationBetweenJointJumps() { return new DBCFloatCell(this,this.buffer,this.offset+72)}

    /**
     * No comment (yet!)
     */
    get WaveHeight() { return new DBCFloatCell(this,this.buffer,this.offset+76)}

    /**
     * No comment (yet!)
     */
    get WaveFreq() { return new DBCFloatCell(this,this.buffer,this.offset+80)}

    /**
     * No comment (yet!)
     */
    get WaveSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+84)}

    /**
     * No comment (yet!)
     */
    get MinWaveAngle() { return new DBCFloatCell(this,this.buffer,this.offset+88)}

    /**
     * No comment (yet!)
     */
    get MaxWaveAngle() { return new DBCFloatCell(this,this.buffer,this.offset+92)}

    /**
     * No comment (yet!)
     */
    get MinWaveSpin() { return new DBCFloatCell(this,this.buffer,this.offset+96)}

    /**
     * No comment (yet!)
     */
    get MaxWaveSpin() { return new DBCFloatCell(this,this.buffer,this.offset+100)}

    /**
     * No comment (yet!)
     */
    get ArcHeight() { return new DBCFloatCell(this,this.buffer,this.offset+104)}

    /**
     * No comment (yet!)
     */
    get MinArcAngle() { return new DBCFloatCell(this,this.buffer,this.offset+108)}

    /**
     * No comment (yet!)
     */
    get MaxArcAngle() { return new DBCFloatCell(this,this.buffer,this.offset+112)}

    /**
     * No comment (yet!)
     */
    get MinArcSpin() { return new DBCFloatCell(this,this.buffer,this.offset+116)}

    /**
     * No comment (yet!)
     */
    get MaxArcSpin() { return new DBCFloatCell(this,this.buffer,this.offset+120)}

    /**
     * No comment (yet!)
     */
    get DelayBetweenEffects() { return new DBCFloatCell(this,this.buffer,this.offset+124)}

    /**
     * No comment (yet!)
     */
    get MinFlickerOnDuration() { return new DBCFloatCell(this,this.buffer,this.offset+128)}

    /**
     * No comment (yet!)
     */
    get MaxFlickerOnDuration() { return new DBCFloatCell(this,this.buffer,this.offset+132)}

    /**
     * No comment (yet!)
     */
    get MinFlickerOffDuration() { return new DBCFloatCell(this,this.buffer,this.offset+136)}

    /**
     * No comment (yet!)
     */
    get MaxFlickerOffDuration() { return new DBCFloatCell(this,this.buffer,this.offset+140)}

    /**
     * No comment (yet!)
     */
    get PulseSpeed() { return new DBCFloatCell(this,this.buffer,this.offset+144)}

    /**
     * No comment (yet!)
     */
    get PulseOnLength() { return new DBCFloatCell(this,this.buffer,this.offset+148)}

    /**
     * No comment (yet!)
     */
    get PulseFadeLength() { return new DBCFloatCell(this,this.buffer,this.offset+152)}

    /**
     * No comment (yet!)
     */
    get Alpha() { return new DBCByteCell(this,this.buffer,this.offset+156)}

    /**
     * No comment (yet!)
     */
    get Red() { return new DBCByteCell(this,this.buffer,this.offset+157)}

    /**
     * No comment (yet!)
     */
    get Green() { return new DBCByteCell(this,this.buffer,this.offset+158)}

    /**
     * No comment (yet!)
     */
    get Blue() { return new DBCByteCell(this,this.buffer,this.offset+159)}

    /**
     * No comment (yet!)
     */
    get BlendMode() { return new DBCByteCell(this,this.buffer,this.offset+160)}

    /**
     * No comment (yet!)
     */
    get Combo() { return new DBCStringCell(this,this.buffer,this.offset+161)}

    /**
     * No comment (yet!)
     */
    get RenderLayer() { return new DBCIntCell(this,this.buffer,this.offset+165)}

    /**
     * No comment (yet!)
     */
    get TextureLength() { return new DBCFloatCell(this,this.buffer,this.offset+169)}

    /**
     * No comment (yet!)
     */
    get WavePhase() { return new DBCFloatCell(this,this.buffer,this.offset+173)}

    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID : int, c? : SpellChainEffectsCreator) : this {
        return this.cloneInternal([ID],c);
    }
}

/**
 * Used for object creation (Don't comment these)
 */
export type SpellChainEffectsCreator = {
    AvgSegLen?: float
    Width?: float
    NoiseScale?: float
    TexCoordScale?: float
    SegDuration?: int
    SegDelay?: int
    Texture?: string
    Flags?: int
    JointCount?: int
    JointOffsetRadius?: float
    JointsPerMinorJoint?: int
    MinorJointsPerMajorJoint?: int
    MinorJointScale?: float
    MajorJointScale?: float
    JointMoveSpeed?: float
    JointSmoothness?: float
    MinDurationBetweenJointJumps?: float
    MaxDurationBetweenJointJumps?: float
    WaveHeight?: float
    WaveFreq?: float
    WaveSpeed?: float
    MinWaveAngle?: float
    MaxWaveAngle?: float
    MinWaveSpin?: float
    MaxWaveSpin?: float
    ArcHeight?: float
    MinArcAngle?: float
    MaxArcAngle?: float
    MinArcSpin?: float
    MaxArcSpin?: float
    DelayBetweenEffects?: float
    MinFlickerOnDuration?: float
    MaxFlickerOnDuration?: float
    MinFlickerOffDuration?: float
    MaxFlickerOffDuration?: float
    PulseSpeed?: float
    PulseOnLength?: float
    PulseFadeLength?: float
    Alpha?: byte
    Red?: byte
    Green?: byte
    Blue?: byte
    BlendMode?: byte
    Combo?: string
    RenderLayer?: int
    TextureLength?: float
    WavePhase?: float
}

/**
 * Used for queries (Don't comment these)
 */
export type SpellChainEffectsQuery = {
    ID? : Relation<int>
    AvgSegLen? : Relation<float>
    Width? : Relation<float>
    NoiseScale? : Relation<float>
    TexCoordScale? : Relation<float>
    SegDuration? : Relation<int>
    SegDelay? : Relation<int>
    Texture? : Relation<string>
    Flags? : Relation<int>
    JointCount? : Relation<int>
    JointOffsetRadius? : Relation<float>
    JointsPerMinorJoint? : Relation<int>
    MinorJointsPerMajorJoint? : Relation<int>
    MinorJointScale? : Relation<float>
    MajorJointScale? : Relation<float>
    JointMoveSpeed? : Relation<float>
    JointSmoothness? : Relation<float>
    MinDurationBetweenJointJumps? : Relation<float>
    MaxDurationBetweenJointJumps? : Relation<float>
    WaveHeight? : Relation<float>
    WaveFreq? : Relation<float>
    WaveSpeed? : Relation<float>
    MinWaveAngle? : Relation<float>
    MaxWaveAngle? : Relation<float>
    MinWaveSpin? : Relation<float>
    MaxWaveSpin? : Relation<float>
    ArcHeight? : Relation<float>
    MinArcAngle? : Relation<float>
    MaxArcAngle? : Relation<float>
    MinArcSpin? : Relation<float>
    MaxArcSpin? : Relation<float>
    DelayBetweenEffects? : Relation<float>
    MinFlickerOnDuration? : Relation<float>
    MaxFlickerOnDuration? : Relation<float>
    MinFlickerOffDuration? : Relation<float>
    MaxFlickerOffDuration? : Relation<float>
    PulseSpeed? : Relation<float>
    PulseOnLength? : Relation<float>
    PulseFadeLength? : Relation<float>
    Alpha? : Relation<byte>
    Red? : Relation<byte>
    Green? : Relation<byte>
    Blue? : Relation<byte>
    BlendMode? : Relation<byte>
    Combo? : Relation<string>
    RenderLayer? : Relation<int>
    TextureLength? : Relation<float>
    WavePhase? : Relation<float>
}

/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export class SpellChainEffectsDBCFile extends DBCFile<
    SpellChainEffectsCreator,
    SpellChainEffectsQuery,
    SpellChainEffectsRow> {
    constructor() {
        super('SpellChainEffects',(t,b,o)=>new SpellChainEffectsRow(t,b,o))
    }
    /** Loads a new SpellChainEffects.dbc from a file. */
    static read(path: string): SpellChainEffectsDBCFile {
        return new SpellChainEffectsDBCFile().read(path);
    }
    add(ID : int, c? : SpellChainEffectsCreator) : SpellChainEffectsRow {
        return this.makeRow(0).clone(ID,c)
    }
    findById(id: number) {
        return this.fastSearch(id);
    }
}