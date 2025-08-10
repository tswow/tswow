import { char, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class achievement_criteria_dataRow extends SqlRow<achievement_criteria_dataCreator, achievement_criteria_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get criteria_id(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get type(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get value1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get value2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(criteria_id: mediumint, type: tinyint, c?: achievement_criteria_dataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type achievement_criteria_dataCreator = {
    criteria_id?: mediumint;
    type?: tinyint;
    value1?: mediumint;
    value2?: mediumint;
    ScriptName?: char;
};
/**
 * Used for object queries (Don't comment these)
 */
export type achievement_criteria_dataQuery = {
    criteria_id?: Relation<mediumint>;
    type?: Relation<tinyint>;
    value1?: Relation<mediumint>;
    value2?: Relation<mediumint>;
    ScriptName?: Relation<char>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class achievement_criteria_dataTable extends SqlTable<achievement_criteria_dataCreator, achievement_criteria_dataQuery, achievement_criteria_dataRow> {
    add(criteria_id: mediumint, type: tinyint, c?: achievement_criteria_dataCreator): achievement_criteria_dataRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_achievement_criteria_data: achievement_criteria_dataTable;
