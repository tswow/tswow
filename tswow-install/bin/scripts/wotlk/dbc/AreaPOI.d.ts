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
export declare class AreaPOIRow extends DBCRow<AreaPOICreator, AreaPOIQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Importance(): DBCIntCell<this>;
    /**
     * Normal,Normal50%,Normal0%,Horde,Horde50%,Horde0%,Alliance,Alliance50%,Alliance0%
     */
    get Icon(): DBCIntArrayCell<this>;
    /**
     * What faction this poi belongs to
     */
    get FactionID(): DBCIntCell<this>;
    /**
     * Global x coordinate
     */
    get X(): DBCFloatCell<this>;
    /**
     * Global y coordinate
     */
    get Y(): DBCFloatCell<this>;
    /**
     * Global z coordinate
     */
    get Z(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * 4=zone,128=BG,512=showInBattle
     */
    get Flags(): DBCFlagCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaID(): DBCPointerCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get WorldStateID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WorldMapLink(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: AreaPOICreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type AreaPOICreator = {
    Importance?: int;
    Icon?: int[];
    FactionID?: int;
    X?: float;
    Y?: float;
    Z?: float;
    MapID?: int;
    Flags?: uint;
    AreaID?: uint;
    Name?: loc_constructor;
    Description?: loc_constructor;
    WorldStateID?: int;
    WorldMapLink?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type AreaPOIQuery = {
    ID?: Relation<int>;
    Importance?: Relation<int>;
    Icon?: Relation<int>;
    FactionID?: Relation<int>;
    X?: Relation<float>;
    Y?: Relation<float>;
    Z?: Relation<float>;
    MapID?: Relation<int>;
    Flags?: Relation<number>;
    AreaID?: Relation<number>;
    Name?: Relation<string>;
    Description?: Relation<string>;
    WorldStateID?: Relation<int>;
    WorldMapLink?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class AreaPOIDBCFile extends DBCFile<AreaPOICreator, AreaPOIQuery, AreaPOIRow> {
    constructor();
    /** Loads a new AreaPOI.dbc from a file. */
    static read(path: string): AreaPOIDBCFile;
    add(ID: int, c?: AreaPOICreator): AreaPOIRow;
}
