import { float, mediumint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_bonus_dataRow extends SqlRow<spell_bonus_dataCreator, spell_bonus_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get direct_bonus(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dot_bonus(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ap_bonus(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ap_dot_bonus(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get comments(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: spell_bonus_dataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_bonus_dataCreator = {
    entry?: mediumint;
    direct_bonus?: float;
    dot_bonus?: float;
    ap_bonus?: float;
    ap_dot_bonus?: float;
    comments?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_bonus_dataQuery = {
    entry?: Relation<mediumint>;
    direct_bonus?: Relation<float>;
    dot_bonus?: Relation<float>;
    ap_bonus?: Relation<float>;
    ap_dot_bonus?: Relation<float>;
    comments?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_bonus_dataTable extends SqlTable<spell_bonus_dataCreator, spell_bonus_dataQuery, spell_bonus_dataRow> {
    add(entry: mediumint, c?: spell_bonus_dataCreator): spell_bonus_dataRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_bonus_data: spell_bonus_dataTable;
