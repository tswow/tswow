import { float, mediumint, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class skill_discovery_templateRow extends SqlRow<skill_discovery_templateCreator, skill_discovery_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spellId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get reqSpell(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get reqSkillValue(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get chance(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spellId: mediumint, reqSpell: mediumint, c?: skill_discovery_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type skill_discovery_templateCreator = {
    spellId?: mediumint;
    reqSpell?: mediumint;
    reqSkillValue?: smallint;
    chance?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type skill_discovery_templateQuery = {
    spellId?: Relation<mediumint>;
    reqSpell?: Relation<mediumint>;
    reqSkillValue?: Relation<smallint>;
    chance?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class skill_discovery_templateTable extends SqlTable<skill_discovery_templateCreator, skill_discovery_templateQuery, skill_discovery_templateRow> {
    add(spellId: mediumint, reqSpell: mediumint, c?: skill_discovery_templateCreator): skill_discovery_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_skill_discovery_template: skill_discovery_templateTable;
