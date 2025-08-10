import { float, int, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class script_spline_chain_waypointsRow extends SqlRow<script_spline_chain_waypointsCreator, script_spline_chain_waypointsQuery> {
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
    get chainId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get splineId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get wpId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get x(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get y(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get z(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: int, chainId: smallint, splineId: tinyint, wpId: tinyint, c?: script_spline_chain_waypointsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type script_spline_chain_waypointsCreator = {
    entry?: int;
    chainId?: smallint;
    splineId?: tinyint;
    wpId?: tinyint;
    x?: float;
    y?: float;
    z?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type script_spline_chain_waypointsQuery = {
    entry?: Relation<int>;
    chainId?: Relation<smallint>;
    splineId?: Relation<tinyint>;
    wpId?: Relation<tinyint>;
    x?: Relation<float>;
    y?: Relation<float>;
    z?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class script_spline_chain_waypointsTable extends SqlTable<script_spline_chain_waypointsCreator, script_spline_chain_waypointsQuery, script_spline_chain_waypointsRow> {
    add(entry: int, chainId: smallint, splineId: tinyint, wpId: tinyint, c?: script_spline_chain_waypointsCreator): script_spline_chain_waypointsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_script_spline_chain_waypoints: script_spline_chain_waypointsTable;
