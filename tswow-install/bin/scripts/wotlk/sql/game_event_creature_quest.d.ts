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
export declare class game_event_creature_questRow extends SqlRow<game_event_creature_questCreator, game_event_creature_questQuery> {
    /**
     * No comment (yet!)
     */
    get eventEntry(): SQLCell<number, this>;
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
    clone(id: mediumint, quest: mediumint, c?: game_event_creature_questCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_creature_questCreator = {
    eventEntry?: tinyint;
    id?: mediumint;
    quest?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_creature_questQuery = {
    eventEntry?: Relation<tinyint>;
    id?: Relation<mediumint>;
    quest?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_creature_questTable extends SqlTable<game_event_creature_questCreator, game_event_creature_questQuery, game_event_creature_questRow> {
    add(id: mediumint, quest: mediumint, c?: game_event_creature_questCreator): game_event_creature_questRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_creature_quest: game_event_creature_questTable;
