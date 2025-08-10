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
export declare class spawn_group_templateRow extends SqlRow<spawn_group_templateCreator, spawn_group_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get groupId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get groupName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get groupFlags(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(groupId: int, c?: spawn_group_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spawn_group_templateCreator = {
    groupId?: int;
    groupName?: varchar;
    groupFlags?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spawn_group_templateQuery = {
    groupId?: Relation<int>;
    groupName?: Relation<varchar>;
    groupFlags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spawn_group_templateTable extends SqlTable<spawn_group_templateCreator, spawn_group_templateQuery, spawn_group_templateRow> {
    add(groupId: int, c?: spawn_group_templateCreator): spawn_group_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spawn_group_template: spawn_group_templateTable;
