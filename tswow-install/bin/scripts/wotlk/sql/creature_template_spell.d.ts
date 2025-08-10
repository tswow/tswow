import { mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_template_spellRow extends SqlRow<creature_template_spellCreator, creature_template_spellQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get CreatureID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Index(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Spell(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID: mediumint, Index: tinyint, c?: creature_template_spellCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_spellCreator = {
    CreatureID?: mediumint;
    Index?: tinyint;
    Spell?: mediumint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_spellQuery = {
    CreatureID?: Relation<mediumint>;
    Index?: Relation<tinyint>;
    Spell?: Relation<mediumint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_template_spellTable extends SqlTable<creature_template_spellCreator, creature_template_spellQuery, creature_template_spellRow> {
    add(CreatureID: mediumint, Index: tinyint, c?: creature_template_spellCreator): creature_template_spellRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_template_spell: creature_template_spellTable;
