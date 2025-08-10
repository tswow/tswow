import { mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class instance_encounter_achievementRow extends SqlRow<instance_encounter_achievementCreator, instance_encounter_achievementQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get map(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get boss(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: mediumint, c?: instance_encounter_achievementCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type instance_encounter_achievementCreator = {
    entry?: mediumint;
    map?: mediumint;
    boss?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type instance_encounter_achievementQuery = {
    entry?: Relation<mediumint>;
    map?: Relation<mediumint>;
    boss?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class instance_encounter_achievementTable extends SqlTable<instance_encounter_achievementCreator, instance_encounter_achievementQuery, instance_encounter_achievementRow> {
    add(entry: mediumint, c?: instance_encounter_achievementCreator): instance_encounter_achievementRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_instance_encounter_achievement: instance_encounter_achievementTable;
