import { float, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class battleground_setsRow extends SqlRow<battleground_setsCreator, battleground_setsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get set(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get battleground(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(battleground: mediumint, map: tinyint, c?: battleground_setsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type battleground_setsCreator = {
    weight?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type battleground_setsQuery = {
    set?: Relation<mediumint>;
    battleground?: Relation<mediumint>;
    weight?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class battleground_setsTable extends SqlTable<battleground_setsCreator, battleground_setsQuery, battleground_setsRow> {
    add(set: mediumint, battleground: mediumint, c?: battleground_setsCreator): battleground_setsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_battleground_sets: battleground_setsTable;
