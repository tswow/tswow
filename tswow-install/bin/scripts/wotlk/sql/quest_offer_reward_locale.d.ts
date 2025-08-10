import { int, smallint, text, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class quest_offer_reward_localeRow extends SqlRow<quest_offer_reward_localeCreator, quest_offer_reward_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get RewardText(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: int, locale: varchar, c?: quest_offer_reward_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_offer_reward_localeCreator = {
    ID?: int;
    locale?: varchar;
    RewardText?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_offer_reward_localeQuery = {
    ID?: Relation<int>;
    locale?: Relation<varchar>;
    RewardText?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_offer_reward_localeTable extends SqlTable<quest_offer_reward_localeCreator, quest_offer_reward_localeQuery, quest_offer_reward_localeRow> {
    add(ID: int, locale: varchar, c?: quest_offer_reward_localeCreator): quest_offer_reward_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_offer_reward_locale: quest_offer_reward_localeTable;
