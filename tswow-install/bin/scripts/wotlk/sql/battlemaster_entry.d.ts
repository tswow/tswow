import { mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class battlemaster_entryRow extends SqlRow<battlemaster_entryCreator, battlemaster_entryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get bg_template(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: battlemaster_entryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type battlemaster_entryCreator = {
    entry?: mediumint;
    bg_template?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type battlemaster_entryQuery = {
    entry?: Relation<mediumint>;
    bg_template?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class battlemaster_entryTable extends SqlTable<battlemaster_entryCreator, battlemaster_entryQuery, battlemaster_entryRow> {
    add(entry: mediumint, c?: battlemaster_entryCreator): battlemaster_entryRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_battlemaster_entry: battlemaster_entryTable;
