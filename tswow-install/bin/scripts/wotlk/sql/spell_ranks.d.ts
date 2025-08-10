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
export declare class spell_ranksRow extends SqlRow<spell_ranksCreator, spell_ranksQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get first_spell_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get spell_id(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get rank(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(first_spell_id: int, rank: tinyint, c?: spell_ranksCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_ranksCreator = {
    first_spell_id?: int;
    spell_id?: int;
    rank?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_ranksQuery = {
    first_spell_id?: Relation<int>;
    spell_id?: Relation<int>;
    rank?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_ranksTable extends SqlTable<spell_ranksCreator, spell_ranksQuery, spell_ranksRow> {
    add(first_spell_id: int, rank: tinyint, c?: spell_ranksCreator): spell_ranksRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_ranks: spell_ranksTable;
