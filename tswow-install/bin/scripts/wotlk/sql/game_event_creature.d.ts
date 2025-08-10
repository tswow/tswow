import { int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_event_creatureRow extends SqlRow<game_event_creatureCreator, game_event_creatureQuery> {
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
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry: int, guid: tinyint, c?: game_event_creatureCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_creatureCreator = {
    eventEntry?: tinyint;
    guid?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_creatureQuery = {
    eventEntry?: Relation<tinyint>;
    guid?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_creatureTable extends SqlTable<game_event_creatureCreator, game_event_creatureQuery, game_event_creatureRow> {
    add(eventEntry: int, guid: tinyint, c?: game_event_creatureCreator): game_event_creatureRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_creature: game_event_creatureTable;
