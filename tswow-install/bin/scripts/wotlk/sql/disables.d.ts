import { int, smallint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class disablesRow extends SqlRow<disablesCreator, disablesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get sourceType(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get params_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get params_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(sourceType: int, entry: int, c?: disablesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type disablesCreator = {
    sourceType?: int;
    entry?: int;
    flags?: smallint;
    params_0?: varchar;
    params_1?: varchar;
    comment?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type disablesQuery = {
    sourceType?: Relation<int>;
    entry?: Relation<int>;
    flags?: Relation<smallint>;
    params_0?: Relation<varchar>;
    params_1?: Relation<varchar>;
    comment?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class disablesTable extends SqlTable<disablesCreator, disablesQuery, disablesRow> {
    add(sourceType: int, entry: int, c?: disablesCreator): disablesRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_disables: disablesTable;
