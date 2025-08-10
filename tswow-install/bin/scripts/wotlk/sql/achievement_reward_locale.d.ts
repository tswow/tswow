import { mediumint, text, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class achievement_reward_localeRow extends SqlRow<achievement_reward_localeCreator, achievement_reward_localeQuery> {
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
    get Locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get Subject(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Body(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, Locale: varchar, c?: achievement_reward_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type achievement_reward_localeCreator = {
    ID?: mediumint;
    Locale?: varchar;
    Subject?: text;
    Body?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type achievement_reward_localeQuery = {
    ID?: Relation<mediumint>;
    Locale?: Relation<varchar>;
    Subject?: Relation<text>;
    Body?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class achievement_reward_localeTable extends SqlTable<achievement_reward_localeCreator, achievement_reward_localeQuery, achievement_reward_localeRow> {
    add(ID: mediumint, Locale: varchar, c?: achievement_reward_localeCreator): achievement_reward_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_achievement_reward_locale: achievement_reward_localeTable;
