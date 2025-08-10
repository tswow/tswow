import { mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class mail_level_rewardRow extends SqlRow<mail_level_rewardCreator, mail_level_rewardQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get level(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get raceMask(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get mailTemplateId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get senderEntry(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(level: tinyint, raceMask: mediumint, c?: mail_level_rewardCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type mail_level_rewardCreator = {
    level?: tinyint;
    raceMask?: mediumint;
    mailTemplateId?: mediumint;
    senderEntry?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type mail_level_rewardQuery = {
    level?: Relation<tinyint>;
    raceMask?: Relation<mediumint>;
    mailTemplateId?: Relation<mediumint>;
    senderEntry?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class mail_level_rewardTable extends SqlTable<mail_level_rewardCreator, mail_level_rewardQuery, mail_level_rewardRow> {
    add(level: tinyint, raceMask: mediumint, c?: mail_level_rewardCreator): mail_level_rewardRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_mail_level_reward: mail_level_rewardTable;
