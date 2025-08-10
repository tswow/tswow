import { mediumint, timestamp, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_eventRow extends SqlRow<game_eventCreator, game_eventQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get eventEntry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get start_time(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get end_time(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get occurence(): SQLCell<bigint, this>;
    /**
     * No comment (yet!)
     */
    get length(): SQLCell<bigint, this>;
    /**
     * No comment (yet!)
     */
    get holiday(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get holidayStage(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get world_event(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get announce(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry: tinyint, c?: game_eventCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_eventCreator = {
    eventEntry?: tinyint;
    start_time?: timestamp;
    end_time?: timestamp;
    occurence?: bigint;
    length?: bigint;
    holiday?: mediumint;
    holidayStage?: tinyint;
    description?: varchar;
    world_event?: tinyint;
    announce?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_eventQuery = {
    eventEntry?: Relation<tinyint>;
    start_time?: Relation<timestamp>;
    end_time?: Relation<timestamp>;
    holiday?: Relation<mediumint>;
    holidayStage?: Relation<tinyint>;
    description?: Relation<varchar>;
    world_event?: Relation<tinyint>;
    announce?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_eventTable extends SqlTable<game_eventCreator, game_eventQuery, game_eventRow> {
    add(eventEntry: tinyint, c?: game_eventCreator): game_eventRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event: game_eventTable;
