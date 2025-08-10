import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class player_factionchange_achievementRow extends SqlRow<player_factionchange_achievementCreator, player_factionchange_achievementQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get alliance_id(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get horde_id(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(alliance_id: int, horde_id: int, c?: player_factionchange_achievementCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type player_factionchange_achievementCreator = {
    alliance_id?: int;
    horde_id?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type player_factionchange_achievementQuery = {
    alliance_id?: Relation<int>;
    horde_id?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class player_factionchange_achievementTable extends SqlTable<player_factionchange_achievementCreator, player_factionchange_achievementQuery, player_factionchange_achievementRow> {
    add(alliance_id: int, horde_id: int, c?: player_factionchange_achievementCreator): player_factionchange_achievementRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_player_factionchange_achievement: player_factionchange_achievementTable;
