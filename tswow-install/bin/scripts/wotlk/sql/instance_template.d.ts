import { smallint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class instance_templateRow extends SqlRow<instance_templateCreator, instance_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get map(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get parent(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get script(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get allowMount(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(map: smallint, c?: instance_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type instance_templateCreator = {
    map?: smallint;
    parent?: smallint;
    script?: varchar;
    allowMount?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type instance_templateQuery = {
    map?: Relation<smallint>;
    parent?: Relation<smallint>;
    script?: Relation<varchar>;
    allowMount?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class instance_templateTable extends SqlTable<instance_templateCreator, instance_templateQuery, instance_templateRow> {
    add(map: smallint, c?: instance_templateCreator): instance_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_instance_template: instance_templateTable;
