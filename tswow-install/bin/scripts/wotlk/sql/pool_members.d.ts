import { float, int, smallint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class pool_membersRow extends SqlRow<pool_membersCreator, pool_membersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get type(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spawnId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get poolSpawnId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(type: smallint, spawnId: int, c?: pool_membersCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type pool_membersCreator = {
    type?: smallint;
    spawnId?: int;
    poolSpawnId?: int;
    chance?: float;
    description?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type pool_membersQuery = {
    type?: Relation<smallint>;
    spawnId?: Relation<int>;
    poolSpawnId?: Relation<int>;
    chance?: Relation<float>;
    description?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class pool_membersTable extends SqlTable<pool_membersCreator, pool_membersQuery, pool_membersRow> {
    add(type: smallint, spawnId: int, c?: pool_membersCreator): pool_membersRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_pool_members: pool_membersTable;
