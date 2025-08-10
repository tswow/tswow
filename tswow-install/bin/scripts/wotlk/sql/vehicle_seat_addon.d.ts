import { float, int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class vehicle_seat_addonRow extends SqlRow<vehicle_seat_addonCreator, vehicle_seat_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SeatEntry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get SeatOrientation(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ExitParamX(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ExitParamY(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ExitParamZ(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ExitParamO(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ExitParamValue(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(SeatEntry: int, c?: vehicle_seat_addonCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type vehicle_seat_addonCreator = {
    SeatEntry?: int;
    SeatOrientation?: float;
    ExitParamX?: float;
    ExitParamY?: float;
    ExitParamZ?: float;
    ExitParamO?: float;
    ExitParamValue?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type vehicle_seat_addonQuery = {
    SeatEntry?: Relation<int>;
    SeatOrientation?: Relation<float>;
    ExitParamX?: Relation<float>;
    ExitParamY?: Relation<float>;
    ExitParamZ?: Relation<float>;
    ExitParamO?: Relation<float>;
    ExitParamValue?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class vehicle_seat_addonTable extends SqlTable<vehicle_seat_addonCreator, vehicle_seat_addonQuery, vehicle_seat_addonRow> {
    add(SeatEntry: int, c?: vehicle_seat_addonCreator): vehicle_seat_addonRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_vehicle_seat_addon: vehicle_seat_addonTable;
