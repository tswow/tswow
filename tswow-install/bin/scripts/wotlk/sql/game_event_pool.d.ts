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
export declare class game_event_poolRow extends SqlRow<game_event_poolCreator, game_event_poolQuery> {
    /**
     * No comment (yet!)
     */
    get eventEntry(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get pool_entry(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(pool_entry: mediumint, c?: game_event_poolCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_poolCreator = {
    eventEntry?: tinyint;
    pool_entry?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_poolQuery = {
    eventEntry?: Relation<tinyint>;
    pool_entry?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_poolTable extends SqlTable<game_event_poolCreator, game_event_poolQuery, game_event_poolRow> {
    add(pool_entry: mediumint, c?: game_event_poolCreator): game_event_poolRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_pool: game_event_poolTable;
