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
export declare class gameobject_questitemRow extends SqlRow<gameobject_questitemCreator, gameobject_questitemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get GameObjectEntry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Idx(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(GameObjectEntry: int, Idx: int, c?: gameobject_questitemCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_questitemCreator = {
    GameObjectEntry?: int;
    Idx?: int;
    ItemId?: int;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_questitemQuery = {
    GameObjectEntry?: Relation<int>;
    Idx?: Relation<int>;
    ItemId?: Relation<int>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gameobject_questitemTable extends SqlTable<gameobject_questitemCreator, gameobject_questitemQuery, gameobject_questitemRow> {
    add(GameObjectEntry: int, Idx: int, c?: gameobject_questitemCreator): gameobject_questitemRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gameobject_questitem: gameobject_questitemTable;
