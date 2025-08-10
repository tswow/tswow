import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualRow extends DBCRow<SpellVisualCreator, SpellVisualQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get PrecastKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CastKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ImpactKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get StateKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get StateDoneKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ChannelKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HasMissile(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileModel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissilePathType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileDestinationAttachment(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileSound(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AnimEventSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CasterImpactKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TargetImpactKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileAttachment(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileFollowGroundHeight(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileFollowGroundDropSpeed(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileFollowGroundApproach(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileFollowGroundFlags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileMotion(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileTargetingKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get InstantAreaKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ImpactAreaKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PersistentAreaKit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileCastOffsetX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileCastOffsetY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileCastOffsetZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileImpactOffsetX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileImpactOffsetY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MissileImpactOffsetZ(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellVisualCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualCreator = {
    PrecastKit?: int;
    CastKit?: int;
    ImpactKit?: int;
    StateKit?: int;
    StateDoneKit?: int;
    ChannelKit?: int;
    HasMissile?: int;
    MissileModel?: int;
    MissilePathType?: int;
    MissileDestinationAttachment?: int;
    MissileSound?: int;
    AnimEventSoundID?: int;
    Flags?: int;
    CasterImpactKit?: int;
    TargetImpactKit?: int;
    MissileAttachment?: int;
    MissileFollowGroundHeight?: int;
    MissileFollowGroundDropSpeed?: int;
    MissileFollowGroundApproach?: int;
    MissileFollowGroundFlags?: int;
    MissileMotion?: int;
    MissileTargetingKit?: int;
    InstantAreaKit?: int;
    ImpactAreaKit?: int;
    PersistentAreaKit?: int;
    MissileCastOffsetX?: float;
    MissileCastOffsetY?: float;
    MissileCastOffsetZ?: float;
    MissileImpactOffsetX?: float;
    MissileImpactOffsetY?: float;
    MissileImpactOffsetZ?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualQuery = {
    ID?: Relation<int>;
    PrecastKit?: Relation<int>;
    CastKit?: Relation<int>;
    ImpactKit?: Relation<int>;
    StateKit?: Relation<int>;
    StateDoneKit?: Relation<int>;
    ChannelKit?: Relation<int>;
    HasMissile?: Relation<int>;
    MissileModel?: Relation<int>;
    MissilePathType?: Relation<int>;
    MissileDestinationAttachment?: Relation<int>;
    MissileSound?: Relation<int>;
    AnimEventSoundID?: Relation<int>;
    Flags?: Relation<int>;
    CasterImpactKit?: Relation<int>;
    TargetImpactKit?: Relation<int>;
    MissileAttachment?: Relation<int>;
    MissileFollowGroundHeight?: Relation<int>;
    MissileFollowGroundDropSpeed?: Relation<int>;
    MissileFollowGroundApproach?: Relation<int>;
    MissileFollowGroundFlags?: Relation<int>;
    MissileMotion?: Relation<int>;
    MissileTargetingKit?: Relation<int>;
    InstantAreaKit?: Relation<int>;
    ImpactAreaKit?: Relation<int>;
    PersistentAreaKit?: Relation<int>;
    MissileCastOffsetX?: Relation<float>;
    MissileCastOffsetY?: Relation<float>;
    MissileCastOffsetZ?: Relation<float>;
    MissileImpactOffsetX?: Relation<float>;
    MissileImpactOffsetY?: Relation<float>;
    MissileImpactOffsetZ?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualDBCFile extends DBCFile<SpellVisualCreator, SpellVisualQuery, SpellVisualRow> {
    constructor();
    /** Loads a new SpellVisual.dbc from a file. */
    static read(path: string): SpellVisualDBCFile;
    add(ID: int, c?: SpellVisualCreator): SpellVisualRow;
    findById(id: number): SpellVisualRow;
}
