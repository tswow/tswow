import { int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class holiday_datesRow extends SqlRow<holiday_datesCreator, holiday_datesQuery> {
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
    get date_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get date_value(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get holiday_duration(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id: int, date_id: tinyint, c?: holiday_datesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type holiday_datesCreator = {
    id?: int;
    date_id?: tinyint;
    date_value?: int;
    holiday_duration?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type holiday_datesQuery = {
    id?: Relation<int>;
    date_id?: Relation<tinyint>;
    date_value?: Relation<int>;
    holiday_duration?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class holiday_datesTable extends SqlTable<holiday_datesCreator, holiday_datesQuery, holiday_datesRow> {
    add(id: int, date_id: tinyint, c?: holiday_datesCreator): holiday_datesRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_holiday_dates: holiday_datesTable;
