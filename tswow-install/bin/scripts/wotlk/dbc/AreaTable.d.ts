import { float, int, loc_constructor, uint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFlagCell, DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCPointerCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class AreaTableRow extends DBCRow<AreaTableCreator, AreaTableQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCPointerCell<this>;
    /**
     * No comment (yet!)
     */
    get ParentAreaID(): DBCPointerCell<this>;
    /**
     * Flag bit used to track if this Area has been discovered.
     */
    get ExploreFlag(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCFlagCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundProviderPref(): DBCPointerCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundProviderPrefUnderwater(): DBCPointerCell<this>;
    /**
     * No comment (yet!)
     */
    get AmbienceID(): DBCPointerCell<this>;
    /**
     * No comment (yet!)
     */
    get ZoneMusic(): DBCPointerCell<this>;
    /**
     * No comment (yet!)
     */
    get IntroSound(): DBCPointerCell<this>;
    /**
     * Decides the experience gained from exploring this area.
     */
    get ExplorationLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaName(): DBCLocCell<this>;
    /**
     * Faction that owns this area.
     */
    get FactionGroupMask(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LiquidTypeID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get MinElevation(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Ambient_Multiplier(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Lightid(): DBCPointerCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: AreaTableCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type AreaTableCreator = {
    MapID?: uint;
    ParentAreaID?: uint;
    ExploreFlag?: int;
    Flags?: uint;
    SoundProviderPref?: uint;
    SoundProviderPrefUnderwater?: uint;
    AmbienceID?: uint;
    ZoneMusic?: uint;
    IntroSound?: uint;
    ExplorationLevel?: int;
    AreaName?: loc_constructor;
    FactionGroupMask?: int;
    LiquidTypeID?: int[];
    MinElevation?: float;
    Ambient_Multiplier?: float;
    Lightid?: uint;
};
/**
 * Used for queries (Don't comment these)
 */
export type AreaTableQuery = {
    ID?: Relation<int>;
    MapID?: Relation<number>;
    ParentAreaID?: Relation<number>;
    ExploreFlag?: Relation<int>;
    Flags?: Relation<number>;
    SoundProviderPref?: Relation<number>;
    SoundProviderPrefUnderwater?: Relation<number>;
    AmbienceID?: Relation<number>;
    ZoneMusic?: Relation<number>;
    IntroSound?: Relation<number>;
    ExplorationLevel?: Relation<int>;
    AreaName?: Relation<string>;
    FactionGroupMask?: Relation<int>;
    LiquidTypeID?: Relation<int>;
    MinElevation?: Relation<float>;
    Ambient_Multiplier?: Relation<float>;
    Lightid?: Relation<number>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class AreaTableDBCFile extends DBCFile<AreaTableCreator, AreaTableQuery, AreaTableRow> {
    constructor();
    /** Loads a new AreaTable.dbc from a file. */
    static read(path: string): AreaTableDBCFile;
    add(ID: int, c?: AreaTableCreator): AreaTableRow;
    findById(id: number): AreaTableRow;
}
