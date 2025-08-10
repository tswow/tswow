import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class WMOAreaTableRow extends DBCRow<WMOAreaTableCreator, WMOAreaTableQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get WMOID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get NameSetID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WMOGroupID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundProviderPref(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundProviderPrefUnderwater(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AmbienceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ZoneMusic(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get IntroSound(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaTableID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaName(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WMOAreaTableCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WMOAreaTableCreator = {
    WMOID?: int;
    NameSetID?: int;
    WMOGroupID?: int;
    SoundProviderPref?: int;
    SoundProviderPrefUnderwater?: int;
    AmbienceID?: int;
    ZoneMusic?: int;
    IntroSound?: int;
    Flags?: int;
    AreaTableID?: int;
    AreaName?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type WMOAreaTableQuery = {
    ID?: Relation<int>;
    WMOID?: Relation<int>;
    NameSetID?: Relation<int>;
    WMOGroupID?: Relation<int>;
    SoundProviderPref?: Relation<int>;
    SoundProviderPrefUnderwater?: Relation<int>;
    AmbienceID?: Relation<int>;
    ZoneMusic?: Relation<int>;
    IntroSound?: Relation<int>;
    Flags?: Relation<int>;
    AreaTableID?: Relation<int>;
    AreaName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WMOAreaTableDBCFile extends DBCFile<WMOAreaTableCreator, WMOAreaTableQuery, WMOAreaTableRow> {
    constructor();
    /** Loads a new WMOAreaTable.dbc from a file. */
    static read(path: string): WMOAreaTableDBCFile;
    add(ID: int, c?: WMOAreaTableCreator): WMOAreaTableRow;
}
