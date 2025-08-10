import { float, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class reputation_spillover_templateRow extends SqlRow<reputation_spillover_templateCreator, reputation_spillover_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get faction(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get faction1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rate_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rank_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get faction2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rate_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rank_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get faction3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rate_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rank_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get faction4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rate_4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rank_4(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(faction: smallint, c?: reputation_spillover_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type reputation_spillover_templateCreator = {
    faction?: smallint;
    faction1?: smallint;
    rate_1?: float;
    rank_1?: tinyint;
    faction2?: smallint;
    rate_2?: float;
    rank_2?: tinyint;
    faction3?: smallint;
    rate_3?: float;
    rank_3?: tinyint;
    faction4?: smallint;
    rate_4?: float;
    rank_4?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type reputation_spillover_templateQuery = {
    faction?: Relation<smallint>;
    faction1?: Relation<smallint>;
    rate_1?: Relation<float>;
    rank_1?: Relation<tinyint>;
    faction2?: Relation<smallint>;
    rate_2?: Relation<float>;
    rank_2?: Relation<tinyint>;
    faction3?: Relation<smallint>;
    rate_3?: Relation<float>;
    rank_3?: Relation<tinyint>;
    faction4?: Relation<smallint>;
    rate_4?: Relation<float>;
    rank_4?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class reputation_spillover_templateTable extends SqlTable<reputation_spillover_templateCreator, reputation_spillover_templateQuery, reputation_spillover_templateRow> {
    add(faction: smallint, c?: reputation_spillover_templateCreator): reputation_spillover_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_reputation_spillover_template: reputation_spillover_templateTable;
