import { mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class class_stat_formulasRow extends SqlRow<class_stat_formulasCreator, class_stat_formulasQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get class(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get stat_type(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get class_out(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(cls: mediumint, stat_type: number, c?: class_stat_formulasCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type class_stat_formulasCreator = {
    class_out: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type class_stat_formulasQuery = {
    class?: Relation<mediumint>;
    stat_type?: Relation<mediumint>;
    class_out?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class class_stat_formulaTable extends SqlTable<class_stat_formulasCreator, class_stat_formulasQuery, class_stat_formulasRow> {
    add(cls: mediumint, stat_type: number, c?: class_stat_formulasCreator): class_stat_formulasRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_class_stat_formulas: class_stat_formulaTable;
