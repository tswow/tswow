import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class quest_mail_senderRow extends SqlRow<quest_mail_senderCreator, quest_mail_senderQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get QuestId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get RewardMailSenderEntry(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(QuestId: int, c?: quest_mail_senderCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_mail_senderCreator = {
    QuestId?: int;
    RewardMailSenderEntry?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_mail_senderQuery = {
    QuestId?: Relation<int>;
    RewardMailSenderEntry?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_mail_senderTable extends SqlTable<quest_mail_senderCreator, quest_mail_senderQuery, quest_mail_senderRow> {
    add(QuestId: int, c?: quest_mail_senderCreator): quest_mail_senderRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_mail_sender: quest_mail_senderTable;
