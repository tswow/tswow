import { char, int, text, timestamp, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class updatesRow extends SqlRow<updatesCreator, updatesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get name(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get hash(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get state(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get timestamp(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get speed(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(name: varchar, c?: updatesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type updatesCreator = {
    name?: varchar;
    hash?: char;
    state?: text;
    timestamp?: timestamp;
    speed?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type updatesQuery = {
    name?: Relation<varchar>;
    hash?: Relation<char>;
    state?: Relation<text>;
    timestamp?: Relation<timestamp>;
    speed?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class updatesTable extends SqlTable<updatesCreator, updatesQuery, updatesRow> {
    add(name: varchar, c?: updatesCreator): updatesRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_updates: updatesTable;
