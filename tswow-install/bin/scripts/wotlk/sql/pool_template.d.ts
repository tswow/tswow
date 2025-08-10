import { int, mediumint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class pool_templateRow extends SqlRow<pool_templateCreator, pool_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get max_limit(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: pool_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type pool_templateCreator = {
    entry?: mediumint;
    max_limit?: int;
    description?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type pool_templateQuery = {
    entry?: Relation<mediumint>;
    max_limit?: Relation<int>;
    description?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class pool_templateTable extends SqlTable<pool_templateCreator, pool_templateQuery, pool_templateRow> {
    add(entry: mediumint, c?: pool_templateCreator): pool_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_pool_template: pool_templateTable;
