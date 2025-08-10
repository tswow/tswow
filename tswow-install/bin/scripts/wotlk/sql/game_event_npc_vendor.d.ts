import { mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_event_npc_vendorRow extends SqlRow<game_event_npc_vendorCreator, game_event_npc_vendorQuery> {
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
    get slot(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get item(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get maxcount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get incrtime(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ExtendedCost(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: mediumint, item: mediumint, c?: game_event_npc_vendorCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_event_npc_vendorCreator = {
    eventEntry?: tinyint;
    guid?: mediumint;
    slot?: smallint;
    item?: mediumint;
    maxcount?: mediumint;
    incrtime?: mediumint;
    ExtendedCost?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_event_npc_vendorQuery = {
    eventEntry?: Relation<tinyint>;
    guid?: Relation<mediumint>;
    slot?: Relation<smallint>;
    item?: Relation<mediumint>;
    maxcount?: Relation<mediumint>;
    incrtime?: Relation<mediumint>;
    ExtendedCost?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_event_npc_vendorTable extends SqlTable<game_event_npc_vendorCreator, game_event_npc_vendorQuery, game_event_npc_vendorRow> {
    add(guid: mediumint, item: mediumint, c?: game_event_npc_vendorCreator): game_event_npc_vendorRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_event_npc_vendor: game_event_npc_vendorTable;
