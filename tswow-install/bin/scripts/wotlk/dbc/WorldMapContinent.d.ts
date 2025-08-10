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
export declare class WorldMapContinentRow extends DBCRow<WorldMapContinentCreator, WorldMapContinentQuery> {
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
    get LeftBoundary(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RightBoundary(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TopBoundary(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BottomBoundary(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ContinentOffsetX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get ContinentOffsetY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Scale(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get TaxiMinX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get TaxiMinY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get TaxiMaxX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get TaxiMaxY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get WorldMapID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WorldMapContinentCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WorldMapContinentCreator = {
    MapID?: int;
    LeftBoundary?: int;
    RightBoundary?: int;
    TopBoundary?: int;
    BottomBoundary?: int;
    ContinentOffsetX?: float;
    ContinentOffsetY?: float;
    Scale?: float;
    TaxiMinX?: float;
    TaxiMinY?: float;
    TaxiMaxX?: float;
    TaxiMaxY?: float;
    WorldMapID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type WorldMapContinentQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    LeftBoundary?: Relation<int>;
    RightBoundary?: Relation<int>;
    TopBoundary?: Relation<int>;
    BottomBoundary?: Relation<int>;
    ContinentOffsetX?: Relation<float>;
    ContinentOffsetY?: Relation<float>;
    Scale?: Relation<float>;
    TaxiMinX?: Relation<float>;
    TaxiMinY?: Relation<float>;
    TaxiMaxX?: Relation<float>;
    TaxiMaxY?: Relation<float>;
    WorldMapID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldMapContinentDBCFile extends DBCFile<WorldMapContinentCreator, WorldMapContinentQuery, WorldMapContinentRow> {
    constructor();
    /** Loads a new WorldMapContinent.dbc from a file. */
    static read(path: string): WorldMapContinentDBCFile;
    add(ID: int, c?: WorldMapContinentCreator): WorldMapContinentRow;
    findById(id: number): WorldMapContinentRow;
}
