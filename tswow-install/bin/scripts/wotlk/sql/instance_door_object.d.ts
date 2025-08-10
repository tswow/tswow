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
export declare class instance_door_objectRow extends SqlRow<instance_door_objectCreator, instance_door_objectQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    get map(): SQLCellReadOnly<number, this>;
    get boss(): SQLCell<number, this>;
    get type(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, map: mediumint, c?: instance_door_objectCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type instance_door_objectCreator = {
    entry?: mediumint;
    map?: mediumint;
    boss?: mediumint;
    type?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type instance_door_objectQuery = {
    entry?: Relation<mediumint>;
    map?: Relation<mediumint>;
    boss?: Relation<mediumint>;
    type?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class instance_door_objectTable extends SqlTable<instance_door_objectCreator, instance_door_objectQuery, instance_door_objectRow> {
    add(entry: mediumint, map: mediumint, c?: instance_door_objectCreator): instance_door_objectRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_instance_door_object: instance_door_objectTable;
