import { float, mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class item_enchantment_templateRow extends SqlRow<item_enchantment_templateCreator, item_enchantment_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ench(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get chance(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, ench: mediumint, c?: item_enchantment_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type item_enchantment_templateCreator = {
    entry?: mediumint;
    ench?: mediumint;
    chance?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type item_enchantment_templateQuery = {
    entry?: Relation<mediumint>;
    ench?: Relation<mediumint>;
    chance?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class item_enchantment_templateTable extends SqlTable<item_enchantment_templateCreator, item_enchantment_templateQuery, item_enchantment_templateRow> {
    add(entry: mediumint, ench: mediumint, c?: item_enchantment_templateCreator): item_enchantment_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_item_enchantment_template: item_enchantment_templateTable;
