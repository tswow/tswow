import { mediumint, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class skill_fishing_base_levelRow extends SqlRow<skill_fishing_base_levelCreator, skill_fishing_base_levelQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get skill(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: skill_fishing_base_levelCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type skill_fishing_base_levelCreator = {
    entry?: mediumint;
    skill?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type skill_fishing_base_levelQuery = {
    entry?: Relation<mediumint>;
    skill?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class skill_fishing_base_levelTable extends SqlTable<skill_fishing_base_levelCreator, skill_fishing_base_levelQuery, skill_fishing_base_levelRow> {
    add(entry: mediumint, c?: skill_fishing_base_levelCreator): skill_fishing_base_levelRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_skill_fishing_base_level: skill_fishing_base_levelTable;
