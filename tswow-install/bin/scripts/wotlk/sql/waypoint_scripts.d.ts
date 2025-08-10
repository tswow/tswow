import { float, int, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class waypoint_scriptsRow extends SqlRow<waypoint_scriptsCreator, waypoint_scriptsQuery> {
    /**
     * No comment (yet!)
     */
    get id(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get delay(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get command(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get datalong(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get datalong2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dataint(): SQLCell<number, this>;
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
     * No comment (yet!)
     */
    get o(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: int, c?: waypoint_scriptsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type waypoint_scriptsCreator = {
    id?: int;
    delay?: int;
    command?: int;
    datalong?: int;
    datalong2?: int;
    dataint?: int;
    x?: float;
    y?: float;
    z?: float;
    o?: float;
    guid?: int;
    Comment?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type waypoint_scriptsQuery = {
    id?: Relation<int>;
    delay?: Relation<int>;
    command?: Relation<int>;
    datalong?: Relation<int>;
    datalong2?: Relation<int>;
    dataint?: Relation<int>;
    x?: Relation<float>;
    y?: Relation<float>;
    z?: Relation<float>;
    o?: Relation<float>;
    guid?: Relation<int>;
    Comment?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class waypoint_scriptsTable extends SqlTable<waypoint_scriptsCreator, waypoint_scriptsQuery, waypoint_scriptsRow> {
    add(guid: int, c?: waypoint_scriptsCreator): waypoint_scriptsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_waypoint_scripts: waypoint_scriptsTable;
