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
export declare class script_waypointRow extends SqlRow<script_waypointCreator, script_waypointQuery> {
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
    get location_x(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get location_y(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get location_z(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get waittime(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get point_comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, pointid: mediumint, c?: script_waypointCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type script_waypointCreator = {
    entry?: mediumint;
    pointid?: mediumint;
    location_x?: float;
    location_y?: float;
    location_z?: float;
    waittime?: int;
    point_comment?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type script_waypointQuery = {
    entry?: Relation<mediumint>;
    pointid?: Relation<mediumint>;
    location_x?: Relation<float>;
    location_y?: Relation<float>;
    location_z?: Relation<float>;
    waittime?: Relation<int>;
    point_comment?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class script_waypointTable extends SqlTable<script_waypointCreator, script_waypointQuery, script_waypointRow> {
    add(entry: mediumint, pointid: mediumint, c?: script_waypointCreator): script_waypointRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_script_waypoint: script_waypointTable;
