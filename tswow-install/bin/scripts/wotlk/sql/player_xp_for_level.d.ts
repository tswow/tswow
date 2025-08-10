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
export declare class player_xp_for_levelRow extends SqlRow<player_xp_for_levelCreator, player_xp_for_levelQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Level(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Experience(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Level: tinyint, c?: player_xp_for_levelCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type player_xp_for_levelCreator = {
    Level?: tinyint;
    Experience?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type player_xp_for_levelQuery = {
    Level?: Relation<tinyint>;
    Experience?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class player_xp_for_levelTable extends SqlTable<player_xp_for_levelCreator, player_xp_for_levelQuery, player_xp_for_levelRow> {
    add(Level: tinyint, c?: player_xp_for_levelCreator): player_xp_for_levelRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_player_xp_for_level: player_xp_for_levelTable;
