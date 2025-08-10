import { float, int, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class script_spline_chain_metaRow extends SqlRow<script_spline_chain_metaCreator, script_spline_chain_metaQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get chainId(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get splineId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get expectedDuration(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get msUntilNext(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get velocity(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: int, chainId: smallint, splineId: tinyint, c?: script_spline_chain_metaCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type script_spline_chain_metaCreator = {
    entry?: int;
    chainId?: smallint;
    splineId?: tinyint;
    expectedDuration?: int;
    msUntilNext?: int;
    velocity?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type script_spline_chain_metaQuery = {
    entry?: Relation<int>;
    chainId?: Relation<smallint>;
    splineId?: Relation<tinyint>;
    expectedDuration?: Relation<int>;
    msUntilNext?: Relation<int>;
    velocity?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class script_spline_chain_metaTable extends SqlTable<script_spline_chain_metaCreator, script_spline_chain_metaQuery, script_spline_chain_metaRow> {
    add(entry: int, chainId: smallint, splineId: tinyint, c?: script_spline_chain_metaCreator): script_spline_chain_metaRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_script_spline_chain_meta: script_spline_chain_metaTable;
