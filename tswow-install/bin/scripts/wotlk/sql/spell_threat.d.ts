import { float, int, mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_threatRow extends SqlRow<spell_threatCreator, spell_threatQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get flatMod(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get pctMod(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get apPctMod(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: spell_threatCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_threatCreator = {
    entry?: mediumint;
    flatMod?: int;
    pctMod?: float;
    apPctMod?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_threatQuery = {
    entry?: Relation<mediumint>;
    flatMod?: Relation<int>;
    pctMod?: Relation<float>;
    apPctMod?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_threatTable extends SqlTable<spell_threatCreator, spell_threatQuery, spell_threatRow> {
    add(entry: mediumint, c?: spell_threatCreator): spell_threatRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_threat: spell_threatTable;
