import { int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_event_battleground_holidayRow extends SqlRow<game_event_battleground_holidayCreator, game_event_battleground_holidayQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get EventEntry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get BattlegroundID(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(EventEntry: tinyint, c?: game_event_battleground_holidayCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_battleground_holidayCreator = {
    EventEntry?: tinyint;
    BattlegroundID?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_battleground_holidayQuery = {
    EventEntry?: Relation<tinyint>;
    BattlegroundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_battleground_holidayTable extends SqlTable<game_event_battleground_holidayCreator, game_event_battleground_holidayQuery, game_event_battleground_holidayRow> {
    add(EventEntry: tinyint, c?: game_event_battleground_holidayCreator): game_event_battleground_holidayRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_battleground_holiday: game_event_battleground_holidayTable;
