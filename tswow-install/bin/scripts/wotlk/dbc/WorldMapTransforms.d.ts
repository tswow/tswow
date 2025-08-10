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
export declare class WorldMapTransformsRow extends DBCRow<WorldMapTransformsCreator, WorldMapTransformsQuery> {
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
    get RegionMinX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RegionMinY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RegionMaxX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RegionMaxY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get NewMapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RegionOffsetX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RegionOffsetY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get NewDungeonMapID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WorldMapTransformsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WorldMapTransformsCreator = {
    MapID?: int;
    RegionMinX?: float;
    RegionMinY?: float;
    RegionMaxX?: float;
    RegionMaxY?: float;
    NewMapID?: int;
    RegionOffsetX?: float;
    RegionOffsetY?: float;
    NewDungeonMapID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type WorldMapTransformsQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    RegionMinX?: Relation<float>;
    RegionMinY?: Relation<float>;
    RegionMaxX?: Relation<float>;
    RegionMaxY?: Relation<float>;
    NewMapID?: Relation<int>;
    RegionOffsetX?: Relation<float>;
    RegionOffsetY?: Relation<float>;
    NewDungeonMapID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldMapTransformsDBCFile extends DBCFile<WorldMapTransformsCreator, WorldMapTransformsQuery, WorldMapTransformsRow> {
    constructor();
    /** Loads a new WorldMapTransforms.dbc from a file. */
    static read(path: string): WorldMapTransformsDBCFile;
    add(ID: int, c?: WorldMapTransformsCreator): WorldMapTransformsRow;
    findById(id: number): WorldMapTransformsRow;
}
