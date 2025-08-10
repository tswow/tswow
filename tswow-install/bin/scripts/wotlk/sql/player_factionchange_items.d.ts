import { int, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class player_factionchange_itemsRow extends SqlRow<player_factionchange_itemsCreator, player_factionchange_itemsQuery> {
    /**
     * No comment (yet!)
     */
    get race_A(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get alliance_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get commentA(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get race_H(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get horde_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get commentH(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(alliance_id: int, horde_id: int, c?: player_factionchange_itemsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type player_factionchange_itemsCreator = {
    race_A?: int;
    alliance_id?: int;
    commentA?: text;
    race_H?: int;
    horde_id?: int;
    commentH?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type player_factionchange_itemsQuery = {
    race_A?: Relation<int>;
    alliance_id?: Relation<int>;
    commentA?: Relation<text>;
    race_H?: Relation<int>;
    horde_id?: Relation<int>;
    commentH?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class player_factionchange_itemsTable extends SqlTable<player_factionchange_itemsCreator, player_factionchange_itemsQuery, player_factionchange_itemsRow> {
    add(alliance_id: int, horde_id: int, c?: player_factionchange_itemsCreator): player_factionchange_itemsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_player_factionchange_items: player_factionchange_itemsTable;
