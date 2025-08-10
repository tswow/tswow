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
export declare class game_event_model_equipRow extends SqlRow<game_event_model_equipCreator, game_event_model_equipQuery> {
    /**
     * No comment (yet!)
     */
    get eventEntry(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get modelid(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get equipment_id(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: int, c?: game_event_model_equipCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_model_equipCreator = {
    eventEntry?: tinyint;
    guid?: int;
    modelid?: mediumint;
    equipment_id?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_model_equipQuery = {
    eventEntry?: Relation<tinyint>;
    guid?: Relation<int>;
    modelid?: Relation<mediumint>;
    equipment_id?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_model_equipTable extends SqlTable<game_event_model_equipCreator, game_event_model_equipQuery, game_event_model_equipRow> {
    add(guid: int, c?: game_event_model_equipCreator): game_event_model_equipRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_model_equip: game_event_model_equipTable;
