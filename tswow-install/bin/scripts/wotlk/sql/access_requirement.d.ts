import { mediumint, smallint, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class access_requirementRow extends SqlRow<access_requirementCreator, access_requirementQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get mapId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get difficulty(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get level_min(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get level_max(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get item_level(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get item(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get item2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_done_A(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_done_H(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get completed_achievement(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_failed_text(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(mapId: mediumint, difficulty: tinyint, c?: access_requirementCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type access_requirementCreator = {
    mapId?: mediumint;
    difficulty?: tinyint;
    level_min?: tinyint;
    level_max?: tinyint;
    item_level?: smallint;
    item?: mediumint;
    item2?: mediumint;
    quest_done_A?: mediumint;
    quest_done_H?: mediumint;
    completed_achievement?: mediumint;
    quest_failed_text?: text;
    comment?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type access_requirementQuery = {
    mapId?: Relation<mediumint>;
    difficulty?: Relation<tinyint>;
    level_min?: Relation<tinyint>;
    level_max?: Relation<tinyint>;
    item_level?: Relation<smallint>;
    item?: Relation<mediumint>;
    item2?: Relation<mediumint>;
    quest_done_A?: Relation<mediumint>;
    quest_done_H?: Relation<mediumint>;
    completed_achievement?: Relation<mediumint>;
    quest_failed_text?: Relation<text>;
    comment?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class access_requirementTable extends SqlTable<access_requirementCreator, access_requirementQuery, access_requirementRow> {
    add(mapId: mediumint, difficulty: tinyint, c?: access_requirementCreator): access_requirementRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_access_requirement: access_requirementTable;
