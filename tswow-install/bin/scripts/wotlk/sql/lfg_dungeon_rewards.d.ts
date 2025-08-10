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
export declare class lfg_dungeon_rewardsRow extends SqlRow<lfg_dungeon_rewardsCreator, lfg_dungeon_rewardsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get dungeonId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get maxLevel(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get firstQuestId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get otherQuestId(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(dungeonId: int, maxLevel: tinyint, c?: lfg_dungeon_rewardsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type lfg_dungeon_rewardsCreator = {
    dungeonId?: int;
    maxLevel?: tinyint;
    firstQuestId?: int;
    otherQuestId?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type lfg_dungeon_rewardsQuery = {
    dungeonId?: Relation<int>;
    maxLevel?: Relation<tinyint>;
    firstQuestId?: Relation<int>;
    otherQuestId?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class lfg_dungeon_rewardsTable extends SqlTable<lfg_dungeon_rewardsCreator, lfg_dungeon_rewardsQuery, lfg_dungeon_rewardsRow> {
    add(dungeonId: int, maxLevel: tinyint, c?: lfg_dungeon_rewardsCreator): lfg_dungeon_rewardsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_lfg_dungeon_rewards: lfg_dungeon_rewardsTable;
