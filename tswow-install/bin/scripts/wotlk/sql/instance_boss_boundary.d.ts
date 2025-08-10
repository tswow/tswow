import { float, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class instance_boss_boundaryRow extends SqlRow<instance_boss_boundaryCreator, instance_boss_boundaryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get map(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get boss(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get index(): SQLCellReadOnly<number, this>;
    get unionGroup(): SQLCell<number, this>;
    get type(): SQLCell<number, this>;
    get inverted(): SQLCell<number, this>;
    get data0(): SQLCell<number, this>;
    get data1(): SQLCell<number, this>;
    get data2(): SQLCell<number, this>;
    get data3(): SQLCell<number, this>;
    get data4(): SQLCell<number, this>;
    get data5(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(map: mediumint, boss: mediumint, index: mediumint, c?: instance_boss_boundaryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type instance_boss_boundaryCreator = {
    map?: mediumint;
    boss?: mediumint;
    index?: mediumint;
    unionGroup?: mediumint;
    type?: mediumint;
    inverted?: tinyint;
    data0?: float;
    data1?: float;
    data2?: float;
    data3?: float;
    data4?: float;
    data5?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type instance_boss_boundaryQuery = {
    map?: Relation<mediumint>;
    boss?: Relation<mediumint>;
    index?: Relation<mediumint>;
    unionGroup?: Relation<mediumint>;
    type?: Relation<mediumint>;
    inverted?: Relation<tinyint>;
    data0?: Relation<float>;
    data1?: Relation<float>;
    data2?: Relation<float>;
    data3?: Relation<float>;
    data4?: Relation<float>;
    data5?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class instance_boss_boundaryTable extends SqlTable<instance_boss_boundaryCreator, instance_boss_boundaryQuery, instance_boss_boundaryRow> {
    add(map: mediumint, boss: mediumint, index: mediumint, c?: instance_boss_boundaryCreator): instance_boss_boundaryRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_instance_boss_boundary: instance_boss_boundaryTable;
