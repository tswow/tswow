import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class GameObjectDisplayInfoRow extends DBCRow<GameObjectDisplayInfoCreator, GameObjectDisplayInfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ModelName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Sound(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMinX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMinY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMinZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMaxX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMaxY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get GeoBoxMaxZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ObjectEffectPackageID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GameObjectDisplayInfoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GameObjectDisplayInfoCreator = {
    ModelName?: string;
    Sound?: int[];
    GeoBoxMinX?: float;
    GeoBoxMinY?: float;
    GeoBoxMinZ?: float;
    GeoBoxMaxX?: float;
    GeoBoxMaxY?: float;
    GeoBoxMaxZ?: float;
    ObjectEffectPackageID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type GameObjectDisplayInfoQuery = {
    ID?: Relation<int>;
    ModelName?: Relation<string>;
    Sound?: Relation<int>;
    GeoBoxMinX?: Relation<float>;
    GeoBoxMinY?: Relation<float>;
    GeoBoxMinZ?: Relation<float>;
    GeoBoxMaxX?: Relation<float>;
    GeoBoxMaxY?: Relation<float>;
    GeoBoxMaxZ?: Relation<float>;
    ObjectEffectPackageID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GameObjectDisplayInfoDBCFile extends DBCFile<GameObjectDisplayInfoCreator, GameObjectDisplayInfoQuery, GameObjectDisplayInfoRow> {
    constructor();
    /** Loads a new GameObjectDisplayInfo.dbc from a file. */
    static read(path: string): GameObjectDisplayInfoDBCFile;
    add(ID: int, c?: GameObjectDisplayInfoCreator): GameObjectDisplayInfoRow;
    findById(id: number): GameObjectDisplayInfoRow;
}
