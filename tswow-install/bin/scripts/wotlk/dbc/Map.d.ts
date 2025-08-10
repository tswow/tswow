import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class MapRow extends DBCRow<MapCreator, MapQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Directory(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get InstanceType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PVP(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MapName(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaTableID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MapDescription0(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get MapDescription1(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get LoadingScreenID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinimapIconScale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CorpseMapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CorpseX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get CorpseY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeOfDayOverride(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ExpansionID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RaidOffset(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxPlayers(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: MapCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type MapCreator = {
    Directory?: string;
    InstanceType?: int;
    Flags?: int;
    PVP?: int;
    MapName?: loc_constructor;
    AreaTableID?: int;
    MapDescription0?: loc_constructor;
    MapDescription1?: loc_constructor;
    LoadingScreenID?: int;
    MinimapIconScale?: float;
    CorpseMapID?: int;
    CorpseX?: float;
    CorpseY?: float;
    TimeOfDayOverride?: int;
    ExpansionID?: int;
    RaidOffset?: int;
    MaxPlayers?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type MapQuery = {
    ID?: Relation<int>;
    Directory?: Relation<string>;
    InstanceType?: Relation<int>;
    Flags?: Relation<int>;
    PVP?: Relation<int>;
    MapName?: Relation<string>;
    AreaTableID?: Relation<int>;
    MapDescription0?: Relation<string>;
    MapDescription1?: Relation<string>;
    LoadingScreenID?: Relation<int>;
    MinimapIconScale?: Relation<float>;
    CorpseMapID?: Relation<int>;
    CorpseX?: Relation<float>;
    CorpseY?: Relation<float>;
    TimeOfDayOverride?: Relation<int>;
    ExpansionID?: Relation<int>;
    RaidOffset?: Relation<int>;
    MaxPlayers?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class MapDBCFile extends DBCFile<MapCreator, MapQuery, MapRow> {
    constructor();
    /** Loads a new Map.dbc from a file. */
    static read(path: string): MapDBCFile;
    add(ID: int, c?: MapCreator): MapRow;
    findById(id: number): MapRow;
}
