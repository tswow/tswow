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
export declare class quest_pool_templateRow extends SqlRow<quest_pool_templateCreator, quest_pool_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get poolId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get numActive(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(poolId: mediumint, c?: quest_pool_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_pool_templateCreator = {
    poolId?: mediumint;
    numActive?: int;
    description?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_pool_templateQuery = {
    poolId?: Relation<mediumint>;
    numActive?: Relation<int>;
    description?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_pool_templateTable extends SqlTable<quest_pool_templateCreator, quest_pool_templateQuery, quest_pool_templateRow> {
    add(poolId: mediumint, c?: quest_pool_templateCreator): quest_pool_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_pool_template: quest_pool_templateTable;
