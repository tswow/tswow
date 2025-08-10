import { float, mediumint, smallint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_event_conditionRow extends SqlRow<game_event_conditionCreator, game_event_conditionQuery> {
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
    get condition_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get req_num(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get max_world_state_field(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get done_world_state_field(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get description(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(eventEntry: tinyint, condition_id: mediumint, c?: game_event_conditionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_conditionCreator = {
    eventEntry?: tinyint;
    condition_id?: mediumint;
    req_num?: float;
    max_world_state_field?: smallint;
    done_world_state_field?: smallint;
    description?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_conditionQuery = {
    eventEntry?: Relation<tinyint>;
    condition_id?: Relation<mediumint>;
    req_num?: Relation<float>;
    max_world_state_field?: Relation<smallint>;
    done_world_state_field?: Relation<smallint>;
    description?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_conditionTable extends SqlTable<game_event_conditionCreator, game_event_conditionQuery, game_event_conditionRow> {
    add(eventEntry: tinyint, condition_id: mediumint, c?: game_event_conditionCreator): game_event_conditionRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_condition: game_event_conditionTable;
