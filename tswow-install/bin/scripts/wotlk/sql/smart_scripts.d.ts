import { float, int, smallint, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class smart_scriptsRow extends SqlRow<smart_scriptsCreator, smart_scriptsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entryorguid(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get source_type(): SQLCellReadOnly<number, this>;
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
    get link(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get event_type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get event_phase_mask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get event_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get event_flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get event_param1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get event_param2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get event_param3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get event_param4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get event_param5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action_type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action_param1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action_param2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action_param3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action_param4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action_param5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get action_param6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_param1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_param2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_param3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_param4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_x(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_y(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_z(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_o(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entryorguid: int, source_type: tinyint, id: smallint, link: smallint, c?: smart_scriptsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type smart_scriptsCreator = {
    entryorguid?: int;
    source_type?: tinyint;
    id?: smallint;
    link?: smallint;
    event_type?: tinyint;
    event_phase_mask?: smallint;
    event_chance?: tinyint;
    event_flags?: smallint;
    event_param1?: int;
    event_param2?: int;
    event_param3?: int;
    event_param4?: int;
    event_param5?: int;
    action_type?: tinyint;
    action_param1?: int;
    action_param2?: int;
    action_param3?: int;
    action_param4?: int;
    action_param5?: int;
    action_param6?: int;
    target_type?: tinyint;
    target_param1?: int;
    target_param2?: int;
    target_param3?: int;
    target_param4?: int;
    target_x?: float;
    target_y?: float;
    target_z?: float;
    target_o?: float;
    comment?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type smart_scriptsQuery = {
    entryorguid?: Relation<int>;
    source_type?: Relation<tinyint>;
    id?: Relation<smallint>;
    link?: Relation<smallint>;
    event_type?: Relation<tinyint>;
    event_phase_mask?: Relation<smallint>;
    event_chance?: Relation<tinyint>;
    event_flags?: Relation<smallint>;
    event_param1?: Relation<int>;
    event_param2?: Relation<int>;
    event_param3?: Relation<int>;
    event_param4?: Relation<int>;
    event_param5?: Relation<int>;
    action_type?: Relation<tinyint>;
    action_param1?: Relation<int>;
    action_param2?: Relation<int>;
    action_param3?: Relation<int>;
    action_param4?: Relation<int>;
    action_param5?: Relation<int>;
    action_param6?: Relation<int>;
    target_type?: Relation<tinyint>;
    target_param1?: Relation<int>;
    target_param2?: Relation<int>;
    target_param3?: Relation<int>;
    target_param4?: Relation<int>;
    target_x?: Relation<float>;
    target_y?: Relation<float>;
    target_z?: Relation<float>;
    target_o?: Relation<float>;
    comment?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class smart_scriptsTable extends SqlTable<smart_scriptsCreator, smart_scriptsQuery, smart_scriptsRow> {
    add(entryorguid: int, source_type: tinyint, id: smallint, link: smallint, c?: smart_scriptsCreator): smart_scriptsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_smart_scripts: smart_scriptsTable;
