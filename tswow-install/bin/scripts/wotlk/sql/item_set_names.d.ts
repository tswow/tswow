import { mediumint, smallint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class item_set_namesRow extends SqlRow<item_set_namesCreator, item_set_namesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get InventoryType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: item_set_namesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type item_set_namesCreator = {
    entry?: mediumint;
    name?: varchar;
    InventoryType?: tinyint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type item_set_namesQuery = {
    entry?: Relation<mediumint>;
    name?: Relation<varchar>;
    InventoryType?: Relation<tinyint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class item_set_namesTable extends SqlTable<item_set_namesCreator, item_set_namesQuery, item_set_namesRow> {
    add(entry: mediumint, c?: item_set_namesCreator): item_set_namesRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_item_set_names: item_set_namesTable;
