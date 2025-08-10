import { float, int, mediumint, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class waypointsRow extends SqlRow<waypointsCreator, waypointsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get pointid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get position_x(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get position_y(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get position_z(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get orientation(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get delay(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get point_comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, pointid: mediumint, c?: waypointsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type waypointsCreator = {
    entry?: mediumint;
    pointid?: mediumint;
    position_x?: float;
    position_y?: float;
    position_z?: float;
    orientation?: float;
    delay?: int;
    point_comment?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type waypointsQuery = {
    entry?: Relation<mediumint>;
    pointid?: Relation<mediumint>;
    position_x?: Relation<float>;
    position_y?: Relation<float>;
    position_z?: Relation<float>;
    orientation?: Relation<float>;
    delay?: Relation<int>;
    point_comment?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class waypointsTable extends SqlTable<waypointsCreator, waypointsQuery, waypointsRow> {
    add(entry: mediumint, pointid: mediumint, c?: waypointsCreator): waypointsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_waypoints: waypointsTable;
