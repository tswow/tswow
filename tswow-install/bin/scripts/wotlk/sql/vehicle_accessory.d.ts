import { int, mediumint, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class vehicle_accessoryRow extends SqlRow<vehicle_accessoryCreator, vehicle_accessoryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get accessory_entry(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get seat_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get minion(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get summontype(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get summontimer(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: mediumint, seat_id: tinyint, c?: vehicle_accessoryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type vehicle_accessoryCreator = {
    guid?: mediumint;
    accessory_entry?: mediumint;
    seat_id?: tinyint;
    minion?: tinyint;
    description?: text;
    summontype?: tinyint;
    summontimer?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type vehicle_accessoryQuery = {
    guid?: Relation<mediumint>;
    accessory_entry?: Relation<mediumint>;
    seat_id?: Relation<tinyint>;
    minion?: Relation<tinyint>;
    description?: Relation<text>;
    summontype?: Relation<tinyint>;
    summontimer?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class vehicle_accessoryTable extends SqlTable<vehicle_accessoryCreator, vehicle_accessoryQuery, vehicle_accessoryRow> {
    add(guid: mediumint, seat_id: tinyint, c?: vehicle_accessoryCreator): vehicle_accessoryRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_vehicle_accessory: vehicle_accessoryTable;
