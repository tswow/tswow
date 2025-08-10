import { mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_requiredRow extends SqlRow<spell_requiredCreator, spell_requiredQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spell_id(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get req_spell(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell_id: mediumint, req_spell: mediumint, c?: spell_requiredCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_requiredCreator = {
    spell_id?: mediumint;
    req_spell?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_requiredQuery = {
    spell_id?: Relation<mediumint>;
    req_spell?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_requiredTable extends SqlTable<spell_requiredCreator, spell_requiredQuery, spell_requiredRow> {
    add(spell_id: mediumint, req_spell: mediumint, c?: spell_requiredCreator): spell_requiredRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_required: spell_requiredTable;
