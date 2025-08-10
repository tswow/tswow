import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spelldifficulty_dbcRow extends SqlRow<spelldifficulty_dbcCreator, spelldifficulty_dbcQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spellid3(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id: int, c?: spelldifficulty_dbcCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spelldifficulty_dbcCreator = {
    id?: int;
    spellid0?: int;
    spellid1?: int;
    spellid2?: int;
    spellid3?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spelldifficulty_dbcQuery = {
    id?: Relation<int>;
    spellid0?: Relation<int>;
    spellid1?: Relation<int>;
    spellid2?: Relation<int>;
    spellid3?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spelldifficulty_dbcTable extends SqlTable<spelldifficulty_dbcCreator, spelldifficulty_dbcQuery, spelldifficulty_dbcRow> {
    add(id: int, c?: spelldifficulty_dbcCreator): spelldifficulty_dbcRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spelldifficulty_dbc: spelldifficulty_dbcTable;
