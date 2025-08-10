import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_autolearnRow extends SqlRow<spell_autolearnCreator, spell_autolearnQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spell(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get racemask(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get classmask(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get level(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell: int, racemask: int, clsmask: int, c?: spell_autolearnCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_autolearnCreator = {
    spell?: int;
    racemask?: int;
    classmask?: int;
    level?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_autolearnQuery = {
    spell?: Relation<int>;
    racemask?: Relation<int>;
    classmask?: Relation<int>;
    level?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_autolearnTable extends SqlTable<spell_autolearnCreator, spell_autolearnQuery, spell_autolearnRow> {
    add(spell: int, racemask: int, clsmask: int, c?: spell_autolearnCreator): spell_autolearnRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_autolearn: spell_autolearnTable;
