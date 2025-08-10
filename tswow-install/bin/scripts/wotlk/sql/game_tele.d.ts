import { float, mediumint, smallint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_teleRow extends SqlRow<game_teleCreator, game_teleQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get position_x(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get position_y(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get position_z(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get orientation(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get map(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get name(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id: mediumint, c?: game_teleCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_teleCreator = {
    id?: mediumint;
    position_x?: float;
    position_y?: float;
    position_z?: float;
    orientation?: float;
    map?: smallint;
    name?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_teleQuery = {
    id?: Relation<mediumint>;
    position_x?: Relation<float>;
    position_y?: Relation<float>;
    position_z?: Relation<float>;
    orientation?: Relation<float>;
    map?: Relation<smallint>;
    name?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_teleTable extends SqlTable<game_teleCreator, game_teleQuery, game_teleRow> {
    add(id: mediumint, c?: game_teleCreator): game_teleRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_tele: game_teleTable;
