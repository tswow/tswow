import { int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spawn_groupRow extends SqlRow<spawn_groupCreator, spawn_groupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get groupId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spawnType(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spawnId(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(groupId: int, spawnType: tinyint, spawnId: int, c?: spawn_groupCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spawn_groupCreator = {
    groupId?: int;
    spawnType?: tinyint;
    spawnId?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spawn_groupQuery = {
    groupId?: Relation<int>;
    spawnType?: Relation<tinyint>;
    spawnId?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spawn_groupTable extends SqlTable<spawn_groupCreator, spawn_groupQuery, spawn_groupRow> {
    add(groupId: int, spawnType: tinyint, spawnId: int, c?: spawn_groupCreator): spawn_groupRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spawn_group: spawn_groupTable;
