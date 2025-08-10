import { int, mediumint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class playercreateinfo_spell_customRow extends SqlRow<playercreateinfo_spell_customCreator, playercreateinfo_spell_customQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get racemask(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get classmask(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Spell(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Note(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(racemask: int, clsmask: int, Spell: mediumint, c?: playercreateinfo_spell_customCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfo_spell_customCreator = {
    racemask?: int;
    classmask?: int;
    Spell?: mediumint;
    Note?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfo_spell_customQuery = {
    racemask?: Relation<int>;
    classmask?: Relation<int>;
    Spell?: Relation<mediumint>;
    Note?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class playercreateinfo_spell_customTable extends SqlTable<playercreateinfo_spell_customCreator, playercreateinfo_spell_customQuery, playercreateinfo_spell_customRow> {
    add(racemask: int, clsmask: int, Spell: mediumint, c?: playercreateinfo_spell_customCreator): playercreateinfo_spell_customRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_playercreateinfo_spell_custom: playercreateinfo_spell_customTable;
