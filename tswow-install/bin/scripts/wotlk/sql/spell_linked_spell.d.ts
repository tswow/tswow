import { mediumint, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_linked_spellRow extends SqlRow<spell_linked_spellCreator, spell_linked_spellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spell_trigger(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spell_effect(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell_trigger: mediumint, spell_effect: mediumint, type: tinyint, c?: spell_linked_spellCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_linked_spellCreator = {
    comment?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_linked_spellQuery = {
    spell_trigger?: Relation<mediumint>;
    spell_effect?: Relation<mediumint>;
    type?: Relation<mediumint>;
    comment?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_linked_spellTable extends SqlTable<spell_linked_spellCreator, spell_linked_spellQuery, spell_linked_spellRow> {
    add(spell_trigger: mediumint, spell_effect: mediumint, type: tinyint, c?: spell_linked_spellCreator): spell_linked_spellRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_linked_spell: spell_linked_spellTable;
