import { float, mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class reputation_reward_rateRow extends SqlRow<reputation_reward_rateCreator, reputation_reward_rateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get faction(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_rate(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_daily_rate(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_weekly_rate(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_monthly_rate(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_repeatable_rate(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get creature_rate(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spell_rate(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(faction: mediumint, c?: reputation_reward_rateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type reputation_reward_rateCreator = {
    faction?: mediumint;
    quest_rate?: float;
    quest_daily_rate?: float;
    quest_weekly_rate?: float;
    quest_monthly_rate?: float;
    quest_repeatable_rate?: float;
    creature_rate?: float;
    spell_rate?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type reputation_reward_rateQuery = {
    faction?: Relation<mediumint>;
    quest_rate?: Relation<float>;
    quest_daily_rate?: Relation<float>;
    quest_weekly_rate?: Relation<float>;
    quest_monthly_rate?: Relation<float>;
    quest_repeatable_rate?: Relation<float>;
    creature_rate?: Relation<float>;
    spell_rate?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class reputation_reward_rateTable extends SqlTable<reputation_reward_rateCreator, reputation_reward_rateQuery, reputation_reward_rateRow> {
    add(faction: mediumint, c?: reputation_reward_rateCreator): reputation_reward_rateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_reputation_reward_rate: reputation_reward_rateTable;
