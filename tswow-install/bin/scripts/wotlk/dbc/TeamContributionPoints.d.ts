import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class TeamContributionPointsRow extends DBCRow<TeamContributionPointsCreator, TeamContributionPointsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Data(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TeamContributionPointsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TeamContributionPointsCreator = {
    Data?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type TeamContributionPointsQuery = {
    ID?: Relation<int>;
    Data?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TeamContributionPointsDBCFile extends DBCFile<TeamContributionPointsCreator, TeamContributionPointsQuery, TeamContributionPointsRow> {
    constructor();
    /** Loads a new TeamContributionPoints.dbc from a file. */
    static read(path: string): TeamContributionPointsDBCFile;
    add(ID: int, c?: TeamContributionPointsCreator): TeamContributionPointsRow;
    findById(id: number): TeamContributionPointsRow;
}
