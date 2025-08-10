import { int, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class versionRow extends SqlRow<versionCreator, versionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get core_version(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get core_revision(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get db_version(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get cache_id(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(core_version: varchar, c?: versionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type versionCreator = {
    core_version?: varchar;
    core_revision?: varchar;
    db_version?: varchar;
    cache_id?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type versionQuery = {
    core_version?: Relation<varchar>;
    core_revision?: Relation<varchar>;
    db_version?: Relation<varchar>;
    cache_id?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class versionTable extends SqlTable<versionCreator, versionQuery, versionRow> {
    add(core_version: varchar, c?: versionCreator): versionRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_version: versionTable;
