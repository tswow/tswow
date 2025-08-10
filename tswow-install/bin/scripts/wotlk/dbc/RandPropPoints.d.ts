import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class RandPropPointsRow extends DBCRow<RandPropPointsCreator, RandPropPointsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Epic(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Superior(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Good(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: RandPropPointsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type RandPropPointsCreator = {
    Epic?: int[];
    Superior?: int[];
    Good?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type RandPropPointsQuery = {
    ID?: Relation<int>;
    Epic?: Relation<int>;
    Superior?: Relation<int>;
    Good?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class RandPropPointsDBCFile extends DBCFile<RandPropPointsCreator, RandPropPointsQuery, RandPropPointsRow> {
    constructor();
    /** Loads a new RandPropPoints.dbc from a file. */
    static read(path: string): RandPropPointsDBCFile;
    add(ID: int, c?: RandPropPointsCreator): RandPropPointsRow;
    findById(id: number): RandPropPointsRow;
}
