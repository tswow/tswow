import { float, mediumint, smallint, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class points_of_interestRow extends SqlRow<points_of_interestCreator, points_of_interestQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get PositionX(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PositionY(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Icon(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Importance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: points_of_interestCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type points_of_interestCreator = {
    ID?: mediumint;
    PositionX?: float;
    PositionY?: float;
    Icon?: mediumint;
    Flags?: mediumint;
    Importance?: mediumint;
    Name?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type points_of_interestQuery = {
    ID?: Relation<mediumint>;
    PositionX?: Relation<float>;
    PositionY?: Relation<float>;
    Icon?: Relation<mediumint>;
    Flags?: Relation<mediumint>;
    Importance?: Relation<mediumint>;
    Name?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class points_of_interestTable extends SqlTable<points_of_interestCreator, points_of_interestQuery, points_of_interestRow> {
    add(ID: mediumint, c?: points_of_interestCreator): points_of_interestRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_points_of_interest: points_of_interestTable;
