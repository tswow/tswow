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
export declare class instance_addonRow extends SqlRow<instance_addonCreator, instance_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get map(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get boss_count(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(map: mediumint, c?: instance_addonCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type instance_addonCreator = {
    map?: mediumint;
    boss_count?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type instance_addonQuery = {
    map?: Relation<mediumint>;
    boss_count?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class instance_addonTable extends SqlTable<instance_addonCreator, instance_addonQuery, instance_addonRow> {
    add(map: tinyint, c?: instance_addonCreator): instance_addonRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_instance_addon: instance_addonTable;
