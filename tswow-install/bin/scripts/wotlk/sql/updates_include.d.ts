import { text, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class updates_includeRow extends SqlRow<updates_includeCreator, updates_includeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get path(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get state(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(path: varchar, c?: updates_includeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type updates_includeCreator = {
    path?: varchar;
    state?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type updates_includeQuery = {
    path?: Relation<varchar>;
    state?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class updates_includeTable extends SqlTable<updates_includeCreator, updates_includeQuery, updates_includeRow> {
    add(path: varchar, c?: updates_includeCreator): updates_includeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_updates_include: updates_includeTable;
