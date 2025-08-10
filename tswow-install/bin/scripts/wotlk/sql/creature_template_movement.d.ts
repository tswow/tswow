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
export declare class creature_template_movementRow extends SqlRow<creature_template_movementCreator, creature_template_movementQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get CreatureId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Ground(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Swim(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Flight(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Rooted(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Chase(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Random(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get InteractionPauseTimer(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureId: int, c?: creature_template_movementCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_movementCreator = {
    CreatureId?: int;
    Ground?: tinyint;
    Swim?: tinyint;
    Flight?: tinyint;
    Rooted?: tinyint;
    Chase?: tinyint;
    Random?: tinyint;
    InteractionPauseTimer?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_movementQuery = {
    CreatureId?: Relation<int>;
    Ground?: Relation<tinyint>;
    Swim?: Relation<tinyint>;
    Flight?: Relation<tinyint>;
    Rooted?: Relation<tinyint>;
    Chase?: Relation<tinyint>;
    Random?: Relation<tinyint>;
    InteractionPauseTimer?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_template_movementTable extends SqlTable<creature_template_movementCreator, creature_template_movementQuery, creature_template_movementRow> {
    add(CreatureId: int, c?: creature_template_movementCreator): creature_template_movementRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_template_movement: creature_template_movementTable;
