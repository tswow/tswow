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
export declare class DungeonMapRow extends DBCRow<DungeonMapCreator, DungeonMapQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FloorIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MinY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ParentWorldMapID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DungeonMapCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DungeonMapCreator = {
    MapID?: int;
    FloorIndex?: int;
    MinX?: float;
    MaxX?: float;
    MinY?: float;
    MaxY?: float;
    ParentWorldMapID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type DungeonMapQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    FloorIndex?: Relation<int>;
    MinX?: Relation<float>;
    MaxX?: Relation<float>;
    MinY?: Relation<float>;
    MaxY?: Relation<float>;
    ParentWorldMapID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DungeonMapDBCFile extends DBCFile<DungeonMapCreator, DungeonMapQuery, DungeonMapRow> {
    constructor();
    /** Loads a new DungeonMap.dbc from a file. */
    static read(path: string): DungeonMapDBCFile;
    add(ID: int, c?: DungeonMapCreator): DungeonMapRow;
}
