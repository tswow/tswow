import { smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_learn_spellRow extends SqlRow<spell_learn_spellCreator, spell_learn_spellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SpellID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Active(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: smallint, SpellID: smallint, c?: spell_learn_spellCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_learn_spellCreator = {
    entry?: smallint;
    SpellID?: smallint;
    Active?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_learn_spellQuery = {
    entry?: Relation<smallint>;
    SpellID?: Relation<smallint>;
    Active?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_learn_spellTable extends SqlTable<spell_learn_spellCreator, spell_learn_spellQuery, spell_learn_spellRow> {
    add(entry: smallint, SpellID: smallint, c?: spell_learn_spellCreator): spell_learn_spellRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_learn_spell: spell_learn_spellTable;
