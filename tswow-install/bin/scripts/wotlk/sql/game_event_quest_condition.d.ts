import { float, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_event_quest_conditionRow extends SqlRow<game_event_quest_conditionCreator, game_event_quest_conditionQuery> {
    /**
     * No comment (yet!)
     */
    get eventEntry(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get quest(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get condition_id(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get num(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(quest: mediumint, c?: game_event_quest_conditionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_quest_conditionCreator = {
    eventEntry?: tinyint;
    quest?: mediumint;
    condition_id?: mediumint;
    num?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_quest_conditionQuery = {
    eventEntry?: Relation<tinyint>;
    quest?: Relation<mediumint>;
    condition_id?: Relation<mediumint>;
    num?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_quest_conditionTable extends SqlTable<game_event_quest_conditionCreator, game_event_quest_conditionQuery, game_event_quest_conditionRow> {
    add(quest: mediumint, c?: game_event_quest_conditionCreator): game_event_quest_conditionRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_quest_condition: game_event_quest_conditionTable;
