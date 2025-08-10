import { longtext, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class commandRow extends SqlRow<commandCreator, commandQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get name(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get help(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(name: varchar, c?: commandCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type commandCreator = {
    name?: varchar;
    help?: longtext;
};
/**
 * Used for object queries (Don't comment these)
 */
export type commandQuery = {
    name?: Relation<varchar>;
    help?: Relation<longtext>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class commandTable extends SqlTable<commandCreator, commandQuery, commandRow> {
    add(name: varchar, c?: commandCreator): commandRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_command: commandTable;
