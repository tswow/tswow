import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundEntriesAdvancedRow extends DBCRow<SoundEntriesAdvancedCreator, SoundEntriesAdvancedQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundEntryID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get InnerRadius2D(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeA(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeB(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeC(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeD(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RandomOffsetRange(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Usage(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeintervalMin(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeintervalMax(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VolumeSliderCategory(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DuckToSFX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DuckToMusic(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DuckToAmbience(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get InnerRadiusOfInfluence(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OuterRadiusOfInfluence(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeToDuck(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeToUnduck(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get InsideAngle(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OutsideAngle(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OutsideVolume(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OuterRadius2D(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundEntriesAdvancedCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundEntriesAdvancedCreator = {
    SoundEntryID?: int;
    InnerRadius2D?: float;
    TimeA?: int;
    TimeB?: int;
    TimeC?: int;
    TimeD?: int;
    RandomOffsetRange?: int;
    Usage?: int;
    TimeintervalMin?: int;
    TimeintervalMax?: int;
    VolumeSliderCategory?: int;
    DuckToSFX?: float;
    DuckToMusic?: float;
    DuckToAmbience?: float;
    InnerRadiusOfInfluence?: float;
    OuterRadiusOfInfluence?: float;
    TimeToDuck?: int;
    TimeToUnduck?: int;
    InsideAngle?: float;
    OutsideAngle?: float;
    OutsideVolume?: float;
    OuterRadius2D?: float;
    Name?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundEntriesAdvancedQuery = {
    ID?: Relation<int>;
    SoundEntryID?: Relation<int>;
    InnerRadius2D?: Relation<float>;
    TimeA?: Relation<int>;
    TimeB?: Relation<int>;
    TimeC?: Relation<int>;
    TimeD?: Relation<int>;
    RandomOffsetRange?: Relation<int>;
    Usage?: Relation<int>;
    TimeintervalMin?: Relation<int>;
    TimeintervalMax?: Relation<int>;
    VolumeSliderCategory?: Relation<int>;
    DuckToSFX?: Relation<float>;
    DuckToMusic?: Relation<float>;
    DuckToAmbience?: Relation<float>;
    InnerRadiusOfInfluence?: Relation<float>;
    OuterRadiusOfInfluence?: Relation<float>;
    TimeToDuck?: Relation<int>;
    TimeToUnduck?: Relation<int>;
    InsideAngle?: Relation<float>;
    OutsideAngle?: Relation<float>;
    OutsideVolume?: Relation<float>;
    OuterRadius2D?: Relation<float>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundEntriesAdvancedDBCFile extends DBCFile<SoundEntriesAdvancedCreator, SoundEntriesAdvancedQuery, SoundEntriesAdvancedRow> {
    constructor();
    /** Loads a new SoundEntriesAdvanced.dbc from a file. */
    static read(path: string): SoundEntriesAdvancedDBCFile;
    add(ID: int, c?: SoundEntriesAdvancedCreator): SoundEntriesAdvancedRow;
    findById(id: number): SoundEntriesAdvancedRow;
}
