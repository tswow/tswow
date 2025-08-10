import { float, int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class gameobject_addonRow extends SqlRow<gameobject_addonCreator, gameobject_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get parent_rotation0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get parent_rotation1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get parent_rotation2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get parent_rotation3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get invisibilityType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get invisibilityValue(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: int, c?: gameobject_addonCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_addonCreator = {
    guid?: int;
    parent_rotation0?: float;
    parent_rotation1?: float;
    parent_rotation2?: float;
    parent_rotation3?: float;
    invisibilityType?: tinyint;
    invisibilityValue?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_addonQuery = {
    guid?: Relation<int>;
    parent_rotation0?: Relation<float>;
    parent_rotation1?: Relation<float>;
    parent_rotation2?: Relation<float>;
    parent_rotation3?: Relation<float>;
    invisibilityType?: Relation<tinyint>;
    invisibilityValue?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gameobject_addonTable extends SqlTable<gameobject_addonCreator, gameobject_addonQuery, gameobject_addonRow> {
    add(guid: int, c?: gameobject_addonCreator): gameobject_addonRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gameobject_addon: gameobject_addonTable;
