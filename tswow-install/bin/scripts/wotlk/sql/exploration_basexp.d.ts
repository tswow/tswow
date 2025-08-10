import { mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class exploration_basexpRow extends SqlRow<exploration_basexpCreator, exploration_basexpQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get level(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get basexp(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(level: tinyint, c?: exploration_basexpCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type exploration_basexpCreator = {
    level?: tinyint;
    basexp?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type exploration_basexpQuery = {
    level?: Relation<tinyint>;
    basexp?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class exploration_basexpTable extends SqlTable<exploration_basexpCreator, exploration_basexpQuery, exploration_basexpRow> {
    add(level: tinyint, c?: exploration_basexpCreator): exploration_basexpRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_exploration_basexp: exploration_basexpTable;
