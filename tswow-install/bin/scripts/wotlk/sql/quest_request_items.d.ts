import { mediumint, smallint, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class quest_request_itemsRow extends SqlRow<quest_request_itemsCreator, quest_request_itemsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteOnComplete(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteOnIncomplete(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get CompletionText(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: quest_request_itemsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_request_itemsCreator = {
    ID?: mediumint;
    EmoteOnComplete?: smallint;
    EmoteOnIncomplete?: smallint;
    CompletionText?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_request_itemsQuery = {
    ID?: Relation<mediumint>;
    EmoteOnComplete?: Relation<smallint>;
    EmoteOnIncomplete?: Relation<smallint>;
    CompletionText?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_request_itemsTable extends SqlTable<quest_request_itemsCreator, quest_request_itemsQuery, quest_request_itemsRow> {
    add(ID: mediumint, c?: quest_request_itemsCreator): quest_request_itemsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_request_items: quest_request_itemsTable;
