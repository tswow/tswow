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
export declare class instance_boss_creatureRow extends SqlRow<instance_boss_creatureCreator, instance_boss_creatureQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get map(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get boss(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: mediumint, c?: instance_boss_creatureCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type instance_boss_creatureCreator = {
    guid?: mediumint;
    map?: mediumint;
    boss?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type instance_boss_creatureQuery = {
    guid?: Relation<mediumint>;
    map?: Relation<mediumint>;
    boss?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class instance_boss_creatureTable extends SqlTable<instance_boss_creatureCreator, instance_boss_creatureQuery, instance_boss_creatureRow> {
    add(guid: mediumint, c?: instance_boss_creatureCreator): instance_boss_creatureRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_instance_boss_creature: instance_boss_creatureTable;
