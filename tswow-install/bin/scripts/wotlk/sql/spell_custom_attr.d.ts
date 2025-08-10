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
export declare class spell_custom_attrRow extends SqlRow<spell_custom_attrCreator, spell_custom_attrQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get attributes(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: spell_custom_attrCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_custom_attrCreator = {
    entry?: mediumint;
    attributes?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_custom_attrQuery = {
    entry?: Relation<mediumint>;
    attributes?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_custom_attrTable extends SqlTable<spell_custom_attrCreator, spell_custom_attrQuery, spell_custom_attrRow> {
    add(entry: mediumint, c?: spell_custom_attrCreator): spell_custom_attrRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_custom_attr: spell_custom_attrTable;
