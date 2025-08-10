import { byte, float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCByteCell, DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellChainEffectsRow extends DBCRow<SpellChainEffectsCreator, SpellChainEffectsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get AvgSegLen(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Width(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get NoiseScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get TexCoordScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get SegDuration(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SegDelay(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Texture(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get JointCount(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get JointOffsetRadius(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get JointsPerMinorJoint(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinorJointsPerMajorJoint(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinorJointScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MajorJointScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get JointMoveSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get JointSmoothness(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinDurationBetweenJointJumps(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxDurationBetweenJointJumps(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WaveHeight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WaveFreq(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WaveSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinWaveAngle(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxWaveAngle(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinWaveSpin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxWaveSpin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ArcHeight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinArcAngle(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxArcAngle(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinArcSpin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxArcSpin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DelayBetweenEffects(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinFlickerOnDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxFlickerOnDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinFlickerOffDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxFlickerOffDuration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PulseSpeed(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PulseOnLength(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PulseFadeLength(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Alpha(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get Red(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get Green(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get Blue(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get BlendMode(): DBCByteCell<this>;
    /**
     * No comment (yet!)
     */
    get Combo(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get RenderLayer(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureLength(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WavePhase(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellChainEffectsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellChainEffectsCreator = {
    AvgSegLen?: float;
    Width?: float;
    NoiseScale?: float;
    TexCoordScale?: float;
    SegDuration?: int;
    SegDelay?: int;
    Texture?: string;
    Flags?: int;
    JointCount?: int;
    JointOffsetRadius?: float;
    JointsPerMinorJoint?: int;
    MinorJointsPerMajorJoint?: int;
    MinorJointScale?: float;
    MajorJointScale?: float;
    JointMoveSpeed?: float;
    JointSmoothness?: float;
    MinDurationBetweenJointJumps?: float;
    MaxDurationBetweenJointJumps?: float;
    WaveHeight?: float;
    WaveFreq?: float;
    WaveSpeed?: float;
    MinWaveAngle?: float;
    MaxWaveAngle?: float;
    MinWaveSpin?: float;
    MaxWaveSpin?: float;
    ArcHeight?: float;
    MinArcAngle?: float;
    MaxArcAngle?: float;
    MinArcSpin?: float;
    MaxArcSpin?: float;
    DelayBetweenEffects?: float;
    MinFlickerOnDuration?: float;
    MaxFlickerOnDuration?: float;
    MinFlickerOffDuration?: float;
    MaxFlickerOffDuration?: float;
    PulseSpeed?: float;
    PulseOnLength?: float;
    PulseFadeLength?: float;
    Alpha?: byte;
    Red?: byte;
    Green?: byte;
    Blue?: byte;
    BlendMode?: byte;
    Combo?: string;
    RenderLayer?: int;
    TextureLength?: float;
    WavePhase?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellChainEffectsQuery = {
    ID?: Relation<int>;
    AvgSegLen?: Relation<float>;
    Width?: Relation<float>;
    NoiseScale?: Relation<float>;
    TexCoordScale?: Relation<float>;
    SegDuration?: Relation<int>;
    SegDelay?: Relation<int>;
    Texture?: Relation<string>;
    Flags?: Relation<int>;
    JointCount?: Relation<int>;
    JointOffsetRadius?: Relation<float>;
    JointsPerMinorJoint?: Relation<int>;
    MinorJointsPerMajorJoint?: Relation<int>;
    MinorJointScale?: Relation<float>;
    MajorJointScale?: Relation<float>;
    JointMoveSpeed?: Relation<float>;
    JointSmoothness?: Relation<float>;
    MinDurationBetweenJointJumps?: Relation<float>;
    MaxDurationBetweenJointJumps?: Relation<float>;
    WaveHeight?: Relation<float>;
    WaveFreq?: Relation<float>;
    WaveSpeed?: Relation<float>;
    MinWaveAngle?: Relation<float>;
    MaxWaveAngle?: Relation<float>;
    MinWaveSpin?: Relation<float>;
    MaxWaveSpin?: Relation<float>;
    ArcHeight?: Relation<float>;
    MinArcAngle?: Relation<float>;
    MaxArcAngle?: Relation<float>;
    MinArcSpin?: Relation<float>;
    MaxArcSpin?: Relation<float>;
    DelayBetweenEffects?: Relation<float>;
    MinFlickerOnDuration?: Relation<float>;
    MaxFlickerOnDuration?: Relation<float>;
    MinFlickerOffDuration?: Relation<float>;
    MaxFlickerOffDuration?: Relation<float>;
    PulseSpeed?: Relation<float>;
    PulseOnLength?: Relation<float>;
    PulseFadeLength?: Relation<float>;
    Alpha?: Relation<byte>;
    Red?: Relation<byte>;
    Green?: Relation<byte>;
    Blue?: Relation<byte>;
    BlendMode?: Relation<byte>;
    Combo?: Relation<string>;
    RenderLayer?: Relation<int>;
    TextureLength?: Relation<float>;
    WavePhase?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellChainEffectsDBCFile extends DBCFile<SpellChainEffectsCreator, SpellChainEffectsQuery, SpellChainEffectsRow> {
    constructor();
    /** Loads a new SpellChainEffects.dbc from a file. */
    static read(path: string): SpellChainEffectsDBCFile;
    add(ID: int, c?: SpellChainEffectsCreator): SpellChainEffectsRow;
    findById(id: number): SpellChainEffectsRow;
}
