import { int, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class npc_spellclick_spellsRow extends SqlRow<npc_spellclick_spellsCreator, npc_spellclick_spellsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get npc_entry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spell_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get cast_flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get user_type(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(npc_entry: int, spell_id: int, c?: npc_spellclick_spellsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type npc_spellclick_spellsCreator = {
    npc_entry?: int;
    spell_id?: int;
    cast_flags?: tinyint;
    user_type?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type npc_spellclick_spellsQuery = {
    npc_entry?: Relation<int>;
    spell_id?: Relation<int>;
    cast_flags?: Relation<tinyint>;
    user_type?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class npc_spellclick_spellsTable extends SqlTable<npc_spellclick_spellsCreator, npc_spellclick_spellsQuery, npc_spellclick_spellsRow> {
    add(npc_entry: int, spell_id: int, c?: npc_spellclick_spellsCreator): npc_spellclick_spellsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_npc_spellclick_spells: npc_spellclick_spellsTable;
