import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureSoundDataRow extends DBCRow<CreatureSoundDataCreator, CreatureSoundDataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundExertionID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundExertionCriticalID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundInjuryID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundInjuryCriticalID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundInjuryCrushingBlowID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundDeathID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundStunID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundStandID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundFootstepID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundAggroID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundWingFlapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundWingGlideID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundAlertID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundFidget(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get CustomAttack(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get NPCSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LoopSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureImpactType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundJumpStartID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundJumpEndID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundPetAttackID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundPetOrderID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundPetDismissID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FidgetDelaySecondsMin(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FidgetDelaySecondsMax(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get BirthSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellCastDirectedSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SubmergeSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SubmergedSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureSoundDataIDPet(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CreatureSoundDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CreatureSoundDataCreator = {
    SoundExertionID?: int;
    SoundExertionCriticalID?: int;
    SoundInjuryID?: int;
    SoundInjuryCriticalID?: int;
    SoundInjuryCrushingBlowID?: int;
    SoundDeathID?: int;
    SoundStunID?: int;
    SoundStandID?: int;
    SoundFootstepID?: int;
    SoundAggroID?: int;
    SoundWingFlapID?: int;
    SoundWingGlideID?: int;
    SoundAlertID?: int;
    SoundFidget?: int[];
    CustomAttack?: int[];
    NPCSoundID?: int;
    LoopSoundID?: int;
    CreatureImpactType?: int;
    SoundJumpStartID?: int;
    SoundJumpEndID?: int;
    SoundPetAttackID?: int;
    SoundPetOrderID?: int;
    SoundPetDismissID?: int;
    FidgetDelaySecondsMin?: float;
    FidgetDelaySecondsMax?: float;
    BirthSoundID?: int;
    SpellCastDirectedSoundID?: int;
    SubmergeSoundID?: int;
    SubmergedSoundID?: int;
    CreatureSoundDataIDPet?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type CreatureSoundDataQuery = {
    ID?: Relation<int>;
    SoundExertionID?: Relation<int>;
    SoundExertionCriticalID?: Relation<int>;
    SoundInjuryID?: Relation<int>;
    SoundInjuryCriticalID?: Relation<int>;
    SoundInjuryCrushingBlowID?: Relation<int>;
    SoundDeathID?: Relation<int>;
    SoundStunID?: Relation<int>;
    SoundStandID?: Relation<int>;
    SoundFootstepID?: Relation<int>;
    SoundAggroID?: Relation<int>;
    SoundWingFlapID?: Relation<int>;
    SoundWingGlideID?: Relation<int>;
    SoundAlertID?: Relation<int>;
    SoundFidget?: Relation<int>;
    CustomAttack?: Relation<int>;
    NPCSoundID?: Relation<int>;
    LoopSoundID?: Relation<int>;
    CreatureImpactType?: Relation<int>;
    SoundJumpStartID?: Relation<int>;
    SoundJumpEndID?: Relation<int>;
    SoundPetAttackID?: Relation<int>;
    SoundPetOrderID?: Relation<int>;
    SoundPetDismissID?: Relation<int>;
    FidgetDelaySecondsMin?: Relation<float>;
    FidgetDelaySecondsMax?: Relation<float>;
    BirthSoundID?: Relation<int>;
    SpellCastDirectedSoundID?: Relation<int>;
    SubmergeSoundID?: Relation<int>;
    SubmergedSoundID?: Relation<int>;
    CreatureSoundDataIDPet?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureSoundDataDBCFile extends DBCFile<CreatureSoundDataCreator, CreatureSoundDataQuery, CreatureSoundDataRow> {
    constructor();
    /** Loads a new CreatureSoundData.dbc from a file. */
    static read(path: string): CreatureSoundDataDBCFile;
    add(ID: int, c?: CreatureSoundDataCreator): CreatureSoundDataRow;
    findById(id: number): CreatureSoundDataRow;
}
