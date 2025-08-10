import { int, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_event_npcflagRow extends SqlRow<game_event_npcflagCreator, game_event_npcflagQuery> {
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
     * No comment (yet!)
     */
    get npcflag(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry: tinyint, guid: mediumint, c?: game_event_npcflagCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_npcflagCreator = {
    eventEntry?: tinyint;
    guid?: mediumint;
    npcflag?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_npcflagQuery = {
    eventEntry?: Relation<tinyint>;
    guid?: Relation<mediumint>;
    npcflag?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_npcflagTable extends SqlTable<game_event_npcflagCreator, game_event_npcflagQuery, game_event_npcflagRow> {
    add(eventEntry: tinyint, guid: mediumint, c?: game_event_npcflagCreator): game_event_npcflagRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_npcflag: game_event_npcflagTable;
