import { float, int, uint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCMultiArrayCell, DBCUIntCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualKitRow extends DBCRow<SpellVisualKitCreator, SpellVisualKitQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get StartAnimID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AnimID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HeadEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ChestEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BaseEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LeftHandEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RightHandEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BreathEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LeftWeaponEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RightWeaponEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpecialEffect(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get WorldEffect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ShakeID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CharProc(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get CharParamZero(): DBCMultiArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get CharParamOne(): DBCMultiArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get CharParamTwo(): DBCMultiArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get CharParamThree(): DBCMultiArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCUIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellVisualKitCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellVisualKitCreator = {
    StartAnimID?: int;
    AnimID?: int;
    HeadEffect?: int;
    ChestEffect?: int;
    BaseEffect?: int;
    LeftHandEffect?: int;
    RightHandEffect?: int;
    BreathEffect?: int;
    LeftWeaponEffect?: int;
    RightWeaponEffect?: int;
    SpecialEffect?: int[];
    WorldEffect?: int;
    SoundID?: int;
    ShakeID?: int;
    CharProc?: int[];
    CharParamZero?: float[];
    CharParamOne?: float[];
    CharParamTwo?: float[];
    CharParamThree?: float[];
    Flags?: uint;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellVisualKitQuery = {
    ID?: Relation<int>;
    StartAnimID?: Relation<int>;
    AnimID?: Relation<int>;
    HeadEffect?: Relation<int>;
    ChestEffect?: Relation<int>;
    BaseEffect?: Relation<int>;
    LeftHandEffect?: Relation<int>;
    RightHandEffect?: Relation<int>;
    BreathEffect?: Relation<int>;
    LeftWeaponEffect?: Relation<int>;
    RightWeaponEffect?: Relation<int>;
    SpecialEffect?: Relation<int>;
    WorldEffect?: Relation<int>;
    SoundID?: Relation<int>;
    ShakeID?: Relation<int>;
    CharProc?: Relation<int>;
    CharParamZero?: Relation<float>;
    CharParamOne?: Relation<float>;
    CharParamTwo?: Relation<float>;
    CharParamThree?: Relation<float>;
    Flags?: Relation<uint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellVisualKitDBCFile extends DBCFile<SpellVisualKitCreator, SpellVisualKitQuery, SpellVisualKitRow> {
    constructor();
    /** Loads a new SpellVisualKit.dbc from a file. */
    static read(path: string): SpellVisualKitDBCFile;
    add(ID: int, c?: SpellVisualKitCreator): SpellVisualKitRow;
    findById(id: number): SpellVisualKitRow;
}
