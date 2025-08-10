import { int, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class gameobject_overridesRow extends SqlRow<gameobject_overridesCreator, gameobject_overridesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spawnId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get faction(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get flags(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spawnId: int, c?: gameobject_overridesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_overridesCreator = {
    spawnId?: int;
    faction?: smallint;
    flags?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_overridesQuery = {
    spawnId?: Relation<int>;
    faction?: Relation<smallint>;
    flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gameobject_overridesTable extends SqlTable<gameobject_overridesCreator, gameobject_overridesQuery, gameobject_overridesRow> {
    add(spawnId: int, c?: gameobject_overridesCreator): gameobject_overridesRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gameobject_overrides: gameobject_overridesTable;
