import { int, smallint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class instance_encountersRow extends SqlRow<instance_encountersCreator, instance_encountersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get creditType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get creditEntry(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lastEncounterDungeon(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: int, c?: instance_encountersCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type instance_encountersCreator = {
    entry?: int;
    creditType?: tinyint;
    creditEntry?: int;
    lastEncounterDungeon?: smallint;
    comment?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type instance_encountersQuery = {
    entry?: Relation<int>;
    creditType?: Relation<tinyint>;
    creditEntry?: Relation<int>;
    lastEncounterDungeon?: Relation<smallint>;
    comment?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class instance_encountersTable extends SqlTable<instance_encountersCreator, instance_encountersQuery, instance_encountersRow> {
    add(entry: int, c?: instance_encountersCreator): instance_encountersRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_instance_encounters: instance_encountersTable;
