import { int, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class playercreateinfo_actionRow extends SqlRow<playercreateinfo_actionCreator, playercreateinfo_actionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get race(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get class(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get button(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get action(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get type(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(race: tinyint, cls: tinyint, button: smallint, c?: playercreateinfo_actionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfo_actionCreator = {
    race?: tinyint;
    class?: tinyint;
    button?: smallint;
    action?: int;
    type?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfo_actionQuery = {
    race?: Relation<tinyint>;
    class?: Relation<tinyint>;
    button?: Relation<smallint>;
    action?: Relation<int>;
    type?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class playercreateinfo_actionTable extends SqlTable<playercreateinfo_actionCreator, playercreateinfo_actionQuery, playercreateinfo_actionRow> {
    add(race: tinyint, cls: tinyint, button: smallint, c?: playercreateinfo_actionCreator): playercreateinfo_actionRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_playercreateinfo_action: playercreateinfo_actionTable;
