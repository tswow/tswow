import { int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_group_stack_rulesRow extends SqlRow<spell_group_stack_rulesCreator, spell_group_stack_rulesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get group_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get stack_rule(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(group_id: int, c?: spell_group_stack_rulesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_group_stack_rulesCreator = {
    group_id?: int;
    stack_rule?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_group_stack_rulesQuery = {
    group_id?: Relation<int>;
    stack_rule?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_group_stack_rulesTable extends SqlTable<spell_group_stack_rulesCreator, spell_group_stack_rulesQuery, spell_group_stack_rulesRow> {
    add(group_id: int, c?: spell_group_stack_rulesCreator): spell_group_stack_rulesRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_group_stack_rules: spell_group_stack_rulesTable;
