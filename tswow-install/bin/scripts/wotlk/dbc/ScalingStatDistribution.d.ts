import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ScalingStatDistributionRow extends DBCRow<ScalingStatDistributionCreator, ScalingStatDistributionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get StatID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Bonus(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Maxlevel(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ScalingStatDistributionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ScalingStatDistributionCreator = {
    StatID?: int[];
    Bonus?: int[];
    Maxlevel?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ScalingStatDistributionQuery = {
    ID?: Relation<int>;
    StatID?: Relation<int>;
    Bonus?: Relation<int>;
    Maxlevel?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ScalingStatDistributionDBCFile extends DBCFile<ScalingStatDistributionCreator, ScalingStatDistributionQuery, ScalingStatDistributionRow> {
    constructor();
    /** Loads a new ScalingStatDistribution.dbc from a file. */
    static read(path: string): ScalingStatDistributionDBCFile;
    add(ID: int, c?: ScalingStatDistributionCreator): ScalingStatDistributionRow;
    findById(id: number): ScalingStatDistributionRow;
}
