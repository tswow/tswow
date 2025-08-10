import { mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class gameobject_queststarterRow extends SqlRow<gameobject_queststarterCreator, gameobject_queststarterQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get id(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get quest(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id: mediumint, quest: mediumint, c?: gameobject_queststarterCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_queststarterCreator = {
    id?: mediumint;
    quest?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_queststarterQuery = {
    id?: Relation<mediumint>;
    quest?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gameobject_queststarterTable extends SqlTable<gameobject_queststarterCreator, gameobject_queststarterQuery, gameobject_queststarterRow> {
    add(id: mediumint, quest: mediumint, c?: gameobject_queststarterCreator): gameobject_queststarterRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gameobject_queststarter: gameobject_queststarterTable;
