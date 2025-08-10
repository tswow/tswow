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
export declare class player_class_rolesRow extends SqlRow<player_class_rolesCreator, player_class_rolesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get class(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get tank(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get healer(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get damage(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get leader(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(clazz: mediumint, c?: player_class_rolesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type player_class_rolesCreator = {
    class?: mediumint;
    tank?: tinyint;
    damage?: tinyint;
    healer?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type player_class_rolesQuery = {
    class?: Relation<mediumint>;
    tank?: Relation<tinyint>;
    damage?: Relation<tinyint>;
    healer?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class player_class_rolesTable extends SqlTable<player_class_rolesCreator, player_class_rolesQuery, player_class_rolesRow> {
    add(clazz: tinyint, c?: player_class_rolesCreator): player_class_rolesRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_player_class_roles: player_class_rolesTable;
