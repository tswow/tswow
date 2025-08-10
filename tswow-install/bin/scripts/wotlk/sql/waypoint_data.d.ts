import { float, int, mediumint, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class waypoint_dataRow extends SqlRow<waypoint_dataCreator, waypoint_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get id(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get point(): SQLCellReadOnly<number, this>;
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
    get move_type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get wpguid(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id: int, point: mediumint, c?: waypoint_dataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type waypoint_dataCreator = {
    id?: int;
    point?: mediumint;
    position_x?: float;
    position_y?: float;
    position_z?: float;
    orientation?: float;
    delay?: int;
    move_type?: int;
    action?: int;
    action_chance?: smallint;
    wpguid?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type waypoint_dataQuery = {
    id?: Relation<int>;
    point?: Relation<mediumint>;
    position_x?: Relation<float>;
    position_y?: Relation<float>;
    position_z?: Relation<float>;
    orientation?: Relation<float>;
    delay?: Relation<int>;
    move_type?: Relation<int>;
    action?: Relation<int>;
    action_chance?: Relation<smallint>;
    wpguid?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class waypoint_dataTable extends SqlTable<waypoint_dataCreator, waypoint_dataQuery, waypoint_dataRow> {
    add(id: int, point: mediumint, c?: waypoint_dataCreator): waypoint_dataRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_waypoint_data: waypoint_dataTable;
