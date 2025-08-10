import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_groupRow extends SqlRow<spell_groupCreator, spell_groupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get id(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spell_id(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id: int, spell_id: int, c?: spell_groupCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_groupCreator = {
    id?: int;
    spell_id?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_groupQuery = {
    id?: Relation<int>;
    spell_id?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_groupTable extends SqlTable<spell_groupCreator, spell_groupQuery, spell_groupRow> {
    add(id: int, spell_id: int, c?: spell_groupCreator): spell_groupRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_group: spell_groupTable;
