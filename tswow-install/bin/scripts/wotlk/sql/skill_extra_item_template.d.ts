import { float, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class skill_extra_item_templateRow extends SqlRow<skill_extra_item_templateCreator, skill_extra_item_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spellId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get requiredSpecialization(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get additionalCreateChance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get additionalMaxNum(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spellId: mediumint, c?: skill_extra_item_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type skill_extra_item_templateCreator = {
    spellId?: mediumint;
    requiredSpecialization?: mediumint;
    additionalCreateChance?: float;
    additionalMaxNum?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type skill_extra_item_templateQuery = {
    spellId?: Relation<mediumint>;
    requiredSpecialization?: Relation<mediumint>;
    additionalCreateChance?: Relation<float>;
    additionalMaxNum?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class skill_extra_item_templateTable extends SqlTable<skill_extra_item_templateCreator, skill_extra_item_templateQuery, skill_extra_item_templateRow> {
    add(spellId: mediumint, c?: skill_extra_item_templateCreator): skill_extra_item_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_skill_extra_item_template: skill_extra_item_templateTable;
