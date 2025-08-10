import { float, int, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_formationsRow extends SqlRow<creature_formationsCreator, creature_formationsQuery> {
    /**
     * No comment (yet!)
     */
    get leaderGUID(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get memberGUID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get dist(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get angle(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get groupAI(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get point_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get point_2(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(memberGUID: int, c?: creature_formationsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_formationsCreator = {
    leaderGUID?: int;
    memberGUID?: int;
    dist?: float;
    angle?: float;
    groupAI?: int;
    point_1?: smallint;
    point_2?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_formationsQuery = {
    leaderGUID?: Relation<int>;
    memberGUID?: Relation<int>;
    dist?: Relation<float>;
    angle?: Relation<float>;
    groupAI?: Relation<int>;
    point_1?: Relation<smallint>;
    point_2?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_formationsTable extends SqlTable<creature_formationsCreator, creature_formationsQuery, creature_formationsRow> {
    add(memberGUID: int, c?: creature_formationsCreator): creature_formationsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_formations: creature_formationsTable;
