import { char, int, mediumint, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class transportsRow extends SqlRow<transportsCreator, transportsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get entry(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: int, c?: transportsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type transportsCreator = {
    guid?: int;
    entry?: mediumint;
    name?: text;
    ScriptName?: char;
};
/**
 * Used for object queries (Don't comment these)
 */
export type transportsQuery = {
    guid?: Relation<int>;
    entry?: Relation<mediumint>;
    name?: Relation<text>;
    ScriptName?: Relation<char>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class transportsTable extends SqlTable<transportsCreator, transportsQuery, transportsRow> {
    add(guid: int, c?: transportsCreator): transportsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_transports: transportsTable;
