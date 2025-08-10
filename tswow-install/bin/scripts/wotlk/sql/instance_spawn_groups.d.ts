import { int, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class instance_spawn_groupsRow extends SqlRow<instance_spawn_groupsCreator, instance_spawn_groupsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get instanceMapId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get bossStateId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get bossStates(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spawnGroupId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get flags(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(instanceMapId: smallint, bossStateId: tinyint, spawnGroupId: tinyint, bossStates: int, c?: instance_spawn_groupsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type instance_spawn_groupsCreator = {
    instanceMapId?: smallint;
    bossStateId?: tinyint;
    bossStates?: tinyint;
    spawnGroupId?: int;
    flags?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type instance_spawn_groupsQuery = {
    instanceMapId?: Relation<smallint>;
    bossStateId?: Relation<tinyint>;
    bossStates?: Relation<tinyint>;
    spawnGroupId?: Relation<int>;
    flags?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class instance_spawn_groupsTable extends SqlTable<instance_spawn_groupsCreator, instance_spawn_groupsQuery, instance_spawn_groupsRow> {
    add(instanceMapId: smallint, bossStateId: tinyint, spawnGroupId: tinyint, bossStates: int, c?: instance_spawn_groupsCreator): instance_spawn_groupsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_instance_spawn_groups: instance_spawn_groupsTable;
