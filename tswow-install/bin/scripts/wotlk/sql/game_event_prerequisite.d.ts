import { mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_event_prerequisiteRow extends SqlRow<game_event_prerequisiteCreator, game_event_prerequisiteQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get eventEntry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get prerequisite_event(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry: tinyint, prerequisite_event: mediumint, c?: game_event_prerequisiteCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_prerequisiteCreator = {
    eventEntry?: tinyint;
    prerequisite_event?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_prerequisiteQuery = {
    eventEntry?: Relation<tinyint>;
    prerequisite_event?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_prerequisiteTable extends SqlTable<game_event_prerequisiteCreator, game_event_prerequisiteQuery, game_event_prerequisiteRow> {
    add(eventEntry: tinyint, prerequisite_event: mediumint, c?: game_event_prerequisiteCreator): game_event_prerequisiteRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_prerequisite: game_event_prerequisiteTable;
