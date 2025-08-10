import { int, mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_event_seasonal_questrelationRow extends SqlRow<game_event_seasonal_questrelationCreator, game_event_seasonal_questrelationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get questId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get eventEntry(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(questId: int, eventEntry: mediumint, c?: game_event_seasonal_questrelationCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_seasonal_questrelationCreator = {
    questId?: int;
    eventEntry?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_seasonal_questrelationQuery = {
    questId?: Relation<int>;
    eventEntry?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_seasonal_questrelationTable extends SqlTable<game_event_seasonal_questrelationCreator, game_event_seasonal_questrelationQuery, game_event_seasonal_questrelationRow> {
    add(questId: int, eventEntry: mediumint, c?: game_event_seasonal_questrelationCreator): game_event_seasonal_questrelationRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_seasonal_questrelation: game_event_seasonal_questrelationTable;
