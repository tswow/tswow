import { smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class player_classlevelstatsRow extends SqlRow<player_classlevelstatsCreator, player_classlevelstatsQuery> {
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
    get basehp(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get basemana(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(cls: tinyint, level: tinyint, c?: player_classlevelstatsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type player_classlevelstatsCreator = {
    class?: tinyint;
    level?: tinyint;
    basehp?: smallint;
    basemana?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type player_classlevelstatsQuery = {
    class?: Relation<tinyint>;
    level?: Relation<tinyint>;
    basehp?: Relation<smallint>;
    basemana?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class player_classlevelstatsTable extends SqlTable<player_classlevelstatsCreator, player_classlevelstatsQuery, player_classlevelstatsRow> {
    add(cls: tinyint, level: tinyint, c?: player_classlevelstatsCreator): player_classlevelstatsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_player_classlevelstats: player_classlevelstatsTable;
