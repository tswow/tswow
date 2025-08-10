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
export declare class achievement_rewardRow extends SqlRow<achievement_rewardCreator, achievement_rewardQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get TitleA(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get TitleH(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Sender(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Subject(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Body(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get MailTemplateID(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: achievement_rewardCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type achievement_rewardCreator = {
    ID?: mediumint;
    TitleA?: mediumint;
    TitleH?: mediumint;
    ItemID?: mediumint;
    Sender?: mediumint;
    Subject?: varchar;
    Body?: text;
    MailTemplateID?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type achievement_rewardQuery = {
    ID?: Relation<mediumint>;
    TitleA?: Relation<mediumint>;
    TitleH?: Relation<mediumint>;
    ItemID?: Relation<mediumint>;
    Sender?: Relation<mediumint>;
    Subject?: Relation<varchar>;
    Body?: Relation<text>;
    MailTemplateID?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class achievement_rewardTable extends SqlTable<achievement_rewardCreator, achievement_rewardQuery, achievement_rewardRow> {
    add(ID: mediumint, c?: achievement_rewardCreator): achievement_rewardRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_achievement_reward: achievement_rewardTable;
