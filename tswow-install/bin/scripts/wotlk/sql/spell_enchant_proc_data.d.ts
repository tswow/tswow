import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_enchant_proc_dataRow extends SqlRow<spell_enchant_proc_dataCreator, spell_enchant_proc_dataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get EnchantID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ProcsPerMinute(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get HitMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesMask(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(EnchantID: int, c?: spell_enchant_proc_dataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_enchant_proc_dataCreator = {
    EnchantID?: int;
    Chance?: float;
    ProcsPerMinute?: float;
    HitMask?: int;
    AttributesMask?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_enchant_proc_dataQuery = {
    EnchantID?: Relation<int>;
    Chance?: Relation<float>;
    ProcsPerMinute?: Relation<float>;
    HitMask?: Relation<int>;
    AttributesMask?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_enchant_proc_dataTable extends SqlTable<spell_enchant_proc_dataCreator, spell_enchant_proc_dataQuery, spell_enchant_proc_dataRow> {
    add(EnchantID: int, c?: spell_enchant_proc_dataCreator): spell_enchant_proc_dataRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_enchant_proc_data: spell_enchant_proc_dataTable;
