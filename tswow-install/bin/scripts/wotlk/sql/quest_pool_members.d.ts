import { int, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class quest_pool_membersRow extends SqlRow<quest_pool_membersCreator, quest_pool_membersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get questId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get poolId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get poolIndex(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(questId: int, c?: quest_pool_membersCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_pool_membersCreator = {
    questId?: int;
    poolId?: int;
    poolIndex?: tinyint;
    description?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_pool_membersQuery = {
    questId?: Relation<int>;
    poolId?: Relation<int>;
    poolIndex?: Relation<tinyint>;
    description?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_pool_membersTable extends SqlTable<quest_pool_membersCreator, quest_pool_membersQuery, quest_pool_membersRow> {
    add(questId: int, c?: quest_pool_membersCreator): quest_pool_membersRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_pool_members: quest_pool_membersTable;
