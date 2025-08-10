import { tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class player_levelstatsRow extends SqlRow<player_levelstatsCreator, player_levelstatsQuery> {
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
    get level(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get str(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get agi(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get sta(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get inte(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spi(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(race: tinyint, cls: tinyint, level: tinyint, c?: player_levelstatsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type player_levelstatsCreator = {
    race?: tinyint;
    class?: tinyint;
    level?: tinyint;
    str?: tinyint;
    agi?: tinyint;
    sta?: tinyint;
    inte?: tinyint;
    spi?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type player_levelstatsQuery = {
    race?: Relation<tinyint>;
    class?: Relation<tinyint>;
    level?: Relation<tinyint>;
    str?: Relation<tinyint>;
    agi?: Relation<tinyint>;
    sta?: Relation<tinyint>;
    inte?: Relation<tinyint>;
    spi?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class player_levelstatsTable extends SqlTable<player_levelstatsCreator, player_levelstatsQuery, player_levelstatsRow> {
    add(race: tinyint, cls: tinyint, level: tinyint, c?: player_levelstatsCreator): player_levelstatsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_player_levelstats: player_levelstatsTable;
