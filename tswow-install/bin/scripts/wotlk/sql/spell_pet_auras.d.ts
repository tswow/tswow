import { mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_pet_aurasRow extends SqlRow<spell_pet_aurasCreator, spell_pet_aurasQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spell(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get effectId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get pet(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get aura(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell: mediumint, effectId: tinyint, pet: mediumint, c?: spell_pet_aurasCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_pet_aurasCreator = {
    spell?: mediumint;
    effectId?: tinyint;
    pet?: mediumint;
    aura?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_pet_aurasQuery = {
    spell?: Relation<mediumint>;
    effectId?: Relation<tinyint>;
    pet?: Relation<mediumint>;
    aura?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_pet_aurasTable extends SqlTable<spell_pet_aurasCreator, spell_pet_aurasQuery, spell_pet_aurasRow> {
    add(spell: mediumint, effectId: tinyint, pet: mediumint, c?: spell_pet_aurasCreator): spell_pet_aurasRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_pet_auras: spell_pet_aurasTable;
